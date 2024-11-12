import { useContext } from 'react';
import AuthContext from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import { updateUserStatus } from '../api/authFetch';

export default function Logout() {
	const { setUser, setToken, userId, setUserId } = useContext(AuthContext);
	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			const updateAnswer = await updateUserStatus(userId);
			console.log('User status updated:', updateAnswer);
		} catch (error) {
			console.error('Error updating user status', error);
		}

		setUser('');
		setToken('');
		setUserId('');
		navigate('/login');
	};

	return (
		<div>
			<button onClick={handleLogout}>Logout</button>
		</div>
	);
}
