const { Schema, Types, model } = require("mongoose");
const likeSchema = new Schema({
  contentId: {
    type: Types.ObjectId,
    required: true,
  },

  userId: {
    type: Types.ObjectId,
    required: true,
  },
});

const Like = model("likes", likeSchema);

module.exports = Like;
