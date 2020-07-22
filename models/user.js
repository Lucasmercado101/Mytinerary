const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const pfpSchema = require("./pfpSchema");

var userSchema = new Schema({
  username: String,
  password: Object,
  email: String,
  firstName: String,
  lastName: String,
  country: String,
  favorites: Array,
  pfp: pfpSchema,
});

module.exports = mongoose.model("user", userSchema);
