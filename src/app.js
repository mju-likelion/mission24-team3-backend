/* eslint-disable no-unused-vars */
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

mongoose.connect(
  "mongodb+srv://livingodlife:FnjzDCcLuSholnnX@cluster0.rvzulm5.mongodb.net/mission24?retryWrites=true&w=majority"
);
const app = express();

const router = require("./router");
const { json } = require("express");
app.use(json());
app.use(cors({ origin: "*" }));
app.use("/", router);
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).send(err);
  console.log(err);
});

module.exports = app;
