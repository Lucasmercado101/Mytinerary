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

// Middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const conn = mongoose.connect(process.env.MG_PASS, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// const conn = mongoose.createConnection(process.env.MG_PASS, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// conn.on("error", function () {
//   console.log("Error! Database connection failed.");
// });

// // Init gfs
// let gfs;

// conn.once("open", () => {
//   // Init stream
//   console.log("Success");
//   gfs = Grid(conn.db, mongoose.mongo);
//   gfs.collection("uploads");
// });

// // Create storage engine
// const storage = new GridFsStorage({
//   url: process.env.MG_PASS,
//   file: (req, file) => {
//     return new Promise((resolve, reject) => {
//       crypto.randomBytes(16, (err, buf) => {
//         if (err) {
//           return reject(err);
//         }
//         const filename = buf.toString("hex") + path.extname(file.originalname);
//         const fileInfo = {
//           filename: filename,
//           bucketName: "uploads",
//         };
//         resolve(fileInfo);
//       });
//     });
//   },
// });
// const upload = multer({ storage });

// // app.post("/api/createUser", upload.single("file"), (req, res) => {
// app.post("/api/createUser", (req, res) => {
//   console.log(req.body);
//   res.status(200).json({});
// });

// app.get("/image/:filename", (req, res) => {
//   gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
//     // Check if file
//     if (!file || file.length === 0) {
//       return res.status(404).json({
//         err: "No file exists",
//       });
//     }
//     // Check if image
//     if (file.contentType === "image/jpeg" || file.contentType === "image/png") {
//       // Read output to browser
//       const readStream = gfs.createReadStream(file.filename);
//       readStream.pipe(res);
//     } else {
//       res.status(404).json({
//         err: "Not an image",
//       });
//     }
//   });
// });

// Routes

app.use("/api/cities", citiesRoute);
app.use("/api/itineraries", itinerariesRoute);
app.use("/api/activities", activitiesRoute);

app.listen(5000);
