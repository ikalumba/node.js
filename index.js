// Dependencies
const express = require("express");
const mongoose = require("mongoose");
const path = require("path"); //for pug

require("dotenv").config();

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
app.get("/childlist", (req, res) => {
  res.render("myDash");
});

app.get("/", (req, res) => {
  res.send("Homepage! Hello world");
});
app.get("/about", (req, res) => {
  res.send("About us page. Nice");
});
// Syntax of route
// app.METHOD(PATH, HANDLER);
app.get("/programs", (req, res) => {
  res.send("These are our programs");
});

app.get("/books/:bookId", (req, res) => {
  res.send(req.params);
});

// app.get("/student/:studentId", (req, res) => {
//   res.send("studentId " + req.params.studentId);
//   console.log("xx" + req.params.studentId);
// });
app.get("/student/:studentId", (req, res) => {
  res.status(200).send("studentId " + req.params.studentId);
});

app.get("/teacher/:id", (req, res) => {
  res.send("My teacher's Id number is " + req.params.id);
});

app.get("/index", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/registerBaby", (req, res) => {
  res.sendFile(__dirname + "/reg_baby.html");
});

app.post("/registerBaby", (req, res) => {
  console.log(req.body);
  let baby = req.body;
  // res.redirect("/index");
  res.json({ message: "baby registered", baby });
});

// query params
app.get("/students", (req, res) => {
  res.send("This is class " + req.query.class + "cohort " + req.query.cohort);
});

app.get("/babies", (req, res) => {
  res.send("This is baby " + req.query.name + "age " + req.query.age);
});

// For invalid routes
app.get("*", (req, res) => {
  res.send("404 Invalid URL");
});

// Bootstrapping the server
app.listen(3500, () => console.log("listening on port 3500"));
