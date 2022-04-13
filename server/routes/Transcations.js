import { Router } from "express";
import * as TransactionController from "../controllers/Transactions";

const router = new Router();

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

export default router;
