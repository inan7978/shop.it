import { Link } from "react-router-dom";
import shopItlogo from "../images/shopitLogo.png";
function Header() {
  return (
    <div className="global-header">
      <img className="logo" src={shopItlogo} alt="shop.it logo" />
      <nav className="nav-bar">
        <Link to="/login">
          <button className="login-btn nav-btns">Log In</button>
        </Link>
        <Link to="/sign-up">
          <button className="signup-btn nav-btns">Sign up!</button>
        </Link>
      </nav>
    </div>
  );
}

export default Header;
