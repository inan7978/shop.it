import { createContext, useState } from "react";
import UserContext from "../context/UserContext";
import { useContext, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const { user } = useContext(UserContext);
  const [cart, setCart] = useState([
    { itemID: "6ttryyt", quantity: 2 },
    { itemID: "6rrryyt", quantity: 5 },
    { itemID: "6rpryyt", quantity: 5 },
  ]);

  let testing = [];

  useEffect(() => {
    setCart(user.cart);
  });

  function loadCart() {
    return cart;
  }

  function isLoggedIn() {
    if (Object.keys(user).length > 1) {
      return true;
    } else {
      return false;
    }
  }

  function addToCart(item) {
    testing.push(item);
    console.log(testing);
  }

  function removeFromCart() {}

  return (
    <CartContext.Provider
      value={{ isLoggedIn, loadCart, addToCart, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;
