/* eslint-disable no-unused-vars */
const express = require("express");
const cors = require("cors");

const app = express();

const router = require("./router");
const { json } = require("express");
app.use(json());
app.use(cors({ origin: "*" }));
app.use("/", router);
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).send(err);
});

module.exports = app;
