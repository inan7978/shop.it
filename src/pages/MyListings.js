import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ItemListing from "../components/ItemListing";
import { _loadDetails } from "../api/myListingsAPI";
import Cookies from "js-cookie";

function MyListings() {
  const [details, setDetails] = useState();
  const token = Cookies.get("user-token-shopit");
  const navigate = useNavigate();

  useEffect(() => {
    loadDetails();
  }, []);

  async function loadDetails() {
    console.log("loadDetails has been called");
    const data = await _loadDetails(token);
    setDetails(data.data);
  }

  const showListings = details ? (
    details.map((listing) => {
      return <ItemListing key={listing._id} item={listing} />;
    })
  ) : (
    <div className="container flex flex-wrap justify-center gap-5 mt-5 mb-20 max-w-1920px mx-auto">
      <h1 className="mx-auto text-2xl font-bold">Loading...</h1>{" "}
    </div>
  );

  return (
    <div>
      <h1 className="text-center my-12 text-3xl font-bold">Your Listings 👇</h1>
      {showListings.length ? (
        <div className="flex flex-col">
          <div>{showListings}</div>
          <button
            className="p-3 bg-green-500 text-white rounded text-2xl mx-auto"
            onClick={() => {
              navigate("../list-item");
            }}
          >
            + Add Listing
          </button>
        </div>
      ) : (
        <div className="container flex flex-col items-center mx-auto">
          <h2 className="text-3xl font-medium my-10">
            You have no listings! Oh no!
          </h2>
          <button
            className="p-3 bg-green-500 text-white rounded text-2xl"
            onClick={() => {
              navigate("../list-item");
            }}
          >
            List something!
          </button>
        </div>
      )}
    </div>
  );
}

export default MyListings;
