import React from 'react';
import { motion } from 'framer-motion';
import edu from "../assets/EducationProgram.webp"
import comm from "../assets/Comm_Act.webp"
import child from "../assets/Child_Act.webp"
import vol from "../assets/Volunteer_Act.webp"
function Gallery() {
  const images = [
    {
      url: edu,
      title: "Education Programs"
    },
    {
      url: comm,
      title: "Community Events"
    },
    {
      url: child,
      title: "Children's Activities"
    },
    {
      url: vol,
      title: "Volunteer Work"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Gallery</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {images.map((image, index) => (
              <motion.div
                key={index}
                className="relative overflow-hidden rounded-lg shadow-md aspect-w-16 aspect-h-9"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-4">
                  <h3 className="text-white text-xl font-semibold">{image.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Gallery;