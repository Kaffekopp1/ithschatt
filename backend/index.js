const express = require('express');
const dotenv = require('dotenv');
const { Server } = require('socket.io');
const http = require('http');
dotenv.config();

const app = express(),
	port = 3000;

const cors = require('cors');
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

// ändra till 5173 vid localt.
const io = new Server(server, {
	cors: { origin: 'http://localhost:80', methods: ['GET', 'POST'] },
});

io.on('connection', (socket) => {
	console.log(`A user connected: ${socket.id}`);
	socket.on('send_message', (data) => {
		console.log('data', data);
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
app.listen(port, () => {
	console.log(`Ready on http://localhost:${port}/`);
});
