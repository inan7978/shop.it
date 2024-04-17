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
    const data = await _loginUser(email, pass);

    if (data.password === pass) {
      console.log("data: ", data);
      setUser(data);
      setLoggedIn(true);
    } else if (data.password !== pass) {
      setUser({});
      return { status: "Incorrect password." };
    } else {
      return { status: "That account does not exist." };
    }
    // need to finish this transtion...
    // needs to have proper response handling
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
