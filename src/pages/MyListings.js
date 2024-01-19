import { useContext } from "react";
import UserContext from "../context/UserContext";

function MyListings() {
  const { user } = useContext(UserContext);
  const listings = user.listings;
  console.log("Listings-user: ", user.listings);

  const mapListings = listings
    ? listings.map((listing) => {
        return <h1>{listing}</h1>;
      })
    : null;
  return <div>{mapListings}</div>;
}

export default MyListings;
