import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import SearchResult from "../../components/search-result-tile/search-result-tile.component"
import "./search-page.styles.css"

const SearchPage = () => {
	const { searchText } = useParams()
	const [searchResults, setSearchResults] = useState([])
	const [currentPage, setCurrentPage] = useState(1)
	const [isLoading, setIsLoading] = useState(false)
	const [lastPage, setLastPage] = useState(false)
	useEffect(() => {
		setIsLoading(true)
		const getSearchResults = async () => {
			await fetch(`/books/search?title=${searchText}&page=${currentPage}`)
				.then((res) => res.json())
				.then((data) => {
					setSearchResults(data.message)
					if (data.message.length < 20) {
						setLastPage(true)
					} else {
						setLastPage(false)
					}
					setIsLoading(false)
				})
		}
		getSearchResults()
	}, [currentPage])

	const handleClick = (operator) => {
		if (operator === "next") {
			setCurrentPage((currentPage) => currentPage + 1)
			return
		} else if (operator === "prev") {
			if (currentPage === 1) {
				return
			}
			setCurrentPage((currentPage) => currentPage - 1)
		}
	}

	return (
		<div className="container">
			<h1>Search Results for "{searchText}"</h1>
			{isLoading ? (
				<p>Loading...</p>
			) : (
				<section className="search-results">
					{searchResults.length > 0 ? (
						searchResults.map((result) => <SearchResult result={result} />)
					) : (
						<p>No results found</p>
					)}
					<div className="pagination">
						<button
							onClick={() => handleClick("prev")}
							style={{ display: currentPage == 1 ? "none" : "block" }}
						>
							Prev
						</button>
						<span>{currentPage}</span>
						<button
							onClick={() => handleClick("next")}
							style={{ display: lastPage ? "none" : "block" }}
						>
							Next
						</button>
					</div>
				</section>
			)}
		</div>
	)
}

export default SearchPage
