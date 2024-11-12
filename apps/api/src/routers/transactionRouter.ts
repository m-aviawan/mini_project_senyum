import { cancelTransaction, createTransaction, payTransaction } from "@/controllers/transactionController";
import { tokenValidation } from "@/middlewares/tokenValidation";
import { Router } from "express";
const transactionRouter = Router()

transactionRouter.post('/', tokenValidation, createTransaction)
transactionRouter.patch('/cancel/:id', tokenValidation, cancelTransaction)
transactionRouter.patch('/complete-transaction/:id', tokenValidation, payTransaction)

export default transactionRouter