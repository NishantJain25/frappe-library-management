import React from "react"

export const addNewBook = async (formData) => {
	await fetch("/books/addBook", {
		method: "post",
		headers: {
			"Content-type": "application/json",
		},
		body: JSON.stringify(formData),
	})
		.then((response) => response.json())
		.then((data) => {
			if (data.message) {
				alert(data.message)
				return
			}
		})
	//return response.json()
}

export const issueNewBook = async (formData) => {
	console.log(formData)
	await fetch("/members/issueBook", {
		method: "post",
		headers: {
			"Content-type": "application/json",
		},
		body: JSON.stringify(formData),
	})
		.then((response) => response.json())
		.then((data) => {
			if (data.message) {
				alert(data.message)
				return
			}
		})
}

export const returnBook = async (member, book) => {
	const { id, name } = member
	const { bookID, title } = book
	const requestBody = {
		id,
		name,
		bookID,
		title,
	}

	await fetch("/members/returnBook", {
		method: "post",
		headers: {
			"Content-type": "application/json",
		},
		body: JSON.stringify(requestBody),
	})
		.then((response) => response.json())
		.then((data) => console.log(data))
}
