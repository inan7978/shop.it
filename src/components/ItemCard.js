import stock_photo from "../images/boxes_stock.png";

function ItemCard(props) {
  return (
    <article className="item-card">
      <img src={stock_photo} className="item-card-img" />
      <h1 className="card-title">
        {props.item.itemName} | ${props.item.Price}
      </h1>
      <p className="card-description">{props.item.description}</p>
    </article>
  );
}

export default ItemCard;
