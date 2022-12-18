import React, { useState } from "react"
import { NavLink } from "react-router-dom"
import "./search-bar.styles.css"
const SearchBar = () => {
	const [searchText, setSearchText] = useState("")
	const handleChange = (e) => {
		setSearchText(e.target.value)
	}

	const handleClick = (e) => {
		if (searchText == "") {
			e.preventDefault()
			alert("Search bar is empty")
			return
		}
	}
	return (
		<div className="search-container">
			<input
				className="search-bar"
				type="text"
				name="searchText"
				value={searchText}
				onChange={handleChange}
			/>
			<NavLink
				to={`/search/${searchText}`}
				onClick={handleClick}
				id="search-button"
			>
				Search
			</NavLink>
		</div>
	)
}

export default SearchBar
