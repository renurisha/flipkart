const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { tokenVerify } = require("./middlewares");

router.post("/user/home", tokenVerify, (req, res) => {
  res.send("home page...");
});
router.post("user/register", async (req, res) => {
  const data = await User.findOne({ email: req.body.email });
  if (data) {
    return res.send("email already exist...");
  }

  const salt = await bcrypt.genSalt(10);
  const secpass = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,

    email: req.body.email,
    password: secpass,
    contact: req.body.contact,
    role: req.body.role,
  });
  const newuser = await user.save();
  console.log("user", newuser);
  return res.send({ message: "user created successfully...." });
});

router.get("/user/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
        expiresIn: "1h",
      });
      //  const { name, email, password, role } = user
      return res.send({
        token: token,
        user: user,
      });

      return res.send({ message: "login successfully.", data: user });
    }
    return res.send({ message: "invalid user..." });
  }
  return res.send({ message: "user doesn't exist..." });
});
module.exports = router;
