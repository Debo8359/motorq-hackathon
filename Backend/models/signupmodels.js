const mongoose = require("mongoose");

const signUpTemplate = new mongoose.Schema({
  regno: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("participants", signUpTemplate);
