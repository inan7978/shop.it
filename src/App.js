import "./App.css";
import shopItlogo from "./images/shopitLogo.png";
import { Routes, Route, Link } from "react-router-dom";
import ContactUs from "./pages/ContactUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Collaborations from "./pages/Collaborations";
import CreateListingPage from "./pages/CreateListingPage";
import CreateAccountPage from "./pages/CreateAccountPage";
import LoginPage from "./pages/LoginPage";
function App() {
  return (
    <div className="App">
      <div className="global-header">
        <img className="logo" src={shopItlogo} alt="shop.it logo" />
        <nav className="nav-bar">
          <Link to="/login">
            <button className="login-btn nav-btns">Log In</button>
          </Link>
          <Link to="/sign-up">
            <button className="signup-btn nav-btns">Sign up!</button>
          </Link>
        </nav>
      </div>
      <Routes>
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/collaborations" element={<Collaborations />} />
        <Route path="/list-item" element={<CreateListingPage />} />
        <Route path="/sign-up" element={<CreateAccountPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
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
    </div>
  );
}

export default App;
