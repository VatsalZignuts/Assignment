const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const auth = require("../middleware/auth");
const {signup ,login} = require("../controllers/user");
const User = require("../models/user");

// signup user

router.post(
    "/signup",
    [
        check("username", "Please Enter a Valid Username")
        .not()
        .isEmpty(),
        check("email", "Please enter a valid email").isEmail(),
        check("password", "Please enter a valid password").isLength({
            min: 8
        })
    ], signup,()=>{}
);

router.get('/signup', (req, res, err) => {
    res.render('pages/auth/signup')
    console.log(err);
});

// login user

router.post(
    "/login",
    [
      check("email", "Please enter a valid email").isEmail(),
      check("password", "Please enter a valid password").isLength({
        min: 8
      })
    ], login , ()=>{}
    
  );

router.get('/login', (req, res, err) => {
    res.render("pages/auth/login")
    console.log(err);
});



// get login using token pass

router.get("/me", auth, async (req, res ) => {
    try {
      
      const user = await User.findById(req.user.id);
      res.json(user);
    } catch (e) {
      res.send({ message: "Error in Fetching user" });
      console.log(e);
    }
  });


module.exports = router;
