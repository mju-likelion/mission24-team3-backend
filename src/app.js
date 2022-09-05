/* eslint-disable no-unused-vars */
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const categoryService = require("./service/category");
const itemService = require("./service/item");

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
