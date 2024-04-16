import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { _updateCart, _loginUser, _createUser } from "../api/userContextAPI";
const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState({});
  const [userCart, setUserCart] = useState(["Empty"]);
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  console.log("Enviro", process.env.REACT_APP_FETCH_IP);

  useEffect(() => {
    updateBoth();
  }, [userCart]);

  function updateBoth() {
    // helper function for the above useEffect
    setUserCart(user.cart);
  }

  async function loginUser(email, pass) {
    let result = { status: "OK" };
    const toFind = {
      emailSearch: email,
    };

    const data = await _loginUser(email, pass);

    // need to finish this transtion...

    const res = await fetch(
      "https://shop-it-backend.onrender.com/authenticate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(toFind),
      }
    )
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
        if (resMod.password === pass) {
          console.log("data: ", resMod);
          setUser(resMod);
          setLoggedIn(true);
        } else {
          setUser({});
          result = { status: "Incorrect password." };
        }
      })
      .catch((error) => {
        console.log(error);
        result = { status: "No such account exists." };
      });
    return result;
  }

  function logOutUser(whereTo) {
    setLoggedIn(false);
    // whereto lets you specify where to direct after logout
    switch (whereTo) {
      case "toStore":
        navigate("../store-page");
        setUser({});
        setUserCart(["Empty"]);
        break;
      case "toLogin":
        navigate("../login");
        setUser({});
        setUserCart(["Empty"]);
        break;
      default:
        navigate("../store-page");
        setUser({});
        setUserCart(["Empty"]);
    }
  }

  async function createUser(email, pass) {
    const data = await _createUser(email, pass);
    console.log("User create triggered.");
    return data.status;
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
    updateCart(withItem);
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

  function getUserID() {
    return user._id;
  }

  function setQuantity(toAdjust, newQuantity) {
    console.log(`Adjusting quantity for ${toAdjust} to ${newQuantity}`);

    let withNewCount = [];

    for (let i = 0; i < user.cart.length; i++) {
      if (user.cart[i].itemID === toAdjust) {
        withNewCount.push({ itemID: toAdjust, quantity: newQuantity });
      } else {
        withNewCount.push(user.cart[i]);
      }
    }
    updateCart(withNewCount);
    user.cart = withNewCount;
  }

  async function updateCart(newCart) {
    const data = await _updateCart(newCart, user);
    setUserCart(data);
  }

  function removeListing(toRemove) {
    console.log("removing listing: ", toRemove);

    let newCart = [];

    for (let i = 0; i < user.cart.length; i++) {
      if (user.cart[i].itemID !== toRemove) {
        newCart.push(user.cart[i]);
      }
    }

    if (newCart.length !== user.cart.length) {
      user.cart = newCart;
      setUserCart(newCart);
    } else {
      console.log("Was not in users cart");
    }
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
        setQuantity,
        createUser,
        loggedIn,
        getUserID,
        removeListing,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
