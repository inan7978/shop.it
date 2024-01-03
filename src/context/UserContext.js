import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState({});
  const [userCart, setUserCart] = useState(["Empty"]);
  const navigate = useNavigate();

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
          setUserCart(resMod.cart);
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

  function addToCart(itemToAdd) {
    const [exists, position] = inCartAlr(itemToAdd);
    console.log("Already in cart? " + exists + " | Position: " + position);

    if (exists) {
      userCart[position] = {
        itemID: itemToAdd._id,
        quantity: userCart[position].quantity + 1,
      };
      setUserCart([...userCart]);
      // updateCart();
    } else {
      setUserCart([...userCart, { itemID: itemToAdd._id, quantity: 1 }]);
      // updateCart();
    }
  }

  // inCartAlr() is a helper function for addToCart()
  function inCartAlr(item) {
    for (let i = 0; i < userCart.length; i++) {
      if (userCart[i].itemID === item._id) {
        return [true, i];
      }
    }
    return [false, -1];
  }

  function updateCart(newCart) {
    const res = fetch("http://localhost:3003/add-to-cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userID: user._id, newCart: newCart }),
    })
      .then((response) => {
        if (response.ok) {
          return response;
        } else {
          throw Error;
        }
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  }

  function logOutUser() {
    navigate("../store-page");
    setUser({});
    setUserCart(["Empty"]);
  }

  return (
    <UserContext.Provider
      value={{ loadCart, loginUser, addToCart, logOutUser, userCart, user }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
