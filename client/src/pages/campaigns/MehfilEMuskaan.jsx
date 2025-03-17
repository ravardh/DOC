import React from 'react';
import { motion } from 'framer-motion';
import mehfilImage from "../../assets/Mehfilemuskan.png";

function MehfilEMuskaan() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Mehfil-e-Muskaan</h1>
          <div className="bg-white rounded-lg shadow-md p-8">
            <img 
              src={mehfilImage} 
              alt="Mehfil-e-Muskaan Event" 
              className="w-full h-96 object-cover rounded-lg mb-8" 
            />
            <div className="prose max-w-none">
              <h2 className="text-2xl font-semibold mb-4">A Celebration of Talent & Joy</h2>
              <p className="text-gray-600 mb-6">
                Mehfil-e-Muskaan is a fundraising event where we arrange an open mic for individuals to showcase their talents.
                Whether it's poetry, comedy, singing, or storytelling, we provide a safe and encouraging platform for people
                who have talent but hesitate due to stage fear.
              </p>
              <h3 className="text-xl font-semibold mb-3">Our Vision</h3>
              <ul className="list-disc pl-6 mb-6 text-gray-600">
                <li>Encouraging artists to express themselves freely</li>
                <li>Breaking stage fear and boosting confidence</li>
                <li>Creating an inclusive space for creativity</li>
                <li>Raising funds for social initiatives through art and performance</li>
              </ul>
              <p className="text-gray-600 mb-6">
                Join us in making this event a success and helping those with hidden talents find their voice on stage.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default MehfilEMuskaan;
