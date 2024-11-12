/* eslint-disable react/prop-types */
import { useState } from 'react';
import AuthContext from './AuthContext';

export default function AuthProvider({ children }) {
	const [user, setUser] = useState('');
	const [token, setToken] = useState('');
	const [userId, setUserId] = useState('');
	const value = {
		user,
		setUser,
		token,
		setToken,
		userId,
		setUserId,
	};

	return (
		<>
			<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
		</>
	);
}
