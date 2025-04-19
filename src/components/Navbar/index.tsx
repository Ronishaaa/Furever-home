import { useEffect, useRef, useState } from "react";
import { FaRegBell, FaRegHeart } from "react-icons/fa";
import {
  MdOutlineAccountCircle,
  MdOutlineKeyboardArrowDown,
  MdOutlineLogin,
  MdOutlineLogout,
} from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import SimpleBarReact from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { twMerge } from "tailwind-merge";
import { useBoolean, useOnClickOutside } from "usehooks-ts";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../Button";
import { Wishlist } from "../Wishlist";
import styles from "./index.module.scss";
import { useGetNotifications } from "./queries";
import { useNotificationStore } from "./useNotificationStore";

const NAV_LINKS = [
  {
    link: "/adopt",
    name: "Adopt a Pet",
  },
  {
    link: "/pet-care-tips",
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
  const notificationRef = useRef(null);
  const { isAuthenticated, user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const {
    value: isNotificationOpen,
    toggle: toggleNotification,
    setFalse: setNotificationFalse,
  } = useBoolean(false);
  const {
    value: isAccountDropdownOpen,
    toggle: toggleAccountDropdown,
    setFalse: setAccountDropdownFalse,
  } = useBoolean(false);

  const accountDropdownRef = useRef(null);

  useOnClickOutside(accountDropdownRef, setAccountDropdownFalse);

  const { value, toggle, setFalse } = useBoolean(false);
  const { unreadCount, resetUnreadCount } = useNotificationStore();

  useOnClickOutside(notificationRef, setNotificationFalse);

  const noNavbarRoutes = ["/login", "/register", "/verify"];

  const { data: notifications, refetch } = useGetNotifications(user?.id);
  const handleNotificationClick = () => {
    toggleNotification();
    if (!isNotificationOpen && unreadCount > 0) {
      resetUnreadCount();
    }
  };

  useEffect(() => {
    refetch();
  }, [value, user, refetch]);

  const handleNotificationItemClick = () => {
    setNotificationFalse();
    setFalse();
    toggle();
  };

  return (
    <>
      <nav
        className={twMerge(
          styles.navbar,
          noNavbarRoutes.includes(location.pathname) ? "hidden" : "block"
        )}
        onMouseEnter={() => setDropdownOpen(false)}
      >
        <div className="fh-container">
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
              {isAuthenticated ? (
                <>
                  <Button
                    size="sm"
                    variant="icon"
                    icon={<FaRegHeart size={20} className="text-warningRed" />}
                    onClick={toggle}
                  />
                  <div className="relative" ref={notificationRef}>
                    <Button
                      size="sm"
                      variant="icon"
                      onClick={handleNotificationClick}
                      icon={<FaRegBell size={20} />}
                    />
                    {unreadCount > 0 && (
                      <span className="absolute top-0 -right-2 bg-primaryOrange text-primaryBlack text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {unreadCount}
                      </span>
                    )}

                    {isNotificationOpen && (
                      <div className="absolute right-0 mt-2 w-72 bg-secondaryWhite rounded-md shadow-lg py-1 z-50 border border-gray-200">
                        <div className="px-4 py-2 border-b border-gray-200">
                          <h3 className="font-semibold">Notifications</h3>
                        </div>

                        <SimpleBarReact className="max-h-60">
                          {notifications && notifications.length > 0 ? (
                            notifications.map((notification) => (
                              <div
                                key={notification.id}
                                className="px-4 py-3 hover:bg-primaryCream/25 border-b border-b-primaryBlack last:border-b-0 cursor-pointer"
                                onClick={handleNotificationItemClick}
                              >
                                <p className="text-sm">
                                  {notification.message}
                                </p>
                                <div className="flex items-center mt-1">
                                  {notification.pet.images?.[0] && (
                                    <img
                                      src={notification.pet.images[0]}
                                      alt={notification.pet.name}
                                      className="w-6 h-6 rounded-full mr-2"
                                    />
                                  )}
                                  <p className="text-xs text-gray-500">
                                    {notification.pet.name} •
                                    {notification.pet.breed}
                                  </p>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="px-4 py-3 text-sm text-gray-500">
                              No notifications
                            </div>
                          )}
                        </SimpleBarReact>
                      </div>
                    )}
                  </div>

                  <div className="relative" ref={accountDropdownRef}>
                    <Button
                      size="sm"
                      variant="icon"
                      onClick={toggleAccountDropdown}
                      icon={<MdOutlineAccountCircle size={24} />}
                    />

                    {isAccountDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-secondaryWhite rounded-md shadow-lg py-1 z-50 border border-gray-200">
                        <Link
                          to="/account"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-primaryCream/25"
                          onClick={setAccountDropdownFalse}
                        >
                          My Account
                        </Link>
                        <button
                          onClick={() => {
                            logout();
                            setAccountDropdownFalse();
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-primaryCream/25 flex items-center"
                        >
                          <MdOutlineLogout className="mr-2" />
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <Link to="/login">
                  <Button
                    label="Login"
                    size="sm"
                    variant="filled"
                    icon={<MdOutlineLogin size={18} className="mr-1.5" />}
                    className="px-3"
                  />
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      <Wishlist close={setFalse} value={value} />
    </>
  );
};

export default Navbar;
