import { useState, useEffect } from "react";
import StoreCard from "../components/StoreCard";

function StorePage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function getRecords() {
      try {
        const response = await fetch(
          `http://144.126.248.93:3003/get-store-items`
        );

        if (!response.ok) {
          const message = `An error occurred: ${response.statusText}`;
          window.alert(message);
          return;
        }

        const records = await response.json();
        setItems(records);
      } catch (error) {
        setItems([]);
      }
    }

    getRecords();

    return;
  }, []);

  const storeItems = items.map((item) => {
    return <StoreCard className="store-card" key={item._id} item={item} />;
  });

  return (
    <div className="storePage-container">
      {storeItems.length ? (
        <div className="inventory-container">{storeItems}</div>
      ) : (
        <h1>Nothing here</h1>
      )}
    </div>
  );
}

export default StorePage;
