const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const User = require("../models/user");
const { transporter } = require("../middleware/mail")

// signup

const signup = async (req, res) => {
  //console.log("body",req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  const { username, email, password } = req.body;
  try {
    //console.log(req.body);
    let user = await User.findOne({
      email,
    });
    if (user) {
      return res.status(400).json({
        msg: "User Already Exists",
      });
    }

    user = new User({ username, email, password });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = { user: { id: user.id } };

    jwt.sign(
      payload,
      "randomString",
      {
        expiresIn: 10000,
      },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({
          token,
        });
      }
    );
    
    let info = transporter.sendMail({
      from: '"Fred Foo 👻" <foo@example.com>', // sender address
      to: req.body.email, // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Wecome to expensemanager</b>", // html body
    })
    //console.log(req.body.email,"::   email");
    //console.log("Message sent: %s", info.messageId);

    res.render("pages/auth/login");

  } catch (err) {
    console.log(err);
    console.log(err.message);
    res.status(500).send("Error in Saving");
  }

  
};

// login

const login = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({
        message: "User Not Exist",
      });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({
        message: "Incorrect Password !",
      });

    const payload = { user: { id: user.id } };

    jwt.sign(
      payload,
      "randomString",
      {
        expiresIn: 3600,
      },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({
          token,
        });
      }
    );
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "Server Error",
    });
  }
  res.render("pages/home/home");
};

module.exports = { login, signup };
