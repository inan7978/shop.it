import UserContext from "../context/UserContext";
import CartCard from "../components/CartCard";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { _loadDetails } from "../api/myCartPageAPI";
function MyCartPage() {
  const { removeFromCart, setQuantity, loadCart, loggedIn } =
    useContext(UserContext);
  const [trigger, setTrigger] = useState([""]); // this is a bit weird
  const [details, setDetails] = useState();
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadDetails();
  }, [trigger]);

  let totalCost = 0;

  function oneLess(item) {
    if (item.quantity - 1 === 0) {
      removeFromCart(item._id);
      setTrigger([...trigger]);
    } else {
      setQuantity(item._id, item.quantity - 1);
      setTrigger([...trigger]);
    }
  }

  function oneMore(item) {
    setQuantity(item._id, item.quantity + 1);
    setTrigger([...trigger]);
  }

  function removeOne(item) {
    removeFromCart(item._id);
    setTrigger([...trigger]);
  }

  async function loadDetails() {
    if (!loggedIn) {
      navigate("../login");
      return 0;
    }
    const items = loadCart();
    console.log("loadDetails has been called");
    let details = [];
    let onlyIDs = items.map((item) => {
      return item.itemID;
    });

    const toFind = {
      find: onlyIDs,
    };

    const data = await _loadDetails(toFind);

    console.log("cart response: ", data);

    if (data.status === "OK") {
      details = data.data;

      for (let i = 0; i < items.length; i++) {
        for (let j = 0; j < items.length; j++) {
          if (details[i]._id === items[j].itemID) {
            details[i].quantity = items[j].quantity;
          }
        }
      }

      // sets the details and load status to state
      setDetails(details);
      setLoaded(true);
    } else {
      console.log("An error has occured. No changes where made to the cart.");
    }
  }

  // load status must be true to run this. This keeps it from trying to map before the values from loadDetails, which is async, arrive.
  if (loaded) {
    const listItems = details
      ? details.map((item) => {
          try {
            totalCost =
              totalCost + JSON.parse(item.price.$numberDecimal) * item.quantity;
          } catch {
            console.log("Error");
          }

          return (
            <CartCard
              key={item._id}
              item={item}
              oneLess={oneLess}
              oneMore={oneMore}
              removeFromCart={removeFromCart}
              removeOne={removeOne}
            />
          );
        })
      : null;

    return listItems.length ? (
      <div>
        <div className="flex justify-center gap-3 items-center mt-5 w-4/5 mx-auto">
          <h1 className="text-3xl">
            Grand Total:{" "}
            <strong>
              {" "}
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(totalCost || "0.00")}
            </strong>
          </h1>
          <button
            className="p-2 bg-green-400 text-white text-2xl rounded"
            onClick={() => {
              alert("Order has been placed!");
              navigate("../store-page");
            }}
          >
            Place Order!
          </button>
        </div>
        <div className="container flex-col items-center mx-auto">
          {listItems}
        </div>
      </div>
    ) : (
      <div>
        <h2>Add something!</h2>
        <button
          onClick={() => {
            navigate("../store-page");
          }}
        >
          Go to Store!
        </button>
      </div>
    );
  } else {
    return (
      <div className="container flex flex-wrap justify-center gap-5 mt-5 mb-20 max-w-1920px mx-auto">
        <h1 className="mx-auto text-2xl font-bold">Loading...</h1>
      </div>
    );
  }
}

export default MyCartPage;
