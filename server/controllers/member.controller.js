const Member = require("../models/member.model")
const Book = require("../models/book.model")
const axios = require("axios")
const {
	getBooksFromApi,
	generateParams,
	updateStock,
} = require("../controllers/book.controller")
const {
	createTransaction,
	createReturnTransaction,
} = require("../controllers/transaction.controller")

const getMembersFromDatabase = async (req, res, next) => {
	Member.find()
		.sort({ id: 1 })
		.then((response) => {
			res.send(response)
		})
		.catch((error) => {
			console.log(error)
		})
}

const addMember = async (req, res, next) => {
	const { id, name, booksIssued, debt } = req.body
	let newMember = new Member({
		id: id,
		name: name,
		booksIssued: booksIssued,
		debt: debt,
	})

	newMember
		.save()
		.then((response) => {
			res.json({
				message: "Member added successfully",
			})
		})
		.catch((error) => {
			res.json({
				message: "an error has occured " + error,
			})
		})
}

const issueBook = async (req, res, next) => {
	const { id, title, name } = req.body
	let currentDate = new Date().toJSON().slice(0, 10)
	const params = generateParams(req.body)

	let bookData
	try {
		await axios(`https://frappe.io/api/method/frappe-library?${params}`).then(
			(response) => {
				bookData = response.data.message[0]
			}
		)
	} catch (err) {
		res.send(err)
	}

	Book.findOne({ id: parseInt(bookData.bookID) }).then((response) => {
		if (response == null) {
			res.send({ message: "Book not available in library" })
			return
		} else if (response.quantity == 0) {
			res.send({ message: "No stock remaining" })
		} else {
			Member.findOne({
				id: id,
			}).then((response) => {
				if (response.debt == 500) {
					res.send({
						message: "Cannot issue book. Outstanding Debt has reached Rs. 500",
					})
					return
				} else if (response.booksIssued.includes(bookData.title)) {
					res.send({ message: "Book already issued" })
					return
				} else {
					Member.updateOne(
						{ id: id },
						{
							$push: {
								booksIssued: {
									$each: [
										{
											title: bookData.title,
											bookID: bookData.bookID,
											dateIssued: currentDate,
										},
									],
								},
							},
							$inc: {
								debt: 50,
							},
						}
					)
						.then(async (response) => {
							res.send(response)
						})
						.catch((error) => {
							res.send(error)
						})

					const { bookID } = bookData

					updateStock(id, name, bookID, currentDate)

					createTransaction(id, name, bookID, bookData.title, currentDate)
				}
			})
		}
	})
}

const returnBook = async (req, res, next) => {
	const { id, name, bookID, title } = req.body

	let currentDate = new Date().toJSON().slice(0, 10)
	await Member.updateOne(
		{ id: id },
		{
			$pull: { booksIssued: { bookID: bookID } },
			$inc: { debt: -50 },
		}
	)
		.then((response) => {
			if (response != null) {
				Book.updateOne(
					{ id: bookID },
					{
						$pull: {
							issuedBy: { id: id },
						},
						$inc: { quantity: +1 },
					}
				)
					.then((response) => res.send(response))
					.catch((error) => res.send(error))
			}
		})
		.catch((error) => {
			res.send(error)
		})

	createReturnTransaction(id, name, bookID, title, currentDate)
}
module.exports = {
	getMembersFromDatabase,
	addMember,
	issueBook,
	returnBook,
}
