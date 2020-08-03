const express = require("express");
const fs = require("fs");
const router = express.Router();
const path = require("path");
const crypto = require("crypto");
const authenticateToken = require("../authenticateToken");
const multer = require("multer");
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
      res.json(users);
    })
    .catch((err) => {
      res.json({ message: err });
    });
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
    itineraries: [],
  };
  let pfpID;

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
  await User.findOne({ username })
    .then(async (data) => {
      const accountDoesNotExist = data === null;
      if (accountDoesNotExist) {
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
    .catch((err) => res.json({ message: err }));
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

router.get("/user/:ID", (req, res) => {
  const { ID } = req.params;
  User.findById(ID)
    .then((user) => {
      if (!user)
        return res.status(404).json({ message: "User does not exist" });
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
      await Activities.findByIdAndDelete(i["activities"], {
        useFindAndModify: false,
      }).catch((err) => res.json({ message: err }));

      await Itineraries.updateOne(
        {},
        {
          $pull: {
            itineraries: {
              _id: {
                $in: i["itinerary"],
              },
            },
          },
        }
      )
        .then(() => {
          res.status(200).end();
        })
        .catch((err) => res.json({ message: err }));
    });
  }
  await User.findByIdAndDelete(ID, { useFindAndModify: false }).catch((err) =>
    res.json({ message: err })
  );

  res.status(200).end();
});

router.put("/user/pfp/:ID", upload.single("file"), async (req, res) => {
  const ID = req.params.ID;
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
    .then(res.sendStatus(200));
});

router.post("/user/pfp/:ID", upload.single("file"), async (req, res) => {
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
    .then(() => res.sendStatus(200))
    .catch((err) => res.json(err));
});

module.exports = router;

// await User.findOne({ username })
// .then((user) => {
//   fs.writeFileSync(
//     "./temp/images/Image_" + user.pfp._id + user.pfp.type,
//     user.pfp.data
//   );
// })
