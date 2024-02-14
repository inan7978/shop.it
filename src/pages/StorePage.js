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
    <div className="flex flex-col">
      <h1 className="mx-auto block text-4xl mt-16 font-bold">Whatchu need?</h1>
      <input
        type="text"
        id="item-search"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg mx-auto my-10 h-12 bg-gray-300"
        placeholder="(coming soon)"
      />
      <div>
        {storeItems.length ? (
          <div className="container flex flex-wrap justify-center gap-5 mt-5 mb-20 max-w-1920px mx-auto">
            {storeItems}
          </div>
        ) : (
          <div className="container flex flex-wrap justify-center gap-5 mt-5 mb-20 max-w-1920px mx-auto">
            <h1 className="mx-auto text-2xl font-bold">Loading...</h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default StorePage;
