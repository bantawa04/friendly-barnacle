import jwt from "jsonwebtoken";
import TransactionModel from "../models/Transactions";
import UserModel from "../models/Users";

import User from "../models/Users";

const { SECRET_KEY } = process.env;

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select(["-password"]); // don't send password in response
    res.status(200).json({ isSuccess: true, data: users });
  } catch (err) {
    res.status(400).json({ isSuccess: false, data: err.message });
  }
};

const getUserToken = async (user) => {
  const token = jwt.sign({ user }, SECRET_KEY, { expiresIn: 120000 });
  return "jwt " + token;
};

const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email: email.trim() }).exec();
    if (!user) return { status: false };
    return { status: true, user };
  } catch (error) {
    return { status: false };
  }
};

const deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    await User.findByIdAndDelete(userId);
    await TransactionModel.deleteMany({ userId: userId });
    return res.status(200).json({
      isSuccess: true,
      message: "Sucessfully deleted user.",
    });
  } catch (e) {
    return {
      isSuccess: false,
      message: e.message,
    };
  }
};

const updateUser = async (req, res) => {
  const { userId, mValue, kValue, sValue } = req.body;
  try {
    const updatedTransaction = await UserModel.findByIdAndUpdate(
      userId,
      {
        tableHeaders: {
          mValue,
          kValue,
          sValue,
        },
      },
      { new: true }
    );
    return res.status(200).json({
      isSuccess: true,
      message: "Sucessfully updated table headers.",
      data: updatedTransaction,
    });
  } catch (err) {
    return {
      isSuccess: false,
      message: err.message,
    };
  }
};

export { getAllUsers, getUserToken, getUserByEmail, deleteUser, updateUser };
