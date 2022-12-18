const mongoose = require("mongoose")
const schema = mongoose.Schema

const bookSchema = new schema(
	{
		id: Number,
		title: String,
		authors: Array,
		isbn: String,
		publisher: String,
		quantity: Number,
		issuedBy: Array,
	},
	{ timestamps: true }
)

const bookModel = mongoose.model("books", bookSchema)
module.exports = bookModel
