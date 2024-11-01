const express = require("express");

const app = express(),
	port = 3000;

const messageRoutes = require("./routes/messageRoutes");
app.use(messageRoutes);

app.get("/", (_request, response) => {
	response.send({ Hej: "Världen" });
});
app.get("/api", (_request, response) => {
	response.send({ hello: "Detta är ett test från backend" });
});

app.listen(port, () => {
	console.log(`Ready on http://localhost:${port}/`);
});
