import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-10">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4 border-b-2 border-red-500 inline-block pb-1">
            Quick Links
          </h3>
          <ul className="space-y-3">
            {[
              { name: "Home", path: "/" },
              { name: "Donate Blood", path: "/donations" },
              { name: "Find a Center", path: "/centers" },
              { name: "Eligibility", path: "/eligibility" },
              { name: "Contact Us", path: "/contact" },
            ].map((item, index) => (
              <li key={index}>
                <a
                  href={item.path}
                  className="hover:text-red-400 transition duration-300"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Information */}
        <div>
          <h3 className="text-xl font-semibold mb-4 border-b-2 border-red-500 inline-block pb-1">
            Contact Us
          </h3>
          <p className="text-gray-300">
            📧{" "}
            <a
              href="mailto:support@blood4u.com"
              className="hover:text-red-400 transition duration-300"
            >
              support@blood4u.com
            </a>
          </p>
          <p className="text-gray-300">
            📞{" "}
            <a
              href="tel:+1234567890"
              className="hover:text-red-400 transition duration-300"
            >
              +1 234 567 890
            </a>
          </p>
          <p className="text-gray-300">
            📍 123 Blood Donation St, City, Country
          </p>
        </div>

        {/* Social Media Links */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-xl font-semibold mb-4 border-b-2 border-red-500 inline-block pb-1">
            Follow Us
          </h3>
          <div className="flex space-x-6 mt-2">
            {[
              { icon: FaFacebook, link: "https://facebook.com" },
              { icon: FaTwitter, link: "https://twitter.com" },
              { icon: FaInstagram, link: "https://instagram.com" },
            ].map((social, index) => (
              <a
                key={index}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl hover:text-red-400 transition duration-300"
              >
                <social.icon />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center mt-8 border-t border-gray-600 pt-6 text-gray-400 text-sm">
        <p>© {new Date().getFullYear()} Blood4U. All rights reserved.</p>
        <p className="mt-2">
          <a
            href="/privacy-policy"
            className="hover:text-red-400 transition duration-300"
          >
            Privacy Policy
          </a>{" "}
          |{" "}
          <a
            href="/terms"
            className="hover:text-red-400 transition duration-300"
          >
            Terms of Service
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
