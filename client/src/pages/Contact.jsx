import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Mail, Phone, Clock } from "lucide-react";
import axios from "../config/api";
import { Link } from "react-router-dom";
import { FaFileAlt, FaHeart } from "react-icons/fa";
import toast from "react-hot-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/public/contact", formData);
      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error sending message:", error);
      
      if (!error.response) {
        toast.error("Network Error: Please check your internet connection");
        return;
      }

      switch (error.response.status) {
        case 400:
          toast.error(error.response.data.message || "Please provide all required information");
          break;
        case 429:
          toast.error("Too many messages sent. Please try again later");
          break;
        case 500:
          toast.error("Server error. Please try again later");
          break;
        default:
          toast.error(error.response.data.message || "Failed to send message. Please try again");
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600">
            Get in touch with us for any queries or support
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <Link
              to="/publications"
              className="flex items-center justify-center gap-2 bg-[#FF6F00] text-white px-6 py-3 rounded-lg hover:bg-[#FF8F00] transition-colors duration-300"
            >
              <FaFileAlt className="w-5 h-5" />
              <span>Explore Our Publications</span>
            </Link>
            <Link
              to="/support/donate"
              className="flex items-center justify-center gap-2 bg-white text-[#FF6F00] border-2 border-[#FF6F00] px-6 py-3 rounded-lg hover:bg-[#FF6F00] hover:text-white transition-colors duration-300"
            >
              <FaHeart className="w-5 h-5" />
              <span>Support Our Cause</span>
            </Link>
          </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-lg shadow-lg p-8"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Contact Information
            </h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <MapPin className="w-6 h-6 text-[#FF6F00] mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Address</h3>
                  <p className="text-gray-600">
                    #30 Ward No. 12, Khojkipur<br />
                    Ambala, Haryana 133001
                  </p>
                  <a
                    href="https://maps.app.goo.gl/7ciRGDzf6BGfuzsT9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#FF6F00] hover:underline mt-1 inline-block"
                  >
                    Get Directions →
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Mail className="w-6 h-6 text-[#FF6F00] mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Email</h3>
                  <a
                    href="mailto:contactus@dropsofchange.in"
                    className="text-gray-600 hover:text-[#FF6F00]"
                  >
                    contactus@dropsofchange.in
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Phone className="w-6 h-6 text-[#FF6F00] mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Phone</h3>
                  <a
                    href="tel:+919138322232"
                    className="text-gray-600 hover:text-[#FF6F00]"
                  >
                    +91 91383 22232
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Clock className="w-6 h-6 text-[#FF6F00] mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Working Hours</h3>
                  <p className="text-gray-600">
                    Monday - Saturday: 9:00 AM - 6:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="mt-8">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3443.5307830657247!2d76.77899631511974!3d30.34772998177294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fbe29ae3d0bad%3A0x7f34c89c9b6e9e9d!2sDrops%20of%20Change!5e0!3m2!1sen!2sin!4v1629789012345!5m2!1sen!2sin"
                width="100%"
                height="300"
                style={{ border: 0, borderRadius: "0.5rem" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-lg shadow-lg p-8"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Send us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6F00]"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6F00]"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6F00]"
                  placeholder="Your message"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-[#FF6F00] text-white py-2 px-4 rounded-md hover:bg-[#FF8F00] transition-colors duration-300"
              >
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;