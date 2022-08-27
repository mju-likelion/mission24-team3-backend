const { Router } = require("express");
const { body } = require("express-validator");
const userController = require("../../controller/user");
const validation = require("../../middleware/validation");

const router = Router();

// 회원가입
router.post(
  "/",
  body("email"),
  body("name"),
  body("password"),
  validation,
  userController.createUser
);

// 로그인
router.put(
  "/",
  body("email"),
  body("password"),
  validation,
  userController.loginUser
);

module.exports = router;
