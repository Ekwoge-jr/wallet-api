import express from "express"
import { 
    createTransaction, deleteTransaction, getSummaryByUserId, getTransactionsByUserId 
} from "../controllers/transactionsController.js";

const router = express.Router()

// the End-points
//get is used to show something from the database
router.get("/:userID", getTransactionsByUserId);

//post is used to creat something in the database
router.post("/", createTransaction);

//delete is used to delete something in the database
router.delete("/:id", deleteTransaction);

router.get("/summary/:userId", getSummaryByUserId);

export default router