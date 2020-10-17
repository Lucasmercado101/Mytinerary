import { Router } from "express";
import City from "../models/city";
const router = Router();

router.get("/", (req, res) => {
  res.sendStatus(500);
});

router.post("/", (req, res) => {
  const city = new City({ name: "a" });
});

//TODO: for itineraries. 1 check if city exists,
// 2. if it does, good, if not create itinarry for city
export default router;
