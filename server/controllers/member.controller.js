const Member = require("../models/member.model")
const Book = require("../models/book.model")
const axios = require("axios")
const {
	getBooksFromApi,
	generateParams,
	updateStock,
} = require("../controllers/book.controller")
const { createTransaction } = require("../controllers/transaction.controller")

const getMembersFromDatabase = async (req, res, next) => {
	Member.find()
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
		}
		else {
			Member.findOne({
				id: id,
				booksIssued: { $elemMatch: { title: bookData.title } },
			}).then((response) => {
				if (response == null) {
					Member.updateOne(
						{ id: id },
						{
							$push: {
								booksIssued: {
									$each: [
										{
											title: bookData.title,

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
				} else if (response.debt > 450) {
					res.send({ message: "Debt cannot be more than Rs. 500" })
					return
				} else {
					res.send({ message: "Book already issued" })
					return
				}
			})
		}
	})
}
module.exports = {
	getMembersFromDatabase,
	addMember,
	issueBook,
}
