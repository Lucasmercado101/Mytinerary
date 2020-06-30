const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var cityScheme = new Schema({
  name: String,
  country: String,
  url: String,
});

module.exports = mongoose.model("cities", cityScheme);
