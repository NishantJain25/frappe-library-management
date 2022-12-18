import React, { useContext } from "react"
import "./members-page.styles.css"
import MemberTableRow from "../../components/member-table-row/member-table-row.component"
import { MembersContext } from "../../contexts/members.context"

const MembersPage = () => {
	const { members } = useContext(MembersContext)
	return (
		<div className="container">
			<div className="header">
				<h1>Members</h1>
				<div className="table-header">
					<div id="member-id">Member ID</div>
					<div id="name">Name</div>
					<div id="books-issued">Books Issued</div>
					<div id="debt">Outstanding Debt</div>
					<div id="new-issue-button"></div>
				</div>
				{members.map((member, key) => (
					<MemberTableRow member={member} />
				))}
			</div>
		</div>
	)
}

export default MembersPage
