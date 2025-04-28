import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/scrollToTop";
import { AuthProvider } from "./context/AuthContext";
import {
  Account,
  Adopt,
  Contact,
  Donation,
  EmailVerification,
  Home,
  Login,
  NotFound,
  PetCareTips,
  PetDetails,
  RescueStories,
  RescueStoriesDetail,
  Signup,
  SuccessStories,
  SuccessStoriesDetail,
  Verification,
} from "./pages";

axios.defaults.baseURL = "http://localhost:3001";
axios.defaults.withCredentials = true;

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />
        <Toaster closeButton position="top-right" />
        <Routes>
          <Route path="/register" element={<Signup />} />
          <Route path="/verify" element={<EmailVerification />} />
          <Route path="/login" element={<Login />} />
          <Route path="/account" element={<Account />} />
          <Route path="/" element={<Home />} />{" "}
          <Route path="/pet-details/:id" element={<PetDetails />} />
          <Route path="/adopt" element={<Adopt />} />
          <Route path="/pet-care-tips" element={<PetCareTips />} />
          <Route path="/success-stories" element={<SuccessStories />} />
          <Route
            path="/success-stories/:id"
            element={<SuccessStoriesDetail />}
          />
          <Route path="/rescue-stories" element={<RescueStories />} />
          <Route path="/rescue-stories/:id" element={<RescueStoriesDetail />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/donate" element={<Donation />} />
          <Route path="/verification" element={<Verification />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
