import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiX, FiShoppingCart, FiSearch } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query.trim())}`);
      setQuery("");
      setSearchOpen(false);
      setMenuOpen(false);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-amber-300 shadow-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Left: Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img
            src="/images/logoo.jpeg"
            alt="Delight Sound Systems"
            className="h-10 w-10 object-contain"
          />
          <div>
            <h1 className="font-bold text-lg text-gray-800">
              Delight Vision Sounds
            </h1>
            <p className="text-sm text-gray-600 -mt-1">
              Quality Audio Solutions
            </p>
          </div>
        </Link>

        {/* Center: Desktop Navigation */}
        <ul className="hidden md:flex items-center space-x-8 text-gray-700 font-medium">
          <li>
            <Link to="/" className="hover:text-blue-600 transition">
              Home
            </Link>
          </li>
          <li>
            <Link to="/products" className="hover:text-blue-600 transition">
              Products
            </Link>
          </li>
          <li>
            <Link to="/services" className="hover:text-blue-600 transition">
              Services
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-blue-600 transition">
              Contact
            </Link>
          </li>
        </ul>

        {/* Right: Search + Cart + Mobile Toggle */}
        <div className="flex items-center space-x-4">
          {/* Search (Desktop) */}
          <div className="relative hidden md:block">
            <button
              className="text-gray-700 hover:text-blue-600 transition"
              onClick={() => setSearchOpen((prev) => !prev)}
            >
              <FiSearch size={22} />
            </button>

            <AnimatePresence>
              {searchOpen && (
                <motion.form
                  key="search-form"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  onSubmit={handleSearch}
                  className="absolute right-0 mt-3 bg-white shadow-md rounded-lg p-2 flex items-center border border-gray-200 w-64"
                >
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="flex-1 outline-none text-sm text-gray-700 px-2"
                  />
                  <button
                    type="submit"
                    className="text-blue-600 hover:text-blue-700 p-1"
                  >
                    <FiSearch size={18} />
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          <Link
            to="/cart"
            className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <FiShoppingCart className="mr-2" /> Cart
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FiX size={26} /> : <FiMenu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-gray-200 shadow-sm"
          >
            <ul className="flex flex-col items-center py-4 space-y-4 font-medium text-gray-700">
              <li>
                <Link
                  to="/"
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-blue-600"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-blue-600"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-blue-600"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-blue-600"
                >
                  Contact
                </Link>
              </li>

              {/* Search on Mobile */}
              <li className="w-10/12">
                <form
                  onSubmit={handleSearch}
                  className="flex items-center space-x-2 border border-gray-300 rounded-full px-3 py-2 w-full"
                >
                  <FiSearch size={18} className="text-gray-500" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search..."
                    className="flex-1 text-sm outline-none"
                  />
                </form>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
