const express = require("express");
const fs = require("fs");
const router = express.Router();
const path = require("path");
const crypto = require("crypto");
const authenticateToken = require("../authenticateToken");
const multer = require("multer");
const rootDir = require("../path");
const mongoose = require("mongoose");
require("dotenv/config");
const User = require("../models/user");
const Itineraries = require("../models/itineraries");
const Activities = require("../models/activities");
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
  return passwordData;
}

async function imageAsBase64(filename) {
  const fileLocation = path.join(rootDir, "temp", "images", filename);

  let data = await fs.readFileSync(fileLocation);

  // Delete after reading
  await fs.unlink(fileLocation, (err) => {
    if (err) throw err;
  });

  // Convert to Base64
  let base64 = data.toString("base64");

  // Feed out string to a buffer and then put it in the database
  let pfpData = new Buffer.from(base64, "base64");
  return pfpData;
}

const upload = multer({
  dest: "./temp/images",
  fileSize: "15000000",
});

router.get("/", async (req, res) => {
  await User.find()
    .then((resp) => {
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
      const sortedUsers = users.sort(function (user, user2) {
        if (user.username.toLowerCase() < user2.username.toLowerCase()) {
          return -1;
        }
        if (user.username.toLowerCase() > user2.username.toLowerCase()) {
          return 1;
        }
        return 0;
      });
      res.json(sortedUsers);
    })
    .catch((err) => {
      res.json({ message: err });
    });
});

router.post("/create", upload.single("file"), async (req, res) => {
  const { username, password, email, firstName, lastName, country } = req.body;

  const usernameExists = await User.findOne({ username })
    .then((data) => (data ? true : false))
    .catch(() => {});

  if (usernameExists) {
    res.statusMessage = `"${username}" already exists`;
    return res.sendStatus(409);
  }

  const emailExists = await User.findOne({ email })
    .then((data) => (data ? true : false))
    .catch(() => {});

  if (emailExists) {
    res.statusMessage = `Account with email "${email}" already exists`;
    return res.sendStatus(409);
  }

  const saltHashedPassword = saltHashPassword(password);
  let userObject = {
    username,
    password: saltHashedPassword,
    email,
    firstName,
    lastName,
    country,
    itineraries: [],
  };

  if (req.file) {
    let pfpData = await imageAsBase64(req.file.filename);
    await new Pfp({
      type: path.extname(req.file.originalname),
      data: pfpData,
    })
      .save()
      .then((data) => {
        userObject = { ...userObject, pfp: data._id };
      })
      .catch((err) => res.json({ message: err }));
  }

  const user = new User(userObject);

  await user.save().catch((err) => {
    res.json({ message: err });
  });
  res.sendStatus(200);
});

router.get("/user/pfp/:ID", (req, res) => {
  const ID = req.params.ID;
  Pfp.findById(ID)
    .then((pfp) => {
      const type = pfp.type.split(".")[1];
      const data = Buffer.from(pfp.data).toString("base64");
      const image = `data:image/${type};base64,${data}`;
      res.json({ image });
    })
    .catch((err) => res.json(err));
});

router.get("/user/:ID", async (req, res) => {
  const { ID } = req.params;
  User.findById(ID)
    .then((user) => {
      if (!user) {
        res.statusMessage = "User does not exist";
        return res.sendStatus(404);
      }
      user.password = undefined;
      user.email = undefined;
      res.json(user);
    })
    .catch((err) => res.json({ message: err }));
});

router.use(authenticateToken);

router.delete("/user/:userID", async (req, res) => {
  const ID = req.params.userID;
  const user = await User.findById(ID).catch((err) =>
    res.json({ message: err })
  );
  if (user.pfp) {
    await Pfp.findByIdAndDelete(user.pfp, { useFindAndModify: false });
  }

  const postedItineraries = user.itineraries;

  if (postedItineraries) {
    postedItineraries.forEach(async (i) => {
      await Activities.findByIdAndDelete(i.activities, {
        useFindAndModify: false,
      }).catch((err) => res.json({ message: err }));

      await Itineraries.updateOne(
        {},
        {
          $pull: {
            itineraries: {
              _id: {
                $in: mongoose.Types.ObjectId(i.itinerary),
              },
            },
          },
        }
      ).catch((err) => res.json({ message: err }));
    });
  }

  await User.findByIdAndDelete(ID, { useFindAndModify: false }).catch((err) =>
    res.json({ message: err })
  );

  res.status(200).end();
});

router.put("/user/pfp/:ID", upload.single("file"), async (req, res) => {
  const ID = req.params.ID;
  let pfpData = await imageAsBase64(req.file.filename);

  await Pfp.findByIdAndUpdate(
    ID,
    {
      type: path.extname(req.file.originalname),
      data: pfpData,
    },
    { useFindAndModify: false }
  )
    .then(() => {
      res.status(200).end();
    })
    .catch((err) => res.json({ message: err }));
});

router.delete("/user/pfp/:ID", async (req, res) => {
  const user = await User.findOne({ pfp: req.params.ID });
  Pfp.findByIdAndRemove(user.pfp, { useFindAndModify: false })
    .then(async () => {
      user.pfp = undefined;
      return user.save();
    })
    .then(() => res.sendStatus(200));
});

router.post("/user/pfp/:ID", upload.single("file"), async (req, res) => {
  let pfpData = await imageAsBase64(req.file.filename);

  await new Pfp({
    type: path.extname(req.file.originalname),
    data: pfpData,
  })
    .save()
    .then((data) => {
      return User.findByIdAndUpdate(
        req.params.ID,
        { pfp: data._id },
        { useFindAndModify: false }
      );
    })
    .then((data) => {
      res.sendStatus(200);
    })
    .catch((err) => res.json(err));
});

module.exports = router;
