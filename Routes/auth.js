const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
require("dotenv/config");
const User = require("../models/user");

/**
 * hash password with sha512.
 * @function
 * @param {string} password - List of required fields.
 * @param {string} salt - Data to be validated.
 */
let sha512 = function (password, salt) {
  let hash = crypto.createHmac("sha512", salt); /** Hashing algorithm sha512 */
  hash.update(password);
  let value = hash.digest("hex");
  return {
    salt: salt,
    passwordHash: value,
  };
};

//TODO: add an "admin", that's what's needed to
// delete any city and itinerary, and user

function generateAccessToken(user) {
  return jwt.sign(
    { username: user.username },
    process.env.ACCESS_TOKEN_SECRET
    // ,{ expiresIn: "30m",}
  );
}

router.get("/login", async (req, res) => {
  const { username, password } = req.query;
  const userData = await User.findOne({ username }).catch(() => {});
  if (!userData) {
    res.statusMessage = "Error incorrect password or username";
    return res.sendStatus(404);
  }

  const passwordData = sha512(password, userData.password.salt);
  const passwordsMatch =
    passwordData.passwordHash === userData.password.passwordHash;
  if (!passwordsMatch) {
    res.statusMessage = "Error incorrect password or username";
    return res.sendStatus(404);
  }

  const accessToken = generateAccessToken(userData);
  const refreshToken = jwt.sign(
    { username: userData.username },
    process.env.REFRESH_TOKEN_SECRET
  );

  userData.password = undefined;
  res.json({ userData, accessToken, refreshToken });
});

module.exports = router;
