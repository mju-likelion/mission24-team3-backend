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
  "/items/sort",
  query("categoryId").isMongoId(),
  query("sort").isJSON(),
  validation,
  itemController.getItems
);
router.get(
  "/items/recent",
  query("categoryId").isMongoId(),
  validation,
  itemController.getItemsRecent
);
router.get(
  "/items/like",
  query("categoryId").isMongoId(),
  validation,
  itemController.getItemsLike
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

router.post(
  "/",
  auth,
  body("categoryId").isMongoId(),
  body("name").notEmpty(),
  validation,
  itemController.addItem
);

module.exports = router;
