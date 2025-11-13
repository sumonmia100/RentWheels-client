import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 mt-10">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About Section */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <img
              src="https://i.ibb.co/mTXBL3M/car-logo.png"
              alt="Satos"
              className="h-8 w-8"
            />
            <h2 className="text-2xl font-bold text-white">Satos.</h2>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            In quis turpis volutpat, rutrum ligula sed, tincidunt magna. Sed
            ultrices, justo porta iaculis facilisis, est leo tempus nisl, ut
            laoreet tellus nisi ac ligula. Praesent faucibus massa vitae ipsum
            placerat suscipit.
          </p>
        </div>

        {/* Our Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Our Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-red-500">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-red-500">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-red-500">
                Services
              </Link>
            </li>
            <li>
              <Link to="/models" className="hover:text-red-500">
                Models
              </Link>
            </li>
            <li>
              <Link to="/blog" className="hover:text-red-500">
                Blog
              </Link>
            </li>
          </ul>
        </div>

        {/* Other Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Other Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/contact" className="hover:text-red-500">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/faq" className="hover:text-red-500">
                FAQ
              </Link>
            </li>
            <li>
              <Link to="/support" className="hover:text-red-500">
                Support
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-red-500">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-red-500">
                Terms & Condition
              </Link>
            </li>
          </ul>
        </div>

        {/* Our Gallery */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Our Gallery</h3>
          <div className="grid grid-cols-3 gap-2">
            <img
              src="https://i.ibb.co/album1.jpg"
              alt="Gallery 1"
              className="w-full h-16 object-cover"
            />
            <img
              src="https://i.ibb.co/album2.jpg"
              alt="Gallery 2"
              className="w-full h-16 object-cover"
            />
            <img
              src="https://i.ibb.co/album3.jpg"
              alt="Gallery 3"
              className="w-full h-16 object-cover"
            />
            <img
              src="https://i.ibb.co/album4.jpg"
              alt="Gallery 4"
              className="w-full h-16 object-cover"
            />
            <img
              src="https://i.ibb.co/album5.jpg"
              alt="Gallery 5"
              className="w-full h-16 object-cover"
            />
            <img
              src="https://i.ibb.co/album6.jpg"
              alt="Gallery 6"
              className="w-full h-16 object-cover"
            />
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <div className="max-w-7xl mx-auto px-4 mt-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm text-gray-400">
        <div>
          <h4 className="font-semibold text-white mb-1">Location</h4>
          1247/Plot No. 39, 15th Phase, Colony, Kukatpally, Hyderabad
        </div>
        <div>
          <h4 className="font-semibold text-white mb-1">Mail</h4>
          info@gmail.com <br />
          serv@gmail.com
        </div>
        <div>
          <h4 className="font-semibold text-white mb-1">Call Now</h4>
          1800-121-3637 <br />
          +91 555 234-8765
        </div>
        <div>
          <h4 className="font-semibold text-white mb-1">Sales Hours</h4>
          Monday - Friday: 09:00AM - 09:00PM <br />
          Saturday: 09:00AM - 07:00PM <br />
          Sunday: Closed
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-700 text-center py-4 text-sm text-gray-500 mt-6">
        © {new Date().getFullYear()} Satos. All rights reserved.
        <div className="flex justify-center gap-4 mt-2 text-xl">
          <a href="#" className="hover:text-red-500">
            <FaFacebook />
          </a>
          <a href="#" className="hover:text-red-500">
            <FaInstagram />
          </a>
          <a href="#" className="hover:text-red-500">
            <FaTwitter />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
