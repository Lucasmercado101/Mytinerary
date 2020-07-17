const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var citySchema = new Schema({
  name: String,
  country: String,
  url: String,
});

module.exports = mongoose.model("city", citySchema);
