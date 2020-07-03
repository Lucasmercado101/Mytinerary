const express = require("express");
const router = express.Router();
const Itineraries = require("../models/itineraries");

const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var itinerarySchema = new Schema({
  title: String,
  rating: String,
  time: String,
  price: String,
  activities: String,
  hashtags: Array,
});

router.get("/itineraries", async (req, res) => {
  Itineraries.find()
    .then((data) => res.send(data))
    .catch((err) => {
      res.json({ message: err });
    });
});

router.get("/itineraries/:cityName", async (req, res) => {
  Itineraries.findOne({ name: req.params.cityName })
    .then((data) => res.send(data))
    .catch((err) => {
      res.json({ message: err });
    });
});

router.post("/itineraries", async (req, res) => {
  console.log(req.body);
  console.log("here");

  const itinerary = new Itineraries({
    city: req.body.city,
    itineraries: [],
  });

  await itinerary
    .save()
    .then(() => console.log("YES"))
    .catch((err) => {
      res.json({ message: err });
    });
});

router.post("/itineraries", async (req, res) => {
  const itinerary = new Itineraries({
    city: req.body.city,
    itineraries: [req.body.itineraries[0]],
  });

  await itinerary.save().catch((err) => {
    res.json({ message: err });
  });
});

module.exports = router;
