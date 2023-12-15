import { Link } from "react-router-dom";
import shopItlogo from "../images/shopitLogo.png";

function Footer() {
  return (
    <div className="global-footer">
      <img className="logo-footer" src={shopItlogo} alt="shop.it logo" />
      <Link to="/contact-us" className="footer-links">
        Contact Us
      </Link>
      <Link to="/privacy" className="footer-links">
        Privacy Policy
      </Link>
      <Link to="/collaborations" className="footer-links">
        Collaborations
      </Link>
      <Link to="/list-item" className="footer-links">
        List Your Product
      </Link>
      <p className="copyright">&copy; 2027 TrevIn Labs LLC</p>
    </div>
  );
}

export default Footer;
