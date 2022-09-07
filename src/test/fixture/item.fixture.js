const words = require("random-words");

const getItemFixture = () => {
  const [name] = words(1);

  return { name };
};

module.exports = { getItemFixture };
