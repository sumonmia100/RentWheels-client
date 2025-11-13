import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 mt-1">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo & About */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <h2 className="text-2xl font-bold text-white">
              Rent<span className="text-blue-500">Wheels</span>
            </h2>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            RentWheels helps you rent cars from trusted providers with
            affordable prices and a smooth booking experience.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-blue-400">
                Home
              </Link>
            </li>
            <li>
              <Link to="/browse" className="hover:text-blue-400">
                Browse Cars
              </Link>
            </li>
            <li>
              <Link to="/addcar" className="hover:text-blue-400">
                Add Car
              </Link>
            </li>
            <li>
              <Link to="/mylistings" className="hover:text-blue-400">
                My Listings
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Contact Us</h3>
          <p className="text-sm text-gray-400">
            📞 +880-1626089815 <br />
            ✉️ sasumon2255@gmail.com <br />
            📍 Sylhet, Bangladesh
          </p>

          <div className="flex gap-4 mt-4 text-xl">
            <a
              href="https://www.facebook.com/md.sumon.mia.232638"
              className="hover:text-blue-400"
            >
              <FaFacebook />
            </a>
            <a href="#" className="hover:text-blue-400">
              <FaInstagram />
            </a>
            <a href="https://x.com/snehaarisa" className="hover:text-blue-400">
              <FaTwitter />
            </a>
            <a
              href="https://www.linkedin.com/notifications/?filter=all"
              className="hover:text-blue-400"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

     
      <div className="border-t border-gray-700 text-center py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} RentWheels. All rights reserved. |
        <Link to="#" className="text-blue-400 hover:underline ml-1">
          Terms & Conditions
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
