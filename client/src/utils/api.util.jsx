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
