import { createContext, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState({});

  function loginUser(email, pass) {
    if (email === "inan7978@outlook.com" && pass === "password")
      setUser({
        fname: "inan",
        lname: "ismailov",
        email: "inan7978@outlook.com",
      });

    console.log("Context feedback: Logged in as: " + email);
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
