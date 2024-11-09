const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const client = require("../connectionDb.js");

exports.registerUser = async (request, response) => {
	const { username, password, email } = request.body;
	console.log("username", request.body);

	const hashedPassword = await argon2.hash(password, 10);

	try {
		// Start transaction
		await client.query("BEGIN");

		const result = await client.query(
			`INSERT INTO users (username, password_hash, email) VALUES ($1, $2, $3) RETURNING id`,
			[username, hashedPassword, email]
		);

		const userId = result.rows[0].id;

		await client.query(
			`INSERT INTO user_status (user_id, status) VALUES ($1, $2)`,
			[userId, false] // status default false
		);

		// Commit transaction
		await client.query("COMMIT");

		response.status(200).send({
			message: "En ny användare har lagts till!",
			username: username,
			email: email
		});
	} catch (error) {
		// Rollback if something is missing
		await client.query("ROLLBACK");
		response.status(500).json({
			problem: "Registreringen blev fel!",
			error: error.message
		});
	}
};

exports.loginUser = async (_request, response) => {
	const { username, email, password } = _request.body;
	try {
		const { rows } = await client.query(
			"SELECT * FROM users WHERE username = $1",
			[username]
		);
		if (!rows[0]) {
			return response
				.status(401)
				.json({ error: "Det gick inte att logga in med din användare!" });
		}
		let passwordfrom = rows[0].password_hash;
		const passwordMatch = await argon2.verify(passwordfrom, password);
		if (!passwordMatch) {
			return response
				.status(401)
				.json({ error: "Ditt lösenord är inte korrekt!" });
		}
		console.log("rowns", rows[0].id, rows[0]._id);
		const token = jwt.sign({ userId: rows[0].id }, "your-secret-key", {
			expiresIn: "1h"
		});
		response.status(200).json({
			token,
			message: "Du är inloggad!",
      id: rows[0].id
		});
	} catch (error) {
		response.status(500).json({ error: "Inloggningen gick fel!" });
	}
};

exports.updateUserStatus = async (_request, response) => {
	const { user_id } = _request.body;

	if (!user_id) {
		return response.status(400).json({ message: "User ID is required" });
	}

	try {
		const result = await client.query(
			`SELECT status FROM user_status WHERE user_id = $1`,
			[user_id]
		);

		if (result.rowCount === 0) {
			console.log(user_id);
			return response.status(404).json({ message: "User not found" });
		}

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

		response.json({
			message: `User status updated to ${isLoggedIn}`,
			user_id: user_id,
			newStatus: isLoggedIn
		});
	} catch (error) {
		console.error("Error updating user status:", error);
		response.status(500).json({ error: "Internal server error" });
	}
};

exports.deleteUser = async (request, response) => {
	const { userId } = request.body;
	console.log("body", userId);
	try {
		await client.query("DELETE FROM users WHERE id =  $1", [userId]);
		response.status(200).json({
			message: "Användare borttagen!"
		});
	} catch (error) {
		console.log(error);
		response.status(500).json({
			problem: "Nu gick det inte att deleta kontakta email@enai.com",
			error: error.message
		});
	}
};
