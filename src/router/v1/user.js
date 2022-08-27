const { Router } = require("express");
const { body } = require("express-validator");
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

module.exports = router;
