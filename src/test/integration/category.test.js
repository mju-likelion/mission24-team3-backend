const startMemoryDB = require("../util/memorydb");

const categoryService = require("../../service/category");

const { getCategoryFixture } = require("../fixture/category.fixture");

const supertest = require("supertest");
const app = require("../../app");

const request = supertest(app);

startMemoryDB();

describe("Category", () => {
  describe("카테고리 가져오기", () => {
    let createdCategory;
    let createdDownCategory;

    beforeEach(async () => {
      createdCategory = getCategoryFixture();
      createdDownCategory = getCategoryFixture();

      const category = await categoryService.createCategory(createdCategory);
      await categoryService.createDownCategory({
        upperCategory: category.id,
        ...createdDownCategory,
      });
    });

    test("카테고리 가져오기 성공시 200", async () => {
      const response = await request.get("/categories");

      expect(response.statusCode).toBe(200);
      expect(response.body.categories).toHaveLength(1);
    });
  });
});
