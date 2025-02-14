import { MdOutlineAccountCircle } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../Button";

const NAV_LINKS = [
  {
    link: "/adopt",
    name: "Adopt a  Pet",
  },
  {
    link: "/tips",
    name: "Pet care tips",
  },
  {
    link: "/success-stories",
    name: "Success Stories",
  },
  {
    link: "contact-us",
    name: "Contact us",
  },
];

const Navbar = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const noNavbarRoutes = ["/login", "/register", "/verify"];

  return (
    <nav
      className={twMerge(
        "bg-primaryIvory p-4 fixed z-20 w-full",
        noNavbarRoutes.includes(location.pathname) ? "hidden" : "block"
      )}
    >
      <div className="min-w-screen-xl mx-auto flex items-center justify-between">
        <div className="text-2xl font-bold text-primaryIvory">
          <Link to="/">
            <img src="/logoDark.png" className="h-11" />
          </Link>
        </div>

        <div className="hidden md:flex space-x-8">
          {NAV_LINKS.map((item, index) => (
            <Link
              to={item.link}
              className="text-primaryPurple font-semibold hover:text-primaryGreen transition duration-300"
              key={index}
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="flex gap-4 items-center">
          <Button size="md" variant="filled" label="Donate Now" />
          {isAuthenticated ? (
            <div>hi</div>
          ) : (
            <Link to="/login" className="">
              <MdOutlineAccountCircle size={24} />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
