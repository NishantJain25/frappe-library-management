import React, { useState } from "react"
import "./search-bar.styles.css"
const SearchBar = () => {
	const [searchText, setSearchText] = useState("")
	const handleChange = (e) => {
		setSearchText(e.target.value)
	}
	return (
		<div className="search-container">
			<form>
				<input
					className="search-bar"
					type="text"
					name="searchText"
					value={searchText}
					onChange={handleChange}
				/>
			</form>
		</div>
	)
}

export default SearchBar
