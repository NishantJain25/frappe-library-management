import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import {
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
	Route,
} from "react-router-dom"
import { BooksProvider } from "./contexts/books.context"
import { MembersProvider } from "./contexts/members.context"
import { TransactionsProvider } from "./contexts/transactions.context"

import BooksPage from "./pages/books-page/books-page.component"
import MembersPage from "./pages/members-page/members-page.component"
import TransactionsPage from "./pages/transactions-page/transactions-page.component"
import SearchPage from "./pages/search-page/search-page.component"

const root = ReactDOM.createRoot(document.getElementById("root"))

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<App />}>
			<Route index element={<BooksPage />} />
			<Route path="/members" element={<MembersPage />} />
			<Route path="/transactions" element={<TransactionsPage />} />
			<Route path="/search/:searchText" element={<SearchPage />} />
		</Route>
	)
)
root.render(
	<React.StrictMode>
		<TransactionsProvider>
			<BooksProvider>
				<MembersProvider>
					<RouterProvider router={router} />
				</MembersProvider>
			</BooksProvider>
		</TransactionsProvider>
	</React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
