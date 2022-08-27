const { Router } = require("express");
const categoryController = require("../../controller/category");

const router = Router();

router.get("/", categoryController.getCategories);

module.exports = router;
