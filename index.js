// Dependencies
const express = require("express");
const mongoose = require("mongoose");
const path = require("path"); //for pug
const passport = require("passport");
const expressSession = require("express-session")({
  secret: "secret",
  resave: false,
  saveUninitialized: false,
});

require("dotenv").config();

// import register model with user details
const RegisterUser = require("./models/UserRegistration");

const port = 3500;

//Importing routes
const registrationRoutes = require("./routes/registrationRoutes");
/*
const ContactRoutes = require("./routes/contactRoutes");
*/
const userRegRoutes = require("./routes/userRegRoutes");
const authenticationRoutes = require("./routes/authenticationRoutes");
const exp = require("constants");

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

// Express session configurations
app.use(expressSession);
app.use(passport.initialize());
app.use(passport.session());

// passpert configs
passport.use(RegisterUser.createStrategy());
passport.serializeUser(RegisterUser.serializeUser());
passport.deserializeUser(RegisterUser.deserializeUser());
// Routes

// Use imported routes
app.use("/", registrationRoutes);
app.use("/", userRegRoutes);
/*
app.use("/", ContactRoutes);
*/
app.use("/", authenticationRoutes);
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
app.listen(port, () => console.log(`listening on port ${port}`));
