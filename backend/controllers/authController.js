const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const client = require("../connectionDb.js");

exports.registerUser = async (_request, response) => {
	const { username, password, email } = _request.body;
	console.log("username", password, username, email);
	const hashedPassword = await argon2.hash(password, 10);
	try {
		await client.query(
			`INSERT INTO users (username, password_hash, email) VALUES ($1, $2, $3)`,
			[username, hashedPassword, email]
		);
		response.status(200).send({
			message: "En ny användare har lagts till!",
			password: email,
			username: username,
			hashed: hashedPassword
		});
	} catch (error) {
		response
			.status(500)
			.json({ problem: "Registreringen blev fel!", error: error });
	}
};

exports.loginUser = async (req, res) => {
	const { username, password } = req.body;
	try {
		const { rows } = await client.query(
			"SELECT * FROM users WHERE username = $1",
			[username]
		);
		if (!rows[0]) {
			return res
				.status(401)
				.json({ error: "Det gick inte att logga in med din användare!" });
		}
		let passwordfrom = rows[0].password_hash;
		const passwordMatch = await argon2.verify(passwordfrom, password);
		if (!passwordMatch) {
			return res.status(401).json({ error: "Ditt lösenord är inte korrekt!" });
		}
		const token = jwt.sign({ userId: rows[0]._id }, "your-secret-key", {
			expiresIn: "1h"
		});
		res.status(200).json({
			token,
			message: "Du är inloggad!"
		});
	} catch (error) {
		res.status(500).json({ error: "Inloggningen gick fel!" });
	}
};
