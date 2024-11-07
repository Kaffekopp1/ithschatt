const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const client = require("../connectionDb.js");

exports.registerUser = async (request, response) => {
  const { username, password, email } = request.body;
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
      hashed: hashedPassword,
    });
  } catch (error) {
    response
      .status(500)
      .json({ problem: "Registreringen blev fel!", error: error });
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
    const token = jwt.sign({ userId: rows[0]._id }, "your-secret-key", {
      expiresIn: "1h",
    });
    response.status(200).json({
      token,
      message: "Du är inloggad!",
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

    const currentStatus = checkStatusResult.rows[0].status;

    // Växla status (omvända nuvarande värde)
    const newStatus = !currentStatus;

    await client.query(
      `UPDATE user_status SET status = $1 WHERE user_id = $2`,
      [newStatus, user_id]
    );

    response.json({
      message: `User status updated to ${newStatus}`,
      user_id: user_id,
      newStatus: newStatus,
    });
    console.log("user_id newStatus :>> ", user_id, newStatus);
  } catch (error) {
    console.error("Error updating user status:", error);
    response.status(500).json({ error: "Internal server error" });
  }
};
