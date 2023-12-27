import "./App.css";
import { Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import { CartProvider } from "./context/CartContext";
import ContactUs from "./pages/ContactUs";
import StorePage from "./pages/StorePage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Collaborations from "./pages/Collaborations";
import CreateListingPage from "./pages/CreateListingPage";
import CreateAccountPage from "./pages/CreateAccountPage";
import MyCartPage from "./pages/MyCartPage";
import Footer from "./components/Footer";
import LoginPage from "./pages/LoginPage";
import Header from "./components/Header";
import ItemDetailsPage from "./pages/ItemDetailsPage";

function App() {
  return (
    <UserProvider>
      <CartProvider>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<StorePage />} />
            <Route path="/store-page" element={<StorePage />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/my-cart" element={<MyCartPage />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/collaborations" element={<Collaborations />} />
            <Route path="/list-item" element={<CreateListingPage />} />
            <Route path="/sign-up" element={<CreateAccountPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/item-details-page/:id"
              element={<ItemDetailsPage />}
            />
          </Routes>
          <Footer />
        </div>
      </CartProvider>
    </UserProvider>
  );
}

export default App;
