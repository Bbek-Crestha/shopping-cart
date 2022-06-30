import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";

import Home from "./pages/Home";
import Store from "./pages/Store";
import About from "./pages/About";

function App() {
	return (
		<BrowserRouter>
			<Container>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/store" element={<Store />} />
					<Route path="/about" element={<About />} />
				</Routes>
			</Container>
		</BrowserRouter>
	);
}

export default App;
