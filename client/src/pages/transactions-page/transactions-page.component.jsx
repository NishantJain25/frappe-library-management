import React, { useContext } from "react"
import { TransactionsContext } from "../../contexts/transactions.context"
import TransactionTableRow from "../../components/transaction-table-row/transaction-table-row.component"
import "./transactions-page.styles.css"

const TransactionsPage = () => {
	const { transactions } = useContext(TransactionsContext)

	return (
		<div className="container">
			<h1>Transactions</h1>
			<div className="transaction-table-header">
				<div id="id">Member ID</div>
				<div id="member-name">Member Name</div>
				<div id="book-title">Book issued</div>
				<div id="date-issued">Date of Issue</div>
				<div id="date-issued">Date of Return</div>
				<div id="status">Status</div>
				<div id="penalty">Penalty</div>
			</div>
			{transactions.map((transaction) => {
				console.log(transaction)
				return <TransactionTableRow transaction={transaction} />
			})}
		</div>
	)
}

export default TransactionsPage
