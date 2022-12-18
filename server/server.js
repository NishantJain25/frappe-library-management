const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const { MongoClient } = require("mongodb")
mongoose.connect("mongodb://localhost:27017/library-management-system", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})

const { bookRouter, memberRouter, transactionRouter } = require("./routes")

const db = mongoose.connection
db.on("error", (err) => {
	console.log(err)
})

db.once("open", () => {
	console.log("Database connection established")
})

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.listen(5000, () => {
	console.log("Server listening on port 5000")
})

app.use("/books", bookRouter)
app.use("/members", memberRouter)
app.use("/transactions", transactionRouter)
