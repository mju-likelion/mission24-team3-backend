const { Router } = require("express");

const router = Router();

const docs = require("./api-docs");
router.use("/api-docs", docs);

const v1 = require("./v1");
router.use(v1);

module.exports = router;
