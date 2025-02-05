import { Link, useLocation } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const noNavbarRoutes = ["/login", "/register", "/verify"];

  return (
    <nav
      className={twMerge(
        "bg-primaryMintGreen/40 p-4 fixed z-10 w-full",
        noNavbarRoutes.includes(location.pathname) ? "hidden" : "block"
      )}
    >
      <div className="min-w-screen-xl mx-auto flex items-center justify-between">
        <div className="text-2xl font-bold text-neutralDarkGray">
          <Link to="/">Furever Home</Link>
        </div>

        <div className="hidden md:flex space-x-8">
          <Link
            to="/pets"
            className="text-neutralDarkGray hover:text-primaryGreen transition duration-300"
          >
            Our pets
          </Link>
          <Link
            to="/about"
            className="text-neutralDarkGray hover:text-primaryGreen transition duration-300"
          >
            About
          </Link>
          <Link
            to="/adopt"
            className="text-neutralDarkGray hover:text-primaryGreen transition duration-300"
          >
            Adopt
          </Link>
          <Link
            to="/contact"
            className="text-neutralDarkGray hover:text-primaryGreen transition duration-300"
          >
            Contact
          </Link>
        </div>

        {isAuthenticated ? (
          <div className="text-neutralDarkGray">Welcome, hi!</div>
        ) : (
          <div className="flex space-x-4">
            <Link
              to="/login"
              className="bg-primaryGreen text-white py-2 px-4 rounded-md hover:bg-primaryGreen/80 transition duration-300"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-secondaryOrange text-white py-2 px-4 rounded-md hover:bg-secondaryOrange/80 transition duration-300"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
