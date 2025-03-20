import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from "../assets/cropped-drops-of-change-ngo-logo.webp"

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-[#FF6F00]">
              Drops of Change
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-gray-700 hover:text-[#FF6F00]">
              Home
            </Link>
            <Link to="/campaigns" className="text-gray-700 hover:text-[#FF6F00]">
              Our Campaigns
            </Link>
            <Link to="/gallery" className="text-gray-700 hover:text-[#FF6F00]">
              Gallery
            </Link>
            <Link to="/support" className="text-gray-700 hover:text-[#FF6F00]">
              Support Us
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-[#FF6F00]">
              About Us
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-[#FF6F00]">
              Contact
            </Link>
            <Link
              to="/support/donate"
              className="bg-[#FF6F00] text-white px-4 py-2 rounded-md hover:bg-[#FF8F00]"
            >
              Donate
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-[#FF6F00]"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link to="/" className="block text-gray-700 hover:text-[#FF6F00] px-3 py-2">
                Home
              </Link>
              <Link to="/campaigns" className="block text-gray-700 hover:text-[#FF6F00] px-3 py-2">
                Our Campaigns
              </Link>
              <Link to="/gallery" className="block text-gray-700 hover:text-[#FF6F00] px-3 py-2">
                Gallery
              </Link>
              <Link to="/support" className="block text-gray-700 hover:text-[#FF6F00] px-3 py-2">
                Support Us
              </Link>
              <Link to="/about" className="block text-gray-700 hover:text-[#FF6F00] px-3 py-2">
                About Us
              </Link>
              <Link to="/contact" className="block text-gray-700 hover:text-[#FF6F00] px-3 py-2">
                Contact
              </Link>
              <Link
                to="/support/donate"
                className="block bg-[#FF6F00] text-white px-4 py-2 rounded-md hover:bg-[#FF8F00] text-center"
              >
                Donate
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;