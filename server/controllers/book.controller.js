const Book = require("../models/book.model")
const axios = require("axios")

const getBooksFromApi = async (req, res, next) => {
	console.log(req.query)
	let params = ""
	if (req.query) {
		params = generateParams(req.query)
	}
	console.log(params)
	try {
		await axios(`https://frappe.io/api/method/frappe-library?${params}`).then(
			(response) => {
				res.send(response.data)
			}
		)
	} catch (err) {
		res.send(err)
	}
}

const addNewBook = async (req, res, next) => {
	const params = generateParams(req.body)
	console.log(req.body)
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

	let newBook = new Book({
		id: bookData.bookID,
		title: bookData.title,
		authors: bookData.authors.split("/"),
		isbn: bookData.isbn,
		publisher: bookData.publisher,
		quantity: req.body.quantity,
		issuedBy: [],
	})

	newBook
		.save()
		.then((response) => {
			res.json({
				message: "Book added successfully",
			})
		})
		.catch((error) => {
			res.json({
				message: "an error has occured " + error,
			})
		})
}

const getBooksFromDatabase = async (req, res, next) => {
	Book.find()
		.then((response) => {
			res.send(response)
		})
		.catch((error) => {
			console.log(error)
		})
}
const generateParams = (request) => {
	let paramString = ""

	const fields = Object.keys(request)

	const values = Object.values(request)
	for (let i = 0; i < fields.length; i++) {
		if (fields[i] != "quantity") {
			paramString = paramString + `${fields[i]}=${values[i]}&`
		}
	}

	return paramString
}

const updateStock = async (id, name, bookID, quantity, currentDate) => {
	console.log(typeof bookID)
	const response = await Book.updateOne(
		{ id: parseInt(bookID) },
		{
			$push: {
				issuedBy: {
					$each: [{ id: id, name: name, dateIssued: currentDate }],
				},
			},
			$inc: { quantity: -quantity },
		}
	)
	return response
}
module.exports = {
	getBooksFromApi,
	addNewBook,
	getBooksFromDatabase,
	generateParams,
	updateStock,
}
