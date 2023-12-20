import UserContext from "../context/UserContext";
import CartContext from "../context/CartContext";
import ItemCard from "../components/ItemCard";
import { useContext } from "react";
function MyCartPage() {
  const { loadCart } = useContext(CartContext);

  const cart = loadCart();

  const cartItems = cart.map((item) => {
    // return <h2 key={item.item}>{item.itemName}</h2>;
    return <ItemCard key={item.item} item={item} />;
  });
  return (
    <>
      {cart.length ? (
        <div className="cart-page-container">
          <div className="item-cards-container">{cartItems}</div>
          <div className="total-costs">
            <h3>Sub Total:</h3>
            <h3>Tax:</h3>
            <h3>Rewards:</h3>
            <h3>Fees:</h3>
            <h3>Shipping:</h3>
            <h2>Grand Total:</h2>
          </div>
        </div>
      ) : (
        <div>Your cart is empty</div>
      )}
    </>
  );
}

export default MyCartPage;
