const { Schema, model, Types } = require("mongoose");

const downCategorySchema = new Schema({
  upperCategory: {
    type: Types.ObjectId,
    required: true,
  },

  categoryName: {
    type: String,
    reqiured: true,
  },
});

const DownCategory = model("downCategory", downCategorySchema);

module.exports = DownCategory;
