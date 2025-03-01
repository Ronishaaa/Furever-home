import axios from "axios";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";
import {
  Adopt,
  Contact,
  EmailVerification,
  Home,
  Login,
  PetDetails,
  Signup,
  SuccessStories,
} from "./pages";

axios.defaults.baseURL = "http://localhost:3001";
axios.defaults.withCredentials = true;

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
        <Routes>
          <Route path="/register" element={<Signup />} />
          <Route path="/verify" element={<EmailVerification />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />{" "}
          <Route path="/pet-details" element={<PetDetails />} />
          <Route path="/adopt" element={<Adopt />} />
          <Route path="/success-stories" element={<SuccessStories />} />
          <Route path="/contact-us" element={<Contact />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
