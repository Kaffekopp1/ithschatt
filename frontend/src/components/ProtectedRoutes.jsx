import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../AuthContext";
const ProtectedRoutes = () => {
	const { user } = useContext(AuthContext);

	return user ? <Outlet /> : <Navigate to="/" />;
};
export default ProtectedRoutes;
