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

/**
 *
 * @param {Request} req
 * @param {Response} res
 */
const createCategory = async (req, res) => {
  const { categoryName } = req.body;
  await cateogryService.createCategory({ categoryName });
  res.status(httpStatus.NO_CONTENT).send();
};

/**
 *
 * @param {Request} req
 * @param {Response} res
 */
const createDownCategory = async (req, res) => {
  const { upperCategory } = req.params;
  const { categoryName } = req.body;
  await cateogryService.createDownCategory({ upperCategory, categoryName });
  res.status(httpStatus.NO_CONTENT).send();
};

module.exports = {
  getCategories: asyncWrapper(getCategories),
  createCategory: asyncWrapper(createCategory),
  createDownCategory: asyncWrapper(createDownCategory),
};
