// import { createContext, useState } from "react";
// import UserContext from "../context/UserContext";
// import { useContext, useEffect } from "react";

// const CartContext = createContext();

// export function CartProvider({ children }) {
//   const { user } = useContext(UserContext);
//   const [cart, setCart] = useState([user.cart]);

//   useEffect(() => {
//     setCart(user.cart);
//   }, [user.cart]);

//   // console.log("Current cart: " + JSON.stringify(cart));

//   useEffect(() => {
//     updateCart();
//     console.log("Update cart useEffect has been invoked.");
//   }, [cart]);

//   function loadCart() {
//     return cart;
//   }

//   function inCartAlr(item) {
//     for (let i = 0; i < cart.length; i++) {
//       if (cart[i].itemID === item._id) {
//         return [true, i];
//       }
//     }
//     return [false, -1];
//   }

//   function addToCart(itemToAdd) {
//     const [exists, position] = inCartAlr(itemToAdd);
//     console.log("Already in cart? " + exists + " | Position: " + position);

//     if (exists) {
//       cart[position] = {
//         itemID: itemToAdd._id,
//         quantity: cart[position].quantity + 1,
//       };
//       setCart([...cart]);
//       // updateCart();
//     } else {
//       setCart([...cart, { itemID: itemToAdd._id, quantity: 1 }]);
//       // updateCart();
//     }
//   }

//   function removeFromCart() {}

//   return (
//     <CartContext.Provider
//       value={{ isLoggedIn, loadCart, addToCart, removeFromCart, cartSize }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// }

// export default CartContext;
