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

  useEffect(() => {
    setCart(user.cart);
  }, [user.cart]);

  function updateCart() {
    const res = fetch("http://localhost:3003/add-to-cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userID: user._id, newCart: cart }),
    })
      .then((response) => {
        if (response.ok) {
          return response;
        } else {
          throw Error;
        }
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  }

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
    console.log("Before: " + JSON.stringify(cart));
    setCart([...cart, { itemID: item._id, quantity: 1 }]);
    console.log("After: " + JSON.stringify(cart));
    updateCart();
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
