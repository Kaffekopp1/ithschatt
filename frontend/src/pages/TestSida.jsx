export default function TestSida() {
	async function fetchMoviesJSON() {
		const response = await fetch('/api/messages');
		console.log('response', response);
		const movies = await response.json();
		console.log('movies', movies);
	}

	return (
		<div>
			TestSida
			<button onClick={fetchMoviesJSON}>Test</button>
		</div>
	);
}
