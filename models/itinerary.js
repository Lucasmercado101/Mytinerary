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

module.exports = mongoose.model("itinerary", itinerarySchema);
