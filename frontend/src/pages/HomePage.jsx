import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { ChatWindow } from '../components/ChatWindow';

export default function HomePage() {
	const socket = io.connect('http://localhost:4000');
	const [message, setMessage] = useState('exapmple');
	const [incomming, setIncomming] = useState('');

	function sendMessage() {
		socket.emit('send_message', { message: message });
	}
	useEffect(() => {
		socket.on('receive_message', (data) => {
			setIncomming(data.message);
			console.log('data.message', data.message);
		});
	}, [socket]);

	return (
		<div>
			<div className="App">
				<input
					placeholder="Message"
					value={message}
					onChange={(event) => setMessage(event.target.value)}
				/>
				{incomming}
				<button onClick={sendMessage}>Send message</button>
				<ChatWindow />
			</div>
		</div>
	);
}
