const { Client } = require("pg");

const client = new Client({
	connectionString: process.env.PGURI
});

client.connect();

module.exports = client;
