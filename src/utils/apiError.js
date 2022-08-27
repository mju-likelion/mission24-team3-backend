const APIError = class extends Error {
  /**
   *
   * @param {{statusCode: number, errorCode: string, errorMsg: string}} error
   */
  constructor(error) {
    super();

    this.statusCode = error.statusCode;
    this.errorCode = error.errorCode;
    this.errorMsg = error.errorMsg;
  }
};

module.exports = APIError;
