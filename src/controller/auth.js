/* eslint-disable no-unused-vars */
const { Request, Response } = require("express");
const httpStatus = require("http-status");
const asyncWrapper = require("../utils/asyncWrapper");

const userService = require("../service/user");

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

  const tokens = await userService.loginUser({ email, password });
  res.status(httpStatus.OK).json({ ...tokens });
};

const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  try {
    const tokens = await userService.refreshToken({ refreshToken });
    res.status(httpStatus.OK).json({ ...tokens });
  } catch {
    res.status(httpStatus.UNAUTHORIZED).send();
  }
};

module.exports = {
  createUser: asyncWrapper(createUser),
  loginUser: asyncWrapper(loginUser),
  refreshToken: asyncWrapper(refreshToken),
};
