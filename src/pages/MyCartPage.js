import UserContext from "../context/UserContext";
import ItemCard from "../components/ItemCard";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function MyCartPage() {
  const { loadCart } = useContext(UserContext);
  const { removeFromCart, setQuantity } = useContext(UserContext);
  const [items, setItems] = useState(loadCart());
  const navigate = useNavigate();

  const listItems = items.map((item) => {
    return (
      <div key={item.itemID}>
        <h3>
          {item.itemID} || {item.quantity}
        </h3>
        <button
          onClick={() => {
            removeFromCart(item.itemID);
            setItems(loadCart());
          }}
        >
          Remove
        </button>
        <button
          onClick={() => {
            if (item.quantity - 1 === 0) {
              removeFromCart(item.itemID);
              setItems(loadCart());
            } else {
              setQuantity(item.itemID, item.quantity - 1);
              setItems(loadCart());
            }
          }}
        >
          Subtract one
        </button>
        <button
          onClick={() => {
            setQuantity(item.itemID, item.quantity + 1);
            setItems(loadCart());
          }}
        >
          Add one
        </button>
      </div>
    );
  });

  return listItems.length ? (
    <div>{listItems}</div>
  ) : (
    <div>
      <h2>Add something!</h2>
      <button
        onClick={() => {
          navigate("../store-page");
        }}
      >
        Go to Store!
      </button>
    </div>
  );
}

export default MyCartPage;
