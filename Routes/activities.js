const express = require("express");
const router = express.Router();
const Activities = require("../models/activities");

router.get("/:activityId", (req, res) => {
  Activities.findOne({ _id: req.params.activityId })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.json({ message: err });
    });
});

module.exports = router;
