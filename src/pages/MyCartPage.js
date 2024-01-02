import UserContext from "../context/UserContext";
import CartContext from "../context/CartContext";
import ItemCard from "../components/ItemCard";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function MyCartPage() {
  const { loadCart } = useContext(CartContext);
  const [items, setItems] = useState([{ testing: "testing" }]);

  const cart = loadCart();
  console.log(cart);

  const justID = cart.map((item) => {
    return item.itemID;
  });

  useEffect(() => {
    console.log("Invoked loadItemDetail useEffect");
    loadItemDetails();
  }, []);

  const mappedItems = items.map((item) => {
    return (
      <>
        <h1>{item.title}</h1>
        <img src={item.imgURL} />
      </>
    );
  });

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
