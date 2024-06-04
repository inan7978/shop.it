import UserContext from "../context/UserContext";
import LoggedInHeader from "./LoggedInHeader";
import LoggedOutHeader from "./LoggedOutHeader";

import { useContext } from "react";
function Header() {
  const { user } = useContext(UserContext);
  const { logOutUser } = useContext(UserContext);

  return user._id ? (
    <LoggedInHeader logOutUser={logOutUser} />
  ) : (
    <LoggedOutHeader />
  );
}

export default Header;
