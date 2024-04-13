const mongoose = require("mongoose");
const registrationSchema = new mongoose.Schema({
  first: {
    type: String,
    trim: true,
  },
  last: {
    type: String,
    trim: true,
  },
  age: {
    type: String,
    trim: true,
  },
  gender: {
    type: String,
    trim: true,
  },
  location: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model("Registration", registrationSchema);
