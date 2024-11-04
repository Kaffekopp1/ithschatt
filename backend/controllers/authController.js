const argon2 = require("argon2");
// const jwt = require("jsonwebtoken");

exports.registerUser = async (request_, response) => {
	try {
		const { username, password } = req.body;
		// const hashedPassword = await argon2.hash(password, 10);
		// res.status(201).json({
		// 	message: "En ny användare har lagts till!",
		// 	password: password,
		// 	username: username,
		// 	hashed: hashedPassword
		// });
		response.status(200).send({ endpoint: "framme" });
	} catch (error) {
		response.status(500).json({ error: "Registreringen blev fel!" });
	}
};
