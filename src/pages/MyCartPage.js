import UserContext from "../context/UserContext";
import CartContext from "../context/CartContext";
import ItemCard from "../components/ItemCard";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function MyCartPage() {
  const { loadCart } = useContext(CartContext);
  const [items, setItems] = useState([{ testing: "testing" }]);

  const cart = loadCart();
  console.log("Current cart: \n" + JSON.stringify(cart));

  // justID exists to tell backend what to query
  const justID = cart.map((item) => {
    return item.itemID;
  });

  console.log("Items: \n" + JSON.stringify(items));

  useEffect(() => {
    console.log("Invoked loadItemDetail useEffect");
    loadItemDetails();
  }, []);

  // final holds an array of objects that have been modified to include the quantity from the cart
  // Essentially creating an array of objects that has all the info needed to populate the cart
  const final = items.map((item) => {
    let quantity = -2;

    for (let i = 0; i < items.length; i++) {
      if (item._id == cart[i].itemID) {
        quantity = cart[i].quantity;
      }
    }

    return { ...item, quantity: quantity };
  });

  console.log("Final is: \n" + JSON.stringify(final));

  // this is the final .map() that is used to populate the item details and their quantities
  const mappedItems = final.map((item) => {
    return (
      <>
        {/* <h1>
          {item.title} || QTY: {item.quantity}
        </h1>
        <img className="cart-imgs" src={item.imgURL} /> */}
        <ItemCard key={item._id} item={item} />
      </>
    );
  });

  // this fetches the information about the items based on the stored item id's in the users cart
  function loadItemDetails() {
    const findThese = {
      toFind: justID,
    };
    console.log("Fetching info for \n" + justID);
    const res = fetch("http://localhost:3003/get-cart-items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(findThese),
    })
      .then((response) => {
        if (response.ok) {
          return response;
        } else {
          throw Error;
        }
      })
      .then((response) => response.json())
      .then((data) => {
        const resMod = JSON.parse(JSON.stringify(data));
        setItems(resMod);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return <div>{mappedItems}</div>;
}

export default MyCartPage;
