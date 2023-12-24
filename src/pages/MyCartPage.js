import UserContext from "../context/UserContext";
import CartContext from "../context/CartContext";
import ItemCard from "../components/ItemCard";
import { useContext } from "react";
function MyCartPage() {
  const { loadCart } = useContext(CartContext);

  const cart = loadCart();

  const cartItems = cart.map((item) => {
    return <ItemCard key={item.item} item={item} />;
  });
  return (
    <>
      {cart.length ? (
        <div className="cart-page-container">
          <div className="item-cards-container">{cartItems}</div>
          <div className="total-costs">
            <h3>Sub Total: $45.11</h3>
            <h3>Tax: $1.54</h3>
            <h3>Rewards: $0.00</h3>
            <h3>Fees: $0.00</h3>
            <h3>Shipping: $4.94</h3>
            <h2>Grand Total: $51.59</h2>
            <button className="order-btn btn-submit">Place Order!</button>
          </div>
        </div>
      ) : (
        <div>Your cart is empty</div>
      )}
    </>
  );
}

export default MyCartPage;
