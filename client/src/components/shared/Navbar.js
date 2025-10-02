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
    <nav className="bg-white/80 backdrop-blur-md fixed w-full top-0 z-50 shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
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
        <ul className="hidden md:flex gap-6 items-center text-gray-800 font-medium text-base">
          {navItems.map((item, idx) => (
            <li key={idx}>
              <Link
                to={item.path}
                className={`flex items-center gap-1 hover:text-red-600 transition duration-300 ${
                  isActive(item.path) ? "text-red-600 font-semibold" : ""
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            </li>
          ))}

          {/* Login/Register Dropdown */}
          <li className="relative group">
            <div className="flex items-center gap-1 hover:text-red-600 transition cursor-pointer">
              <LogIn size={18} />
              Account
            </div>
            <div
              className="absolute top-full right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg 
    opacity-0 group-hover:opacity-100 group-hover:visible 
    invisible transition-all duration-300 ease-in-out z-10"
            >
              <Link
                to="/login"
                className="block px-4 py-2 hover:bg-gray-200 text-gray-700 hover:text-red-600"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block px-4 py-2 hover:bg-gray-200 text-gray-700 hover:text-red-600"
              >
                Register
              </Link>
            </div>
          </li>
        </ul>

        {/* CTA + Theme Toggle */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/donate"
            className="bg-blue-600 text-white px-5 py-2 rounded-lg font-bold hover:bg-blue-700 transition"
          >
            Donate Now
          </Link>
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-red-600"
          aria-label="Menu Toggle"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm transition-opacity duration-300 z-40 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-4/5 sm:w-2/3 bg-white/70 z-50 shadow-lg transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <span className="text-xl font-bold text-red-600">Menu</span>
          <button onClick={() => setIsOpen(false)}>
            <X size={28} className="text-gray-800 hover:text-red-600" />
          </button>
        </div>

        <ul className="px-4 py-6 space-y-4 text-base  bg-gray-200 font-medium text-gray-600">
          {navItems.map((item, idx) => (
            <li key={idx}>
              <Link
                to={item.path}
                className="flex items-center gap-2 py-2 px-3 rounded-md hover:bg-slate-400 hover:text-gray-100 transition"
                onClick={() => setIsOpen(false)}
              >
                {item.icon}
                {item.name}
              </Link>
            </li>
          ))}
          {/* Inside Mobile Drawer ul */}
          <li>
            <Link
              to="/login"
              className="flex items-center gap-2 py-2 px-3 rounded-md hover:bg-slate-400 hover:text-gray-600 transition"
              onClick={() => setIsOpen(false)}
            >
              <LogIn size={18} />
              Login
            </Link>
          </li>
          <li>
            <Link
              to="/register"
              className="flex items-center gap-2 py-2 px-3 rounded-md hover:bg-slate-400 hover:text-gray-600 transition"
              onClick={() => setIsOpen(false)}
            >
              <LogIn size={18} />
              Register
            </Link>
          </li>

          <li className="text-center mt-4">
            <Link
              to="/donate"
              className="bg-blue-600 text-white px-6 py-2 rounded-md font-bold block w-full hover:bg-blue-700 transition"
              onClick={() => setIsOpen(false)}
            >
              Donate Now
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
