import { toBeDisabled } from "@testing-library/jest-dom/matchers";
import { createContext, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState({});

  async function loginUser(email, pass) {
    const toFind = {
      emailSearch: email,
      passSearch: pass,
    };
    const response = await fetch("http://localhost:3003/authenticate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(toFind),
    });

    console.log(response);
    const responseMod = JSON.stringify(response);
    console.log("Response is: " + responseMod);
  }

  function logOutUser() {
    setUser({});
  }

  return (
    <UserContext.Provider value={{ user, loginUser, logOutUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
