const { Schema, model, Types } = require("mongoose");

const itemSchema = new Schema(
  {
    category: {
      type: Types.ObjectId,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    likeCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Item = model("item", itemSchema);

module.exports = Item;
