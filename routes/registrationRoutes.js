const express = require("express");
const router = express.Router();
const connectEnsureLogin = require("connect-ensure-login");

//import model
const Registration = require("../models/UserRegistration");

router.get("/registerBaby", connectEnsureLogin.ensureLoggedIn(), (req, res) => {
  res.render("reg_baby");
});

// Enabling image upload
/*
var storage = multer.diskStorage({

  destination: (req, file, cb) => {

    cb(null, "public/images/uploads");

  },

  filename: (req, file, cb) => {

    cb(null, file.originalname);

  },

});

var upload = multer({ storage: storage });
*/

// using the async await button
router.post(
  "/registerBaby",
  connectEnsureLogin.ensureLoggedIn(),
  async (req, res) => {
    try {
      const baby = new Registration(req.body);
      console.log(baby);
      await Registration.register(baby, req.body.password, (err) => {
        if (err) {
          throw err;
        }
        res.redirect("/babiesList");
      });
    } catch (error) {
      res.status(400).redirect("/babiesList");
      console.log("Error registering baby", error);
    }
  }
);

// Fetching babies from the database

router.get("/babiesList", async (req, res) => {
  try {
    let babies = await Registration.find({ role: "sitter" });
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

// Updating a baby in the database
router.get("/babiesUpdate/:id", async (req, res) => {
  try {
    const updateBaby = await Registration.findOne({ _id: req.params.id });
    res.render("editBabies", { baby: updateBaby });
  } catch (error) {
    console.log("Error finding baby", error);
    res.status(400).sendStatus("unable to find baby from the db");
  }
});

router.post("/babiesUpdate", async (req, res) => {
  try {
    await Registration.findOneAndUpdate({ _id: req.query.id }, req.body);
    res.redirect("/babiesList");
  } catch (error) {
    res.status(400).sendStatus("unable to update baby in the db");
  }
});
module.exports = router;
