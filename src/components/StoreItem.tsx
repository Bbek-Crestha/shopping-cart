import { Button, Card } from "react-bootstrap";
import { useShoppingCart } from "../context/shoppingCartContext";

import formatCurrency from "../utilities/formatCurrency";

type StoreItemProps = {
	id: number;
	name: string;
	price: number;
	imgUrl: string;
};

const StoreItem = (props: StoreItemProps) => {
	const { id, name, price, imgUrl } = props;
	const { getItemQty, increaseCartQty, decreaseCartQty, removeFromCart } =
		useShoppingCart();

	const quantity = getItemQty(id);

	return (
		<Card className="h-100">
			<Card.Img
				variant="top"
				src={imgUrl}
				height="200px"
				style={{ objectFit: "cover" }}
			/>

			<Card.Body className="d-flex flex-column">
				<Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
					<span className="fs-2">{name}</span>
					<span className="ms-2 text-muted">{formatCurrency(price)}</span>
				</Card.Title>

				<div className="mt-auto">
					{quantity === 0 ? (
						<Button className="w-100" onClick={() => increaseCartQty(id)}>
							+ Add To Cart
						</Button>
					) : (
						<div
							className="d-flex flex-column align-items-center"
							style={{ gap: ".5rem" }}
						>
							<div
								className="d-flex align-items-center justify-content-center"
								style={{ gap: ".5rem" }}
							>
								<Button onClick={() => decreaseCartQty(id)}>-</Button>
								<div>
									<span className="fs-3">{quantity}</span> in cart
								</div>
								<Button onClick={() => increaseCartQty(id)}>+</Button>
							</div>
							<Button
								variant="danger"
								size="sm"
								onClick={() => removeFromCart(id)}
							>
								Remove
							</Button>
						</div>
					)}
				</div>
			</Card.Body>
		</Card>
	);
};

export default StoreItem;
