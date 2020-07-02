const express = require("express");
const router = express.Router();
const City = require("../models/city");

router.get("/", async (req, res) => {
  City.find()
    .then((data) => res.send(data))
    .catch((err) => {
      res.json({ message: err });
    });
});

router.get("/:cityName", async (req, res) => {
  City.findOne({ name: req.params.cityName })
    .then((data) => res.send(data))
    .catch((err) => {
      res.json({ message: err });
    });
});

router.post("/", async (req, res) => {
  const city = new City({
    name: req.body.name,
    country: req.body.country,
    url: req.body.url,
  });

  await city
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({ message: err });
    });
});

module.exports = router;
