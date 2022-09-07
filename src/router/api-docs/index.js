const { Router } = require("express");
var swaggerJsdoc = require("swagger-jsdoc");
var swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "pack.recipes API",
      version: "1.0.0",
      description: "pack.recipes API documentation",
    },

    host: "https://mission24.suplitter.com",
    basePath: "/",
  },
  apis: ["src/docs/*.yml"],
};

const specs = swaggerJsdoc(options);

const router = Router();

router.use("/", swaggerUi.serve, swaggerUi.setup(specs));

module.exports = router;
