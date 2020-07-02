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

var itinerariesSchema = new Schema({
  city: String,
  itineraries: [itinerarySchema],
});

module.exports = mongoose.model("itineraries", itinerariesSchema);
