import { useState, useEffect } from "react";
import StoreCard from "../components/StoreCard";
import SearchBox from "../components/SearchBox";
import { _getRecords } from "../api/storePageAPI";
import { useNavigate } from "react-router-dom";

function StorePage() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  async function getRecords() {
    const result = await _getRecords();
    console.table(result);
    console.trace(result);
    setItems(result);
  }

  useEffect(() => {
    getRecords();
  }, []);

  // const storeItems = items.map((item) => {
  //   return <StoreCard key={item._id} item={item} />;
  // });

  return (
    <div className="bg-white">
      <SearchBox />
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-3xl text-center pb-16">New Items!</h2>

        <div className="grid grid-cols-item-6 gap-y-10 gap-x-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {items ? (
            items.map((item) => (
              <div
                key={item._id}
                className="group"
                onClick={(e) => {
                  // e.stopPropagation();
                  e.preventDefault();
                  console.log(
                    `${item.title} with ID ${item._id} has been clicked.`
                  );
                  navigate(`../item-details-page/${item._id}`, {
                    state: {
                      id: item._id,
                    },
                  });
                }}
              >
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                  <img
                    src={item.imgURL[0]}
                    alt={item.imageAlt}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <h3 className="mt-4 text-sm text-gray-700">{item.title}</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">
                  ${item.price.$numberDecimal}
                </p>
              </div>
            ))
          ) : (
            <>An error has occured.</>
          )}
        </div>
      </div>
    </div>
  );
}

export default StorePage;
