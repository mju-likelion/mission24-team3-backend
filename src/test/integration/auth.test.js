const startMemoryDB = require("../util/memorydb");

const authService = require("../../service/user");

const { getUserFixture } = require("../fixture/user.fixture");

const supertest = require("supertest");
const app = require("../../app");

const request = supertest(app);

startMemoryDB();

describe("Auth", () => {
  describe("회원가입", () => {
    let createdUser;

    beforeEach(async () => {
      createdUser = getUserFixture();
      await authService.createUser(createdUser);
    });

    test("회원가입 성공시 201", async () => {
      const userFixture = getUserFixture();

      const response = await request.post("/auth/register").send(userFixture);

      expect(response.statusCode).toBe(201);
    });

    test("이미 사용중인 이메일로 가입요청시 400", async () => {
      const response = await request
        .post("/auth/register")
        .send({ ...createdUser, name: "random-name" });

      expect(response.statusCode).toBe(400);
    });

    test("이미 사용중인 이름으로 가입요청시 400", async () => {
      const response = await request
        .post("/auth/register")
        .send({ ...createdUser, email: "random-email" });

      expect(response.statusCode).toBe(400);
    });
  });

  describe("로그인", () => {
    test("로그인 성공시 200", async () => {
      const userFixture = getUserFixture();
      await authService.createUser(userFixture);

      const response = await request.post("/auth/login").send(userFixture);

      expect(response.statusCode).toBe(200);
      expect(response.body.accessToken).toBeDefined();
      expect(response.body.refreshToken).toBeDefined();
    });

    test("액세스 토크 갱신 성공시 200", async () => {
      const userFixture = getUserFixture();
      await authService.createUser(userFixture);

      const { refreshToken } = await authService.loginUser(userFixture);

      const response = await request
        .post("/auth/refresh")
        .send({ refreshToken });

      expect(response.statusCode).toBe(200);
      expect(response.body.accessToken).toBeDefined();
      expect(response.body.refreshToken).toBeDefined();
    });

    test("유효하지 않은 액세스 토큰 갱신 요청시 401", async () => {
      const response = await request
        .post("/auth/refresh")
        .send({ refreshToken: "invalid-token" });

      expect(response.statusCode).toBe(401);
    });

    test("존재하지 않는 이메일로 로그인 시도시 404", async () => {
      const response = await request
        .post("/auth/login")
        .send({ email: "not-exists-email", password: "just-password" });
      expect(response.statusCode).toBe(404);
    });
  });
});
