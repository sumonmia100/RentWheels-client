import { useContext, useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { AuthContext } from "../contexts/AuthProvider";
import { useDarkMode } from "../hooks/useDarkMode";
import Button from "./Button";
import toast from "react-hot-toast";
import logo from "../assets/rentWheels.jpeg";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Handle logout
  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.success("Logged out successfully!");
        navigate("/");
        setProfileDropdownOpen(false);
      })
      .catch(() => toast.error("Logout failed!"));
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setMobileMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Public navigation routes (minimum 3 when logged out)
  const publicRoutes = [
    { name: "Home", path: "/" },
    { name: "Browse Cars", path: "/browse" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  // Protected navigation routes (minimum 5 when logged in)
  const protectedRoutes = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Add Car", path: "/addcar" },
    { name: "My Listings", path: "/mylistings" },
    { name: "My Bookings", path: "/my-bookings" },
    { name: "Browse Cars", path: "/browse" },
  ];

  const NavLinkComponent = ({ to, children, mobile = false }) => (
    <NavLink
      to={to}
      onClick={() => mobile && setMobileMenuOpen(false)}
      className={({ isActive }) =>
        `transition-colors duration-200 font-medium ${
          mobile
            ? `block px-3 py-2 rounded-md text-base ${
                isActive
                  ? "bg-primary text-white"
                  : "text-text-primary hover:bg-surface hover:text-primary"
              }`
            : `px-3 py-2 rounded-md text-sm ${
                isActive
                  ? "text-primary font-semibold"
                  : "text-text-primary hover:text-primary"
              }`
        }`
      }
    >
      {children}
    </NavLink>
  );

  return (
    <nav className="sticky top-0 z-50 bg-surface border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
          >
            <img
              src={logo}
              alt="RentWheels"
              className="h-10 w-10 rounded-lg object-cover"
            />
            <span className="text-xl font-bold text-primary hidden sm:block">
              RentWheels
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {publicRoutes.map((route) => (
              <NavLinkComponent key={route.path} to={route.path}>
                {route.name}
              </NavLinkComponent>
            ))}

            {user && (
              <div className="relative group">
                <button className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-text-primary hover:text-primary transition-colors">
                  <span>More</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <div className="absolute left-0 mt-2 w-48 bg-surface rounded-md shadow-lg border border-border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  {protectedRoutes.slice(1).map((route) => (
                    <NavLinkComponent key={route.path} to={route.path}>
                      <div className="px-4 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-md mx-1">
                        {route.name}
                      </div>
                    </NavLinkComponent>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Dark mode toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <svg
                  className="w-5 h-5 text-yellow-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5 text-gray-700"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>

            {/* Authentication section */}
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center space-x-2 p-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                >
                  <img
                    src={
                      user?.photoURL ||
                      "https://i.ibb.co/55Gf8qL/default-user.png"
                    }
                    alt="Profile"
                    className="h-8 w-8 rounded-full border-2 border-primary object-cover"
                  />
                  <span className="hidden sm:block text-sm font-medium text-text-primary max-w-[100px] truncate">
                    {user.displayName || "User"}
                  </span>
                  <svg
                    className="w-4 h-4 text-text-secondary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-surface rounded-lg shadow-lg border border-border">
                    <div className="px-4 py-3 border-b border-border">
                      <p className="text-sm font-medium text-text-primary truncate">
                        {user.displayName || "User"}
                      </p>
                      <p className="text-xs text-text-secondary truncate">
                        {user.email}
                      </p>
                    </div>
                    <div className="py-1">
                      <Link
                        to="/dashboard"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="block px-4 py-2 text-sm text-text-primary hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                      >
                        Dashboard
                      </Link>
                      <Link
                        to="/profile-settings"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="block px-4 py-2 text-sm text-text-primary hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                      >
                        Profile Settings
                      </Link>
                      <hr className="my-1 border-border" />
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button variant="primary" size="sm">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div ref={mobileMenuRef} className="md:hidden border-t border-border">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-surface">
              {publicRoutes.map((route) => (
                <NavLinkComponent key={route.path} to={route.path} mobile>
                  {route.name}
                </NavLinkComponent>
              ))}

              {user &&
                protectedRoutes.map((route) => (
                  <NavLinkComponent key={route.path} to={route.path} mobile>
                    {route.name}
                  </NavLinkComponent>
                ))}

              {!user && (
                <div className="pt-4 space-y-2">
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full">
                      Login
                    </Button>
                  </Link>
                  <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="primary" className="w-full">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
