import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      alert(`Subscribed with ${email}`);
      setEmail("");
    }
  };

  return (
    <footer className="bg-gray-900 text-white pt-14 pb-6 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Logo & Mission */}
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
          <p className="text-sm text-gray-300 leading-relaxed">
            Saving lives through your generous blood donations. We connect
            donors and recipients across India. Be the reason for someone's
            heartbeat.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-red-400 ">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm text-gray-300">
            {[
              { label: "Home", to: "/" },
              { label: "Donate Blood", to: "/donate" },
              { label: "Find a Center", to: "/centers" },
              { label: "Eligibility", to: "/eligibility" },
              { label: "About Us", to: "/about" },
              { label: "Contact", to: "/contact" },
            ].map((link, index) => (
              <li key={index}>
                <Link
                  to={link.to}
                  className="hover:text-blue-500 transition duration-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Information */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-red-400">
            Contact Us
          </h3>
          <ul className="space-y-3 text-sm text-gray-300">
            <li className="flex items-start">
              <MapPin className="w-5 h-5 mr-2 text-red-300 mt-0.5" />
              123 Life Saver Street, New Delhi, India
            </li>
            <li className="flex items-center">
              <Phone className="w-5 h-5 mr-2 text-red-300" />
              +91 70897 80578
            </li>
            <li className="flex items-center">
              <Mail className="w-5 h-5 mr-2 text-red-300" />
              support@blood4u.org
            </li>
          </ul>
        </div>

        {/* Newsletter & Social */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-red-400">
            Stay Updated
          </h3>
          <p className="text-sm text-gray-300 mb-4">
            Subscribe to our newsletter for updates on blood drives and health
            tips.
          </p>
          <form
            onSubmit={handleSubscribe}
            className="flex items-center space-x-2 mb-4"
          >
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-md bg-gray-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
            />
            <button
              type="submit"
              className="bg-red-500 p-2 rounded-md hover:bg-red-600 transition"
              aria-label="Subscribe"
            >
              <Send className="w-4 h-4 text-white" />
            </button>
          </form>

          <div className="flex space-x-4 mt-2">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-400"
              aria-label="Facebook"
            >
              <Facebook />
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-400"
              aria-label="Twitter"
            >
              <Twitter />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-400"
              aria-label="Instagram"
            >
              <Instagram />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Blood4U. All rights reserved. | Made with
        ❤️ in India
      </div>
    </footer>
  );
};

export default Footer;
