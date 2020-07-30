const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: String,
  password: Object,
  email: String,
  firstName: String,
  lastName: String,
  country: String,
  favorites: Array,
  pfp: String,
  itineraries: Array, // Array of IDs of Itineraries posted
});

module.exports = mongoose.model("user", userSchema);
