import { Link } from "react-router-dom";
import shopItlogo from "../images/shopitLogo.png";
import UserContext from "../context/UserContext";
import { useContext } from "react";
function Header() {
  const { user } = useContext(UserContext);
  const { logOutUser } = useContext(UserContext);

  if (Object.keys(user).length === 0) {
    console.log(`No logged in user.`);
  } else {
    console.log(`Logged in user: ${user.fname} ${user.lname}`);
  }

  return (
    <div className="global-header">
      <img className="logo" src={shopItlogo} alt="shop.it logo" />
      {Object.keys(user).length === 0 ? (
        <nav className="nav-bar">
          <Link to="/login">
            <button className="nav-btns">Log In</button>
          </Link>
          <Link to="/sign-up">
            <button className="nav-btns">Sign up!</button>
          </Link>
        </nav>
      ) : (
        <nav className="nav-bar">
          <button className="logout-btn nav-btns" onClick={logOutUser}>
            Log out!
          </button>
        </nav>
      )}
    </div>
  );
}

export default Header;
