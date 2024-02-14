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
          className="w-1/3 sm:w-1/4 cursor-pointer"
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
  );
}

export default Header;
