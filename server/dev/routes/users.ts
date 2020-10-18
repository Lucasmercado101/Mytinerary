import { Router } from "express";
import User from "../models/user";
const router = Router();

router.get("/", (req, res) => {
  User.find()
    .then((users) =>
      res.json(
        users.map((user) => {
          return {
            _id: user._id,
            username: user.username,
            firstname: user.firstname,
            country: user.country,
            lastname: user.lastname,
            profileText: user.profileText
          };
        })
      )
    )
    .catch(() => {
      // TODO: error handling, server error here, since mongo goes to .then
      // even if there is no data found
      res.sendStatus(500);
    });
});

router.post("/", (req, res) => {
  const { username, password, email, firstname, lastname, country } = req.body;
  //TODO: Check if user already exists
  const user = new User({
    username,
    password,
    email,
    firstname,
    lastname,
    country,
    profileText: ""
  });
  user
    .save()
    .then(() => res.sendStatus(200))
    .catch(() =>
      // TODO: error handling, server error here, since mongo goes to .then
      // even if there is no data found
      res.sendStatus(500)
    );
});

export default router;
