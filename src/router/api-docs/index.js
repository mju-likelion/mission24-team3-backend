const { Router } = require("express");
var swaggerJsdoc = require("swagger-jsdoc");
var swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "박원호가 장악한 섭어",
      version: "1.0.0",
      description:
        "큭큭 박원호가 장악한 섭어입니다 킥킥 저의 개발실력으로 전 세계에 있는 모든 iq 주소 해킹해서 북한 김정은한테 팔아버리기 전에 여러분들은 어서 메이플스토리에 접속해서 제 계정에 3십만 메소씩 전송해주십시오 그럿지 안다면 여러분들은 매일 밤 자기전에 모기에게 시달리게 될 것입니다 킥킥 ",
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
