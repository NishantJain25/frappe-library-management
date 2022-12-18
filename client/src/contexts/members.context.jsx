import { createContext, useState, useEffect } from "react"

export const MembersContext = createContext({
	members: [],
})

export const MembersProvider = ({ children }) => {
	const [members, setMembers] = useState([])

	useEffect(() => {
		const getDataFromDatabase = async () => {
			await fetch("/members/getMembers")
				.then((res) => res.json())
				.then((data) => setMembers(data))
		}

		getDataFromDatabase()
	}, [])
	const value = { members }
	return (
		<MembersContext.Provider value={value}>{children}</MembersContext.Provider>
	)
}
