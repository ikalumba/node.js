// Introducing mongoose to modal file
const mongoose = require("mongoose");

// Access the schema function in mongoose
const Schema = mongoose.Schema;

// Using the function to create the schema.

const contactSchema = new Schema({
  email: {
    type: String,
  },
  password: { type: String },

  addressOne: { type: String },
  apartment: { type: String },
  city: { type: String },
  state: { type: String },
});

module.exports = mongoose.model("Contact", contactSchema);
