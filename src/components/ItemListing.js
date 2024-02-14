import { useNavigate } from "react-router-dom";

function ItemListing({ item, oneLess, oneMore, removeOne }) {
  const navigate = useNavigate();

  const sectionStyle = "w-1/4 items-center flex justify-start p-2";

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
    <div className="flex justify-around bg-someGreen my-5 w-4/5 lg:w-7/10 xl:w-3/5 mx-auto rounded">
      <div className={sectionStyle}>
        <img
          src={item.imgURL[0]}
          className="aspect-auto h-24 max-h-24 rounded bg-white mx-auto"
        />
      </div>
      <div className={sectionStyle}>
        <h1 className="text-2xl font-bold">{item.title}</h1>
      </div>
      <div className={sectionStyle}>
        <h3 className="text-1xl font-bold">{modPrice}</h3>
      </div>
      <div className={sectionStyle}>
        <button
          className="p-3 bg-blue-500 rounded text-white font-bold"
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
      </div>
    </div>
  );
}

export default ItemListing;
