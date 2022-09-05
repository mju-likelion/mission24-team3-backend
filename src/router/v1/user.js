const { Router } = require("express");
const { body, param } = require("express-validator");
const userController = require("../../controller/user");
const validation = require("../../middleware/validation");

const router = Router();

// 회원가입
router.put(
  "/",
  body("email").notEmpty(),
  body("name").notEmpty(),
  body("password").notEmpty(),
  validation,
  userController.createUser
);

// 로그인
router.post(
  "/",
  body("email").notEmpty(),
  body("password").notEmpty(),
  validation,
  userController.loginUser
);

// 해당 유저가 해당 포스트에 좋아요를 눌렀는지
router.get(
  "/:userId:/likes/:itemId",
  param("userId").isMongoId(),
  param("itemId").isMongoId(),
  validation,
  userController.likesItem
);

module.exports = router;
