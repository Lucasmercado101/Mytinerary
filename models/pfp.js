const mongoose = require("mongoose");
const pfpSchema = require("./pfpSchema");

module.exports = mongoose.model("pfp", pfpSchema);
