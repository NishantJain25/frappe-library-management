import React from "react"

export const addNewBook = async (formData) => {
	const response = await fetch("/books/addBook", {
		method: "post",
		headers: {
			"Content-type": "application/json",
		},
		body: JSON.stringify(formData),
	})

	return response.json()
}

export const issueNewBook = async (formData) => {
	console.log(formData)
	const response = await fetch("/members/issueBook", {
		method: "post",
		headers: {
			"Content-type": "application/json",
		},
		body: JSON.stringify(formData),
	})

	return response.json()
}
