import React, { useContext } from "react"
import "./transaction-table-row.styles.css"
import { TransactionsContext } from "../../contexts/transactions.context"
const TransactionTableRow = ({ transaction }) => {
	const { memberID, memberName, book, issueDate, returnDate, status, penalty } =
		transaction
	console.log(memberName)
	return (
		<div className="transaction-table-row">
			<div id="id">{memberID}</div>
			<div id="member-name">{memberName}</div>
			<div id="book-title">{book.title}</div>
			<div id="date-issued">{issueDate}</div>
			<div id="date-returned">{returnDate}</div>
			<div id="status">{status}</div>
			<div id="penalty">{penalty}</div>
		</div>
	)
}

export default TransactionTableRow
