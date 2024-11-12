/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import AuthContext from './AuthContext';

export default function AuthProvider({ children }) {
	const [user, setUser] = useState('');
	const [token, setToken] = useState('empty');
	const [userId, setUserId] = useState('');
	const [loading, setLoading] = useState('true');
	const value = {
		user,
		setUser,
		token,
		setToken,
		userId,
		setUserId,
		loading,
	};
	useEffect(() => {
		const savedUser = localStorage.getItem('user');
		const savedToken = localStorage.getItem('token');
		if (savedToken && savedUser) {
			setUser(savedUser);
			setToken(savedToken);
		}
		setLoading(false);
	}, []);

	return (
		<>
			<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
		</>
	);
}
