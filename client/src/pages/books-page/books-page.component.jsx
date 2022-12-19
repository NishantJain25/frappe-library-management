import React, { useState, useEffect, useContext } from "react"

import "./books-page.styles.css"
import SearchBar from "../../components/search-bar/search-bar.component"
import BookForm from "../../components/book-form/book-form.component"
import BookTableRow from "../../components/book-table-row/book-table-row.component"
import { BooksContext } from "../../contexts/books.context"

const BooksPage = () => {
	const [formToggle, setFormToggle] = useState(false)
	const { books } = useContext(BooksContext)
	const [booksList, setBooksList] = useState([])
	const [searchText, setSearchText] = useState("")
	const handleChange = (e) => {
		setSearchText(e.target.value)
	}
	useEffect(() => {
		console.log(searchText)

		setBooksList(
			books.filter(
				(bookObj) =>
					bookObj.title.toLowerCase().includes(searchText) ||
					String(bookObj.id).includes(searchText)
			)
		)
	}, [searchText, books])
	return (
		<div className="container">
			<h1>Books</h1>
			<header id="search">
				Search books from API:&nbsp; <SearchBar />
			</header>
			<div className="search-database">
				Search book in database:&nbsp;{" "}
				<input
					type="search"
					value={searchText}
					onChange={handleChange}
					placeholder="Type title or ID"
				/>
			</div>
			<div className="add-books">
				<button
					id={formToggle ? "cancel" : ""}
					className="add-book-button"
					onClick={() => setFormToggle((currentState) => !currentState)}
				>
					{!formToggle ? "+ Add New Books" : "Cancel"}
				</button>
				{formToggle && <BookForm />}
			</div>
			<section className="books-list">
				<div className="table-header">
					<div id="sr-no">Sr. No.</div>
					<div id="title">Title</div>
					<div id="author">Authors</div>
					<div id="author">Issued By</div>
					<div id="stock">Stock</div>
				</div>

				{booksList.length == 0 ? (
					<p id="message">No books found</p>
				) : (
					booksList.map((book, index) => {
						return <BookTableRow book={book} index={index + 1} key={index} />
					})
				)}
			</section>
		</div>
	)
}

export default BooksPage
