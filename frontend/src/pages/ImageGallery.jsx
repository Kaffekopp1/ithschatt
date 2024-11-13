import { useNavigate } from 'react-router-dom';
import AuthContext from '../AuthContext';
import { useContext } from 'react';
// import { LazyLoadImage } from 'react-lazy-load-image-component';
// import image1 from './assets/images/image1';

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
			{/* <LazyLoadImage
				alt="Beskrivande text för bilden"
				height={800}
				src={image1}
				width={300}
				// effect="blur"
			/> */}
			<p>Navigate to chat:</p>
			<button onClick={test}>Chat</button>
		</div>
	);
}
