import { createContext, ReactNode, useContext, useState } from "react";

type ShoppingCartProviderProps = {
	children: ReactNode;
};

type ShoppingCartContext = {
	getItemQty: (id: number) => number;
	increaseCartQty: (id: number) => void;
	decreaseCartQty: (id: number) => void;
	removeFromCart: (id: number) => void;
};

type CartItem = {
	id: number;
	qty: number;
};

const shoppingCartContext = createContext({} as ShoppingCartContext);

const useShoppingCart = () => {
	return useContext(shoppingCartContext);
};

const ShoppingCartProvider = ({ children }: ShoppingCartProviderProps) => {
	const [cartItems, setCartItems] = useState<CartItem[]>([]);

	const getItemQty = (id: number) => {
		return cartItems.find((item) => item.id === id)?.qty || 0;
	};

	const increaseCartQty = (id: number) => {
		setCartItems((currItems) => {
			if (currItems.find((item) => item.id === id) == null) {
				return [...currItems, { id, qty: 1 }];
			} else {
				return currItems.map((item) => {
					if (item.id === id) {
						return {
							...item,
							qty: item.qty + 1,
						};
					} else {
						return item;
					}
				});
			}
		});
	};

	const decreaseCartQty = (id: number) => {
		setCartItems((currItems) => {
			if (currItems.find((item) => item.id === id)?.qty === 1) {
				return currItems.filter((item) => item.id !== id);
			} else {
				return currItems.map((item) => {
					if (item.id === id) {
						return {
							...item,
							qty: item.qty - 1,
						};
					} else {
						return item;
					}
				});
			}
		});
	};

	const removeFromCart = (id: number) => {
		setCartItems((currItems) => {
			return currItems.filter((item) => item.id !== id);
		});
	};

	return (
		<shoppingCartContext.Provider
			value={{ getItemQty, increaseCartQty, decreaseCartQty, removeFromCart }}
		>
			{children}
		</shoppingCartContext.Provider>
	);
};

export { useShoppingCart, ShoppingCartProvider };
