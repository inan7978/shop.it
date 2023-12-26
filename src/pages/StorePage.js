import { useState, useEffect } from "react";
import StoreCard from "../components/StoreCard";

function StorePage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function getRecords() {
      try {
        const response = await fetch(`http://localhost:3003/get-store-items`);

        if (!response.ok) {
          const message = `An error occurred: ${response.statusText}`;
          window.alert(message);
          return;
        }

        const records = await response.json();
        setItems(records);
        console.log(items);
      } catch (error) {
        setItems([]);
      }
    }

    getRecords();

    return;
  }, [items.length]);

  const storeItems = items.map((item) => {
    return <StoreCard key={item._id} item={item} />;
  });

  return (
    <div className="storePage-container">
      <div className="inventory-container">{storeItems}</div>
    </div>
  );
}

export default StorePage;
