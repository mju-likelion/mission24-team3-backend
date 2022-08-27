const { Router } = require("express");
const { param, body } = require("express-validator");
const itemController = require("../../controller/item");
const validation = require("../../middleware/validation");
const auth = require("../../middleware/auth");

const router = Router();

router.get("/:itemId", param("itemId"), validation, itemController.getItem);

router.get("/items/recent", itemController.getItemsRecent);
router.get("/items/like", itemController.getItemsLike);

router.post(
  "/:itemId/like",
  auth,
  param("itemId"),
  validation,
  itemController.likeItem
);
router.delete(
  "/:itemId/like",
  auth,
  param("itemId"),
  validation,
  itemController.dislikeItem
);

router.post(
  "/",
  auth,
  body("categoryId"),
  body("name"),
  validation,
  itemController.addItem
);

module.exports = router;
