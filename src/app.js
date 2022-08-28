/* eslint-disable no-unused-vars */
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const categoryService = require("./service/category");
const itemService = require("./service/item");

const items = [
  "수건",
  "휴지",
  "물티슈",
  "개인 상비약",
  "세면 도구(칫솔, 치약, 폼클렌징 등)",
];

mongoose
  .connect(
    "mongodb+srv://livingodlife:FnjzDCcLuSholnnX@cluster0.rvzulm5.mongodb.net/mission24?retryWrites=true&w=majority"
  )
  .then(async () => {
    console.log("데이터베이스와 연결되었읍니다");
    const categories = await categoryService.getCategories();
    const foregin = categories.filter(
      (category) => category.categoryName === "기숙사"
    );

    foregin[0].downCategories.map(async (subcategory) => {
      console.log(subcategory.id);

      for (const item of items) {
        await itemService.addItem({ categoryId: subcategory.id, name: item });
      }
    });

    console.log(foregin);
  });

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
