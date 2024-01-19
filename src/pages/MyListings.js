import { useContext } from "react";
import UserContext from "../context/UserContext";

function MyListings() {
  const { loadListings } = useContext(UserContext);
  const listings = loadListings();

  const mappedListings = listings.map((listing) => {
    return <h2 key={listing}>{listing}</h2>;
  });
  return <div>{mappedListings}</div>;
}

export default MyListings;
