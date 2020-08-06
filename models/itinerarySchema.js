const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var itinerarySchema = new Schema({
  title: String,
  creator: String,
  time: String,
  price: String,
  activities: String,
  hashtags: Array,
});

module.exports = itinerarySchema;
