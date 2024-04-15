import { useLocation } from "react-router-dom";
import UserContext from "../context/UserContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

function ItemDetailPage() {
  const { state } = useLocation();
  const { item, description, price, imgURL, id } = state;
  const { addToCart } = useContext(UserContext);
  const { loggedIn } = useContext(UserContext);
  const [img, setImg] = useState(0);
  const navigate = useNavigate();
  console.log("Showing image: ", img + 1);

  const buttonStyles =
    "rounded p-5 bg-theYellow text-2xl font-bold text-blue-500 m-5 hover:bg-cardColor";

  const buttonStyles2 =
    "rounded px-7 py-3 bg-theYellow text-blue-500 font-bold text-2xl hover:bg-cardColor mt-10";

  const modPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);

  function nextImg() {
    if (img + 1 >= imgURL.length) {
      setImg(0);
    } else {
      setImg(img + 1);
    }
  }
  function prevImg() {
    if (img === 0) {
      setImg(imgURL.length - 1);
    } else {
      setImg(img - 1);
    }
  }

  return (
    <>
      {/* Page container */}
      <div className="container flex flex-col md:flex-row w-4/5 justify-center mx-auto md:gap-5 max-w-1920px">
        {/* image and buttons container */}
        <div className="flex flex-col justify-center items-center w-4/5 mx-auto md:w-1/2">
          <div className="flex justify-center">
            <img
              className="aspect-auto h-48 md:h-64 lg:h-96 max-h-96 rounded"
              src={imgURL[img]}
              alt={`${item}`}
            />
          </div>
          {imgURL.length > 1 ? (
            <div>
              <button className={buttonStyles} onClick={prevImg}>
                {"<"}
              </button>
              <button className={buttonStyles} onClick={nextImg}>
                {">"}
              </button>
            </div>
          ) : null}
        </div>

        {/* information container */}
        <div className="flex flex-col justify-around items-center md:w-1/2">
          <div className="flex flex-col justify-center items-center gap-5">
            <h1 className="text-black font-bold md:text-4xl">{item}</h1>
            <h2 className="text-green-400 font-bold md:text-2xl">{modPrice}</h2>
            <p className="font-medium">{description}</p>
          </div>

          {loggedIn ? (
            <button
              className={buttonStyles2}
              onClick={() => {
                addToCart(id);
              }}
            >
              Add to Cart
            </button>
          ) : (
            <button
              className={buttonStyles2}
              onClick={() => navigate("/login")}
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default ItemDetailPage;
