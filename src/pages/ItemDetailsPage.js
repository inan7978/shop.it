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
      <div className="item-details-page">
        <div className="item-description-img-container">
          {" "}
          <img
            className="item-description-img"
            src={imgURL[img]}
            alt={`${item}`}
          />
          <div className="cycle-img-btns-container">
            <button className="cycle-img-btn" onClick={prevImg}>
              {"<"}
            </button>
            <button className="cycle-img-btn" onClick={nextImg}>
              {">"}
            </button>
          </div>
        </div>

        <div className="item-info-container">
          <h1 className="item-details-heading">{item}</h1>
          <h2 className="item-details-price">{modPrice}</h2>
          <p className="item-details-description">{description}</p>
          {loggedIn ? (
            <button
              className="add-item-cart-btn"
              onClick={() => {
                addToCart(id);
              }}
            >
              Add to Cart
            </button>
          ) : (
            <button
              className="add-item-cart-btn"
              onClick={() => navigate("/login")}
            >
              Log In!
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default ItemDetailPage;
