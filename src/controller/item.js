/* eslint-disable no-unused-vars */
const { Request, Response } = require("express");
const httpStatus = require("http-status");
const itemService = require("../service/item");
const asyncWrapper = require("../utils/asyncWrapper");

/**
 *
 * @param {Request} req
 * @param {Response} res
 */
const getItemsRecent = async (req, res) => {
  const { categoryId } = req.query;

  const items = await itemService.getItemsRecent({ categoryId });
  res.status(httpStatus.OK).json({ items });
};

/**
 *
 * @param {Request} req
 * @param {Response} res
 */
const getItemsLike = async (req, res) => {
  const { categoryId } = req.query;

  const items = await itemService.getItemsLike({ categoryId });
  res.status(httpStatus.OK).json({ items });
};

/**
 *
 * @param {Request} req
 * @param {Response} res
 */
const getItems = async (req, res) => {
  const { categoryId, sort: sortJson } = req.query;
  const sort = JSON.parse(sortJson);

  const items = await itemService.getItems({ categoryId, sort });
  res.status(httpStatus.OK).json({ items });
};

/**
 *
 * @param {Request} req
 * @param {Response} res
 */
const getItem = async (req, res) => {
  const { itemId } = req.params;

  const item = await itemService.getItem({ itemId });
  res.status(httpStatus.OK).json({ item });
};

/**
 *
 * @param {Request} req
 * @param {Response} res
 */
const addItem = async (req, res) => {
  const { categoryId, name } = req.body;

  await itemService.addItem({ categoryId, name });
  res.status(httpStatus.CREATED).send();
};

/**
 *
 * @param {Request} req
 * @param {Response} res
 */
const likeItem = async (req, res) => {
  const { itemId } = req.params;
  const { id: userId } = res.locals.user;

  await itemService.likeItem({ contentId: itemId, userId });
  res.status(httpStatus.NO_CONTENT).send();
};

/**
 *
 * @param {Request} req
 * @param {Response} res
 */
const dislikeItem = async (req, res) => {
  const { itemId } = req.params;
  const { id: userId } = res.locals.user;

  await itemService.dislikeItem({ contentId: itemId, userId });
  res.status(httpStatus.NO_CONTENT).send();
};
/**
 *
 * @param {Request} req
 * @param {Response} res
 */
const likeCount = async (req, res) => {
  const { itemId } = req.params;

  const likes = await itemService.getLikeCount({ contentId: itemId });
  res.status(httpStatus.OK).send({ likeCount: likes });
};

/**
 *
 * @param {Request} req
 * @param {Response} res
 */
const checkLikeExists = async (req, res) => {
  const { itemId } = req.params;
  const { id: userId } = res.locals.user;

  const exists = await itemService.checkLikeExists({
    contentId: itemId,
    userId,
  });
  res.status(httpStatus.OK).send({ exists });
};

module.exports = {
  getItemsRecent: asyncWrapper(getItemsRecent),
  getItemsLike: asyncWrapper(getItemsLike),
  getItems: asyncWrapper(getItems),

  getItem: asyncWrapper(getItem),

  addItem: asyncWrapper(addItem),

  likeItem: asyncWrapper(likeItem),
  dislikeItem: asyncWrapper(dislikeItem),
<<<<<<< HEAD
  likeCount: asyncWrapper(likeCount),
=======
  checkLikeExists: asyncWrapper(checkLikeExists),
>>>>>>> 5c1c2fea73014dc3890c5edbb6d4e9b660f77da4
};
