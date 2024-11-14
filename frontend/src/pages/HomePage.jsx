// import { useEffect, useState } from 'react';
// import io from 'socket.io-client';
// import AuthContext from '../AuthContext';
// import { useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
import { ChatWindow } from '../components/ChatWindow';
// const socket = io.connect('http://localhost:4000');

export default function HomePage() {
	// const [message, setMessage] = useState('exapmple');
	// const [arri, setArri] = useState([]);
	// const navigate = useNavigate();
	// const { user } = useContext(AuthContext);
	// const [messages, setReceiveMessage] = useState();

	// async function sendMessage() {
	// 	socket.emit('send_message', { message: message });
	// }

	// useEffect(() => {
	// 	socket.on('receive_message', (data) => {
	// 		setArri([...arri, data.message]);
	// 	});
	// 	return () => {
	// 		socket.off('receive_message');
	// 	};
	// }, [arri]);

	// function test() {
	// 	navigate('/bildgalleri');
	// }
	// function show() {
	// 	console.log('incomming', arri);
	// }

	return (
		<div>
			<div className="App">
				<ChatWindow></ChatWindow>
			</div>
		</div>
	);
}
