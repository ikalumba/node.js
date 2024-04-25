const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/login", (req, res) => {
  res.render("adminLogin");
});

router.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/login" }),
  (req, res) => {
    req.session.user = req.user;
    if (req.user.role === "Admin") {
      res.redirect("/registerBaby");
    } else if (req.user.role === "sitter") {
      res.redirect("/babiesList");
    } else {
      ("You're not a registered user");
    }
  }
);

// Creating logout route
router.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy((error) => {
      if (error) {
        console.log("............", error);
        return res.status(500).send("error logging out");
      }

      res.redirect("/login");
    });
  }
});

module.exports = router;
