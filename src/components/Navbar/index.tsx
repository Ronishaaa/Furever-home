import { useState } from "react";
import {
  MdOutlineAccountCircle,
  MdOutlineKeyboardArrowDown,
} from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../Button";
import styles from "./index.module.scss";

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
    name: "Stories",
    items: [
      {
        link: "/success-stories",
        name: "Success Stories",
      },
      {
        link: "/rescue-stories",
        name: "Rescue Stories",
      },
    ],
  },
  {
    link: "/contact-us",
    name: "Contact us",
  },
];

const Navbar = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const noNavbarRoutes = ["/login", "/register", "/verify"];

  return (
    <nav
      className={twMerge(
        styles.navbar,
        noNavbarRoutes.includes(location.pathname) ? "hidden" : "block"
      )}
      onMouseEnter={() => setDropdownOpen(false)}
    >
      <div className="min-w-screen-xl mx-auto flex items-center justify-between">
        <div className="text-2xl font-bold text-primaryDarkRosewood">
          <Link to="/">
            <img src="/logoDark.png" className="h-11" />
          </Link>
        </div>

        <div className="hidden md:flex gap-8">
          {NAV_LINKS.map((item, index) => (
            <div key={index}>
              {item.items ? (
                <div
                  className="relative"
                  onMouseEnter={() => setDropdownOpen(true)}
                >
                  <button className="text-primaryDarkRosewood items-center flex gap-1 font-semibold hover:text-primaryDarkRosewood/80 transition duration-300">
                    {item.name}
                    <MdOutlineKeyboardArrowDown size={20} />
                  </button>
                  {dropdownOpen && (
                    <div
                      onMouseLeave={() => setDropdownOpen(false)}
                      className="absolute left-0 mt-2 bg-primaryGrey border border-primaryBlack rounded shadow-lg py-2 w-48"
                    >
                      {item.items.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          to={subItem.link}
                          className="block px-4 py-2 hover:bg-neutralLightGray text-primaryDarkRosewood hover:bg-gray-100"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to={item.link}
                  className="text-primaryDarkRosewood font-semibold hover:text-primaryDarkRosewood/80 transition duration-300"
                  onMouseEnter={() => setDropdownOpen(false)}
                >
                  {item.name}
                </Link>
              )}
            </div>
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
