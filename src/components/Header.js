import { Link } from "react-router-dom";
import shopItlogo from "../images/shopitLogo.png";
import MyCartPage from "../pages/MyCartPage";
import UserContext from "../context/UserContext";
import CartContext from "../context/CartContext";
import { useState } from "react";
import { useContext } from "react";
function Header() {
  const { user } = useContext(UserContext);
  const { logOutUser } = useContext(UserContext);

  return (
    <div className="global-header">
      <Link to="/store-page">
        <img className="logo" src={shopItlogo} alt="shop.it logo" />
      </Link>

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
          <Link to="/my-listings">
            <button className="logout-btn nav-btns">My Listings</button>
          </Link>
          <Link to="/my-account">
            <button className="logout-btn nav-btns">Account</button>
          </Link>
          <button
            className="logout-btn nav-btns"
            onClick={() => logOutUser("toStore")}
          >
            Log out!
          </button>
          <Link to="/my-cart">
            <button className="logout-btn nav-btns">{`Cart: ${user.cart.length}`}</button>
          </Link>
        </nav>
      )}
    </div>
  );
}

export default Header;
