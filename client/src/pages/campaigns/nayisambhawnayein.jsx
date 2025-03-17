import React from 'react';
import { motion } from 'framer-motion';
import nayiSambhawnayeinImage from "../../assets/nayisamb.png";

function NayiSambhawnayein() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Project: Nayi Sambhawnayein</h1>
          <div className="bg-white rounded-lg shadow-md p-8">
            <img 
              src={nayiSambhawnayeinImage} 
              alt="Nayi Sambhawnayein Project" 
              className="w-full h-96 object-cover rounded-lg mb-8" 
            />
            <div className="prose max-w-none">
              <h2 className="text-2xl font-semibold mb-4">Creating New Opportunities for a Brighter Future</h2>
              <p className="text-gray-600 mb-6">
                Nayi Sambhawnayein is an initiative dedicated to fostering skill development, employment opportunities,
                and career growth for individuals looking for a better future. Through workshops, training sessions,
                and mentorship, we empower people to unlock their full potential and secure meaningful employment.
              </p>
              <h3 className="text-xl font-semibold mb-3">Our Goals</h3>
              <ul className="list-disc pl-6 mb-6 text-gray-600">
                <li>Providing vocational and skill development training</li>
                <li>Connecting individuals with job opportunities</li>
                <li>Encouraging entrepreneurship and self-reliance</li>
                <li>Offering mentorship and career guidance</li>
              </ul>
              <p className="text-gray-600 mb-6">
                With Nayi Sambhawnayein, we believe in creating a world full of opportunities for everyone,
                ensuring that no talent goes unnoticed and every dream has the potential to be realized.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default NayiSambhawnayein;