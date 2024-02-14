import { useNavigate } from "react-router-dom";

function CartCard({ item, oneLess, oneMore, removeOne }) {
  const navigate = useNavigate();
  const sectionStyle = "w-1/4 items-center flex justify-start p-2";
  const btnStyles =
    "text-white text-xl md:text-3xl rounded p-2 bg-theBlue m-1 w-full";
  let itemPrice = 0;
  try {
    itemPrice = item.price.$numberDecimal;
  } catch {
    itemPrice = "Error";
  }
  const modPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(itemPrice * item.quantity);

  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        console.log(`${item.title} with ID ${item._id} has been clicked.`);
        navigate(`../item-details-page/${item._id}`, {
          state: {
            item: item.title,
            description: item.description,
            price: itemPrice,
            imgURL: item.imgURL,
            id: item._id,
          },
        });
      }}
      className="flex justify-around bg-cardColor my-5 w-11/12 max-w-1440px md:w-4/5 lg:w-1440px mx-auto rounded p-2"
    >
      <div className="flex items-center justify-center w-1/4">
        <img
          className="aspect-auto h-24 max-h-24 rounded bg-white mx-auto"
          src={item.imgURL[0]}
        ></img>
      </div>
      <div className="flex-col flex justify-center items-center mx-auto gap-3 w-1/4">
        <h1 className="font-bold text-1xl md:text-2xl self-start">
          {item.title}
        </h1>
        <h2 className="font-bold self-start">
          {modPrice} x {item.quantity}
        </h2>
      </div>
      <div className="flex flex-col md:flex-row justify-center w-1/4">
        <button
          className={btnStyles}
          onClick={(e) => {
            e.stopPropagation();
            oneMore(item);
          }}
        >
          +
        </button>
        <button
          className={btnStyles}
          onClick={(e) => {
            e.stopPropagation();
            oneLess(item);
          }}
        >
          -
        </button>
      </div>
      <div className="ml-auto flex items-center justify-center w-1/6">
        <button
          onClick={(e) => {
            e.stopPropagation();
            removeOne(item);
          }}
          className="bg-red-500 p-3 text-white rounded"
        >
          X
        </button>
      </div>
    </div>
  );
}

export default CartCard;
