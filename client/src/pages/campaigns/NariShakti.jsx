import React from 'react';
import { motion } from 'framer-motion';
import nari from "../../assets/Narishakti.webp"

function NariShakti() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Project: Nari Shakti</h1>
          <div className="bg-white rounded-lg shadow-md p-8">
            <img 
              src={nari}
              alt="Women Empowerment" 
              className="w-full h-96 object-cover rounded-lg mb-8"
            />
            <div className="prose max-w-none">
              <p className="text-gray-600 mb-6">
                Nari Shakti, or the power of women, is a vital force that has been shaping the world for centuries. It is the embodiment of feminine strength, resilience, and determination. Through Nari Shakti, we celebrate the incredible capabilities of women and their immense contributions to society.
              </p>
              <p className="text-gray-600 mb-6">
                Nari Shakti is not just about women’s empowerment; it’s about recognizing and honoring the intrinsic value of women’s presence in our lives. It’s about acknowledging the countless ways women enrich our communities, families, and workplaces.
              </p>
              <h3 className="text-xl font-semibold mb-3">By embracing Nari Shakti, we teach:</h3>
              <ul className="list-disc pl-6 mb-6 text-gray-600">
                <li>Equality and inclusivity</li>
                <li>Respect and dignity for all women</li>
                <li>Empowerment through education and opportunities</li>
                <li>Breaking stereotypes and challenging gender norms</li>
                <li>Celebrating women’s achievements and successes</li>
                <li>Fostering a supportive and encouraging environment</li>
                <li>Embracing diversity and individuality</li>
                <li>Promoting women’s health, safety, and well-being</li>
              </ul>
              <p className="text-gray-600 mb-6">
                By instilling these values, we can create a world where women are valued, respected, and empowered to reach their full potential. Let us continue to celebrate and honor Nari Shakti, and work towards a brighter future for all.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default NariShakti;
