const express = require("express");
const router = express.Router();
const authenticateToken = require("../authenticateToken");
const Itineraries = require("../models/itineraries");
const Activities = require("../models/activities");
const Itinerary = require("../models/itinerary");
const User = require("../models/user");
const Pfp = require("../models/pfp");

router.get("/", async (req, res) => {
  await Itineraries.find()
    .then((data) => res.send(data))
    .catch((err) => {
      res.json({ message: err });
    });
});

router.get("/:cityName", async (req, res) => {
  await Itineraries.findOne({ city: req.params.cityName })
    .then((data) => res.send(data))
    .catch((err) => {
      res.json({ message: err });
    });
});

router.get("/userPfp/:userID", (req, res) => {
  User.findById(req.params.userID)
    .then((user) => {
      if (user.pfp) {
        Pfp.findById(user.pfp).then((pfp) => {
          user.password = undefined;
          res.json({ user, pfp });
        });
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => console.log(err));
});

router.use(authenticateToken);

router.delete("/", async (req, res) => {
  const { itineraryId, activitiesId } = req.query;

  await Activities.findByIdAndDelete(activitiesId, { useFindAndModify: false })
    .then(
      async () =>
        await Itineraries.updateOne(
          {},
          {
            $pull: {
              itineraries: {
                _id: {
                  $in: itineraryId,
                },
              },
            },
          }
        )
          .then(() => {
            res.status(200).end();
          })
          .catch((err) => console.log(err))
    )
    .catch((err) => console.log(err));
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
        .then(async () => {
          await User.findByIdAndUpdate(
            req.body.creator,
            {
              $push: {
                itineraries: { itinerary: itinerary._id, activities: resp._id },
              },
            },
            { useFindAndModify: false }
          )
            .then(() => res.status(200).end())
            .catch((err) => res.json({ message: err }));
        })
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

  await itinerary
    .save()
    .then(() => res.sendStatus(200))
    .catch((err) => {
      res.json({ message: err });
    });
});

module.exports = router;
