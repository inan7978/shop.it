import stock_photo from "../images/boxes_stock.png";

function StoreCard(props) {
  const itemPrice = JSON.parse(props.item.price.$numberDecimal);

  return (
    <article
      className="store-card"
      onClick={() => {
        console.log(`${props.item.title} has been clicked.`);
      }}
    >
      <img alt="testing" src={props.item.imgURL} className="store-card-img" />
      <h1 className="store-card-title">{props.item.title}</h1>
      <h3>${itemPrice}</h3>
      <button
        className="add-cart-btn btn-submit"
        onClick={() => {
          console.log(props.item.title + " request to add to cart.");
        }}
      >
        Add to Cart
      </button>
    </article>
  );
}

export default StoreCard;
