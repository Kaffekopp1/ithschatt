const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const app = express(),
	port = 3000;

const cors = require("cors");

app.use(cors());
app.use(express.json());

const messageRoutes = require("./routes/messageRoutes");
const authRoutes = require("./routes/authRoutes");
const protectedRoutes = require("./routes/protectedRoutes");
app.use(messageRoutes);
app.use(authRoutes);
app.use(protectedRoutes);

app.get("/", (_request, response) => {
	response.send({ Hej: "Världen" });
});

// Endpoint om ni vill testa att db är kopplat
// app.get("/api", async (_request, response) => {
// 	const { rows } = await client.query("SELECT * FROM cities WHERE name = $1", [
// 		"Stockholm"
// 	]);

// 	response.send(rows);
// });

app.listen(port, () => {
	console.log(`Ready on http://localhost:${port}/`);
});
