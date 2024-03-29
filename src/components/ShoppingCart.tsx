import { Offcanvas, Stack } from "react-bootstrap";

import { useShoppingCart } from "../context/shoppingCartContext";
import formatCurrency from "../utilities/formatCurrency";
import CartItem from "./CartItem";
import storeItems from "../data/Items.json";

type ShoppingCartProps = {
	isOpen: boolean;
};

const ShoppingCart = ({ isOpen }: ShoppingCartProps) => {
	const { closeCart, cartItems } = useShoppingCart();

	return (
		<Offcanvas show={isOpen} onHide={closeCart} placement="end">
			<Offcanvas.Header closeButton>
				<Offcanvas.Title>Cart</Offcanvas.Title>
			</Offcanvas.Header>

			<Offcanvas.Body>
				<Stack gap={3}>
					{cartItems.map((item) => (
						<CartItem key={item.id} {...item} />
					))}

					<div className="ms-auto fw-bold fs-5">
						Total{" "}
						{formatCurrency(
							cartItems.reduce((total, cartItem) => {
								const item = storeItems.find((item) => item.id === cartItem.id);

								return total + (item?.price || 0) * cartItem.qty;
							}, 0)
						)}
					</div>
				</Stack>
			</Offcanvas.Body>
		</Offcanvas>
	);
};

export default ShoppingCart;
