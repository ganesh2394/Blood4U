import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-slate-600 text-white py-8">
      <div className="container mx-auto px-6 grid md:grid-cols-3 gap-6 text-center md:text-left">
        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="/" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="/donations" className="hover:underline">
                Donate
              </a>
            </li>
            <li>
              <a href="/centers" className="hover:underline">
                Find a Center
              </a>
            </li>
            <li>
              <a href="/eligibility" className="hover:underline">
                Eligibility
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Information */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
          <p>
            Email:{" "}
            <a href="mailto:support@blood4u.com" className="hover:underline">
              support@blood4u.com
            </a>
          </p>
          <p>
            Phone:{" "}
            <a href="tel:+1234567890" className="hover:underline">
              +1 234 567 890
            </a>
          </p>
          <p>Address: 123 Blood Donation St, City, Country</p>
        </div>

        {/* Social Media Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex justify-center md:justify-start space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook className="text-2xl hover:text-gray-300" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter className="text-2xl hover:text-gray-300" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="text-2xl hover:text-gray-300" />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center mt-6 border-t border-gray-300 pt-4 text-sm">
        <p>© {new Date().getFullYear()} Blood4U. All rights reserved.</p>
        <p>
          <a href="/privacy-policy" className="hover:underline">
            Privacy Policy
          </a>{" "}
          |
          <a href="/terms" className="hover:underline">
            {" "}
            Terms of Service
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
