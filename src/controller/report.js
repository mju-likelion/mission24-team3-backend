/* eslint-disable no-unused-vars */
const { Request, Response } = require("express");
const httpStatus = require("http-status");
const asyncWrapper = require("../utils/asyncWrapper");

const userService = require("../service/user");
const reportService = require("../service/report");

/**
 *
 * @param {Request} req
 * @param {Response} res
 */
const getReport = async (req, res) => {
  const { itemId } = req.params;
  const { userId } = res.locals.user;

  const report = await reportService.getReport({ itemId, userId });
  res.json(report);
};

/**
 *
 * @param {Request} req
 * @param {Response} res
 */
const addReport = async (req, res) => {
  const { itemId } = req.params;
  const { id: userId } = res.locals.user;

  await reportService.addReport({ itemId, userId });
  res.status(httpStatus.NO_CONTENT).send();
};

/**
 *
 * @param {Request} req
 * @param {Response} res
 */
const removeReport = async (req, res) => {
  const { itemId } = req.params;
  const { userId } = res.locals.user;

  await reportService.removeReport({ itemId, userId });
  res.status(httpStatus.NO_CONTENT).send();
};

module.exports = {
  getReport: asyncWrapper(getReport),
  addReport: asyncWrapper(addReport),
  removeReport: asyncWrapper(removeReport),
};
