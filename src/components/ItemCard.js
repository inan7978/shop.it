function ItemCard(props) {
  let itemPrice = 0;
  try {
    itemPrice = props.item.price.$numberDecimal;
  } catch {
    itemPrice = "Error";
  }

  return (
    <article
      className="item-card"
      onClick={() => {
        console.log(`${props.item._id} has been clicked.`);
      }}
    >
      <img src={props.item.imgURL} className="item-card-img" />
      <h1 className="card-title">{props.item.title}</h1>
      <h3>quantity: {props.item.quantity}</h3>
      <h3>${itemPrice}</h3>
      <button>Remove</button>
    </article>
  );
}

export default ItemCard;
