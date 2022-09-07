const { Router } = require("express");

const router = Router();

const categoryRouter = require("./cateogry");
router.use("/categories", categoryRouter);

const itemRouter = require("./item");
router.use("/items", itemRouter);

const userRouter = require("./user");
router.use("/users", userRouter);

const authRouter = require("./auth");
router.use("/auth", authRouter);

module.exports = router;
