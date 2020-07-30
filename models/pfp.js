const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var pfpSchema = new Schema({
  type: String,
  data: Buffer,
});

module.exports = mongoose.model("users.pfp", pfpSchema);
