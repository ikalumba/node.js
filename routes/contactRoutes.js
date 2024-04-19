// Introduce express
const express = require("express");

// Accessing the router function in express
const router = express.Router();

//Introduce the model
const Contact = require("../models");

// Creating the route
router.get("/contact", (req, res) => {
  res.render("sitter_reg"); //render the file where the form is
});

// Posting the post route

router.post("/contact", async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    console.log(req.body);
    res.redirect("/contact");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
