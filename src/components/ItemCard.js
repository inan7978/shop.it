function ItemCard(props) {


  return <article className="item-card">
    <h1>{props.item.itemName} | ${props.item.Price}</h1>
    <p>{props.item.description}</p>
  </article>;
}

export default ItemCard;
