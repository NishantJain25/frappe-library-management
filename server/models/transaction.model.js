const mongoose = require("mongoose")
const schema = mongoose.Schema

const transactionSchema = new schema(
	{
		memberID: Number,
		memberName: String,
		book: Object,
		issueDate: String,
		penalty: Number,
	},
	{ timestamps: true }
)

const transactionModel = mongoose.model("transactions", transactionSchema)
module.exports = transactionModel
