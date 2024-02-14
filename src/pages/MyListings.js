import { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import ItemListing from "../components/ItemListing";

function MyListings() {
  const { getUserID } = useContext(UserContext);
  const [details, setDetails] = useState();
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadDetails();
  }, []);

  async function loadDetails() {
    const owner = await getUserID();
    console.log("loadDetails has been called");
    let details = [];

    const toFind = {
      owner: owner,
    };

    await fetch("https://shop-it-backend.onrender.com/get-listing-items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(toFind),
    })
      .then((response) => {
        if (response.ok) {
          return response;
        } else {
          throw Error;
        }
      })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        details = data;
        console.log("This is the data to map: ", details);
      })
      .catch((error) => {
        console.log(error);
        details = ["nothing arrived"];
      });

    setDetails(details);
    setLoaded(true);
  }
  // return <div>{mappedListings}</div>;

  if (loaded) {
    const showListings = details
      ? details.map((listing) => {
          return <ItemListing key={listing._id} item={listing} />;
        })
      : null;

    return (
      <div>
        <h1 className="text-center my-12 text-3xl font-bold">
          Your Listings 👇
        </h1>
        {showListings.length ? (
          <div>{showListings}</div>
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
  } else {
    return <div>Loading...</div>;
  }
}

export default MyListings;
