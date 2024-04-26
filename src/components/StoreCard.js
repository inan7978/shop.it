import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import { useContext } from "react";

function StoreCard(props) {
  const item = props.item;
  console.log("item info: ", item);
  const itemPrice = JSON.parse(props.item.price.$numberDecimal);
  const modPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(itemPrice);

  const navigate = useNavigate();

  const { addToCart } = useContext(UserContext);
  const { loggedIn } = useContext(UserContext);

  const buttonsStyles = "text-xl font-bold bg-blue-400 rounded p-2";

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="sm:flex sm:items-baseline sm:justify-between"></div>

        <div className="mt-6 grid grid-cols-1 gap-y-10 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-0 lg:gap-x-8">
          <div key={item._id} className="group relative">
            <div className="h-96 w-full overflow-hidden rounded-lg sm:aspect-h-3 sm:aspect-w-2 group-hover:opacity-75 sm:h-auto">
              <img
                src={item.imgURL[0]}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <h3 className="mt-4 text-base font-semibold text-gray-900">
              <a href={item.href}>
                <span className="absolute inset-0" />
                {item.title}
              </a>
            </h3>
            <p className="mt-1 text-sm text-gray-500">{modPrice}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StoreCard;
