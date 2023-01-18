const { Schema, model, Types } = require("mongoose");

const reportSchema = new Schema(
  {
    itemId: {
      type: Types.ObjectId,
      required: true,
    },

    userId: {
      type: Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Report = model("reports", reportSchema);

module.exports = Report;
