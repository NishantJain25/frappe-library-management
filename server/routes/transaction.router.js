const express = require("express")
const router = express.Router()
const TransactionController = require("../controllers/transaction.controller")

router.get(
	"/getTransactions",
	TransactionController.getTransactionsFromDatabase
)

module.exports = router
