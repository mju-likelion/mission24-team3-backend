const words = require("random-words");

const getCategoryFixture = () => {
  const [categoryName] = words(1);

  return { categoryName };
};

module.exports = { getCategoryFixture };
