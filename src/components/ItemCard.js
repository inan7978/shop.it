function ItemCard({ item, oneLess, oneMore, removeOne }) {
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
    <article
      className="item-card"
      onClick={() => {
        console.log(`${item._id} has been clicked.`);
      }}
    >
      <img src={item.imgURL} className="item-card-img" />
      <h1 className="card-title">{item.title}</h1>
      <h3>quantity: {item.quantity}</h3>
      <h3>{modPrice}</h3>
      <button
        onClick={() => {
          removeOne(item);
        }}
      >
        Remove
      </button>
      <button
        onClick={() => {
          oneMore(item);
        }}
      >
        Add one
      </button>
      <button
        onClick={() => {
          oneLess(item);
        }}
      >
        Subtract one
      </button>
    </article>
  );
}

export default ItemCard;
