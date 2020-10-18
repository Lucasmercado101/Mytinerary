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
  const { title, shortDescription, content, tags, author } = req.body;
  const itinerary = new Itinerary({
    title,
    author,
    shortDescription,
    content,
    likes: 0,
    tags: tags || []
  });
  itinerary.save();
});

// mongoose.Types.ObjectId("asd")

//TODO: for itineraries. 1 check if city exists,
// 2. if it does, good, if not create itinarry for city
export default router;
