import { useLocation } from "react-router-dom";
import UserContext from "../context/UserContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

function ItemDetailPage() {
  const { state } = useLocation();
  const { item, description, price, imgURL, id } = state;
  const { addToCart } = useContext(UserContext);
  const { loggedIn } = useContext(UserContext);
  const [img, setImg] = useState(0);
  const navigate = useNavigate();
  console.log("Showing image: ", img + 1);

  const modPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);

  function nextImg() {
    if (img + 1 >= imgURL.length) {
      setImg(0);
    } else {
      setImg(img + 1);
    }
  }
  function prevImg() {
    if (img === 0) {
      setImg(imgURL.length - 1);
    } else {
      setImg(img - 1);
    }
  }

  return (
    <>
      <div className="item-detail-container">
        <img
          className="item-description-img"
          src={imgURL[img]}
          alt={`${item}`}
        />
        <div className="item-info-container">
          <h1>{item}</h1>
          <h2>{modPrice}</h2>
          <p>{description}</p>
        </div>
        {loggedIn ? (
          <button
            className="btn-submit"
            onClick={() => {
              addToCart(id);
            }}
          >
            Add to Cart
          </button>
        ) : (
          <button className="btn-submit" onClick={() => navigate("/login")}>
            Log In!
          </button>
        )}
        <button onClick={nextImg}>Next image</button>
        <button onClick={prevImg}>Previous image</button>
      </div>
    </>
  );
}

export default ItemDetailPage;
