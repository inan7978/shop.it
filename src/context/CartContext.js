import { createContext, useState } from "react";
import UserContext from "../context/UserContext";
import { useContext } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const { user } = useContext(UserContext);
  const [cart, setCart] = useState([
    { item: 3324435, itemName: "Toothbrush", Price: 1 },
    { item: 3324415, itemName: "Shirt", Price: 10 },
    { item: 3624435, itemName: "Socks", Price: 5 },
    { item: 7324435, itemName: "Apple", Price: 1.5 },
  ]);

  function loadCart() {}

  function addToCart() {}

  function removeFromCart() {}

  return (
    <CartContext.Provider value={{ cart, loadCart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;
