const startMemoryDB = require("../util/memorydb");

const authService = require("../../service/user");
const categoryService = require("../../service/category");
const itemService = require("../../service/item");

const { getUserFixture } = require("../fixture/user.fixture");
const { getItemFixture } = require("../fixture/item.fixture");
const { getCategoryFixture } = require("../fixture/category.fixture");

const supertest = require("supertest");
const app = require("../../app");

const request = supertest(app);

startMemoryDB();
describe("Item", () => {
  let user, category, accessToken;

  beforeEach(async () => {
    const userFixture = getUserFixture();
    user = await authService.createUser(userFixture);

    const categoryFixture = getCategoryFixture();
    category = await categoryService.createCategory(categoryFixture);

    accessToken = (await authService.loginUser(userFixture)).accessToken;
  });

  describe("아이템 생성", () => {
    test("아이템 생성 성공시 201", async () => {
      const itemFixture = getItemFixture();

      const response = await request
        .post("/items")
        .set("Authorization", `Bearer ${accessToken}`)
        .send({ categoryId: category.id, ...itemFixture });

      expect(response.statusCode).toBe(201);
    });
  });

  describe("아이템 가져오기", () => {
    beforeEach(async () => {
      for (let i = 0; i < 50; i++) {
        const itemFixture = getItemFixture();
        const item = { categoryId: category.id, ...itemFixture };

        await itemService.addItem(item);
      }
    });

    test("아이템 가져오기 성공시 200", async () => {
      const response = await request.get("/items").query({
        categoryId: category.id,
        limit: 100,
        skip: 0,
      });

      expect(response.statusCode).toBe(200);
      expect(response.body.items).toHaveLength(50);
    });

    test("좋아요 누른 항목에 대해 likes 가 true 인지", async () => {
      const items = await itemService.getItems({
        categoryId: category.id,
        sort: {},
        skip: 0,
        limit: 100,
      });

      const likedItem = items[0];
      await itemService.likeItem({ contentId: likedItem.id, userId: user.id });

      const response = await request.get("/items").query({
        categoryId: category.id,
        limit: 100,
        skip: 0,
      });

      expect(response.statusCode).toBe(200);
      expect(response.body.items).toHaveLength(50);

      const likedItemInResponse = response.body.items.find(
        (item) => item._id === likedItem.id.toString()
      );
      expect(likedItemInResponse.likeCount).toBe(1);
    });
  });

  describe("아이템 좋아요", () => {
    test("아이템 좋아요 성공시 204", async () => {
      const itemFixture = { categoryId: category.id, ...getItemFixture() };
      const item = await itemService.addItem(itemFixture);

      const response = await request
        .post(`/items/${item.id.toString()}/like`)
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.statusCode).toBe(204);

      const retrievedItem = await itemService.getItem({ itemId: item.id });
      expect(retrievedItem.likeCount).toBe(1);
    });

    test("아이템 좋아요 삭제 성공시 204", async () => {
      const itemFixture = { categoryId: category.id, ...getItemFixture() };
      const item = await itemService.addItem(itemFixture);

      await itemService.likeItem({ contentId: item.id, userId: user.id });

      const response = await request
        .delete(`/items/${item.id.toString()}/like`)
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.statusCode).toBe(204);

      const retrievedItem = await itemService.getItem({ itemId: item.id });
      expect(retrievedItem.likeCount).toBe(0);
    });

    test("유효하지 않은 엑세스 토큰으로 좋아요 요청시 401", async () => {
      const itemFixture = { categoryId: category.id, ...getItemFixture() };
      const item = await itemService.addItem(itemFixture);

      const response = await request
        .post(`/items/${item.id.toString()}/like`)
        .set("Authorization", `Bearer invalid-access-token`);

      expect(response.statusCode).toBe(401);
    });

    test("유효하지 않은 좋아요 요청시 400", async () => {
      const itemFixture = { categoryId: category.id, ...getItemFixture() };
      const item = await itemService.addItem(itemFixture);

      await itemService.likeItem({ contentId: item.id, userId: user.id });

      const response = await request
        .post(`/items/${item.id.toString()}/like`)
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.statusCode).toBe(400);
    });

    test("유효하지 않은 좋아요 삭제 요청시 400", async () => {
      const itemFixture = { categoryId: category.id, ...getItemFixture() };
      const item = await itemService.addItem(itemFixture);

      const response = await request
        .delete(`/items/${item.id.toString()}/like`)
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.statusCode).toBe(400);
    });
  });
});
