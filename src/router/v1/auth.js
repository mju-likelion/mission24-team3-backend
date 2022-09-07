const { Router } = require("express");
const { body } = require("express-validator");
const authController = require("../../controller/auth");
const validation = require("../../middleware/validation");

const router = Router();

// 회원가입
router.post(
  "/register",
  body("email").notEmpty(),
  body("name").notEmpty(),
  body("password").notEmpty(),
  validation,
  authController.createUser
);

// 로그인
router.post(
  "/login",
  body("email").notEmpty(),
  body("password").notEmpty(),
  validation,
  authController.loginUser
);

module.exports = router;
