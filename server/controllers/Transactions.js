import TransactionModel from "../models/Transactions";
import Users from "../models/Users";

const getAllTransactions = async (req, res) => {
  try {
    const transactions = await TransactionModel.find();
    res.status(200).json({ isSuccess: true, data: transactions });
  } catch (err) {
    res.status(400).json({ isSuccess: false, data: err.message });
  }
};

const getAllCompletedTransactions = async (req, res) => {
  try {
    const transactions = await TransactionModel.find({
      completed: { $eq: true },
    });
    res.status(200).json({ isSuccess: true, data: transactions });
  } catch (err) {
    res.status(400).json({ isSuccess: false, data: err.message });
  }
};

const getCompletedTransactionsByUser = async (req, res) => {
  try {
    const transactions = await TransactionModel.find({
      userId: req.params.id,
      completed: { $eq: true },
    });
    res.status(200).json({ isSuccess: true, data: transactions });
  } catch (err) {
    res.status(400).json({ isSuccess: false, data: err.message });
  }
};

const getTransactionByUser = async (req, res) => {
  try {
    const user = await TransactionModel.find({
      userId: req.params.id,
      completed: { $ne: true },
    }).exec();
    res.status(200).json({ isSuccess: true, data: user });
  } catch (error) {
    res.status(400).json({ isSuccess: false, data: error.message });
  }
};

const createTransaction = async (req, res) => {
  const { userId, mValue, kValue, sValue } = req.body;
  try {
    const user = await Users.findOne({ _id: userId });
    if (!user)
      return res.status(401).json({
        isSuccess: false,
        message: "User not authorized!",
      });
    const newTransaction = new TransactionModel({
      mValue,
      kValue,
      sValue,
      userId,
    });
    await newTransaction.save();
    return res.status(200).json({
      isSuccess: true,
      message: "Sucessfully created transactions.",
      data: newTransaction,
    });
  } catch (err) {
    return {
      isSuccess: false,
      message: err.message,
    };
  }
};

const updateTransaction = async (req, res) => {
  const { userId, mValue, kValue, sValue } = req.body;
  const transactionId = req.params.id;
  try {
    const user = await Users.findOne({ _id: userId });
    if (!user)
      return res.status(401).json({
        isSuccess: false,
        message: "User not authorized!",
      });
    const updatedTransaction = await TransactionModel.findByIdAndUpdate(
      transactionId,
      {
        mValue,
        kValue,
        sValue,
        userId,
      },
      { new: true }
    );
    return res.status(200).json({
      isSuccess: true,
      message: "Sucessfully updated transactions.",
      data: updatedTransaction,
    });
  } catch (err) {
    return {
      isSuccess: false,
      message: err.message,
    };
  }
};

const deleteTransaction = async (req, res) => {
  const transactionId = req.params.id;
  try {
    await TransactionModel.findByIdAndDelete(transactionId);
    return res.status(200).json({
      isSuccess: true,
      message: "Sucessfully deleted transactions.",
    });
  } catch (e) {
    return {
      isSuccess: false,
      message: e.message,
    };
  }
};

const submitTransaction = async (req, res) => {
  const { transIds } = req.body;
  try {
    const updatedRes = await TransactionModel.updateMany(
      {
        _id: {
          $in: transIds,
        },
      },
      { $set: { completed: true } }
    );
    return res.status(200).json({
      isSuccess: true,
      message: "Sucessfully updated transactions.",
      data: updatedRes,
    });
  } catch (e) {
    return { isSuccess: false, message: e.message };
  }
};

export {
  getAllTransactions,
  getAllCompletedTransactions,
  getTransactionByUser,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  submitTransaction,
  getCompletedTransactionsByUser,
};
