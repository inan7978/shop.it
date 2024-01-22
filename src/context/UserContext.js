import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState({});
  const [userCart, setUserCart] = useState(["Empty"]);
  const [userListings, setUserListings] = useState(["Empty"]);
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    updateBoth();
  }, [userCart, userListings]);

  function updateBoth() {
    // helper function for the above useEffect
    setUserCart(user.cart);
    setUserListings(user.listings);
  }

  async function loginUser(email, pass) {
    let result = { status: "OK" };
    const toFind = {
      emailSearch: email,
    };
    const res = await fetch("http://localhost:3003/authenticate", {
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
    let result;
    const userToAdd = {
      email: email,
      pass: pass,
    };

    await fetch("http://localhost:3003/create-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userToAdd),
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
        console.log(data.status);
        result = data.status;
      })
      .catch((error) => {
        console.log(error);
      });
    return result;
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

  function removeListing(toRemove) {
    console.log("removing listing: ", toRemove);

    let without = [];
    let newCart = [];

    for (let i = 0; i < user.listings.length; i++) {
      if (user.listings[i] !== toRemove) {
        without.push(user.listings[i]);
      }
    }

    for (let i = 0; i < user.cart.length; i++) {
      if (user.cart[i].itemID !== toRemove) {
        newCart.push(user.cart[i]);
      }
    }
    user.listings = without;
    user.cart = newCart;
    setUserListings(without);
    setUserCart(newCart);
  }

  // function updateListings(newListings) {
  //   fetch("http://localhost:3003/update-listings", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ userID: user._id, newCart: newListings }),
  //   })
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((data) => {
  //       const temp = JSON.parse(JSON.stringify(data));
  //       setUserListings(temp[0].listings);
  //     });
  // }

  function loadListings() {
    return user.listings;
  }

  return (
    <UserContext.Provider
      value={{
        loadCart,
        loadListings,
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
        userListings,
        removeListing,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
