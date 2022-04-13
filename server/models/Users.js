const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const NORMAL_USER = 1;
const ADMIN_USER = 2;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 16,
    },
    phone: {
      type: Number,
      required: true,
    },
    role: {
      type: Number,
      default: NORMAL_USER,
      min: 1,
      max: 2,
    },
    transactions: {
      type: Schema.Types.ObjectId,
      ref: "transactions",
    },
    tableHeaders: {
      mValue: {
        type: String,
        default: "M",
      },
      kValue: {
        type: String,
        default: "K",
      },
      sValue: {
        type: String,
        default: "S",
      },
    },
  },
  { timestamps: {} }
);

module.exports = mongoose.model("users", UserSchema);

