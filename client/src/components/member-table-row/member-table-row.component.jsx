import React, { useState } from "react"
import "./member-table-row.styles.css"
import { issueNewBook } from "../../utils/api.util"
import ReturnBookForm from "../../components/return-book-form/return-book-form.component"

const MemberTableRow = ({ member }) => {
	const [formToggle, setFormToggle] = useState(false)
	const [returnToggle, setReturnToggle] = useState(false)

	const defaultFormFields = {
		title: "",
		author: "",
		quantity: 0,
	}

	const [formFields, setFormFields] = useState(defaultFormFields)

	const { title, author } = formFields
	const handleChange = (e) => {
		const { name } = e.target
		setFormFields({ ...formFields, [name]: e.target.value })
	}
	const { id, name, booksIssued, debt } = member

	const onSubmit = (e) => {
		e.preventDefault()

		if (title == "" && author == "") {
			alert("Enter title to add new book")
			return
		}

		const response = issueNewBook({ title, author, id, name })
		console.log(response)
	}

	return (
		<div className="member-table-row">
			<div id="member-id">{id}</div>
			<div id="name">{name}</div>
			<div id="books-issued">
				{booksIssued.map((book, key) => (
					<p key={key}>{book.title}, </p>
				))}
			</div>
			<div id="debt">{debt}</div>
			<div id="new-issue-button">
				<button
					id={formToggle ? "cancel" : ""}
					onClick={() => setFormToggle((currentState) => !currentState)}
					style={{
						pointerEvents: returnToggle && "none",
						backgroundColor: returnToggle && "grey",
						border: returnToggle && "none",
					}}
				>
					{!formToggle ? "+ Issue book" : "Cancel"}
				</button>
			</div>
			<div id="return-book-button">
				<button
					id={returnToggle ? "cancel" : ""}
					onClick={() => setReturnToggle((currentState) => !currentState)}
					style={{
						pointerEvents: formToggle && "none",
						backgroundColor: formToggle && "grey",
						border: formToggle && "none",
					}}
				>
					{!returnToggle ? "Return Book" : "Cancel"}
				</button>
			</div>
			{formToggle && (
				<div id="issue-book-form">
					<h3>Issue new book</h3>
					<form id="issue-form" onSubmit={onSubmit}>
						<div className="form-field">
							<label>Title</label>
							<input name="title" value={title} onChange={handleChange} />
						</div>

						<button type="submit">Submit</button>
					</form>
				</div>
			)}

			{returnToggle && (
				<ReturnBookForm
					booksIssued={booksIssued}
					member={{ id: id, name: name }}
				/>
			)}
		</div>
	)
}

export default MemberTableRow
