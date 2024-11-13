import { useNavigate } from 'react-router-dom';
import AuthContext from '../AuthContext';
import { useContext } from 'react';
export default function ImageGallery() {
	const navigate = useNavigate();
	const { user } = useContext(AuthContext);
	function test() {
		navigate('/homepage');
	}
	return (
		<div>
			<h1>ImageGallery</h1>
			<p>Hi how are you {user}, look at amazing pictures:</p>
			<p>Navigate to chat:</p>
			<button onClick={test}>Chat</button>
		</div>
	);
}
