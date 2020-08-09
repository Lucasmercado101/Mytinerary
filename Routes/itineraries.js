const express = require("express");
const router = express.Router();
const authenticateToken = require("../authenticateToken");
const Itineraries = require("../models/itineraries");
const Activities = require("../models/activities");
const Itinerary = require("../models/itinerary");
const User = require("../models/user");

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
    .then(() =>
      User.updateOne(
        { "itineraries.itinerary": itineraryID },
        {
          $pull: {
            itineraries: { itinerary: itineraryID, activities: activitiesID },
          },
        }
      )
    )
    .then(() => res.sendStatus(200))
    .catch((err) => err);
});

router.post("/:cityName", async (req, res) => {
  const activitiesArray = req.body.activities.map((activity) =>
    activity.trim()
  );
  const hashtagsArray = req.body.hashtags.map((hashtag) => hashtag.trim());
  const itineraryTitle = req.body.title.trim();

  const itineraryExists = await Itineraries.findOne(
    {
      city: req.params.cityName,
      "itineraries.title": itineraryTitle,
    },
    { "itineraries.$": 1 }
  );

  if (itineraryExists) {
    res.statusMessage = "An itinerary with that name already exists";
    return res.sendStatus(409);
  }

  const activities = new Activities({
    activities: activitiesArray,
  });

  const itinerary = new Itinerary({
    title: itineraryTitle,
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
            itineraries: {
              itinerary: String(itinerary._id),
              activities: String(activities._id),
            },
          },
        },
        { useFindAndModify: false }
      )
    )
    .then(() => res.sendStatus(200))
    .catch((err) => res.json({ message: err }));
});

module.exports = router;
