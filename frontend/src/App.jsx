// import { useEffect } from 'react';
// import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import Login from "./components/Login";
import SignupForm from "./components/SignupForm";
import ProtectedRoutes from "./components/ProtectedRoutes";
import HomePage from "./pages/HomePage";
import AuthProvider from "./AuthProvider";

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
		<AuthProvider>
			<Router>
				<Routes>
					<Route path="/" element={<WelcomePage />} />
					<Route path="/login" element={<Login />} />
					<Route path="/SignupForm" element={<SignupForm />} />
					<Route element={<ProtectedRoutes />}>
						<Route path="/homepage" element={<HomePage />} />
					</Route>
				</Routes>
			</Router>
		</AuthProvider>
	);
}

export default App;
