import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const About = () => {
	return (
		<div>
			<h1>About</h1>
			<Link to="/store">
				<Button>Go to Store &rarr;</Button>
			</Link>
		</div>
	);
};

export default About;
