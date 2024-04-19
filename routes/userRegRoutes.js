// Introduce express
const express = require("express");

// Accessing the router function in express
const router = express.Router();

//Introduce the model
const UserRegisration = require("../models/UserRegistration");

// Creating the route
router.get("/signup", (req, res) => {
  res.render("userReg"); //render the file where the form is
});

// Posting the post route

router.post("/signup", async (req, res) => {
  try {
    const userSignup = new UserRegisration(req.body);
    await UserRegisration.register(userSignup, req.body.password, (err) => {
      if (err) {
        throw err;
      }
      res.redirect("/signup");
    });
  } catch (error) {
    res.status(400).send("user not registered");
    console.log(error);
  }
});
module.exports = router;
