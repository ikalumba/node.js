// introducing mongoose to the model
const mongoose = require("mongoose");

// Access the schema function in mongoose
const Schema = mongoose.Schema;

// Introducing passport-local-mongoose---- only used for password issues .. In this case registering login user details,
const passportLocalMongoose = require("passport-local-mongoose");

// Using the function to create the schema.

const userRegisterSchema = new Schema({
  email: {
    type: String,
  },

  role: { type: String },
});

userRegisterSchema.plugin(passportLocalMongoose, {
  usernameField: "email",
});
module.exports = mongoose.model("Signup", userRegisterSchema);
