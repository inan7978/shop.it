import { Link } from "react-router-dom";
import shopItlogo from "../images/shopitLogo.png";
import UserContext from "../context/UserContext";
import { useContext } from "react";
function Header() {
  const { user } = useContext(UserContext);
  const { addOne } = useContext(UserContext);

  console.log("Number is: " + user);

  return (
    <div className="global-header">
      <img className="logo" src={shopItlogo} alt="shop.it logo" />
      <nav className="nav-bar">
        <Link to="/login">
          <button className="login-btn nav-btns">Log In</button>
        </Link>
        <Link to="/sign-up">
          <button className="signup-btn nav-btns" onClick={addOne}>
            Sign up!
          </button>
        </Link>
      </nav>
    </div>
  );
}

export default Header;
