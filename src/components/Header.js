import "./styles/Header.css";
import shopItlogo from "../images/shopitLogo.png";
function Header() {
  return (
    <>
      <div className="global-header">
        <img className="logo" src={shopItlogo} alt="shop.it logo" />
        <nav className="nav-bar">
          <button className="login-btn nav-btns">Log In</button>
          <button className="signup-btn nav-btns">Sign up!</button>
        </nav>
      </div>
    </>
  );
}

export default Header;
