const express = require("express");
const router = express.Router();
const City = require("../models/city");
const Itineraries = require("../models/itineraries");

const authenticateToken = require("../authenticateToken");

router.get("/", (_, res) => {
  City.find()
    .then((data) => {
      //TODO: extract this sorting into some other function
      const sortedCities = data.sort(function (city, city2) {
        if (city.name.toLowerCase() < city2.name.toLowerCase()) {
          return -1;
        }
        if (city.name.toLowerCase() > city2.name.toLowerCase()) {
          return 1;
        }
        return 0;
      });
      res.json(sortedCities);
    })
    .catch((err) => res.json({ message: err }));
});

router.get("/:cityName", (req, res) => {
  City.findOne({ name: req.params.cityName })
    .then((city) => {
      if (city) return res.send(city);
      else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      res.json({ message: err });
    });
});

router.use(authenticateToken);

router.post("/", async (req, res) => {
  const noExtraSpaces = (str) => str.replace(/\s+/g, " ").trim();

  const trimmedCity = noExtraSpaces(req.body.city.trim());

  const city = new City({
    name: trimmedCity,
    country: noExtraSpaces(req.body.country.trim()),
    url: req.body.url
  });

  const itinerary = new Itineraries({
    city: trimmedCity,
    itineraries: []
  });

  const cityData = await City.findOne({ name: trimmedCity }).catch((err) => {
    res.json({ message: err });
  });

  if (cityData) {
    res.statusMessage = "Error: city already exists";
    return res.sendStatus(409);
  }

  itinerary
    .save()
    .then(() => city.save())
    .then(() => res.sendStatus(200))
    .catch((err) => res.json(err));
});

module.exports = router;
