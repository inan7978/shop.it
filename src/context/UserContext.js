import { createContext, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(69);

  function addOne() {
    setUser(user + 1);
  }

  return (
    <UserContext.Provider value={{ user, addOne }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
