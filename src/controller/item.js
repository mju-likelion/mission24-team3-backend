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
  const { categoryId } = req.body;

  const items = await itemService.getItems({ categoryId }, { createdAt: -1 });
  res.status(httpStatus.OK).json({ items });
};

/**
 *
 * @param {Request} req
 * @param {Response} res
 */
const getItemsLike = async (req, res) => {
  const { categoryId } = req.body;

  const items = await itemService.getItems({ categoryId }, { likeCount: -1 });
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
  const { contentId } = req.params;
  const { id: userId } = res.locals.user;

  await itemService.likeItem({ contentId, userId });
  res.status(httpStatus.NO_CONTENT).send();
};

/**
 *
 * @param {Request} req
 * @param {Response} res
 */
const dislikeItem = async (req, res) => {
  const { contentId } = req.params;
  const { id: userId } = res.locals.user;

  await itemService.dislikeItem({ contentId, userId });
  res.status(httpStatus.NO_CONTENT).send();
};

module.exports = {
  getItemsRecent: asyncWrapper(getItemsRecent),
  getItemsLike: asyncWrapper(getItemsLike),
  getItem: asyncWrapper(getItem),

  addItem: asyncWrapper(addItem),

  likeItem: asyncWrapper(likeItem),
  dislikeItem: asyncWrapper(dislikeItem),
};
