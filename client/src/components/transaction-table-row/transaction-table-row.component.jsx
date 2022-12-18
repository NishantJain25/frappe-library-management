import React, { useContext } from "react"
import "./transaction-table-row.styles.css"
import { TransactionsContext } from "../../contexts/transactions.context"
const TransactionTableRow = ({ transaction }) => {
	const { memberID, memberName, book, issueDate, penalty } = transaction
	console.log(memberName)
	return (
		<div className="table-row">
			<div id="id">1</div>
			<div id="member-name">{memberName}</div>
			<div id="book-title">
				{book.title} &times; {book.quantity}
			</div>
			<div id="date-issued">{issueDate}</div>
			<div id="penalty">{penalty}</div>
		</div>
	)
}

export default TransactionTableRow
