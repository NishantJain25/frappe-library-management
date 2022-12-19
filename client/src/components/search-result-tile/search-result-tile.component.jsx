import React, { useState } from "react"
import { addNewBook } from "../../utils/api.util"
import "./search-result-tile.styles.css"

const SearchResult = ({ result }) => {
	const [quantity, setQuantity] = useState(1)
	const [issueToggle, setIssueToggle] = useState(false)
	const handleChange = (e) => {
		if (e.target.value < 1) {
			return
		}
		setQuantity(e.target.value)
	}

	const handleConfirm = async () => {
		await addNewBook({ title, quantity })
			.then((res) => console.log(res))
			.catch((err) => console.log(err))
	}

	const { title, authors, average_rating, id } = result
	return (
		<div className="result-tile">
			<p>{title}</p>
			<span>
				{authors.split("/").map((author) => (
					<p id="author">{author}</p>
				))}
			</span>
			<span>Ratings: {average_rating}</span>
			<div className="issue-container">
				{issueToggle && (
					<input
						id="quantity"
						type="number"
						value={quantity}
						onChange={handleChange}
					/>
				)}
				{issueToggle && <button onClick={handleConfirm}>Confirm</button>}
				<button
					id={issueToggle ? "cancel" : ""}
					onClick={() => setIssueToggle((currentValue) => !currentValue)}
				>
					{issueToggle ? "Cancel" : "Issue Book"}
				</button>
			</div>
		</div>
	)
}

export default SearchResult
