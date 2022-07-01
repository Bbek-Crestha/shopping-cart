import { Col, Row } from "react-bootstrap";

import StoreItem from "../components/StoreItem";
import storeItems from "../data/Items.json";

const Store = () => {
	return (
		<div>
			<h1>Store</h1>

			<Row md={2} xs={1} lg={3} className="g-3">
				{storeItems.map((item) => {
					const { id, name, price, imgUrl } = item;
					return (
						<Col key={id}>
							<StoreItem {...item} />
						</Col>
					);
				})}
			</Row>
		</div>
	);
};

export default Store;
