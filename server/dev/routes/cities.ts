import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
  res.sendStatus(500);
});

export default router;
