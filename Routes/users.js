const express = require("express");
const fs = require("fs");
const router = express.Router();
const path = require("path");
const crypto = require("crypto");
const multer = require("multer");
const User = require("../models/user");
const Pfp = require("../models/pfp");

/**
 * generates random string of characters i.e salt
 * @function
 * @param {number} length - Length of the random string.
 */
let genRandomString = function (length) {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString("hex") /** convert to hexadecimal format */
    .slice(0, length); /** return required number of characters */
};

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

function saltHashPassword(userpassword) {
  let salt = genRandomString(16); /** Gives us salt of length 16 */
  let passwordData = sha512(userpassword, salt);
  // console.log("UserPassword = " + userpassword);
  // console.log("Passwordhash = " + passwordData.passwordHash);
  // console.log("nSalt = " + passwordData.salt);
  return passwordData;
}

const upload = multer({
  dest: "./temp/images",
  fileSize: "15000000",
});

router.post("/create", upload.single("file"), async (req, res) => {
  const { username, password, email, firstName, lastName, country } = req.body;
  const saltHashedPassword = saltHashPassword(password);
  let userObject = {
    username,
    password: saltHashedPassword,
    email,
    firstName,
    lastName,
    country,
    favorites: [],
  };

  if (req.file) {
    const fileLocation = path.join(
      __dirname,
      "..",
      "temp",
      "images",
      req.file.filename
    );

    let data = await fs.readFileSync(fileLocation);

    // Delete after reading
    await fs.unlink(fileLocation, (err) => {
      if (err) throw err;
    });

    // Convert to Base64
    let base64 = data.toString("base64");

    // Feed out string to a buffer and then put it in the database
    let pfpData = new Buffer.from(base64, "base64");

    const pfp = new Pfp({
      type: path.extname(req.file.originalname),
      data: pfpData,
    });
    userObject = { ...userObject, pfp };
  } else {
    userObject = { ...userObject, pfp: {} };
  }

  const user = new User(userObject);
  // path.extname(req.file.originalname)
  console.log("Saving user...");

  await User.findOne({ username })
    .then(async (data) => {
      if (data === null) {
        await user
          .save()
          .then((data) => {
            res.json(data);
          })
          .catch((err) => {
            res.json({ message: err });
          });
      } else {
        res.statusMessage = `Account "${username}" already exists`;
        res.status(409).end();
      }
    })
    .catch((err) => console.log(err));
});

router.get("/get/", async (req, res) => {
  const { username, password } = req.query;
  await User.findOne({ username })
    // .then((user) => {
    //   fs.writeFileSync(
    //     "./temp/images/Image_" + user.pfp._id + user.pfp.type,
    //     user.pfp.data
    //   );
    // })
    .then((data) => {
      let passwordData = sha512(password, data.password.salt);
      if (passwordData.passwordHash === data.password.passwordHash) {
        res.send(data);
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

router.get("/", async (req, res) => {
  console.log("here");
  await User.find()
    .then((resp) => {
      console.log("finished");
      const users = [];
      resp.forEach((user) =>
        users.push({
          _id: user._id,
          username: user.username,
          favorites: user.favorites,
          firstName: user.firstName,
          lastName: user.lastName,
          country: user.country,
          pfp: user.pfp,
        })
      );
      res.json(users);
    })
    .catch((err) => {
      res.json({ message: err });
    });
});

router.get("/get/user/:userID", async (req, res) => {
  await User.findById(req.params.userID)
    .then((data) => {
      const pfp = data.pfp.data ? data.pfp : "";
      const user = {
        userName: data.username,
        _id: data._id,
        firstName: data.firstName,
        lastName: data.lastName,
        country: data.country,
        pfp: pfp,
      };
      res.send(user);
    })
    .catch((err) => {
      res.json({ message: err });
    });
});

router.put("/user/pfp/:userID", upload.single("file"), async (req, res) => {
  const fileLocation = path.join(
    __dirname,
    "..",
    "temp",
    "images",
    req.file.filename
  );

  let data = await fs.readFileSync(fileLocation);

  // Delete after reading
  await fs.unlink(fileLocation, (err) => {
    if (err) throw err;
  });

  // Convert to Base64
  let base64 = data.toString("base64");

  // Feed out string to a buffer and then put it in the database
  let pfpData = new Buffer.from(base64, "base64");
  await User.findOneAndUpdate(
    req.params.userID,
    {
      pfp: {
        type: path.extname(req.file.originalname),
        data: pfpData,
      },
    },
    { useFindAndModify: false }
  )
    .then(() => {
      res.status(200).end();
    })
    .catch((err) => console.log(err));
});

module.exports = router;
