/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';

import AuthContext from './AuthContext';

export default function AuthProvider({ children }) {
	const [user, setUser] = useState('');
	const [token, setToken] = useState('empty');
	const [userId, setUserId] = useState('');
	const [loading, setLoading] = useState('true');
	const [userInfo, setUserInfo] = useState({});

	const value = {
		user,
		setUser,
		token,
		setToken,
		userId,
		setUserId,
		loading,
		userInfo,
		setUserInfo,
	};
	useEffect(() => {
		const savedUser = localStorage.getItem('user');
		const savedToken = localStorage.getItem('token');
		const savedId = localStorage.getItem('id');
		const savedUserInfo = localStorage.getItem('userinfo');

		if (savedUserInfo) {
			setUserInfo(savedUserInfo);
		}

		if (savedToken && savedUser) {
			setUser(savedUser);
			setToken(savedToken);
		}
		if (savedId) {
			setUserId(savedId);
		}
		setLoading(false);
	}, []);

	return (
		<>
			<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
		</>
	);
}
