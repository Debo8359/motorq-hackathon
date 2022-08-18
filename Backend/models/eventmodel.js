const mongoose = require("mongoose");

const eventTemplate = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  stime: {
    type: String,
    required: true,
  },
  etime: {
    type: String,
    required: true,
  },
  sdate: {
    type: String,
    required: true,
  },
  edate: {
    type: String,
    required: true,
  },
  vacancy: {
    type: Number,
    required: true,
  },
  location: {
    type: Object,
    required: true,
  },
});

module.exports = mongoose.model("events", eventTemplate);
