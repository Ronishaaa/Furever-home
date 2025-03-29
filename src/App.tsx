import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
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
  RescueStories,
  RescueStoriesDetail,
  Signup,
  SuccessStories,
  SuccessStoriesDetail,
} from "./pages";

axios.defaults.baseURL = "http://localhost:3001";
axios.defaults.withCredentials = true;

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Toaster />
        <Routes>
          <Route path="/register" element={<Signup />} />
          <Route path="/verify" element={<EmailVerification />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />{" "}
          <Route path="/pet-details/:id" element={<PetDetails />} />
          <Route path="/adopt" element={<Adopt />} />
          <Route path="/success-stories" element={<SuccessStories />} />
          <Route
            path="/success-stories/:id"
            element={<SuccessStoriesDetail />}
          />
          <Route path="/rescue-stories" element={<RescueStories />} />
          <Route path="/rescue-stories/:id" element={<RescueStoriesDetail />} />
          <Route path="/contact-us" element={<Contact />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
