import { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import { useNavigate, useNavigation } from "react-router-dom";
import ItemListing from "../components/ItemListing";

function MyListings() {
  const { loadListings } = useContext(UserContext);
  const { getUserID } = useContext(UserContext);
  const [trigger, setTrigger] = useState([""]);
  const [details, setDetails] = useState();
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();

  // const mappedListings = listings.map((listing) => {
  //   return <h2 key={listing}>{listing}</h2>;
  // });

  useEffect(() => {
    loadDetails();
  }, [trigger]);

  async function loadDetails() {
    const owner = await getUserID();
    console.log("loadDetails has been called");
    let details = [];

    const toFind = {
      owner: owner,
    };

    await fetch("http://localhost:3003/get-listing-items", {
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
          return (
            // <h2 key={listing._id}>
            //   {listing.title} {listing.description}
            // </h2>
            <ItemListing key={listing._id} item={listing} />
          );
        })
      : null;

    return showListings.length ? (
      <div>{showListings}</div>
    ) : (
      <div>
        <h2>Add something!</h2>
        <button
          onClick={() => {
            navigate("../store-page");
          }}
        >
          List something!
        </button>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
}

export default MyListings;
