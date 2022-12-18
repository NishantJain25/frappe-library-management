import React from "react"
import "./book-table-row.styles.css"

const BookTableRow = ({ book, index }) => {
	const { title, authors, quantity, issuedBy } = book

	return (
		<div className="table-row">
			<div id="sr-no">{index}.</div>
			<div id="title">{title}</div>
			<div id="author">
				{authors.map((author, index) => `${index + 1}. ${author}  `)}
			</div>
			<div id="issued-by">
				{issuedBy.map((member, index) => `${index + 1}. ${member.name} `)}
			</div>
			<div id="stock">{quantity}</div>
		</div>
	)
}

export default BookTableRow
