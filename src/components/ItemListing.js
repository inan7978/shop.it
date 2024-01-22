import { useNavigate } from "react-router-dom";

function ItemListing({ item, oneLess, oneMore, removeOne }) {
  const navigate = useNavigate();

  let itemPrice = 0;
  try {
    itemPrice = item.price.$numberDecimal;
  } catch {
    itemPrice = "Error";
  }
  const modPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(itemPrice);

  return (
    <article className="item-card">
      <img src={item.imgURL} className="item-card-img" />
      <h1 className="card-title">{item.title}</h1>
      <h3>{modPrice}</h3>
      <button
        onClick={(e) => {
          // e.stopPropagation();
          e.preventDefault();
          console.log(`${item.title} with ID ${item._id} has been clicked.`);
          navigate(`../edit-listing`, {
            state: {
              title: item.title,
              description: item.description,
              price: modPrice,
              imgURL: item.imgURL,
              id: item._id,
            },
          });
        }}
      >
        Edit Listing
      </button>
    </article>
  );
}

export default ItemListing;
