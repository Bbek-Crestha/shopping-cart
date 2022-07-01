import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
	return (
		<div>
			<h1>Home</h1>
			<Link to="/store">
				<Button>Go to Store &rarr;</Button>
			</Link>
		</div>
	);
};

export default Home;
