import { Button, Stack } from "react-bootstrap";

import { useShoppingCart } from "../context/shoppingCartContext";
import storeItems from "../data/Items.json";
import formatCurrency from "../utilities/formatCurrency";

type CartItemProps = {
	id: number;
	qty: number;
};

const CartItem = ({ id, qty }: CartItemProps) => {
	const { removeFromCart } = useShoppingCart();
	const item = storeItems.find((item) => item.id === id);

	if (item == null) {
		return null;
	}

	return (
		<Stack direction="horizontal" gap={2} className="d-flex align-items-center">
			<img
				src={item.imgUrl}
				style={{ width: "125px", height: "75px", objectFit: "cover" }}
			/>

			<div className="me-auto">
				<div>
					{item.name}{" "}
					{qty > 0 && (
						<span className="text-muted" style={{ fontSize: ".65rem" }}>
							x{qty}
						</span>
					)}
				</div>

				<div className="text-muted" style={{ fontSize: ".75rem" }}>
					{formatCurrency(item.price)}
				</div>
			</div>
			<div>{formatCurrency(item.price * qty)}</div>

			<Button
				variant="outline-danger"
				size="sm"
				onClick={() => removeFromCart(id)}
			>
				&times;
			</Button>
		</Stack>
	);
};

export default CartItem;
