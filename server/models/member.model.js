const mongoose = require("mongoose")
const schema = mongoose.Schema

const memberSchema = new schema(
	{
		id: Number,
		name: String,
		booksIssued: Array,
		debt: Number,
	},
	{ timestamps: true }
)

const memberModel = mongoose.model("members", memberSchema)
module.exports = memberModel
