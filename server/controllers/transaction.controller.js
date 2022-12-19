const Transaction = require("../models/transaction.model")
const Member = require("../models/member.model")

const createTransaction = async (id, name, bookID, title, currentDate) => {
	let newTransaction = new Transaction({
		memberID: id,
		memberName: name,
		book: { bookID: bookID, title: title },
		issueDate: currentDate,
		returnDate: "",
		status: "Rented",
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
		.sort({ updatedAt: -1 })
		.then((response) => {
			res.send(response)
		})
		.catch((error) => {
			console.log(error)
		})
}

const createReturnTransaction = async (
	id,
	name,
	bookID,
	title,
	currentDate
) => {
	await Transaction.findOne({ id: id, bookID: bookID, status: "Rented" })
		.then((response) => {
			let penalty = 0
			const difference =
				(Date.parse(currentDate) - Date.parse(response.issueDate)) /
				(1000 * 60 * 60 * 24)

			if (difference > 15) {
				penalty = 500
				Member.updateOne({ id: id }, { $inc: { debt: +penalty } })
			}

			Transaction.updateOne(
				{ id: id, bookID: bookID, status: "Rented" },
				{
					$set: {
						returnDate: currentDate,
						penalty: penalty,
						status: "Returned",
					},
				}
			)
				.then((response) => {
					return response
				})
				.catch((error) => {
					return error
				})
		})
		.catch((error) => {
			return error
		})
}
module.exports = {
	createTransaction,
	getTransactionsFromDatabase,
	createReturnTransaction,
}
