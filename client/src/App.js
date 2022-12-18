import logo from "./logo.svg"
import SideNav from "./components/sidenav/sidenav.component"
import "./App.css"
import { Outlet } from "react-router-dom"

function App() {
	return (
		<div className="App">
			<SideNav />
			<Outlet />
		</div>
	)
}

export default App
