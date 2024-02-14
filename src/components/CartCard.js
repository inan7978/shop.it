function CartCard({ item, oneLess, oneMore, removeOne }) {
  const sectionStyle = "w-1/4 items-center flex justify-start p-2";
  const btnStyles =
    "text-blue-500 text-xl md:text-3xl rounded p-2 bg-theYellow m-1 w-full";
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
    <div className="flex justify-around bg-green-200 my-5 w-11/12 max-w-1440px md:w-4/5 lg:w-1440px mx-auto rounded p-2">
      <></>
      <div className="flex items-center justify-center w-1/4">
        <img
          className="aspect-auto h-24 max-h-24 rounded bg-white mx-auto"
          src={item.imgURL[0]}
        ></img>
      </div>
      <div className="flex-col flex justify-center items-center mx-auto gap-3 w-1/4">
        <h1 className="font-bold text-1xl">{item.title}</h1>
        <div className="flex justify-around">
          <h2 className="font-bold">
            {modPrice} x {item.quantity}
          </h2>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-center w-1/4">
        <button
          className={btnStyles}
          onClick={() => {
            oneMore(item);
          }}
        >
          +
        </button>
        <button
          className={btnStyles}
          onClick={() => {
            oneLess(item);
          }}
        >
          -
        </button>
      </div>
      <div className="ml-auto flex items-center justify-center w-1/6">
        <button className="bg-red-500 p-3 text-white rounded">X</button>
      </div>
    </div>

    // <div
    //   className="flex container justify-center items-center mx-auto w-4/5 my-5"
    //   onClick={() => {
    //     console.log(`${item._id} has been clicked.`);
    //   }}
    // >
    //   <div className={sectionStyle}>
    //     <img
    //       src={item.imgURL[0]}
    //       className="aspect-auto h-24 max-h-24 rounded bg-white mx-auto"
    //     />
    //   </div>
    //   <div className={sectionStyle}>
    //     <h1 className="">{item.title}</h1>
    //   </div>
    //   <div className={sectionStyle}>
    //     <button
    //       className=""
    //       onClick={() => {
    //         oneMore(item);
    //       }}
    //     >
    //       +
    //     </button>
    //     <h3 className="">{item.quantity}</h3>
    //     <button
    //       className=""
    //       onClick={() => {
    //         oneLess(item);
    //       }}
    //     >
    //       -
    //     </button>
    //   </div>

    //   <button
    //     className=""
    //     onClick={() => {
    //       removeOne(item);
    //     }}
    //   >
    //     X
    //   </button>
    // </div>
  );
}

export default CartCard;
