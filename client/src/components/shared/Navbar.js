import { useState } from "react";
import { Menu, X } from "lucide-react"; // Importing icons

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white/90 backdrop-blur-lg fixed w-full top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <a
          href="/"
          className="text-2xl font-bold text-red-600 flex items-center"
        >
          <img
            src="/logo192.png"
            alt="Blood4U Logo"
            className="h-10 mr-2 rounded-full shadow-lg"
          />
          <span className="hover:text-red-700 transition duration-300">
            Blood4U
          </span>
        </a>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-lg font-medium text-gray-800">
          {[
            { name: "Home", path: "/" },
            { name: "Donate Blood", path: "/donate" },
            { name: "Find a Center", path: "/centers" },
            { name: "Login", path: "/login" },
            { name: "About Us", path: "/about" },
            { name: "Check Eligibility", path: "/eligibility" },
            { name: "Contact", path: "/contact" },
          ].map((item, index) => (
            <li key={index}>
              <a
                href={item.path}
                className="hover:text-red-600 transition duration-300"
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Donate Button (Desktop) */}
        <div className="hidden md:block">
          <a
            href="/donate"
            className="bg-red-600 text-white px-6 py-2 rounded-lg font-bold shadow-lg hover:bg-red-700 transition-all duration-300"
          >
            Donate Now
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-red-600"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X size={30} className="animate-fade" />
          ) : (
            <Menu size={30} />
          )}
        </button>
      </div>

      {/* Mobile Menu (Animated) */}
      <div
        className={`md:hidden fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      />

      <div
        className={`fixed top-0 right-0 w-3/4 h-full bg-white shadow-lg transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <span className="text-xl font-bold text-red-600">Menu</span>
          <button onClick={() => setIsOpen(false)}>
            <X
              size={28}
              className="text-gray-800 hover:text-red-600 transition"
            />
          </button>
        </div>

        <ul className="text-center space-y-6 mt-6 text-lg font-medium text-gray-800">
          {[
            { name: "Home", path: "/" },
            { name: "Donate Blood", path: "/donate" },
            { name: "Find a Center", path: "/centers" },
            { name: "Login", path: "/login" },
            { name: "About Us", path: "/about" },
            { name: "Check Eligibility", path: "/eligibility" },
            { name: "Contact", path: "/contact" },
          ].map((item, index) => (
            <li key={index}>
              <a
                href={item.path}
                className="block py-2 px-6 rounded-md hover:bg-red-100 hover:text-red-600 transition duration-300"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            </li>
          ))}
          <li>
            <a
              href="/donate"
              className="bg-red-600 text-white px-6 py-2 rounded-lg font-bold shadow-lg hover:bg-red-700 block w-40 mx-auto transition-all duration-300"
              onClick={() => setIsOpen(false)}
            >
              Donate Now
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
