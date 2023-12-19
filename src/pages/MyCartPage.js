import UserContext from "../context/UserContext";
import CartContext from "../context/CartContext";
import ItemCard from "../components/ItemCard"
import { useContext } from "react";
function MyCartPage() {
  const { loadCart } = useContext(CartContext);

  const cart = loadCart();

  const cartItems = cart.map((item) => {
    // return <h2 key={item.item}>{item.itemName}</h2>;
    return <ItemCard key={item.item} item={item} />
  });
  return (
    <>{cart.length ? <div className="item-cards-container">{cartItems}</div> : <div>Your cart is empty</div>}</>
  );
}

export default MyCartPage;
