import stock_photo from "../images/boxes_stock.png";

function ItemCard(props) {
  return (
    <article
      className="item-card"
      onClick={() => {
        console.log(`${props.item.itemName} has been clicked.`);
      }}
    >
      <img src={stock_photo} className="item-card-img" />
      <h1 className="card-title">{props.item.itemName}</h1>
      <h3>
        item: {props.item.itemID} quantity: {props.item.quantity}
      </h3>
      <h3>${props.item.Price}</h3>
      <button>Remove</button>
    </article>
  );
}

export default ItemCard;
