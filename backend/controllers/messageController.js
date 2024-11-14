const client = require('../connectionDb.js');

exports.getMessages = async (_request, response) => {
	try {
		const { rows } = await client.query(
			`select * from messages ORDER BY id DESC LIMIT 5`
		);
		console.log('rows', rows);
		response.send({ messages: rows });
	} catch (error) {
		console.log('error', error);
		response.send({ error: error });
	}
};

exports.createMessages = async (_request, response) => {
	response.send({ message: 'Hej världen post' });
};
