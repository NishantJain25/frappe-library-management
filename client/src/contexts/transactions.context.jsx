import { createContext, useState, useEffect } from "react"

export const TransactionsContext = createContext({
	transactions: [],
})

export const TransactionsProvider = ({ children }) => {
	const [transactions, setTransactions] = useState([])

	useEffect(() => {
		const getDataFromDatabase = async () => {
			await fetch("/transactions/getTransactions")
				.then((res) => res.json())
				.then((data) => setTransactions(data))
		}

		getDataFromDatabase()
	}, [])
	const value = { transactions }
	return (
		<TransactionsContext.Provider value={value}>
			{children}
		</TransactionsContext.Provider>
	)
}
