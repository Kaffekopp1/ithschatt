import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import AuthContext from '../AuthContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
export default function HomePage() {
	const [message, setMessage] = useState('exapmple');
	const [incomming, setIncomming] = useState([]);
	const [arri, setArri] = useState([]);
	const navigate = useNavigate();
	const { user } = useContext(AuthContext);

	const socket = io.connect('/');

	function sendMessage() {
		socket.emit('send_message', { message: message });
	}
	useEffect(() => {
		socket.on('receive_message', (data) => {
			console.log('data', data);
			setIncomming(data.message);
			setArri([...arri, data.message]);
			console.log('data.message', data.message);
		});
	}, [socket]);
	function test() {
		navigate('/bildgalleri');
	}
	function show() {
		console.log('incomming', arri);
	}

	return (
		<div>
			<div className="App">
				<input
					placeholder="Message"
					value={message}
					onChange={(event) => setMessage(event.target.value)}
				/>

				<button onClick={sendMessage}>Send message</button>
			</div>
			<button onClick={test}>imagegallery</button>
			<button onClick={show}>show</button>
		</div>
	);
}
