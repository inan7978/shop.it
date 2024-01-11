import UserContext from "../context/UserContext";
import ItemCard from "../components/ItemCard";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function MyCartPage() {
  const { removeFromCart, setQuantity, loadCart } = useContext(UserContext);
  const [trigger, setTrigger] = useState([""]); // this is a bit weird
  const [details, setDetails] = useState();
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadDetails();
  }, [trigger]);

  let totalCost = 0;

  async function loadDetails() {
    const items = await loadCart();
    console.log("loadDetails has been called");
    let details = [];
    let onlyIDs = items.map((item) => {
      return item.itemID;
    });

    const toFind = {
      find: onlyIDs,
    };

    await fetch("http://localhost:3003/get-cart-items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(toFind),
    })
      .then((response) => {
        if (response.ok) {
          return response;
        } else {
          throw Error;
        }
      })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // console.log(data);
        details = data;

        // this here adds the quantity key to the details returned from server by comparing to the items array of objects
        for (let i = 0; i < items.length; i++) {
          for (let j = 0; j < items.length; j++) {
            if (details[i]._id === items[j].itemID) {
              details[i].quantity = items[j].quantity;
            }
          }
        }
        console.log("This is the data to map: ", details);
      })
      .catch((error) => {
        console.log(error);
        details = ["Nothing arrived"];
      });

    // sets the details and load status to state
    setDetails(details);
    setLoaded(true);
  }

  // load status must be true to run this. This keeps it from trying to map before the values from loadDetails, which is async, arrive.
  if (loaded) {
    const listItems = details
      ? details.map((item) => {
          totalCost =
            totalCost + JSON.parse(item.price.$numberDecimal) * item.quantity;
          return (
            <div key={item._id}>
              <img className="img-testing" src={item.imgURL} />
              <h3>
                {item.title} || {item.quantity} ||{" "}
                {JSON.parse(item.price.$numberDecimal)}
              </h3>
              <button
                onClick={() => {
                  removeFromCart(item._id);
                  setTrigger([...trigger]);
                }}
              >
                Remove
              </button>
              <button
                onClick={() => {
                  if (item.quantity - 1 === 0) {
                    removeFromCart(item._id);
                    setTrigger([...trigger]);
                  } else {
                    setQuantity(item._id, item.quantity - 1);
                    setTrigger([...trigger]);
                  }
                }}
              >
                Subtract one
              </button>
              <button
                onClick={() => {
                  setQuantity(item._id, item.quantity + 1);
                  setTrigger([...trigger]);
                }}
              >
                Add one
              </button>
            </div>
          );
        })
      : null;
    return listItems.length ? (
      <>
        <div>{listItems}</div>
        <h2>Grand Total: ${Math.round(totalCost * 100) / 100}</h2>
      </>
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
    return <div>Loading...</div>;
  }
}

export default MyCartPage;
