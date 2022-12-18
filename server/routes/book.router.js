const express = require("express")
const bookController = require("../controllers/book.controller")
const router = express.Router()

router.get("/search", bookController.getBooksFromApi)
router.get("/getBooks", bookController.getBooksFromDatabase)
router.post("/addBook", bookController.addNewBook)

module.exports = router
