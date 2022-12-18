import { createContext, useState, useEffect } from "react"

export const BooksContext = createContext({
	books: [],
})

const BOOKS = [{ title: "harry potter" }, { title: "LOTR" }]

export const BooksProvider = ({ children }) => {
	const [books, setBooks] = useState([])

	useEffect(() => {
		const getDataFromDatabase = async () => {
			await fetch("/books/getBooks")
				.then((res) => res.json())
				.then((data) => setBooks(data))
		}

		getDataFromDatabase()
	}, [])
	const value = { books }
	return <BooksContext.Provider value={value}>{children}</BooksContext.Provider>
}
