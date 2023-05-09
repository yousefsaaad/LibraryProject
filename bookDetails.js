const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const cors = require("cors");
app.use(cors());
const bcrypt = require("bcryptjs");

const mongoUrl =
  "mongodb+srv://yousef:P102030_@cluster0.fwb8jlr.mongodb.net/?retryWrites=true&w=majority";

const jwt = require("jsonwebtoken");

const jwt_SECRET =
  "lfjshrkgjldkajwlerfuwerh28959234562934jlkjlsdkj09kjefoej()wfwrqfwe";

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("connected to database");
  })
  .catch((e) => console.log(e));

require("./userDetails");
const User = mongoose.model("UserInfo");


