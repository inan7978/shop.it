import { Link } from "react-router-dom";
import shopItlogo from "../images/shopitLogo.png";
import MyCartPage from "../pages/MyCartPage";
import UserContext from "../context/UserContext";
import CartContext from "../context/CartContext";
import { useContext } from "react";
function Header() {
  const { user } = useContext(UserContext);
  const { logOutUser } = useContext(UserContext);
  const { cart } = useContext(CartContext);

  if (Object.keys(user).length === 0) {
    console.log(`No logged in user.`);
  } else {
    console.log(`Logged in user: ${user.fname} ${user.lname}`);
  }

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
          {/* <h2>{`Welcome, ${user.fname}`}</h2>
          <h1>{`items in cart: ${cart.length}`}</h1> */}
          <button className="logout-btn nav-btns" onClick={logOutUser}>
            Log out!
          </button>
          <Link to="/my-cart">
            <button className="logout-btn nav-btns">
              {`Cart: ${cart.length}`}
            </button>
          </Link>
        </nav>
      )}
    </div>
  );
}

export default Header;
