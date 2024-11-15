const express = require('express');
const dotenv = require('dotenv');
const { Server } = require('socket.io');
const http = require('http');
dotenv.config();
const client = require('./connectionDb.js');
const app = express(),
	port = 3000;

const cors = require('cors');
const server = http.createServer(app);

app.use(
	cors({
		origin: 'http://frontend',
		methods: ['GET', 'POST'],
	})
);
app.use(express.json());

const io = new Server(server, {
	cors: {
		origin: 'nothing here',
		methods: ['GET', 'POST'],
	},
});
io.on('connection', (socket) => {
	console.log(`A user connected: ${socket.id}`);
	socket.on('send_message', async (data) => {
		let messageData = [];
		try {
			await client.query(
				`INSERT INTO messages (sender_id, content )VALUES($1,$2)`,
				[data.user_id, data.content]
			);
		} catch (error) {
			console.log('error', error);
			socket.broadcast.emit('receive_message', error);
		}

		socket.broadcast.emit('receive_message', data);
	});

	socket.on('disconnect', () => {
		console.log(`User disconnected: ${socket.id}`);
	});
});

const messageRoutes = require('./routes/messageRoutes');
const authRoutes = require('./routes/authRoutes');
const protectedRoutes = require('./routes/protectedRoutes');
app.use(messageRoutes);
app.use(authRoutes);
app.use(protectedRoutes);

app.get('/', (_request, response) => {
	response.json({ hello: 'Världen' });
});
server.listen(4000, () => {
	console.log('Listening on *:4000');
});
