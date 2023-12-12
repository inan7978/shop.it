import "./styles/Footer.css";
import shopItlogo from "../images/shopitLogo.png";
function Footer() {
  return (
    <>
      <div className="global-footer">
        <img className="logo-footer" src={shopItlogo} alt="shop.it logo" />
        <a href="#" className="footer-links">
          Contact Us
        </a>
        <a href="#" className="footer-links">
          Privacy Policy
        </a>
        <a href="#" className="footer-links">
          Collaborations
        </a>
        <a href="#" className="footer-links">
          List your product
        </a>
        <p className="copyright">&copy; 2027 TrevIn Labs LLC</p>
      </div>
    </>
  );
}

export default Footer;
