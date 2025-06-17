import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Share2 } from "lucide-react";
import Modal from "../common/Modal";

const CampaignLayout = ({
  title,
  image,
  description,
  content,
  locations,
  stats,
  callToAction = "Support This Campaign",
}) => {
  const navigate = useNavigate();
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState("");

  const shareUrl = window.location.href;
  const shareTitle = `Check out ${title} - Drops of Change NGO`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          url: shareUrl,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      setShareModalOpen(true);
    }
  };

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(`${shareTitle}\n${shareUrl}`);
        setCopySuccess("Copied!");
      } else {
        // fallback for insecure context or older browsers
        const text = `${shareTitle}\n${shareUrl}`;
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "absolute";
        textarea.style.left = "-9999px";
        document.body.appendChild(textarea);
        textarea.select();
        try {
          document.execCommand("copy");
          setCopySuccess("Copied!");
        } catch (err) {
          setCopySuccess("Failed to copy");
        }
        document.body.removeChild(textarea);
      }
      setTimeout(() => setCopySuccess(""), 1500);
    } catch (err) {
      setCopySuccess("Failed to copy");
      setTimeout(() => setCopySuccess(""), 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative h-[60vh] overflow-hidden"
      >
        <div className="absolute inset-0">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-5xl md:text-6xl font-bold mb-6"
            >
              {title}
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl md:text-2xl max-w-3xl mx-auto"
            >
              {description}
            </motion.p>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Content Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="prose prose-lg max-w-none"
            >
              {content}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Stats Card */}
            {stats && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <h3 className="text-xl font-semibold mb-4">Impact</h3>
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-3xl font-bold text-[#FF6F00]">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Locations Card */}
            {locations && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <h3 className="text-xl font-semibold mb-4">Our Presence</h3>
                <div className="space-y-2">
                  {locations.map((location, index) => (
                    <div
                      key={index}
                      className="flex items-center text-gray-600"
                    >
                      <div className="w-2 h-2 rounded-full bg-[#FF6F00] mr-2" />
                      {location}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="space-y-4"
            >
              <button
                onClick={() => navigate("/support/donate")}
                className="w-full bg-[#FF6F00] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#FF8F00] transition-all duration-300 flex items-center justify-center group"
              >
                {callToAction}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={handleShare}
                className="w-full bg-white border-2 border-[#FF6F00] text-[#FF6F00] px-6 py-3 rounded-xl font-semibold hover:bg-[#FF6F00] hover:text-white transition-all duration-300 flex items-center justify-center"
              >
                Share Campaign
                <Share2 className="ml-2 w-5 h-5" />
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      <Modal isOpen={shareModalOpen} onClose={() => setShareModalOpen(false)} title="Share this Campaign">
        <div className="mb-4">
          <div className="font-semibold text-gray-700 mb-2">Share Title</div>
          <div className="bg-gray-100 rounded px-3 py-2 text-sm break-words mb-4">{shareTitle}</div>
          <div className="font-semibold text-gray-700 mb-2">Share URL</div>
          <div className="bg-gray-100 rounded px-3 py-2 text-sm break-all mb-4">{shareUrl}</div>
          <button
            onClick={handleCopy}
            className="bg-[#FF6F00] text-white px-4 py-2 rounded hover:bg-[#FF8F00] transition-colors"
          >
            Copy
          </button>
          {copySuccess && <span className="ml-3 text-green-600 font-medium">{copySuccess}</span>}
        </div>
      </Modal>
    </div>
  );
};

export default CampaignLayout;