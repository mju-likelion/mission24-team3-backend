/**
 *
 * @param {(req, res, next) => Promise<void>} handler
 * @returns
 */
const asyncWrapper = (handler) => {
  return (req, res, next) => {
    handler(req, res)
      .then(next())
      .catch((err) => next(err));
  };
};

module.exports = asyncWrapper;
