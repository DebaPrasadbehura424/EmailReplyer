const e = require("express");
const express = require("express");
const mongoose = require("mongoose");
const userModel = new mongoose.Schema({
  emailContext: {
    type: String,
    required: true,
  },
  tone: {
    type: String,
    default: "none",
  },
  language: {
    type: String,
    default: "English",
  },
});

const userModelContext = new mongoose.model(userModel);
module.exports = userModelContext;
