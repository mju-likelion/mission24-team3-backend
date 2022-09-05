/* eslint-disable no-unused-vars */
const { Request, Response } = require("express");
const httpStatus = require("http-status");
const asyncWrapper = require("../utils/asyncWrapper");

const userService = require("../service/user");
const itemService = require("../service/item");

/**
 *
 * @param {Request} req
 * @param {Response} res
 */
const createUser = async (req, res) => {
  const { email, name, password } = req.body;

  const user = await userService.createUser({ email, password, name });
  res.status(httpStatus.CREATED).send();
};

/**
 *
 * @param {Request} req
 * @param {Response} res
 */
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const token = await userService.loginUser({ email, password });
  res.status(httpStatus.OK).json({ token });
};

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
  createUser: asyncWrapper(createUser),
  loginUser: asyncWrapper(loginUser),
  likesItem: asyncWrapper(likesItem),
};
