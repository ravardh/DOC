import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Upload, Trash2 } from "lucide-react";
import axios from '../../config/api';
import { toast } from "react-hot-toast";

const Gallery = () => {
  const [galleryImages, setGalleryImages] = useState([]);
  const [newImage, setNewImage] = useState({
    title: "",
    imageUrl: "",
    description: "",
    category: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [addImageLoading, setAddImageLoading] = useState(false);

  useEffect(() => {
    fetchGalleryImages();
  }, []);

  const fetchGalleryImages = async () => {
    try {
      const response = await axios.get("/api/admin/gallery");
      setGalleryImages(response.data);
      localStorage.setItem("galleryImages", JSON.stringify(response.data));
    } catch (error) {
      toast.error("Failed to fetch gallery images");
    }
  };

  const handleAddImage = async (e) => {
    e.preventDefault();
    setAddImageLoading(true);
    try {
      const formData = new FormData();
      formData.append("photo", imageFile);
      formData.append("title", newImage.title);
      formData.append("description", newImage.description);
      formData.append("category", newImage.category);

      const response = await axios.post("/api/admin/addImage", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
      });

      if (response.data) {
        toast.success("Image added successfully");
        fetchGalleryImages();
        setNewImage({ title: "", imageUrl: "", description: "", category: "" });
        setImageFile(null);
      }
    } catch (error) {
      console.error("Error adding image:", error);
      toast.error(error.response?.data?.message || "Failed to add image");
    } finally {
      setAddImageLoading(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5000000) {
        toast.error("Image size should be less than 5MB");
        return;
      }
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Only JPG, PNG and WebP images are allowed");
        return;
      }
      setImageFile(file);
      const previewUrl = URL.createObjectURL(file);
      setNewImage({ ...newImage, imageUrl: previewUrl });
    }
  };

  const handleDeleteImage = async (id) => {
    toast.promise(
      axios.delete(`/api/admin/image/${id}`),
      {
        loading: 'Deleting image...',
        success: () => {
          fetchGalleryImages();
          return 'Image deleted successfully';
        },
        error: 'Failed to delete image',
      }
    );
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 rounded-lg shadow"
      >
        <h2 className="text-2xl font-semibold mb-4">Add New Image</h2>
        <form onSubmit={handleAddImage} className="space-y-4" encType="multipart/form-data">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                value={newImage.title}
                onChange={(e) => setNewImage({ ...newImage, title: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF6F00] focus:ring-[#FF6F00]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select
                value={newImage.category}
                onChange={(e) => setNewImage({ ...newImage, category: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF6F00] focus:ring-[#FF6F00]"
                required
              >
                <option value="">Select Category</option>
                {["Events", "Campaigns", "Celebrations", "Workshops", "Community", "Others"].map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={newImage.description}
              onChange={(e) => setNewImage({ ...newImage, description: e.target.value })}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF6F00] focus:ring-[#FF6F00]"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Image (Max size: 1MB)</label>
            <div className="mt-1 flex items-center">
              <input
                type="file"
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
                id="image-upload"
                required
              />
              <label
                htmlFor="image-upload"
                className="cursor-pointer bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center"
              >
                <Upload className="h-5 w-5 mr-2" />
                Upload Image
              </label>
              {newImage.imageUrl && (
                <div className="ml-4">
                  <img
                    src={newImage.imageUrl}
                    alt="Preview"
                    className="h-20 w-20 object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setNewImage({ ...newImage, imageUrl: "" });
                      setImageFile(null);
                    }}
                    className="mt-1 text-xs text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-[#FF6F00] text-white px-4 py-2 rounded-md hover:bg-[#FF8F00] transition-colors"
              disabled={addImageLoading}
            >
              {addImageLoading ? "Adding Image..." : "Add Image"}
            </button>
          </div>
        </form>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white p-6 rounded-lg shadow"
      >
        <h2 className="text-2xl font-semibold mb-4">Gallery Images</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image) => (
            <div
              key={image._id}
              className="bg-gray-50 rounded-lg overflow-hidden"
            >
              <img
                src={image.imageUrl}
                alt={image.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg">{image.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{image.category}</p>
                <p className="text-sm text-gray-500">{image.description}</p>
                <button
                  onClick={() => handleDeleteImage(image._id)}
                  className="mt-2 text-red-600 hover:text-red-800 flex items-center"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Gallery;
