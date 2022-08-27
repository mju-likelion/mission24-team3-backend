/* eslint-disable no-unused-vars */
const { Request, Response, NextFunction } = require("express");
const APIError = require("../utils/apiError");
const errors = require("../utils/errors");
const asyncWrapper = require("../utils/asyncWrapper");
const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../env");
const User = require("../model/user");

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const authSource = async (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization;
    try {
      const payload = jwt.verify(token, JWT_SECRET_KEY);
      const { userid } = payload;
      const user = await User.findById(userid);
      console.log(userid);
      if (!user) {
        throw new Error();
      }

      res.locals.user = user;
      next();
    } catch (err) {
      console.log(err);
      throw new APIError(errors.AUTHORIZATION_INVALID);
    }
  } else {
    throw new APIError(errors.AUTHORIZATION_NOT_SUGGESTED);
  }
};

const auth = asyncWrapper(authSource);

module.exports = auth;
