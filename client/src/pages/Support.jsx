import React from "react";
import { motion } from "framer-motion";
import { Heart, Users, BookOpen } from "lucide-react";
import { useNavigate , Link} from "react-router-dom";
import { FaFileAlt } from "react-icons/fa";

function Support() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 pt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Support Us</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="bg-white rounded-lg shadow-md p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Heart className="h-12 w-12 text-[#FF6F00] mb-4" />
              <h2 className="text-2xl font-semibold mb-4">Donate</h2>
              <p className="text-gray-600 mb-6">
                Your contribution can help provide education and support to
                underprivileged children.
              </p>
              <button
                className="bg-[#FF6F00] text-white px-6 py-2 rounded-md hover:bg-[#FF8F00] transition duration-300"
                onClick={() => navigate("/support/donate")}
              >
                Donate Now
              </button>
            </motion.div>

            <motion.div
              className="bg-white rounded-lg shadow-md p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Users className="h-12 w-12 text-[#80CBC4] mb-4" />
              <h2 className="text-2xl font-semibold mb-4">Volunteer</h2>
              <p className="text-gray-600 mb-6">
                Join our team of volunteers and make a direct impact in
                children's lives.
              </p>
              <button
                className="bg-[#80CBC4] text-white px-6 py-2 rounded-md hover:bg-[#5f9ea0] transition duration-300"
                onClick={() => navigate("/support/volunteer")}
              >
                Join Us
              </button>
            </motion.div>

            <motion.div
              className="bg-white rounded-lg shadow-md p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <BookOpen className="h-12 w-12 text-[#FFD700] mb-4" />
              <h2 className="text-2xl font-semibold mb-4">Internships</h2>
              <p className="text-gray-600 mb-6">
                Gain valuable experience while contributing to a meaningful
                cause.
              </p>
              <button className="bg-[#FFD700] text-gray-800 px-6 py-2 rounded-md hover:bg-[#FFC700] transition duration-300" onClick={() => navigate("/support/internship")}>
                Apply Now
              </button>
            </motion.div>
            
          </div>
        </motion.div>
        <div>
            <div className="text-center mt-8 w-1/2 mx-auto">
            <span className="text-gray-600 mb-6 text-lg font-bold">Want to know more about our work?</span>
            <Link
              to="/publications"
              className="flex items-center justify-center gap-2 bg-[#FF6F00] text-white px-6 py-3 rounded-lg hover:bg-[#FF8F00] transition-colors duration-300"
            >
              <FaFileAlt className="w-5 h-5" />
              <span>Explore Our Publications</span>
            </Link>
            </div>
            </div>
      </div>
    </div>
  );
}

export default Support;
