const mongoose = require("mongoose");

const RegevTemplate = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
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
  stime: {
    type: String,
    required: true,
  },
  etime: {
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
  status: {
    type: String,
    default: "pending",
  },
  email: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("regevs", RegevTemplate);
