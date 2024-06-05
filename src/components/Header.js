import LoggedInHeader from "./LoggedInHeader";
import LoggedOutHeader from "./LoggedOutHeader";
import { _logOutUser } from "../api/authAPI";
import { useEffect, useState } from "react";

import Cookies from "js-cookie";

function Header() {
  const [token, setToken] = useState("");
  useEffect(() => {
    setToken(Cookies.get("user-token-shopit"));
  }, []);

  function refresh() {
    console.log("Refresh the header has been called");
    setToken(Cookies.get("user-token-shopit"));
  }

  return token !== undefined ? (
    <LoggedInHeader refresh={refresh} />
  ) : (
    <LoggedOutHeader />
  );
}

export default Header;
