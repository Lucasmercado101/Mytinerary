const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  firstName: String,
  lastName: String,
  country: String,
  favorites: Array,
});

module.exports = mongoose.model("user", userSchema);
