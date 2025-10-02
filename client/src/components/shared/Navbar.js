import { useState } from "react";
import {
  Menu,
  X,
  Heart,
  Home,
  Info,
  LogIn,
  Mail,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { name: "Home", path: "/", icon: <Home size={18} /> },
  { name: "Donate Blood", path: "/donate", icon: <Heart size={18} /> },
  { name: "Find a Center", path: "/centers", icon: <MapPin size={18} /> },
  {
    name: "Check Eligibility",
    path: "/eligibility",
    icon: <ShieldCheck size={18} />,
  },
  { name: "About Us", path: "/about", icon: <Info size={18} /> },
  { name: "Contact", path: "/contact", icon: <Mail size={18} /> },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white/70 backdrop-blur-md fixed w-full top-0 z-50 shadow-md border-b border-gray-200">
      <div className="max-w-8xl mx-auto px-6 lg:px-10 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-extrabold text-red-600"
        >
          <img
            src="/logo192.png"
            alt="Blood4U Logo"
            className="h-10 w-10 rounded-full shadow-md"
          />
          <span>Blood4U</span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-8 items-center text-gray-800 font-medium text-base">
          {navItems.map((item, idx) => (
            <li key={idx}>
              <Link
                to={item.path}
                className={`relative flex items-center gap-1 transition-colors duration-300 ${
                  isActive(item.path)
                    ? "text-red-600 font-semibold"
                    : "hover:text-red-600"
                }`}
              >
                {item.icon}
                {item.name}
                <span
                  className={`absolute left-0 -bottom-1 h-[2px] w-full bg-red-600 scale-x-0 origin-left transition-transform duration-300 ${
                    isActive(item.path)
                      ? "scale-x-100"
                      : "group-hover:scale-x-100"
                  }`}
                ></span>
              </Link>
            </li>
          ))}

          {/* Account Dropdown */}
          <li className="relative group">
            <div className="flex items-center gap-1 hover:text-red-600 transition cursor-pointer">
              <LogIn size={18} />
              Account
            </div>
            <div className="absolute top-full right-0 mt-3 w-44 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 group-hover:visible invisible transition-all duration-300 ease-in-out z-10">
              <Link
                to="/login"
                className="block px-4 py-2 hover:bg-red-50 text-gray-700 hover:text-red-600 rounded-t-lg"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block px-4 py-2 hover:bg-red-50 text-gray-700 hover:text-red-600 rounded-b-lg"
              >
                Register
              </Link>
            </div>
          </li>
        </ul>

        {/* CTA Button */}
        <div className="hidden md:flex items-center">
          <Link
            to="/donate"
            className="bg-red-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors"
          >
            Donate Now
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-red-600 focus:outline-none"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-4/5 sm:w-2/3 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b bg-red-600 text-white">
          <span className="text-lg font-bold">Menu</span>
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
            className="focus:outline-none"
          >
            <X size={28} />
          </button>
        </div>

        {/* Drawer Links */}
        <ul className="px-6 py-6 space-y-3 text-base font-medium text-gray-700 bg-gray-200">
          {navItems.map((item, idx) => (
            <li key={idx}>
              <Link
                to={item.path}
                className="flex items-center gap-3 py-2 px-3 rounded-md hover:bg-slate-50 hover:text-gray-800 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.icon}
                {item.name}
              </Link>
            </li>
          ))}

          {/* Account Links */}
          <li>
            <Link
              to="/login"
              className="flex items-center gap-3 py-2 px-3 rounded-md hover:bg-slate-50 hover:text-gray-800"
              onClick={() => setIsOpen(false)}
            >
              <LogIn size={18} />
              Login
            </Link>
          </li>
          <li>
            <Link
              to="/register"
              className="flex items-center gap-3 py-2 px-3 rounded-md hover:bg-slate-50 hover:text-gray-800"
              onClick={() => setIsOpen(false)}
            >
              <LogIn size={18} />
              Register
            </Link>
          </li>

          {/* CTA */}
          <li className="mt-6">
            <Link
              to="/donate"
              className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold block text-center hover:bg-red-700 transition"
              onClick={() => setIsOpen(false)}
            >
              Donate Now
            </Link>
          </li>
        </ul>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;
