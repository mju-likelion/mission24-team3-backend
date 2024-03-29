const httpStatus = require("http-status");

const errors = {
  EMAIL_EXISTS: {
    statusCode: 400,
    errorCode: "EMAIL_EXITS",
    errorMsg: "이미 가입된 이메일입니다",
  },

  NAME_EXISTS: {
    statusCode: 400,
    errorCode: "NAME_EXISTS",
    errorMsg: "이미 사용중인 이름입니다",
  },

  EMAIL_NOT_EXISTS: {
    statusCode: 404,
    errorCode: "EMAIL_NOT_EXISTS",
    errorMsg: "가입되지 않은 이메일입니다",
  },

  AUTHORIZATION_NOT_SUGGESTED: {
    statusCode: httpStatus.UNAUTHORIZED,
    errorCode: "AUTHORIZATION_NOT_SUGGESTED",
    errorMsg: "헤더에 authorization 이 기입되지 않았습니다",
  },

  AUTHORIZATION_INVALID: {
    statusCode: httpStatus.UNAUTHORIZED,
    errorCode: "AUTHORIZATION_INVALID",
    errorMsg: "잘못된 access-token 값이 기입되고 있습니다",
  },

  LIKE_ALREADY_EXISTS: {
    statusCode: 400,
    errorCode: "LIKE_ALREADY_EXISTS",
    errorMsg: "이미 좋아요를 눌렀습니다",
  },

  LIKE_ALREADY_NOT_EXISTS: {
    statusCode: 400,
    errorCode: "LIKE_ALREADY_NOT_EXISTS",
    errorMsg: "아직 좋아요를 누르지 않았습니다",
  },

  ALREADY_REPORTED: {
    statusCode: 400,
    errorCode: "ALREADY_REPORTED",
    errorMsg: "이미 신고가 되어있습니다."
  },

  NOT_REPORTED: {
    statusCode: 400,
    errorCode: "NOT_REPORTED",
    errorMsg: "신고가 되지 않았는데 삭제하려 했습니다"
  }
};

module.exports = errors;
