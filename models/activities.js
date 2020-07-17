const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var activitiesSchema = new Schema({
  activities: Array,
});

module.exports = mongoose.model("activities", activitiesSchema);
