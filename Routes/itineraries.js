const express = require("express");
const router = express.Router();
const Itineraries = require("../models/itineraries");
const Activities = require("../models/activities");
const Itinerary = require("../models/itinerary");

router.get("/", async (req, res) => {
  await Itineraries.find()
    .then((data) => res.send(data))
    .catch((err) => {
      res.json({ message: err });
    });
});

router.get("/:cityName", async (req, res) => {
  // Itineraries.findOne(
  //   { "itineraries._id": "5f1db53fd3f0d215f87e5ba9" },
  //   { "itineraries.$": 1 }
  // )
  // Itineraries.updateMany
  //   .then((resp) =>{
  //     console.log(resp)
  //   })
  //   .catch((err) => console.log(err));
  await Itineraries.findOne({ city: req.params.cityName })
    .then((data) => res.send(data))
    .catch((err) => {
      res.json({ message: err });
    });
});

router.post("/:cityName", async (req, res) => {
  const activities = new Activities({
    activities: [...req.body.activities],
  });

  await activities
    .save()
    .then(async (resp) => {
      const itinerary = new Itinerary({
        title: req.body.title,
        rating: "0",
        creator: req.body.creator,
        time: req.body.time,
        price: req.body.price,
        activities: resp._id,
        hashtags: [...req.body.hashtags],
      });

      await Itineraries.updateOne(
        { city: req.params.cityName },
        {
          $push: {
            itineraries: itinerary,
          },
        }
      )
        .then(() => res.status(200).end())
        .catch((err) => res.json({ message: err }));
    })
    .catch((err) => {
      res.json({ message: err });
    });
});

router.post("/", async (req, res) => {
  const itinerary = new Itineraries({
    city: req.body.city,
    itineraries: [],
  });

  await itinerary.save().catch((err) => {
    res.json({ message: err });
  });
});

module.exports = router;
