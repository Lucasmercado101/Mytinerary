import express from "express";
import { json } from "body-parser";
import mongoose from "mongoose";
import path from "path";

import citiesRoutes from "./routes/cities";
import itinerariesRoutes from "./routes/itineraries";
import usersRoutes from "./routes/users";
// import cors from 'cors';

// import userRoutes from './routes/users';
// import notesRoutes from './routes/notes';

import rootDir from "./utils";
// Dev requirement
import "dotenv/config";

const port = process.env.PORT || 5000;
const app = express();

mongoose
  .connect(process.env.MG_PASS!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((e) => console.log("MongoDB Connection Error", e));

app.use(express.static(path.join(rootDir, "..", "..", "client", "build")));
// app.use(cors());
app.use(json());

app.use("/api/cities", citiesRoutes);
app.use("/api/itineraries", itinerariesRoutes);
app.use("/api/users", usersRoutes);

// app.use('/api', userRoutes);
// app.use('/api', notesRoutes);

// app.get("*", (_, res) => {
//   res.sendFile(path.join(rootDir, "..", "..", "client", "build", "index.html"));
// });

app.listen(port, () => console.log(`Listening on port ${port}!`));
