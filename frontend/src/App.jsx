// import { useEffect } from 'react';
// import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import Login from "./components/Login";
import SignupForm from "./components/SignupForm";

function App() {
	// useEffect(() => {
	// 	fetch("/api")
	// 		.then((response) => response.json())
	// 		.then((result) => {
	// 			alert(`Hello ${result.hello}!`);
	// 		});
	// }, []);

	// return <></>;
	return (
		<Router>
			<Routes>
				<Route path="/" element={<WelcomePage />} />
				<Route path="/login" element={<Login />} />
				<Route path="/SignupForm" element={<SignupForm />} />
			</Routes>
		</Router>
	);
}

export default App;
