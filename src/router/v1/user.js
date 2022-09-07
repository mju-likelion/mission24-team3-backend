const { Router } = require("express");
const { param } = require("express-validator");
const userController = require("../../controller/user");
const validation = require("../../middleware/validation");

const router = Router();

// 해당 유저가 해당 포스트에 좋아요를 눌렀는지
router.get(
  "/:userId:/likes/:itemId",
  param("userId").isMongoId(),
  param("itemId").isMongoId(),
  validation,
  userController.likesItem
);

module.exports = router;
