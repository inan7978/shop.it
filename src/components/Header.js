import shopItlogo from "../images/shopitLogo.png";
import UserContext from "../context/UserContext";
import Hamburger from "./Hamburger";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
function Header() {
  const { user } = useContext(UserContext);
  const { logOutUser } = useContext(UserContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const buttonsStyles =
    "text-theYellow p-2 md:text-3xl text-nowrap hover:text-yellow-500";

  const menuButtons =
    "text-theYellow p-2 text-3xl text-nowrap hover:text-yellow-500";

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="flex justify-between w-1/1 bg-theBlue">
      {/* This is the hamburger menu */}
      {menuOpen &&
        // hamburger menu when someone is logged in
        (Object.keys(user).length ? (
          <div className="container absolute w-screen">
            <>
              <div className="bg-theBlue w-full h-screen mx-auto flex flex-col py-24">
                <button
                  className={menuButtons}
                  onClick={() => {
                    navigate("./my-cart");
                    setMenuOpen(false);
                  }}
                >{`Cart: ${user.cart.length}`}</button>
                <button
                  onClick={() => {
                    navigate("./my-account");
                    setMenuOpen(false);
                  }}
                  className={menuButtons}
                >
                  Account
                </button>
                <button
                  className={menuButtons}
                  onClick={() => {
                    navigate("./list-item");
                    setMenuOpen(false);
                  }}
                >
                  Sell something!
                </button>
                <button
                  className={menuButtons}
                  onClick={() => {
                    navigate("./contact-us");
                    setMenuOpen(false);
                  }}
                >
                  Contact Us
                </button>
                <button
                  className={menuButtons}
                  onClick={() => {
                    navigate("./privacy");
                    setMenuOpen(false);
                  }}
                >
                  Privacy Policy
                </button>
                <button
                  className={menuButtons}
                  onClick={() => {
                    navigate("./about");
                    setMenuOpen(false);
                  }}
                >
                  About
                </button>
                <button
                  className={menuButtons}
                  onClick={() => {
                    logOutUser("toStore");
                    setMenuOpen(false);
                  }}
                >
                  Log out!
                </button>
              </div>
            </>
          </div>
        ) : (
          // hamburger menu when no one is logged in
          <div className="container absolute w-screen">
            <>
              <div className="bg-theBlue w-full h-screen mx-auto flex flex-col py-24">
                <button
                  onClick={() => {
                    navigate("./login");
                    setMenuOpen(false);
                  }}
                  className={menuButtons}
                >
                  Log In
                </button>
                <button
                  onClick={() => {
                    navigate("./sign-up");
                    setMenuOpen(false);
                  }}
                  className={menuButtons}
                >
                  Sign up!
                </button>
                <button
                  className={menuButtons}
                  onClick={() => {
                    navigate("./contact-us");
                    setMenuOpen(false);
                  }}
                >
                  Contact Us
                </button>
                <button
                  className={menuButtons}
                  onClick={() => {
                    navigate("./privacy");
                    setMenuOpen(false);
                  }}
                >
                  Privacy Policy
                </button>
                <button
                  className={menuButtons}
                  onClick={() => {
                    navigate("./about");
                    setMenuOpen(false);
                  }}
                >
                  About
                </button>
              </div>
            </>
          </div>
        ))}
      <div className="flex">
        <img
          className="w-1/3 sm:w-1/4 cursor-pointer"
          onClick={() => navigate("./store-page")}
          src={shopItlogo}
          alt="shop.it logo"
        />
      </div>
      <div className="hidden md:flex justify-end gap-5 items-center w-1/4 p-2">
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
      <div
        className="flex justify-center items-center mr-3 md:hidden"
        onClick={toggleMenu}
      >
        <Hamburger />
      </div>
    </div>
  );
}

export default Header;
