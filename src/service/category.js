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

module.exports = {
  getCategories,
};
