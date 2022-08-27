const { Router } = require("express");

const router = Router();

const categoryRouter = require("./cateogry");
router.use("/category", categoryRouter);

const itemRouter = require("./item");
router.use("/item", itemRouter);

const userRouter = require("./user");
router.use("/user", userRouter);

module.exports = router;
