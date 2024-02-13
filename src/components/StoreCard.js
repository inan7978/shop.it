import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import { useContext } from "react";

function StoreCard(props) {
  const itemPrice = JSON.parse(props.item.price.$numberDecimal);
  const modPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(itemPrice);

  const navigate = useNavigate();

  const { addToCart } = useContext(UserContext);
  const { loggedIn } = useContext(UserContext);

  const buttonsStyles = "text-xl font-bold bg-blue-400 rounded p-2";

  return (
    <div
      className="container flex flex-col w-4/5 md:w-1/3 lg:w-1/4 xl:w-1/5 bg-cardColor rounded py-5 justify-center"
      onClick={(e) => {
        // e.stopPropagation();
        e.preventDefault();
        console.log(
          `${props.item.title} with ID ${props.item._id} has been clicked.`
        );
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
      <div className="container flex flex-col items-center p-2 gap-3">
        <img
          alt="testing"
          src={props.item.imgURL[0]}
          className="aspect-auto h-48 max-h-48"
        />
        <h1 className="text-black text-2xl font-bold">{props.item.title}</h1>
      </div>

      <div className="container flex flex-col xl:flex-row gap-5 justify-center items-center my-10">
        <h3 className="text-xl font-bold">{modPrice}</h3>
        {loggedIn ? (
          <button
            className={buttonsStyles}
            onClick={(e) => {
              e.stopPropagation(); // this is used because this onClick is located within a broader on click. Not including this would have both on clicks fire when this is selected.
              addToCart(props.item._id);
              console.log(props.item.title + " request to add to cart.");
            }}
          >
            Add to Cart
          </button>
        ) : (
          <button
            className={buttonsStyles}
            onClick={(e) => {
              e.stopPropagation();
              navigate("/login");
            }}
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}

export default StoreCard;
