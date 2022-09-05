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
    const auth = req.headers.authorization;
    try {
      let token;

      if (auth.startsWith("Bearer ")) {
        token = auth.split("Bearer ")[1];
      } else {
        token = auth;
      }

      const payload = jwt.verify(token, JWT_SECRET_KEY);
      const { userid } = payload;
      const user = await User.findById(userid);

      if (!user) {
        throw new Error();
      }

      res.locals.user = user;
      next();
    } catch (err) {
      next();
    }
  } else {
    next();
  }
};

const authNotThrow = asyncWrapper(authSource);

module.exports = authNotThrow;
