const mongoose = require("mongoose");
const serverless = require("serverless-http");
const app = require("./app");

mongoose.connect(
  "mongodb+srv://livingodlife:FnjzDCcLuSholnnX@cluster0.rvzulm5.mongodb.net/mission24?retryWrites=true&w=majority"
);
module.exports.handler = serverless(app);
