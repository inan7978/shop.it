import UserContext from "../context/UserContext";
import CartContext from "../context/CartContext";
import { useContext } from "react";
function MyCartPage() {
  const { loadCart } = useContext(CartContext);

  const cart = loadCart();

  const cartItems = cart.map((item) => {
    return <h2 key={item.item}>{item.itemName}</h2>;
  });
  return (
    <>{cart.length ? <div>{cartItems}</div> : <div>Your cart is empty</div>}</>
  );
}

export default MyCartPage;
