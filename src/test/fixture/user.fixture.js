const words = require("random-words");

const getUserFixture = () => {
  const [email, password, name] = words(3);

  return { email, password, name };
};

module.exports = { getUserFixture };
