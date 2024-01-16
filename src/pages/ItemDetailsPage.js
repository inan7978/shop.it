import { useLocation } from "react-router-dom";
import UserContext from "../context/UserContext";
import { useContext } from "react";

function ItemDetailPage() {
  const { state } = useLocation();
  const { item, description, price, imgURL, id } = state;
  const { addToCart } = useContext(UserContext);

  const modPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);

  return (
    <>
      <div className="item-detail-container">
        {/* needs to be changed to carousel through all the images */}
        <img className="item-description-img" src={imgURL[0]} alt={`${item}`} />
        <div className="item-info-container">
          <h1>{item}</h1>
          <h2>{modPrice}</h2>
          <p>{description}</p>
        </div>
        <button
          className="btn-submit"
          onClick={() => {
            addToCart(id);
          }}
        >
          Add to Cart
        </button>
      </div>
    </>
  );
}

export default ItemDetailPage;
