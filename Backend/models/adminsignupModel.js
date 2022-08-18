const mongoose = require("mongoose");

const adminsignUpTemplate = new mongoose.Schema({
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

module.exports = mongoose.model("admins", adminsignUpTemplate);
