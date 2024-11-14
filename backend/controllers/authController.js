const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const client = require('../connectionDb.js');

exports.registerUser = async (request, response) => {
	const {
		username,
		firstName,
		lastName,
		password,
		email,
		adress,
		postalnr,
		consent,
	} = request.body;
	console.log('username', request.body);

	const hashedPassword = await argon2.hash(password, 10);

	try {
		await client.query('BEGIN');
		const result = await client.query(
			`INSERT INTO users (username, firstName, lastName, password_hash, email, adress, postalnr, consent) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`,
			[
				username,
				firstName,
				lastName,
				hashedPassword,
				email,
				adress,
				postalnr,
				consent,
			]
		);

		const userId = result.rows[0].id;

		await client.query(
			`INSERT INTO user_status (user_id, status) VALUES ($1, $2)`,
			[userId, false]
		);

		// Commit transaction
		await client.query('COMMIT');

		response.status(200).send({
			message: 'En ny användare har lagts till!',
			username: username,
			email: email,
			id: userId,
		});
	} catch (error) {
		await client.query('ROLLBACK');
		response.status(500).json({
			problem: 'Registreringen blev fel!',
			error: error.message,
		});
	}
};

exports.loginUser = async (_request, response) => {
	const { username, email, password } = _request.body;
	try {
		const { rows } = await client.query(
			'SELECT * FROM users WHERE username = $1',
			[username]
		);
		if (!rows[0]) {
			return response
				.status(401)
				.json({ error: 'Det gick inte att logga in med din användare!' });
		}
		let passwordfrom = rows[0].password_hash;
		const passwordMatch = await argon2.verify(passwordfrom, password);
		if (!passwordMatch) {
			return response
				.status(401)
				.json({ error: 'Ditt lösenord är inte korrekt!' });
		}
		// console.log('rowns', rows[0].id, rows[0]._id);
		const token = jwt.sign({ userId: rows[0].id }, 'your-secret-key', {
			expiresIn: '1h',
		});
		response.status(200).json({
			token,
			message: 'Du är inloggad!',
			id: rows[0].id,
		});
	} catch (error) {
		response.status(500).json({ error: 'Inloggningen gick fel!' });
	}
};

exports.updateUserStatus = async (_request, response) => {
	const { user_id } = _request.body;

	if (!user_id) {
		return response.status(400).json({ message: 'User ID is required' });
	}

	try {
		const result = await client.query(
			`SELECT status FROM user_status WHERE user_id = $1`,
			[user_id]
		);

		if (result.rowCount === 0) {
			console.log(user_id);
			return response.status(404).json({ message: 'User not found' });
		}
		response.status(200).json({
			result: result,
			message: 'statusen för användaren är ändrad',
			id: user_id,
		});

		const currentStatus = result.rows[0].status;

		// Toggle status
		const isLoggedIn = !currentStatus;

		// if user is logged in
		if (isLoggedIn) {
			await client.query(
				`UPDATE user_status SET status = $1 WHERE user_id = $2`,
				[isLoggedIn, user_id]
			);
		} else {
			// user logged out, last_active row is updated too.
			await client.query(
				`UPDATE user_status SET status = $1, last_active = NOW() WHERE user_id = $2`,
				[isLoggedIn, user_id]
			);
		}
		// response.json({
		// 	message: `User status updated to ${isLoggedIn}`,
		// 	user_id: user_id,
		// 	newStatus: isLoggedIn,
		// 	LoggedOut: last_active,
		// });
	} catch (error) {
		console.error('Error updating user status:', error);
		response.status(500).json({ error: 'Internal server error' });
	}
};

exports.deleteUser = async (request, response) => {
	const { userId } = request.body;
	console.log('body', userId);
	try {
		await client.query('DELETE FROM users WHERE id =  $1', [userId]);
		response.status(200).json({
			message: 'Användare borttagen!',
		});
	} catch (error) {
		console.log(error);
		response.status(500).json({
			problem: 'Nu gick det inte att deleta kontakta email@enai.com',
			error: error.message,
		});
	}
};

exports.updateUserInfo = async (request, response) => {
	const { userId, ...updates } = request.body;
	console.log('body:', request.body);
	console.log('id:', userId);

	if (!userId) {
		return response.status(400).json({ message: 'No user ID' });
	}

	if (Object.keys(updates).length === 0) {
		return response.status(400).json({ message: 'No fields have data' });
	}

	const fields = Object.keys(updates);
	const values = Object.values(updates);

	const updateFields = fields
		.map((field, index) => `${field} = $${index + 1}`)
		.join(', ');

	try {
		const query = `UPDATE users SET ${updateFields} WHERE id = $${
			fields.length + 1
		} RETURNING *`;
		const result = await client.query(query, [...values, userId]);

		if (result.rowCount === 0) {
			console.log(userId);
			return response.status(404).json({ message: 'User not found' });
		}

		response.json({
			message: 'User info updated!',
			user: result.rows[0],
		});
	} catch (error) {
		console.error('Error updating user info:', error);
		response.status(500).json({ error: 'Server error' });
	}
};
