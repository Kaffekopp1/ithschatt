import { useContext } from 'react';
import AuthContext from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import { updateUserStatus } from '../api/authFetch';

export default function Logout() {
	const { setUser, setToken, userId, setUserId, setUserInfo } =
		useContext(AuthContext);
	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			await updateUserStatus(userId);
		} catch (error) {
			console.error('Error updating user status', error);
		}

		setUser('');
		setToken('');
		setUserId('');
		setUserInfo('');
		localStorage.removeItem('user');
		localStorage.removeItem('token');
		localStorage.removeItem('id');
		localStorage.removeItem('userinfo');
		navigate('/login');
	};

	return (
		<div>
			<button onClick={handleLogout}>Logout</button>
		</div>
	);
}
