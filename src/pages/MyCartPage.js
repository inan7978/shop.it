import UserContext from "../context/UserContext";
import ItemCard from "../components/ItemCard";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function MyCartPage() {
  const { loadCart } = useContext(UserContext);
  const { removeFromCart, setQuantity } = useContext(UserContext);
  const [items, setItems] = useState(loadCart());
  const [details, setDetails] = useState();
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();
  // testing new branch

  useEffect(() => {
    loadDetails();
  }, [items]);

  async function loadDetails() {
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
    setDetails(details);
    setLoaded(true);
  }

  if (loaded) {
    const listItems = details
      ? details.map((item) => {
          return (
            <div key={item._id}>
              <h3>
                {item.title} || {item.quantity}
              </h3>
              <button
                onClick={() => {
                  removeFromCart(item._id);
                  setItems(loadCart());
                }}
              >
                Remove
              </button>
              <button
                onClick={() => {
                  if (item.quantity - 1 === 0) {
                    removeFromCart(item._id);
                    setItems(loadCart());
                  } else {
                    setQuantity(item._id, item.quantity - 1);
                    setItems(loadCart());
                  }
                }}
              >
                Subtract one
              </button>
              <button
                onClick={() => {
                  setQuantity(item._id, item.quantity + 1);
                  setItems(loadCart());
                }}
              >
                Add one
              </button>
            </div>
          );
        })
      : null;
    return listItems.length ? (
      <div>{listItems}</div>
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
    return <div>Loading</div>;
  }

  // const listItems = items.map((item) => {
  //   return (
  //     <div key={item.itemID}>
  //       <h3>
  //         {item.itemID} || {item.quantity}
  //       </h3>
  //       <button
  //         onClick={() => {
  //           removeFromCart(item.itemID);
  //           setItems(loadCart());
  //         }}
  //       >
  //         Remove
  //       </button>
  //       <button
  //         onClick={() => {
  //           if (item.quantity - 1 === 0) {
  //             removeFromCart(item.itemID);
  //             setItems(loadCart());
  //           } else {
  //             setQuantity(item.itemID, item.quantity - 1);
  //             setItems(loadCart());
  //           }
  //         }}
  //       >
  //         Subtract one
  //       </button>
  //       <button
  //         onClick={() => {
  //           setQuantity(item.itemID, item.quantity + 1);
  //           setItems(loadCart());
  //         }}
  //       >
  //         Add one
  //       </button>
  //     </div>
  //   );
  // });
}

export default MyCartPage;
