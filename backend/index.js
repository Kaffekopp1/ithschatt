const express = require("express");

const app = express(),
	port = 3000;

app.get("/", (_request, response) => {
	response.send({ Hej: "Världen" });
});

app.listen(port, () => {
	console.log(`Ready on http://localhost:${port}/`);
});
