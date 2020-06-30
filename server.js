const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");

// Routes
const citiesRoute = require("./Routes/cities");

// Middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//

app.use("/api", citiesRoute);

mongoose.connect(process.env.MG_PASS, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(5000);
