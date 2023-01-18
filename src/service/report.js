const Report = require("../model/report");
const APIError = require("../utils/apiError");
const errors = require("../utils/errors");

/**
 * 
 * @param {{userId: string, itemId: string}} param0 
 */
const getReport = async ({ userId, itemId }) => {
    const report = await Report.findOne({ userId, itemId })
    return report;
}

/**
 * 
 * @param {{userId: string, itemId: string}} param0 
 */
const addReport = async ({ userId, itemId }) => {
    const report = await getReport({ userId, itemId });

    if (report){
        throw new APIError(errors.ALREADY_REPORTED)
    }

    await Report.create({
        userId, itemId
    })
}

/**
 * 
 * @param {{userId: string, itemId: string}} param0 
 */
const removeReport = async ({userId, itemId}) => {
    const report = await getReport({userId, itemId});

    if (!report){
        throw new APIError(errors.NOT_REPORTED)
    }

    await Report.deleteOne({
        userId, itemId
    })
}

module.exports = {
    getReport,
    addReport,
    removeReport
}