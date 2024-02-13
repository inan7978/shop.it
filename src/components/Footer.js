import { Link } from "react-router-dom";
import shopItlogo from "../images/shopitLogo.png";
import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();
  const buttonsStyles =
    "text-theYellow p-2 md:text-1xl text-nowrap hover:text-yellow-500 block";

  return (
    <div className="w-1/1 h-24 bg-theBlue flex hidden sm:block justify-center">
      <div className="flex w-4/5 mx-auto">
        <div className="hidden w-0 md:w-1/5 md:block">
          <img
            className="hidden md:block cursor-pointer aspect-auto h-24"
            onClick={() => navigate("./store-page")}
            src={shopItlogo}
            alt="shop.it logo"
          />
        </div>
        <div className="flex items-center mt-7 w-full justify-around items-center md:justify-end ml-auto md:w-1/2 md:mt-0">
          <button
            className={buttonsStyles}
            onClick={() => {
              navigate("./contact-us");
            }}
          >
            Contact Us
          </button>
          <button
            className={buttonsStyles}
            onClick={() => {
              navigate("./privacy");
            }}
          >
            Privacy Policy
          </button>
          <button
            className={buttonsStyles}
            onClick={() => {
              navigate("./about");
            }}
          >
            About
          </button>
          <button
            className={buttonsStyles}
            onClick={() => {
              navigate("./list-item");
            }}
          >
            Sell something!
          </button>
          {/* <p className="text-white pl-5 block">&copy; 2024 TrevIn Labs LLC</p> */}
        </div>
      </div>
    </div>
  );
}

export default Footer;
