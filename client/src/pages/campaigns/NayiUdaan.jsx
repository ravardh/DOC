import React from 'react';
import { motion } from 'framer-motion';
import nayiUdaan from "../../assets/NayiUdan.png";

function NayiUdaan() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Project: Nayi Udaan</h1>
          <div className="bg-white rounded-lg shadow-md p-8">
            <img 
              src={nayiUdaan}
              alt="Nayi Udaan Project" 
              className="w-full h-96 object-cover rounded-lg mb-8"
            />
            <div className="prose max-w-none">
              <h2 className="text-2xl font-semibold mb-4">Supporting Students for a Brighter Future</h2>
              <p className="text-gray-600 mb-6">
                The Nayi Udaan Project is dedicated to providing financial assistance to students who are unable to afford their education. We have fully adopted eight students, ensuring their tuition fees are covered. Additionally, we have partially adopted two students, offering them necessary financial aid.
              </p>
              <h3 className="text-xl font-semibold mb-3">Our Contributions</h3>
              <ul className="list-disc pl-6 mb-6 text-gray-600">
                <li>Covering school fees for underprivileged students</li>
                <li>Providing school uniforms to those in need</li>
                <li>Supplying essential books and stationery</li>
                <li>Ensuring continuous support for educational growth</li>
              </ul>
              <p className="text-gray-600 mb-6">
                Through this initiative, we strive to eliminate financial barriers to education and empower children to pursue their dreams without limitations. With the support of our community, we hope to expand this initiative and provide even more children with the opportunity to learn and grow.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
export default NayiUdaan;