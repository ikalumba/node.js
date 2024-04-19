const express = require("express");
const router = express.Router();

//import model
const Registration = require("../models/Registration");

router.get("/registerBaby", (req, res) => {
  res.render("reg_baby");
});

// using the async await button
router.post("/registerBaby", async (req, res) => {
  try {
    const baby = new Registration(req.body);
    console.log(baby);
    await baby.save();
    res.redirect("/registerBaby");
  } catch (error) {
    res.status(400).redirect("/babiesList");
    console.log("Error registering baby", error);
  }
});

// Fetching babies from the database

router.get("/babiesList", async (req, res) => {
  try {
    let babies = await Registration.find();
    res.render("infoDisplay", { babies: babies });
  } catch (error) {
    res.status(400).send("unable to fetch babies");
  }
});

router.post("/delete", async (req, res) => {
  try {
    //try block

    await Registration.deleteOne({ _id: req.body.id });

    res.redirect("back");
  } catch (error) {
    res.status(400).send("unable to delete sitter from the db");

    console.log("Error deleting baby", error);
  }
});

module.exports = router;
