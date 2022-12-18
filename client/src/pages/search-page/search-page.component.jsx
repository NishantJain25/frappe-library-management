import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import "./search-page.styles.css"

const SearchPage = () => {
	const { searchText } = useParams()
	const [searchResults, setSearchResults] = useState([])
	const [isLoading, setIsLoading] = useState(false)
	useEffect(() => {
		setIsLoading(true)
		const getSearchResults = async () => {
			await fetch(`/books/search?title=${searchText}`)
				.then((res) => res.json())
				.then((data) => {
					setSearchResults(data.message)
					setIsLoading(false)
				})
		}
		getSearchResults()
	}, [])

	console.log(searchResults)

	return (
		<div className="container">
			<h1>Search Results for "{searchText}"</h1>
			{isLoading ? (
				<p>Loading...</p>
			) : (
				<section className="search-results">
					{searchResults.length > 0 ? (
						searchResults.map((result) => (
							<div className="result-tile">
								<p>{result.title}</p>
								<span>
									{result.authors.split("/").map((author) => (
										<p id="author">{author}</p>
									))}
								</span>
								<span>Ratings: {result.average_rating}</span>
							</div>
						))
					) : (
						<p>No results found</p>
					)}
				</section>
			)}
		</div>
	)
}

export default SearchPage
