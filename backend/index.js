const express = require("express");

const app = express(),
	port = 3000;
const cors = require("cors");
const messageRoutes = require("./routes/messageRoutes");
const authRoutes = require("./routes/authRoutes");
app.use(messageRoutes);
app.use(authRoutes);

app.get("/", (_request, response) => {
	response.send({ Hej: "Världen" });
});
app.get("/api", (_request, response) => {
	response.send({ hello: "Detta är ett test från backend" });
});

app.listen(port, () => {
	console.log(`Ready on http://localhost:${port}/`);
});
