/* eslint-disable no-unused-vars */
const { Request, Response, NextFunction } = require("express");
const { validationResult } = require("express-validator");

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const validation = (req, res, next) => {
  validationResult(req).throw();
  next();
};

module.exports = validation;
