const { Router } = require("express");
const { param, body, query } = require("express-validator");
const itemController = require("../../controller/item");
const validation = require("../../middleware/validation");
const auth = require("../../middleware/auth");

const router = Router();

router.get(
  "/:itemId",
  param("itemId").isMongoId(),
  validation,
  itemController.getItem
);

router.get(
  "/",
  query("categoryId").isMongoId(),
  query("orderBy").exists(),
  query("skip").isNumeric().exists(),
  query("limit").isNumeric().exists(),
  validation,
  itemController.getItems
);

router.get(
  "/:itemId/like",
  param("itemId").isMongoId(),
  validation,
  itemController.likeCount
);

router.post(
  "/:itemId/like",
  auth,
  param("itemId").isMongoId(),
  validation,
  itemController.likeItem
);

router.delete(
  "/:itemId/like",
  auth,
  param("itemId").isMongoId(),
  validation,
  itemController.dislikeItem
);

router.get(
  "/:itemId/like-exists",
  auth,
  param("itemId").isMongoId(),
  validation,
  itemController.checkLikeExists
);

router.post(
  "/",
  auth,
  body("categoryId").isMongoId(),
  body("name").notEmpty(),
  validation,
  itemController.addItem
);

module.exports = router;
