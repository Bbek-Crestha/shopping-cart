import { createContext, ReactNode, useContext, useState } from "react";

import ShoppingCart from "../components/ShoppingCart";
import useLocalStorage from "../hooks/useLocalStorage";

type ShoppingCartProviderProps = {
	children: ReactNode;
};

type ShoppingCartContext = {
	openCart: () => void;
	closeCart: () => void;
	cartQty: number;
	cartItems: CartItem[];
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
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
		"shopping-cart",
		[]
	);

	const openCart = () => setIsOpen(true);

	const closeCart = () => setIsOpen(false);

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

	const cartQty = cartItems.reduce((qty, item) => item.qty + qty, 0);

	return (
		<shoppingCartContext.Provider
			value={{
				openCart,
				closeCart,
				getItemQty,
				increaseCartQty,
				decreaseCartQty,
				removeFromCart,
				cartQty,
				cartItems,
			}}
		>
			{children}

			<ShoppingCart isOpen={isOpen} />
		</shoppingCartContext.Provider>
	);
};

export { useShoppingCart, ShoppingCartProvider };
