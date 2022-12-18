import React, { useState } from "react"
import "./member-table-row.styles.css"
import { issueNewBook } from "../../utils/api.util"

const MemberTableRow = ({ member }) => {
	const [formToggle, setFormToggle] = useState(false)
	const defaultFormFields = {
		title: "",
		author: "",
		quantity: 0,
	}

	const [formFields, setFormFields] = useState(defaultFormFields)
	const { title, author, quantity } = formFields
	const handleChange = (e) => {
		const { name } = e.target
		setFormFields({ ...formFields, [name]: e.target.value })
	}
	const { id, name, booksIssued, debt } = member

	const onSubmit = (e) => {
		e.preventDefault()

		if (title == "" && author == "") {
			alert("Enter either title or author or both to add new book")
			return
		}
		if (quantity == 0) {
			alert("quantity cannot be zero")
			return
		}

		const response = issueNewBook({ title, quantity, id, name })
		console.log(response)
	}
	return (
		<div className="table-row">
			<div id="member-id">{id}</div>
			<div id="name">{name}</div>
			<div id="books-issued">
				{booksIssued.map((book, key) => (
					<p>{book.title}, </p>
				))}
			</div>
			<div id="debt">{debt}</div>
			<div id="new-issue-button">
				<button onClick={() => setFormToggle((currentState) => !currentState)}>
					{!formToggle ? "+ Issue book" : "Cancel"}
				</button>
			</div>
			{formToggle && (
				<div id="issue-book-form">
					<h3>Issue new book</h3>
					<form id="issue-book-form" onSubmit={onSubmit}>
						<label>Title</label>
						<input name="title" value={title} onChange={handleChange} />

						<label>Quantity</label>

						<input name="quantity" value={quantity} onChange={handleChange} />
						<button type="submit">Submit</button>
					</form>
				</div>
			)}
		</div>
	)
}

export default MemberTableRow
