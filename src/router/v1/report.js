const { Router } = require("express");
const { param } = require("express-validator");
const reportController = require("../../controller/report")
const validation = require("../../middleware/validation");
const auth = require("../../middleware/auth");

const router = Router();

router.get(
  "/:itemId",
  param("itemId").isMongoId(),
  validation,
  auth,
  reportController.getReport
);
router.post(
  "/:itemId",
  param("itemId").isMongoId(),
  validation,
  auth,
  reportController.addReport
);

router.delete(
    "/:itemId",
    param("itemId").isMongoId(),
    validation,
    auth,
    reportController.removeReport
  );
  

module.exports = router;
