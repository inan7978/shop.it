import { useState, useEffect } from "react";
import StoreCard from "../components/StoreCard";
import SearchBox from "../components/SearchBox";
import { _getRecords } from "../api/storePageAPI";

function StorePage() {
  const [items, setItems] = useState([]);

  async function getRecords() {
    const result = await _getRecords();
    setItems(result);
  }

  useEffect(() => {
    getRecords();
  }, []);

  const storeItems = items.map((item) => {
    return <StoreCard key={item._id} item={item} />;
  });

  return (
    <div className="flex flex-col">
      <h1 className="mx-auto block text-4xl mt-16 font-bold">Whatchu need?</h1>
      <SearchBox />
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
