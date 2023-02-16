const crypto = require("crypto");
const User = require("../model/user");
const APIError = require("../utils/apiError");
const errors = require("../utils/errors");
const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../env");

const hash = (val) => crypto.createHash("sha256").update(val).digest("hex");

const createAccessToken = async ({ userid }) => {
  const accessToken = jwt.sign(
    { userid: userid, type: "access" },
    JWT_SECRET_KEY,
    { expiresIn: "1h" }
  );

  const refreshToken = jwt.sign(
    { userid: userid, type: "access" },
    JWT_SECRET_KEY,
    { expiresIn: "1m" }
  );

  return { accessToken, refreshToken };
};

/**
 *
 * @param {{email: string, password: string, name: string}} param0
 */
const createUser = async ({ email, password, name }) => {
  const hashedPassword = hash(password);

  const emailUserExists = await User.exists({ email });
  if (emailUserExists) {
    throw new APIError(errors.EMAIL_EXISTS);
  }

  const nameUserExists = await User.exists({ name });
  if (nameUserExists) {
    throw new APIError(errors.NAME_EXISTS);
  }

  const user = new User({
    email,
    name,
    password: hashedPassword,
  });

  await user.save();
  return user;
};

/**
 *
 * @param {{email: string, password: string}}} param0
 */
const loginUser = async ({ email, password }) => {
  const hashedPassword = hash(password);

  const user = await User.findOne({ email, password: hashedPassword });
  if (!user) {
    throw new APIError(errors.EMAIL_NOT_EXISTS);
  }

  const tokens = createAccessToken({ userid: user.id });

  return tokens;
};

/**
 *
 * @param {{refreshToken: string}} param0
 */
const refreshToken = async ({ refreshToken }) => {
  const { userid } = jwt.verify(refreshToken, JWT_SECRET_KEY);
  const tokens = createAccessToken({ userid });

  return tokens;
};
module.exports = {
  createUser,
  loginUser,
  refreshToken,
};
