const express = require("express");
const router = express.Router();
const City = require("../models/city");

const authenticateToken = require("../authenticateToken");

router.get("/", (req, res) => {
  City.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.json({ message: err });
    });
});

router.get("/:cityName", (req, res) => {
  City.findOne({ name: req.params.cityName })
    .then((data) => res.send(data))
    .catch((err) => {
      res.json({ message: err });
    });
});

router.use(authenticateToken);

router.post("/", async (req, res) => {
  const city = new City({
    name: req.body.city,
    country: req.body.country,
    url: req.body.url,
  });

  await City.findOne({ name: req.body.city })
    .then(async (cityData) => {
      if (cityData) {
        res.statusMessage = "Error: city already exists";
        return res.sendStatus(404);
      }
      await city
        .save()
        .then((data) => {
          res.json(data);
        })
        .catch((err) => {
          res.json({ message: err });
        });
    })
    .catch((err) => res.json(err));
});

module.exports = router;
