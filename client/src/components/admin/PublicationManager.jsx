import React, { useState, useEffect } from "react";
import axios from "../../config/api";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { FaFileAlt, FaTrash, FaCalendarAlt } from "react-icons/fa";

const PublicationManager = () => {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    type: "newsletter",
    description: "",
    publishDate: new Date().toISOString().split("T")[0],
    fileUrl: "",
    flipbookUrl: "",
  });
  const [coverImage, setCoverImage] = useState(null);
  const [coverPreview, setCoverPreview] = useState("");

  useEffect(() => {
    fetchPublications();
  }, []);

  const fetchPublications = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/admin/publications");
      setPublications(response.data);
    } catch (error) {
      toast.error("Failed to fetch publications");
      console.error("Error fetching publications:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        toast.error("File size is too large. Maximum size is 10MB.");
        e.target.value = ""; // Clear the file input
        return;
      }

      // Check file type
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload an image file (JPEG, PNG, or WebP)");
        e.target.value = ""; // Clear the file input
        return;
      }

      setCoverImage(file);
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fileUrl || !coverImage) {
      toast.error("Please provide both file link and cover image");
      return;
    }

    try {
      setLoading(true);
      
      // Create a FormData object
      const formDataToSend = new FormData();
      
      // Add text fields
      formDataToSend.append("title", formData.title);
      formDataToSend.append("type", formData.type);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("publishDate", formData.publishDate);
      formDataToSend.append("fileUrl", formData.fileUrl);
      formDataToSend.append("flipbookUrl", formData.flipbookUrl);
      
      // Add the file
      formDataToSend.append("coverImage", coverImage);

      // Log what we're sending
      console.log("Sending form data:", {
        title: formData.title,
        type: formData.type,
        description: formData.description,
        publishDate: formData.publishDate,
        fileUrl: formData.fileUrl,
        flipbookUrl: formData.flipbookUrl,
        coverImage: coverImage ? coverImage.name : "No file selected"
      });

      // Send the request
      const response = await axios.post("/api/admin/publications", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        maxContentLength: 50 * 1024 * 1024, // 50MB
        maxBodyLength: 50 * 1024 * 1024, // 50MB
      });

      console.log("Server response:", response.data);
      toast.success("Publication added successfully");

      // Reset form
      setFormData({
        title: "",
        type: "newsletter",
        description: "",
        publishDate: new Date().toISOString().split("T")[0],
        fileUrl: "",
        flipbookUrl: "",
      });
      setCoverImage(null);
      setCoverPreview("");

      // Refresh publications list
      fetchPublications();
    } catch (error) {
      console.error("Error adding publication:", error);
      if (error.response?.status === 413) {
        toast.error("File size is too large. Maximum size is 10MB.");
      } else if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to add publication. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this publication?")) {
      try {
        await axios.delete(`/api/admin/publications/${id}`);
        toast.success("Publication deleted successfully");
        fetchPublications();
      } catch (error) {
        toast.error("Failed to delete publication");
        console.error("Error deleting publication:", error);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF6F00]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 rounded-lg shadow"
      >
        <h2 className="text-2xl font-semibold mb-4">Add New Publication</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="mt-1 p-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF6F00] focus:ring-[#FF6F00]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="mt-1 p-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF6F00] focus:ring-[#FF6F00]"
                required
              >
                <option value="newsletter">Newsletter</option>
                <option value="annual_report">Annual Report</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Publish Date
              </label>
              <div className="mt-1 relative">
                <input
                  type="date"
                  name="publishDate"
                  value={formData.publishDate}
                  onChange={handleInputChange}
                  className="block p-3 w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF6F00] focus:ring-[#FF6F00]"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                PDF File Link
              </label>
              <div className="mt-1 flex items-center">
                <input
                  type="url"
                  name="fileUrl"
                  value={formData.fileUrl}
                  onChange={handleInputChange}
                  placeholder="Enter PDF file URL"
                  className="block p-3 w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF6F00] focus:ring-[#FF6F00]"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Cover Image (Max Size : 1MB)
              </label>
              <div className="mt-1 flex items-center">
                <input
                  type="file"
                  onChange={handleCoverChange}
                  accept="image/*"
                  className="hidden"
                  id="cover-upload"
                  name="coverImage"
                />
                <label
                  htmlFor="cover-upload"
                  className="cursor-pointer bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center"
                >
                  Upload Cover
                </label>
                {coverPreview && (
                  <div className="ml-4">
                    <img
                      src={coverPreview}
                      alt="Cover preview"
                      className="h-10 w-10 object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setCoverImage(null);
                        setCoverPreview("");
                      }}
                      className="mt-1 text-xs text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Flipbook Link
              </label>
              <div className="mt-1 flex items-center">
                <input
                  type="url"
                  name="flipbookUrl"
                  value={formData.flipbookUrl}
                  onChange={handleInputChange}
                  placeholder="Enter Flipbook URL"
                  className="block p-3 w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF6F00] focus:ring-[#FF6F00]"
                  required
                />
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF6F00] focus:ring-[#FF6F00]"
              required
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-[#FF6F00] text-white px-4 py-2 rounded-md hover:bg-[#FF8F00] transition-colors"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Publications"}
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
        <h2 className="text-2xl font-semibold mb-4">Publications</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Title</th>
                <th className="px-4 py-2 text-left">Type</th>
                <th className="px-4 py-2 text-left">Publish Date</th>
                <th className="px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {publications.map((pub) => (
                <tr key={pub._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{pub.title}</td>
                  <td className="px-4 py-2 capitalize">
                    {pub.type === "newsletter" ? "Newsletter" : "Annual Report"}
                  </td>
                  <td className="px-4 py-2">
                    {new Date(pub.publishDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => handleDelete(pub._id)}
                      className="text-red-600 hover:text-red-800 flex items-center justify-center text"
                    >
                      <FaTrash className="h-4 w-4 mr-1 " />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {publications.length === 0 && (
                <tr>
                  <td
                    colSpan="4"
                    className="px-4 py-4 text-center text-gray-500"
                  >
                    No publications found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default PublicationManager;
