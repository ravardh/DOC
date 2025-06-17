import React, { useState, useEffect } from "react";
import axios from "../config/api";
import { motion } from "framer-motion";
import { Calendar, Tag } from "lucide-react";

function Gallery() {
  const [images, setImages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Events");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categories = ["Events", "Campaigns", "Celebrations", "Workshops", "Community", "Others"];

  useEffect(() => {
    // Clear existing gallery data from localStorage
    localStorage.removeItem("galleryImages");
    fetchGalleryImages();

    // Cleanup function to remove gallery data when component unmounts
    return () => {
      localStorage.removeItem("galleryImages");
    };
  }, []);

  const fetchGalleryImages = async () => {
    try {
      const response = await axios.get("/api/admin/gallery");
      console.log(response.data)
      if (Array.isArray(response.data)) {
        setImages(response.data);
        localStorage.setItem("galleryImages", JSON.stringify(response.data));
      } else {
        setImages([]);
        setError("Invalid data format received from server");
      }
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch gallery images:", error);
      // Try to get images from localStorage if API fails
      const cachedImages = localStorage.getItem("galleryImages");
      if (cachedImages) {
        try {
          const parsedImages = JSON.parse(cachedImages);
          if (Array.isArray(parsedImages)) {
            setImages(parsedImages);
          } else {
            setImages([]);
          }
        } catch (e) {
          setImages([]);
          setError("Failed to parse cached images");
        }
      }
      setError(error.response?.data?.message || "Failed to fetch images");
      setLoading(false);
    }
  };

  // Ensure images is always an array before filtering
  const safeImages = Array.isArray(images) ? images : [];
  const filteredImages = selectedCategory === "All"
    ? safeImages
    : safeImages.filter(image => image.category === selectedCategory);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#FF6F00]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-600">
          <p className="text-xl">{error}</p>
          <button
            onClick={fetchGalleryImages}
            className="mt-4 px-4 py-2 bg-[#FF6F00] text-white rounded hover:bg-[#FF8F00]"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Gallery</h1>
          <p className="text-xl text-gray-600">
            Capturing moments of impact and change in our community
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-8"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                selectedCategory === category
                  ? "bg-[#FF6F00] text-white"
                  : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredImages.map((image, index) => (
            <motion.div
              key={image._id || index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative">
                <img
                  src={image.imageUrl}
                  alt={image.title}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full flex items-center space-x-1">
                  <Tag className="w-4 h-4 text-[#FF6F00]" />
                  <span className="text-sm font-medium text-gray-700">
                    {image.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {image.title}
                </h3>
                <p className="text-gray-600 mb-4">{image.description}</p>
                {/* <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="w-4 h-4 mr-2" />
                  {new Date(image.date || Date.now()).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div> */}
              </div>
            </motion.div>
          ))}
        </div>

        {filteredImages.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-12"
          >
            <p className="text-gray-600 text-lg">
              No images found for this category.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default Gallery;