import { useState, useEffect } from "react";
import StoreCard from "../components/StoreCard";

function StorePage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function getRecords() {
      try {
        const response = await fetch(
          `https://shop-it-backend.onrender.com/get-store-items`
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
    return <StoreCard key={item._id} item={item} />;
  });

  return (
    <div>
      {storeItems.length ? (
        <div className="flex flex-wrap justify-center gap-5 my-5 basis-1/2">
          {storeItems}
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
}

export default StorePage;
