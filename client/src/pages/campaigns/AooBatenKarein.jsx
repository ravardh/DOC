import React from 'react';
import { motion } from 'framer-motion';
import aooBatenKareinImage from "../../assets/aoobatenkarien.png";

function AooBatenKarein() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Aao Baat Karein</h1>
          <div className="bg-white rounded-lg shadow-md p-8">
            <img 
              src={aooBatenKareinImage} 
              alt="Aao Baat Karein Event" 
              className="w-full h-96 object-cover rounded-lg mb-8" 
            />
            <div className="prose max-w-none">
              <h2 className="text-2xl font-semibold mb-4">Breaking the Silence on Mental Health</h2>
              <p className="text-gray-600 mb-6">
                Aao Baat Karein is an initiative that encourages open conversations about mental health, emotional well-being,
                and breaking the stigma surrounding these issues. We aim to create a safe space where individuals can express themselves
                freely and find support.
              </p>
              <h3 className="text-xl font-semibold mb-3">Our Objectives</h3>
              <ul className="list-disc pl-6 mb-6 text-gray-600">
                <li>Promoting mental health awareness</li>
                <li>Encouraging open discussions on emotional well-being</li>
                <li>Providing professional guidance and counseling</li>
                <li>Creating a support network for those in need</li>
              </ul>
              <p className="text-gray-600 mb-6">
                Together, let's foster a culture of openness, understanding, and support. Your voice matters—let’s talk and heal together.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default AooBatenKarein;
