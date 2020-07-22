const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const itinerarySchema = require("./itinerarySchema");

var itinerariesSchema = new Schema({
  city: String,
  itineraries: [itinerarySchema],
});

module.exports = mongoose.model("itineraries", itinerariesSchema);
