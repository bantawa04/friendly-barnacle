const express = require("express");
const router = express.Router();
const TransactionController = require("../controllers/Transactions");

router.get("/", TransactionController.getAllTransactions);
router.get("/completed", TransactionController.getAllCompletedTransactions);
router.get(
  "/completed/:id",
  TransactionController.getCompletedTransactionsByUser
);
router.get("/:id", TransactionController.getTransactionByUser);
router.post("/create", TransactionController.createTransaction);
router.post("/update/:id", TransactionController.updateTransaction);
router.post("/delete/:id", TransactionController.deleteTransaction);
router.post("/submit", TransactionController.submitTransaction);

module.exports = router;
