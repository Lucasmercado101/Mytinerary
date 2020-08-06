const express = require("express");
const router = express.Router();
const authenticateToken = require("../authenticateToken");
const Itineraries = require("../models/itineraries");
const Activities = require("../models/activities");
const Itinerary = require("../models/itinerary");
const User = require("../models/user");
const itinerary = require("../models/itinerary");

router.get("/cityItineraries/:cityName", async (req, res) => {
  await Itineraries.findOne({ city: req.params.cityName })
    .then((data) => res.send(data.itineraries))
    .catch((err) => {
      res.json({ message: err });
    });
});

router.use(authenticateToken);

router.delete("/:ID", async (req, res) => {
  const itineraryID = req.params.ID;

  const itinerary = await Itineraries.findOne(
    {
      "itineraries._id": itineraryID,
    },
    { "itineraries.$": 1 }
  );

  const activitiesID = itinerary.itineraries[0].activities;

  res.sendStatus(200);

  await Itineraries.updateOne(
    {},
    {
      $pull: {
        itineraries: {
          _id: {
            $in: itineraryID,
          },
        },
      },
    }
  )
    .then(() =>
      Activities.findByIdAndDelete(activitiesID, { useFindAndModify: false })
    )
    .then(() => res.sendStatus(200))
    .catch((err) => err);
});

router.post("/:cityName", async (req, res) => {
  //TODO: CHeck if itinerary exists, compare both same name AND userID

  const activitiesArray = req.body.activities.map((activity) =>
    activity.trim()
  );
  const hashtagsArray = req.body.hashtags.map((hashtag) => hashtag.trim());

  const activities = new Activities({
    activities: activitiesArray,
  });

  const itinerary = new Itinerary({
    title: req.body.title.trim(),
    rating: "0",
    creator: req.body.creator,
    time: req.body.time.trim(),
    price: req.body.price.trim(),
    activities: activities._id,
    hashtags: hashtagsArray,
  });

  await activities
    .save()
    .then(() =>
      Itineraries.updateOne(
        { city: req.params.cityName },
        {
          $push: {
            itineraries: itinerary,
          },
        }
      )
    )
    .then(() =>
      User.findByIdAndUpdate(
        req.body.creator,
        {
          $push: {
            itineraries: { itinerary: itinerary._id, activities: resp._id },
          },
        },
        { useFindAndModify: false }
      )
    )
    .then(() => res.sendStatus(200))
    .catch((err) => res.json({ message: err }));
});

module.exports = router;
