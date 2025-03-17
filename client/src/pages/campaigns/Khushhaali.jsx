import React from 'react';
import { motion } from 'framer-motion';
import khushHali from "../../assets/k2.webp";

function KhushHali() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Project: Khush-Hali</h1>
          <div className="bg-white rounded-lg shadow-md p-8">
            <img 
              src={khushHali}
              alt="Khush-Hali Project" 
              className="w-full h-96 object-cover rounded-lg mb-8"
            />
            <div className="prose max-w-none">
              <h2 className="text-2xl font-semibold mb-4">Promoting True Happiness Through Healthcare</h2>
              <p className="text-gray-600 mb-6">
                The organization DROPS OF CHANGE has launched the project “KHUSH-HALI” to promote true happiness by focusing on medical camps, children’s health, girls’ menstruation health, and more. Our aim is to make people aware of their health concerns, guide them through any issues they may have, and provide education about healthcare with the help of doctors.
              </p>
              <h3 className="text-xl font-semibold mb-3">Our Mission</h3>
              <ul className="list-disc pl-6 mb-6 text-gray-600">
                <li>Conducting free medical camps</li>
                <li>Raising awareness about children's health and nutrition</li>
                <li>Educating girls on menstrual hygiene</li>
                <li>Providing healthcare support with professional guidance</li>
              </ul>
              <p className="text-gray-600 mb-6">
                We believe that taking care of our own well-being can lead to greater contentment in life. Through Khush-Hali, we aim to empower individuals with the knowledge and resources they need to lead healthier, happier lives.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default KhushHali;
