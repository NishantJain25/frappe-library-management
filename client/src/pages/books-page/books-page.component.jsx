import React, { useState, useContext } from "react"
import "./books-page.styles.css"
import SearchBar from "../../components/search-bar/search-bar.component"
import BookForm from "../../components/book-form/book-form.component"
import BookTableRow from "../../components/book-table-row/book-table-row.component"
import { BooksContext } from "../../contexts/books.context"

const BooksPage = () => {
	const [formToggle, setFormToggle] = useState(false)
	const { books } = useContext(BooksContext)

	return (
		<div className="container">
			<h1>Books</h1>
			<header id="search">
				Search books:&nbsp; <SearchBar />
			</header>
			<div className="add-books">
				<button
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
				{books.map((book, index) => {
					return <BookTableRow book={book} index={index + 1} />
				})}
			</section>
		</div>
	)
}

export default BooksPage
