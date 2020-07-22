const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Grid = require("gridfs-stream");
const GridFsStorage = require("multer-gridfs-storage");
const multer = require("multer");
const crypto = require("crypto");
const cors = require("cors");
require("dotenv/config");

// Routes
const citiesRoute = require("./Routes/cities");
const itinerariesRoute = require("./Routes/itineraries");
const activitiesRoute = require("./Routes/activities");
const usersRoute = require("./Routes/users");

// Middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose
  .connect(process.env.MG_PASS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.log(err));

// Routes

app.use("/api/cities", citiesRoute);
app.use("/api/itineraries", itinerariesRoute);
app.use("/api/activities", activitiesRoute);
app.use("/api/users", usersRoute);

app.listen(5000);
