import { Router } from "express";
import City from "../models/city";
const router = Router();

router.get("/", (req, res) => {
  City.find()
    .then((cities) => res.json(cities))
    .catch(() => {
      // TODO: error handling, server error here, since mongo goes to .then
      // even if there is no data found
      res.sendStatus(500);
    });
});

router.post("/", (req, res) => {
  //TODO: Check if city already exists
  const { name, country } = req.body;
  const city = new City({ name, country });
  city
    .save()
    .then(() => res.sendStatus(200))
    .catch((e) => console.log(e));
});

// mongoose.Types.ObjectId("asd")
export default router;
