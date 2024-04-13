const express = require("express");
const router = express.Router();

//import model
const Registration = require("../models/Registration");

router.get("/registerBaby", (req, res) => {
  res.render("reg_baby");
});

router.post("/registerBaby", (req, res) => {
  const baby = new Registration(req.body);
  console.log(baby);
  baby.save();
  // res.redirect("/index");
});

module.exports = router;
