import React, { useState } from "react"
import { NavLink } from "react-router-dom"
import "./sidenav.styles.css"
const SideNav = () => {
	const [className, setClassName] = useState("open")
	return (
		<div className={`${className} sidenav`}>
			<ul className="navbar-links">
				<li>
					<NavLink
						to="/"
						className={({ isActive }) => (isActive ? "active" : "")}
						end
					>
						Books
					</NavLink>
				</li>
				<li>
					<NavLink
						to="/members"
						className={({ isActive }) => (isActive ? "active" : "")}
					>
						Members
					</NavLink>
				</li>
				<li>
					<NavLink
						to="/transactions"
						className={({ isActive }) => (isActive ? "active" : "")}
					>
						Transactions
					</NavLink>
				</li>
			</ul>
		</div>
	)
}

export default SideNav
