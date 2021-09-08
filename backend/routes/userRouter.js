const fs = require("fs");
const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const router = express.Router();
const { generateToken } = require("../utils");

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/../users.json`, "utf-8")
);

router.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    const newUsers = await User.create(users);
    res.status(200).json({
      status: "success",
      newUsers,
    });
  })
);

router.post("/signin", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });
  if (user) {
    if (bcrypt.compare(req.body.password, user.password))
      return res.send({
        _id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user),
      });
  } else {
    res.status(401).send({ message: "Invalid Email or Password." });
  }
});

router.post("/register", async (req, res) => {
  const user = new User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  if (user) {
    res.send({
      _id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(newUser),
    });
  } else {
    res.status(401).send({ message: "Invalid User Data" });
  }
});

module.exports = router;
