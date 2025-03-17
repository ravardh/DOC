import React from 'react';
import { motion } from 'framer-motion';
import jagrukataImage from "../../assets/JagrukataAbhiyan.png";

function JagrukataAbhiyan() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Jagrukata Abhiyan</h1>
          <div className="bg-white rounded-lg shadow-md p-8">
            <img 
              src={jagrukataImage} 
              alt="Jagrukata Abhiyan Event" 
              className="w-full h-96 object-cover rounded-lg mb-8" 
            />
            <div className="prose max-w-none">
              <h2 className="text-2xl font-semibold mb-4">Spreading Awareness, Empowering Lives</h2>
              <p className="text-gray-600 mb-6">
                Jagrukata Abhiyan is an initiative aimed at spreading awareness about crucial social issues such as education,
                health, environment, and digital literacy. Our goal is to educate communities and enable them to make informed decisions.
              </p>
              <h3 className="text-xl font-semibold mb-3">Key Focus Areas</h3>
              <ul className="list-disc pl-6 mb-6 text-gray-600">
                <li>Health and Hygiene Awareness</li>
                <li>Environmental Conservation</li>
                <li>Financial and Digital Literacy</li>
                <li>Educational and Social Rights</li>
              </ul>
              <p className="text-gray-600 mb-6">
                Join us in this movement to enlighten communities and build a society that thrives on knowledge and awareness.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default JagrukataAbhiyan;
