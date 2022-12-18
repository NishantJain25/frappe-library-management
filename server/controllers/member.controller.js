const Member = require("../models/member.model")
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
	const { id, title, quantity, name } = req.body
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
	
	Member.updateOne(
		{ id: id },
		{
			$push: {
				booksIssued: {
					$each: [
						{
							title: bookData.title,
							quantity: quantity,
							dateIssued: currentDate,
						},
					],
				},
			},
			$inc: {
				debt: 50 * quantity,
			},
		}
	)
		.then(async (response) => {
			console.log(response)
		})
		.catch((error) => {
			res.send(error)
		})

	const { bookID } = bookData
	
	await updateStock(id, name, bookID, quantity, currentDate)

	await createTransaction(
		id,
		name,
		bookID,
		bookData.title,
		quantity,
		currentDate
	)
}
module.exports = {
	getMembersFromDatabase,
	addMember,
	issueBook,
}
