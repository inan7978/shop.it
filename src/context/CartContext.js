import { createContext, useState } from "react";
import UserContext from "../context/UserContext";
import { useContext } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const { user } = useContext(UserContext);
  const [cart, setCart] = useState([
    { item: 3324435, itemName: "Toothbrush", Price: 1, description: "Handy for nice teeth." },
    { item: 3324415, itemName: "Shirt", Price: 10, description: "Handy if you want to be served at restaurants." },
    { item: 3624435, itemName: "Socks", Price: 5, description: "Keep your dogs warm." },
    { item: 7324435, itemName: "Apple", Price: 1.5, description: "One of these a day keeps the doctor away." },
    { item: 7324435, itemName: "Onion", Price: 1.5, description: "One of these keeps EVERYONE away." },
    { item: 7324435, itemName: "Chocolate", Price: 1.5, description: "A tasty dessert." },
    { item: 7324435, itemName: "Water", Price: 1.5, description: "You are 60% of it. Make sure you drink enough." },
    { item: 7324435, itemName: "Cigarettes", Price: 1.5, description: "Everyone needs one every now and then." },
  ]);

  function loadCart() {
    if (user.fname === "inan") {
      return cart;
    } else {
      return [];
    }
  }

  function addToCart() {}

  function removeFromCart() {}

  return (
    <CartContext.Provider value={{ cart, loadCart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;
