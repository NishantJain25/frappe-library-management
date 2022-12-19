import React, { useState } from "react"
import { returnBook } from "../../utils/api.util"
import "./return-book-form.styles.css"

const ReturnBookForm = ({ booksIssued, member }) => {
	const [dropdownValue, setDropdownValue] = useState(booksIssued[0])

	const handleDropdown = (e) => {
		console.log(e.target.value)
	}

	const onSubmit = (e) => {
		e.preventDefault()
		returnBook(member, dropdownValue)
	}
	return (
		<div className="return-book-form">
			<h3>Select a book to return</h3>
			{booksIssued.length > 0 ? (
				<form onSubmit={onSubmit}>
					<select onChange={handleDropdown} defaultValue={dropdownValue}>
						{booksIssued.map((book, key) => (
							<option key={key} value={book}>
								{book.title}
							</option>
						))}
					</select>
					<button type="submit" id="confirm-return">
						Confirm return
					</button>
				</form>
			) : (
				<p>No books issued</p>
			)}
		</div>
	)
}

export default ReturnBookForm
