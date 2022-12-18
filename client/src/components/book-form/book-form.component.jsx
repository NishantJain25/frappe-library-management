import React, { useState, useContext } from "react"
import "./book-form.styles.css"
import { addNewBook } from "../../utils/api.util"

const BookForm = () => {
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

		addNewBook({ title, author, quantity })
	}
	return (
		<div className="book-form">
			<form onSubmit={onSubmit}>
				<div className="form-field">
					<label>Title:</label>
					<input
						type="text"
						name="title"
						value={title}
						onChange={handleChange}
					/>
				</div>
				<div className="form-field">
					<label>Author:</label>
					<input
						type="text"
						name="author"
						value={author}
						onChange={handleChange}
					/>
				</div>
				<div className="form-field">
					<label>Quantity:</label>
					<input
						type="number"
						id="quantity"
						name="quantity"
						value={quantity}
						onChange={handleChange}
					/>
				</div>
				<div className="form-buttons">
					<button type="submit">Fetch books</button>
					<button type="reset">Reset</button>
				</div>
			</form>
		</div>
	)
}

export default BookForm
