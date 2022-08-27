const { Router } = require("express");
const categoryController = require("../../controller/category");
const { body, param } = require("express-validator");
const validation = require("../../middleware/validation");
const auth = require("../../middleware/auth");

const router = Router();

router.get("/", categoryController.getCategories);

router.post(
  "/",
  auth,
  body("categoryName").notEmpty(),
  validation,
  categoryController.createCategory
);

router.post(
  "/:upperCategory",
  auth,
  param("upperCategory").isMongoId(),
  body("categoryName").notEmpty(),
  validation,
  categoryController.createDownCategory
);

module.exports = router;
