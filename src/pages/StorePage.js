import { useState, useEffect } from "react";
import StoreCard from "../components/StoreCard";
import useFetch from "../components/useFetch";
import SearchBox from "../components/SearchBox";

function StorePage() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

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

  useEffect(() => {
    const toFind = { search: search };
    async function searchItem() {
      const response = await fetch(
        "https://shop-it-backend.onrender.com/search-results",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(toFind),
        }
      );

      const data = await response.json();
      const dataMod = JSON.parse(JSON.stringify(data));

      console.log("Search Results: ", dataMod);
      setSearchResults(dataMod);
    }

    searchItem();
  }, [search]);

  const storeItems = items.map((item) => {
    return <StoreCard key={item._id} item={item} />;
  });

  const temp = search
    ? searchResults.map((result) => {
        return (
          <div
            className="flex gap-3 items-center bg-theBlue
            p-2 rounded w-64 mt-3"
            key={result.title}
          >
            <img className="h-10 w-10 rounded" src={result.imgURL[0]} />
            <h2 className="text-white font-bold">{result.title}</h2>
          </div>
        );
      })
    : null;

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
