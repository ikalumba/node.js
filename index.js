// Dependencies
const express = require("express");
const mongoose = require("mongoose");
const path = require("path"); //for pug

require("dotenv").config();

//Importing routes
const registrationRoutes = require("./routes/registrationRoutes");

// Instantiations;
const app = express();

// Configarations
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection
  .once("open", () => {
    console.log("Mongoose connection open");
  })

  .on("error", (err) => {
    console.error(`Connection error: ${err.message}`);
  });

app.set("view engine", "pug"); //setting the view engine to pug
app.set("views", path.join(__dirname, "views")); //specify the directory where the views are found

// Middleware
app.use(express.static(path.join(__dirname, "public"))); //set directory for static files
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes

// Use imported routes
app.use("/", registrationRoutes);
/*
app.get("/childlist", (req, res) => {
  res.render("myDash");
});

app.get("/registerBaby", (req, res) => {
  res.render("reg_baby");
});

app.get("/login", (req, res) => {
  res.render("adminLogin");
});
*/
// Syntax of route
// app.METHOD(PATH, HANDLER);

app.get("/index", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

/*
// query params
app.get("/students", (req, res) => {
  res.send("This is class " + req.query.class + "cohort " + req.query.cohort);
});

app.get("/babies", (req, res) => {
  res.send("This is baby " + req.query.name + "age " + req.query.age);
});
*/
// For invalid routes
app.get("*", (req, res) => {
  res.send("404 Invalid URL");
});

// Bootstrapping the server
app.listen(3500, () => console.log("listening on port 3500"));
