const mongoose = require("mongoose");

const allusersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: false,
  },
  mobile: {
    type: Number,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: false,
  },
});

const allusers = new mongoose.model("allusers", allusersSchema);

module.exports = allusers;
