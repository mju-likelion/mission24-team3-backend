const Item = require("../model/item");
const Like = require("../model/like");
const APIError = require("../utils/apiError");
const errors = require("../utils/errors");

/**
 *
 * @param {{itemId: string}} param0
 * @returns
 */
const getItem = async ({ itemId }) => {
  const item = await Item.findById(itemId);
  return item;
};

/**
 *
 * @param {{categoryId: string}} param0
 */
const getItems = async ({ categoryId, sort }) => {
  const items = await Item.find({ category: categoryId }, {}, { sort });

  return items;
};

/**
 *
 * @param {{categoryId: string, itemName: string}} param0
 */
const addItem = async ({ categoryId, name }) => {
  const item = new Item({ category: categoryId, name });

  await item.save();
  return item;
};

/**
 *
 * @param {{contentId: string, userId: string}} param0
 */
const checkLikeExists = async ({ contentId, userId }) => {
  const likeExists = await Like.exists({ contentId, userId });
  return likeExists;
};

/**
 *
 * @param {{contentId: string, userId: string}} param0
 */
const likeItem = async ({ contentId, userId }) => {
  const likeExists = await checkLikeExists({ contentId, userId });
  if (likeExists) {
    throw new APIError(errors.LIKE_ALREADY_EXISTS);
  }

  const likeItem = new Like({
    contentId,
    userId,
  });

  await Item.updateOne({ id: contentId }, { $inc: { likeCount: 1 } });
  await likeItem.save();
};

/**
 *
 * @param {{contentId: srting, userId: string}} param0
 */
const dislikeItem = async ({ contentId, userId }) => {
  const likeExists = await checkLikeExists({ contentId, userId });
  if (!likeExists) {
    throw new APIError(errors.LIKE_ALREADY_NOT_EXISTS);
  }

  await Item.updateOne({ id: contentId }, { $inc: { likeCount: -1 } });
  await Like.deleteOne({ contentId, userId });
};

module.exports = {
  getItem,

  getItems,
  addItem,

  likeItem,
  dislikeItem,
};
