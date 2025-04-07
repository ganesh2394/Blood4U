import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Mail, MapPin, Phone } from "lucide-react";


const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Logo + Mission */}
        <div>
          <div className="flex items-center mb-4">
            <img
              src="/logo192.png"
              alt="Blood4U Logo"
              className="h-10 w-10 rounded-full mr-2"
              loading="lazy"
            />
            <h2 className="text-2xl font-bold text-red-500">Blood4U</h2>
          </div>
          <p className="text-sm text-gray-300">
            Your donation can save lives. Join our mission to ensure safe and
            accessible blood for everyone, everywhere.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-red-400">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <Link to="/" className="hover:text-red-300">
                Home
              </Link>
            </li>
            <li>
              <Link to="/donate" className="hover:text-red-300">
                Donate Blood
              </Link>
            </li>
            <li>
              <Link to="/centers" className="hover:text-red-300">
                Find a Center
              </Link>
            </li>
            <li>
              <Link to="/eligibility" className="hover:text-red-300">
                Check Eligibility
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-red-300">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-red-300">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-red-400">
            Contact Us
          </h3>
          <ul className="space-y-3 text-sm text-gray-300">
            <li className="flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-red-300" />
              123 Life Saver Street, Delhi, IN
            </li>
            <li className="flex items-center">
              <Phone className="w-5 h-5 mr-2 text-red-300" />
              +91 98765 43210
            </li>
            <li className="flex items-center">
              <Mail className="w-5 h-5 mr-2 text-red-300" />
              support@blood4u.org
            </li>
          </ul>
        </div>

        {/* Stay Connected / Social */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-red-400">
            Stay Connected
          </h3>
          <p className="text-sm text-gray-300 mb-4">
            Follow us on social media for blood drives, awareness, and updates.
          </p>
          <div className="flex space-x-4">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-red-400"
            >
              <Facebook />
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="hover:text-red-400"
            >
              <Twitter />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-red-400"
            >
              <Instagram />
            </a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Blood4U. All rights reserved. | Made with
        ❤️
      </div>
    </footer>
  );
};

export default Footer;
