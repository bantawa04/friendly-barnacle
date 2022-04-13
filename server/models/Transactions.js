const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TransactionSchema = new Schema(
  {
    mValue: {
      type: Number,
      required: true,
    },
    kValue: {
      type: Number,
      required: true,
    },
    sValue: {
      type: Number,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: {} }
);

module.exports= mongoose.model("transactions", TransactionSchema);
