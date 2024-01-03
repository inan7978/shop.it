import UserContext from "../context/UserContext";
import ItemCard from "../components/ItemCard";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function MyCartPage() {
  const { loadCart } = useContext(UserContext);
  const { removeFromCart } = useContext(UserContext);
  const [items, setItems] = useState(loadCart());

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
      </div>
    );
  });

  return <div>{listItems}</div>;
}

export default MyCartPage;
