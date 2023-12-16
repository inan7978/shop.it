import "./App.css";
import { Routes, Route } from "react-router-dom";
import ContactUs from "./pages/ContactUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Collaborations from "./pages/Collaborations";
import CreateListingPage from "./pages/CreateListingPage";
import CreateAccountPage from "./pages/CreateAccountPage";
import Footer from "./components/Footer";
import LoginPage from "./pages/LoginPage";
import Header from "./components/Header";
function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/collaborations" element={<Collaborations />} />
        <Route path="/list-item" element={<CreateListingPage />} />
        <Route path="/sign-up" element={<CreateAccountPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
