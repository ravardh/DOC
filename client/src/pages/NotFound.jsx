import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaFileAlt, FaHeart, FaArrowLeft } from "react-icons/fa";

function NotFound() {
  return (
    <div 
      className="min-h-screen relative flex items-center justify-center px-4 bg-gradient-to-br from-orange-100 via-orange-200 to-orange-300"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30"></div>
      
      {/* Content */}
      <div className="relative z-10 text-center max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl"
        >
          <h1 className="text-6xl font-bold text-[#FF6F00] mb-4">404</h1>
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-gray-600 mb-8">
            The page you're looking for doesn't exist, but your support can help us create more pages of hope and change.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <Link
              to="/publications"
              className="flex items-center justify-center gap-2 bg-[#FF6F00] text-white px-6 py-3 rounded-lg hover:bg-[#FF8F00] transition-colors duration-300"
            >
              <FaFileAlt className="w-5 h-5" />
              <span>Explore Our Publications</span>
            </Link>
            <Link
              to="/support/donate"
              className="flex items-center justify-center gap-2 bg-white text-[#FF6F00] border-2 border-[#FF6F00] px-6 py-3 rounded-lg hover:bg-[#FF6F00] hover:text-white transition-colors duration-300"
            >
              <FaHeart className="w-5 h-5" />
              <span>Support Our Cause</span>
            </Link>
          </div>

          <Link
            to="/"
            className="flex items-center justify-center gap-2 text-[#FF6F00] hover:text-[#FF8F00] transition-colors duration-300"
          >
            <FaArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

export default NotFound; 