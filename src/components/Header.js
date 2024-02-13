import { Link } from "react-router-dom";
import shopItlogo from "../images/shopitLogo.png";
import MyCartPage from "../pages/MyCartPage";
import UserContext from "../context/UserContext";
import CartContext from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
function Header() {
  const { user } = useContext(UserContext);
  const { logOutUser } = useContext(UserContext);
  const navigate = useNavigate();

  const buttonsStyles =
    "text-theYellow p-2 md:text-3xl text-nowrap hover:text-yellow-500";

  return (
    <div className="flex justify-between w-1/1 bg-theBlue">
      <div className="flex">
        <img
          className="w-1/4 cursor-pointer"
          onClick={() => navigate("./store-page")}
          src={shopItlogo}
          alt="shop.it logo"
        />
      </div>
      <div className="flex justify-end gap-5 items-center w-1/4 p-2">
        {Object.keys(user).length ? (
          <>
            <button
              onClick={() => {
                navigate("./store-page");
              }}
              className={buttonsStyles}
            >
              Listings
            </button>
            <button
              onClick={() => {
                navigate("./my-account");
              }}
              className={buttonsStyles}
            >
              Account
            </button>
            <button
              className={buttonsStyles}
              onClick={() => logOutUser("toStore")}
            >
              Log out!
            </button>
            <button
              className={buttonsStyles}
              onClick={() => navigate("./my-cart")}
            >{`Cart: ${user.cart.length}`}</button>
          </>
        ) : (
          <>
            <button
              onClick={() => {
                navigate("./login");
              }}
              className={buttonsStyles}
            >
              Log In
            </button>
            <button
              onClick={() => {
                navigate("./sign-up");
              }}
              className={buttonsStyles}
            >
              Sign up!
            </button>
          </>
        )}
      </div>
    </div>
    // <div className="global-header">
    //   <Link to="/store-page">
    //     <img className="logo" src={shopItlogo} alt="shop.it logo" />
    //   </Link>

    //   {/* <h1 className="text-5xl hidden">
    //     Tailwind is configed and can start being used
    //   </h1> */}

    //   {Object.keys(user).length === 0 ? (
    //     <nav className="nav-bar">
    //       <Link to="/login">
    //         <button className="nav-btns">Log In</button>
    //       </Link>
    //       <Link to="/sign-up">
    //         <button className="nav-btns">Sign up!</button>
    //       </Link>
    //     </nav>
    //   ) : (
    //     <nav className="nav-bar">
    //       <Link to="/store-page">
    //         <button className="logout-btn nav-btns">Listings</button>
    //       </Link>
    //       <Link to="/my-account">
    //         <button className="logout-btn nav-btns">Account</button>
    //       </Link>
    //       <button
    //         className="logout-btn nav-btns"
    //         onClick={() => logOutUser("toStore")}
    //       >
    //         Log out!
    //       </button>
    //       <Link to="/my-cart">
    //         <button className="logout-btn nav-btns">{`Cart: ${user.cart.length}`}</button>
    //       </Link>
    //     </nav>
    //   )}
    // </div>
  );
}

export default Header;
