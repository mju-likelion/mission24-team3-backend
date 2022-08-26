const { Router } = require("express");

const router = Router();

const docs = require("./api-docs");

router.use("/api-docs", docs);

module.exports = router;
