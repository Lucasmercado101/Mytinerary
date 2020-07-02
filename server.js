const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");

// Routes
const citiesRoute = require("./Routes/cities");
const itinerariesRoute = require("./Routes/itineraries");

// Middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//

app.use("/api/cities", citiesRoute);
app.use("/api", itinerariesRoute);

mongoose
  .connect(process.env.MG_PASS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((err) => console.log(err));

app.listen(5000);
