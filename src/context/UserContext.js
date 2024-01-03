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

  function loadCart() {
    return user.cart;
  }

  // inCartAlr() is a helper function for addToCart()

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

  function addToCart(itemToAdd) {
    console.log("Adding to cart: " + itemToAdd);

    let exists = false;
    let location = -1;
    let quantity = -1;

    for (let i = 0; i < user.cart.length; i++) {
      if (userCart[i].itemID === itemToAdd) {
        console.log("Its in here at position: " + i); // add logic to add if it is already in cart
        exists = true;
        location = i;
        quantity = userCart[i].quantity;
      }
    }
    console.log(`exists: ${exists}
    location: ${location}
    quantity: ${quantity}
    `);
  }

  function logOutUser() {
    navigate("../store-page");
    setUser({});
    setUserCart(["Empty"]);
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
