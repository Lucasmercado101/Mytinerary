const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: String,
  password: Object,
  email: String,
  firstName: String,
  lastName: String,
  country: String,
  pfp: String,
  isAdmin: Boolean,
  itineraries: Array,
});

module.exports = mongoose.model("user", userSchema);
