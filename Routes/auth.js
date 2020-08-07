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

function generateAccessToken(user) {
  return jwt.sign(
    { username: user },
    process.env.ACCESS_TOKEN_SECRET
    // ,{ expiresIn: "30m",}
  );
}

// make fetch itineraries & cities & users, "public", not requiring json token
router.get("/login", async (req, res) => {
  await new Promise((resolv) =>
    setTimeout(() => {
      resolv();
      console.log("done");
    }, 1500)
  );
  return res.sendStatus(404);
  const { username, password } = req.query;
  await User.findOne({ username })
    .then((userData) => {
      if (userData) {
        let passwordData = sha512(password, userData.password.salt);
        if (passwordData.passwordHash === userData.password.passwordHash) {
          userData.password = undefined;
          const accessToken = generateAccessToken(userData.username);
          const refreshToken = jwt.sign(
            //* add an "admin", that's what's needed to
            //* delete any city and itinerary, and user
            { username: userData.username },
            process.env.REFRESH_TOKEN_SECRET
          );
          res.json({ userData, accessToken, refreshToken });
        }
      } else {
        res
          .status(404)
          .json({ message: "Error incorrect password or username" });
      }
    })
    .catch((err) => {
      res.json({ message: err });
    });
});

module.exports = router;
