import { Router } from "express";
import Itinerary from "../models/itinerary";
const router = Router();

router.get("/", (req, res) => {
  Itinerary.find()
    .then((itineraries) => res.json(itineraries))
    .catch(() => {
      // TODO: error handling, server error here, since mongo goes to .then
      // even if there is no data found
      res.sendStatus(500);
    });
});

router.post("/", (req, res) => {
  //   const { name, country } = req.body;
  //   const city = new City({ name, country });
  //   city
  //     .save()
  //     .then(() => res.sendStatus(200))
  //     .catch((e) => console.log(e));
});

// mongoose.Types.ObjectId("asd")

//TODO: for itineraries. 1 check if city exists,
// 2. if it does, good, if not create itinarry for city
export default router;
