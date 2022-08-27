/* eslint-disable no-unused-vars */
const { Request, Response } = require("express");
const httpStatus = require("http-status");
const cateogryService = require("../service/category");
const asyncWrapper = require("../utils/asyncWrapper");

/**
 *
 * @param {Request} req
 * @param {Response} res
 */
const getCategories = async (req, res) => {
  const categories = await cateogryService.getCategories();

  res.status(httpStatus.OK).json({ categories });
};

module.exports = {
  getCategories: asyncWrapper(getCategories),
};
