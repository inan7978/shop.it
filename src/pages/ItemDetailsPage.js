import { useLocation } from "react-router-dom";
import UserContext from "../context/UserContext";
import { useContext } from "react";

function ItemDetailPage() {
  const { state } = useLocation();
  const { item, description, price, imgURL, id } = state;
  const { addToCart } = useContext(UserContext);

  return (
    <>
      <div className="item-detail-container">
        <img className="item-description-img" src={imgURL} alt={`${item}`} />
        <div className="item-info-container">
          <h1>{item}</h1>
          <h2>${price}</h2>
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
