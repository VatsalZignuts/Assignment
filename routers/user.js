const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const auth = require("../middleware/auth");
const User = require("../models/user");
const { signup, login } = require("../controllers/user");

// signup

router.get("/signup", (req, res) => {
  res.render("pages/auth/signup");
});

router.post(
  "/signup",
  [
    check("username", "Please Enter a Valid Username").not().isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid password").isLength({
      min: 8,
    }),
  ],
  signup
);

// login

router.get("/login", (req, res) => {
  res.render("pages/auth/login");
});

router.post(
  "/login",
  [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid password").isLength({
      min: 8,
    }),
  ],
  login
);

router.get("/data", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (e) {
    res.send({ message: "Error in Fetching user" });
  }
});

module.exports = router;
