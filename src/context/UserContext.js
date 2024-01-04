import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState({});
  const [userCart, setUserCart] = useState(["Empty"]);
  const navigate = useNavigate();

  useEffect(() => {
    setUserCart(user.cart);
  }, [userCart]);

  function loginUser(email, pass) {
    const toFind = {
      emailSearch: email,
    };
    const res = fetch("http://localhost:3003/authenticate", {
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
      .then((response) => response.json())
      .then((data) => {
        const resMod = JSON.parse(JSON.stringify(data));
        // console.log("data: " + resMod._id);
        if (resMod.password === pass) {
          setUser(resMod);
        } else {
          setUser({});
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function logOutUser() {
    navigate("../store-page");
    setUser({});
    setUserCart(["Empty"]);
  }

  function loadCart() {
    return user.cart;
  }

  function addToCart(itemToAdd) {
    console.log("Adding to cart: " + itemToAdd);

    let withItem = user.cart;

    for (let i = 0; i < user.cart.length; i++) {
      if (user.cart[i].itemID === itemToAdd) {
        withItem[i] = {
          itemID: withItem[i].itemID,
          quantity: withItem[i].quantity + 1,
        };
        updateCart(withItem);
        return;
      }
    }
    withItem.push({ itemID: itemToAdd, quantity: 1 });
  }

  function removeFromCart(toRemove) {
    console.log("removing :" + toRemove);

    let without = [];

    for (let i = 0; i < user.cart.length; i++) {
      if (user.cart[i].itemID !== toRemove) {
        without.push(user.cart[i]);
      }
    }
    updateCart(without);
    user.cart = without;
  }

  function adjustQuantity(toAdjust, newQuantity) {}

  function updateCart(newCart) {
    fetch("http://localhost:3003/update-cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userID: user._id, newCart: newCart }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const temp = JSON.parse(JSON.stringify(data));
        setUserCart(temp[0].cart);
      });
  }

  return (
    <UserContext.Provider
      value={{
        loadCart,
        loginUser,
        removeFromCart,
        addToCart,
        logOutUser,
        userCart,
        user,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
