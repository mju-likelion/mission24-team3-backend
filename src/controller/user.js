/* eslint-disable no-unused-vars */
const { Request, Response } = require("express");
const httpStatus = require("http-status");
const asyncWrapper = require("../utils/asyncWrapper");

const itemService = require("../service/item");

/**
 *
 * @param {Request} req
 * @param {Response} res
 */
const likesItem = async (req, res) => {
  const { itemId, userId } = req.params;

  const exists = await itemService.checkLikeExists({
    contentId: itemId,
    userId,
  });
  res.status(httpStatus.OK).send({ exists });
};

module.exports = {
  likesItem: asyncWrapper(likesItem),
};
