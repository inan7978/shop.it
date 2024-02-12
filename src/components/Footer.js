import { Link } from "react-router-dom";
import shopItlogo from "../images/shopitLogo.png";
import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();
  const buttonsStyles =
    "text-theYellow p-2 md:text-1xl text-nowrap hover:text-yellow-500 block";

  return (
    <div className="w-1/1 bg-theBlue flex justify-center">
      <div className="flex w-4/5 mx-auto">
        <div className="w-1/5">
          <img
            className="cursor-pointer aspect-auto h-24"
            onClick={() => navigate("./store-page")}
            src={shopItlogo}
            alt="shop.it logo"
          />
        </div>
        <div className="flex items-center justify-end ml-auto w-1/2">
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
          <p className="text-white">&copy; 2027 TrevIn Labs LLC</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
