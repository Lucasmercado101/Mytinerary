const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");

// Routes
const citiesRoute = require("./Routes/cities");
const itinerariesRoute = require("./Routes/itineraries");
const activitiesRoute = require("./Routes/activities");
const usersRoute = require("./Routes/users");
const authRoute = require("./Routes/auth");

// Middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(process.env.MG_PASS, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Routes

app.use("/api/auth", authRoute);

app.use("/api/cities", citiesRoute);
app.use("/api/itineraries", itinerariesRoute);
app.use("/api/activities", activitiesRoute);
app.use("/api/users", usersRoute);

app.listen(5000);
