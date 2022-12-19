import React, { useState, useContext, useEffect } from "react"
import "./members-page.styles.css"
import MemberTableRow from "../../components/member-table-row/member-table-row.component"
import { MembersContext } from "../../contexts/members.context"

const MembersPage = () => {
	const { members } = useContext(MembersContext)
	const [membersList, setMembersList] = useState([])
	const [searchText, setSearchText] = useState("")
	const handleChange = (e) => {
		setSearchText(e.target.value)
	}

	useEffect(() => {
		console.log(searchText)

		setMembersList(
			members.filter(
				(memberObj) =>
					memberObj.name.includes(searchText) ||
					String(memberObj.id).includes(searchText)
			)
		)
	}, [searchText, members])
	return (
		<div className="container">
			<div className="header">
				<h1>Members</h1>
				<header id="search">
					Search Member:&nbsp;{" "}
					<input
						type="search"
						value={searchText}
						onChange={handleChange}
						placeholder="Type Name or ID"
					/>
				</header>
				<div className="member-table-header">
					<div id="member-id">Member ID</div>
					<div id="name">Name</div>
					<div id="books-issued">Books Issued</div>
					<div id="debt">Outstanding Debt</div>
					<div id="new-issue-button"></div>
					<div id="return-book-button"></div>
				</div>
				{membersList.length == 0 ? (
					<p id="message">Member not found</p>
				) : (
					membersList.map((member, key) => (
						<MemberTableRow member={member} key={key} />
					))
				)}
			</div>
		</div>
	)
}

export default MembersPage
