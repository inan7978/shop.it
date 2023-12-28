import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState({});
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
  }

  return (
    <UserContext.Provider value={{ user, loginUser, logOutUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
