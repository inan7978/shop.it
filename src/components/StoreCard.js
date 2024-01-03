import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import { useContext } from "react";

function StoreCard(props) {
  const itemPrice = JSON.parse(props.item.price.$numberDecimal);
  const navigate = useNavigate();

  const { addToCart } = useContext(UserContext);

  return (
    <article
      className="store-card"
      onClick={(e) => {
        // e.stopPropagation();
        e.preventDefault();
        console.log(`${props.item.title} has been clicked.`);
        navigate(`../item-details-page/${props.item._id}`, {
          state: {
            item: props.item.title,
            description: props.item.description,
            price: itemPrice,
            imgURL: props.item.imgURL,
            id: props.item._id,
          },
        });
      }}
    >
      <img alt="testing" src={props.item.imgURL} className="store-card-img" />
      <h1 className="store-card-title">{props.item.title}</h1>
      <h3>${itemPrice}</h3>
      <button
        className="add-cart-btn btn-submit"
        onClick={(e) => {
          e.stopPropagation(); // this is used because this onClick is located within a broader on click. Not including this would have both on clicks fire when this is selected.
          addToCart(props.item);
          console.log(props.item.title + " request to add to cart.");
        }}
      >
        Add to Cart
      </button>
    </article>
  );
}

export default StoreCard;
