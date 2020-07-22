const mongoose = require("mongoose");
const itinerarySchema = require("./itinerarySchema");

module.exports = mongoose.model("itinerary", itinerarySchema);
