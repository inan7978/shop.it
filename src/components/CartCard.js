function CartCard({ item, oneLess, oneMore, removeOne }) {
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
      className="cart-card"
      onClick={() => {
        console.log(`${item._id} has been clicked.`);
      }}
    >
      <div className="cart-card-section-img">
        <img src={item.imgURL[0]} className="cart-card-img" />
      </div>
      <div className="cart-card-section-title-price">
        <h1 className="cart-card-title">{item.title}</h1>
        <h3>{modPrice}</h3>
      </div>
      <div className="cart-card-section">
        <button
          className="cart-item-button"
          onClick={() => {
            oneMore(item);
          }}
        >
          +
        </button>
        <h3 className="cart-item-quantity">{item.quantity}</h3>
        <button
          className="cart-item-button"
          onClick={() => {
            oneLess(item);
          }}
        >
          -
        </button>
      </div>

      <button
        className="delete-btn-cart"
        onClick={() => {
          removeOne(item);
        }}
      >
        X
      </button>
    </article>
  );
}

export default CartCard;
