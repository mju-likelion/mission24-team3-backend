const Category = require("../model/category");
const DownCategory = require("../model/downCategory");

const getCategories = async () => {
  const categories = await Category.find();
  const reduced = [];

  for (const category of categories) {
    const downCategories = await DownCategory.find({
      upperCategory: category.id,
    });

    const reducedCategory = { ...category.toObject(), downCategories };
    reduced.push(reducedCategory);
  }

  return reduced;
};

const createCategory = async ({ categoryName }) => {
  const category = new Category({ categoryName });
  await category.save();
};

const createDownCategory = async ({ upperCategory, categoryName }) => {
  const category = new DownCategory({ upperCategory, categoryName });
  await category.save();
};

module.exports = {
  getCategories,

  createCategory,
  createDownCategory,
};
