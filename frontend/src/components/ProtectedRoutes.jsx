import { Outlet, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../AuthContext';
const ProtectedRoutes = () => {
	const { user, loading } = useContext(AuthContext);
	if (loading) {
		return <div>Loading...</div>;
	}
	return user ? <Outlet /> : <Navigate to="/" />;
};
export default ProtectedRoutes;
