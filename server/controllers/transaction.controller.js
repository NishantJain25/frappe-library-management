const Transaction = require("../models/transaction.model")

const createTransaction = async (
	id,
	name,
	bookID,
	title,
	quantity,
	currentDate
) => {
	
	let newTransaction = new Transaction({
		memberID: id,
		memberName: name,
		book: { bookID: bookID, title: title, quantity: quantity },
		issueDate: currentDate,
		penalty: 0,
	})

	newTransaction
		.save()
		.then((response) => {
			console.log(response)
		})
		.catch((error) => {
			console.log(error)
		})
}

const getTransactionsFromDatabase = async (req, res, next) => {
	await Transaction.find()
		.then((response) => {
			res.send(response)
		})
		.catch((error) => {
			console.log(error)
		})
}
module.exports = {
	createTransaction,
	getTransactionsFromDatabase,
}
