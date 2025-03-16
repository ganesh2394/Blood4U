import { useState } from "react";
import { Menu, X } from "lucide-react"; // Importing icons

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white fixed w-full top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <a
          href="./"
          className="text-2xl font-bold text-red-600 flex items-center"
        >
          <img src="/logo192.png" alt="" className="h-10 mr-2 " />
          Blood4U
        </a>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-lg font-medium text-gray-800">
          <li>
            <a href="/" className="hover:text-red-600 transition">
              Home
            </a>
          </li>
          <li>
            <a href="/donate" className="hover:text-red-600 transition">
              Donate Blood
            </a>
          </li>
          <li>
            <a href="/centers" className="hover:text-red-600 transition">
              Find a Center
            </a>
          </li>
          <li>
            <a href="/register" className="hover:text-red-600 transition">
              Register
            </a>
          </li>
          <li>
            <a href="/about" className="hover:text-red-600 transition">
              About Us
            </a>
          </li>
          <li>
            <a href="/eligibility" className="hover:text-red-600 transition">
              Check Eligibility
            </a>
          </li>
          <li>
            <a href="/contact" className="hover:text-red-600 transition">
              Contact
            </a>
          </li>
        </ul>

        {/* Donate Button (Desktop) */}
        <div className="hidden md:block ">
          <a
            href="/donate"
            className="bg-red-600 text-white px-6 py-2 rounded-md font-bold hover:bg-red-700 transition"
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
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-300 text-gray-800 shadow-lg py-4">
          <ul className="text-center space-y-4 text-lg">
            <li>
              <a href="/" className="block hover:text-red-600">
                Home
              </a>
            </li>
            <li>
              <a href="/donate" className="block hover:text-red-600">
                Donate Blood
              </a>
            </li>
            <li>
              <a href="/centers" className="block hover:text-red-600">
                Find a Center
              </a>
            </li>
            <li>
              <a href="/register" className="block hover:text-red-600">
                Register
              </a>
            </li>
            <li>
              <a href="/about" className="block hover:text-red-600">
                About Us
              </a>
            </li>
            <li>
              <a href="/eligibility" className="block hover:text-red-600">
                Check Eligibility
              </a>
            </li>
            <li>
              <a href="/contact" className="block hover:text-red-600">
                Contact
              </a>
            </li>
            <li>
              <a
                href="/donate"
                className="bg-red-600 text-white px-6 py-2 rounded-md font-bold hover:bg-red-700 block w-40 mx-auto"
              >
                Donate Now
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
