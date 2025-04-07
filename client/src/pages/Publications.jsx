import React, { useState, useEffect } from "react";
import axios from "../config/api";
import { motion } from "framer-motion";
import { Book, FileText, Calendar, Download, X } from "lucide-react";

function Publications() {
  const [publications, setPublications] = useState([]);
  const [selectedPublication, setSelectedPublication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("annual_reports"); // Default to annual reports tab

  useEffect(() => {
    fetchPublications();
  }, []);

  const fetchPublications = async () => {
    try {
      const response = await axios.get("/api/public/publications");
      setPublications(response.data);
      // console.log(response.data)
    } catch (error) {
      console.error("Error fetching publications:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePublicationClick = (publication) => {
    setSelectedPublication(publication);
  };

  const handleCloseViewer = () => {
    setSelectedPublication(null);
  };

  const handleDownload = (url) => {
    window.open(url, "_blank");
  };

  // Filter publications by type
  const newsletters = publications.filter(pub => pub.type === "newsletter");
  const annualReports = publications.filter(pub => pub.type === "annual_report");

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF6F00]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            Our Publications
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-600"
          >
            Explore our newsletters and annual reports
          </motion.p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              type="button"
              onClick={() => setActiveTab("annual_reports")}
              className={`px-6 py-3 text-sm font-medium rounded-l-lg ${
                activeTab === "annual_reports"
                  ? "bg-[#FF6F00] text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              Annual Reports
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("newsletters")}
              className={`px-6 py-3 text-sm font-medium rounded-r-lg ${
                activeTab === "newsletters"
                  ? "bg-[#FF6F00] text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              Newsletters
            </button>
          </div>
        </div>

        {/* Publications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeTab === "annual_reports" ? (
            annualReports.length > 0 ? (
              annualReports.map((pub, index) => (
                <PublicationCard 
                  key={pub._id} 
                  publication={pub} 
                  index={index} 
                  onRead={handlePublicationClick} 
                  onDownload={handleDownload} 
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <Book className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">No annual reports available</h3>
                <p className="text-gray-500">Check back later for new annual reports.</p>
              </div>
            )
          ) : (
            newsletters.length > 0 ? (
              newsletters.map((pub, index) => (
                <PublicationCard 
                  key={pub._id} 
                  publication={pub} 
                  index={index} 
                  onRead={handlePublicationClick} 
                  onDownload={handleDownload} 
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">No newsletters available</h3>
                <p className="text-gray-500">Check back later for new newsletters.</p>
              </div>
            )
          )}
        </div>

        {/* Publication Viewer Modal */}
        {selectedPublication && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl w-full max-w-6xl h-[90vh] flex flex-col">
              <div className="p-4 border-b flex justify-between items-center">
                <h2 className="text-xl font-semibold">{selectedPublication.title}</h2>
                <button
                  onClick={handleCloseViewer}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="flex-1 p-4">
                <iframe
                  src={selectedPublication.flipbookUrl}
                  className="w-full h-full rounded-lg border-0"
                  title="Flipbook Viewer"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="p-4 border-t flex justify-between items-center">
                <p className="text-sm text-gray-500">
                  If the PDF doesn't load properly, you can open it in a new tab.
                </p>
                <a
                  href={selectedPublication.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#FF6F00] hover:text-[#FF8F00] flex items-center"
                >
                  <Download className="w-4 h-4 mr-1" />
                  Open in new tab
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Publication Card Component
const PublicationCard = ({ publication, index, onRead, onDownload }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      <div className="relative">
        <img
          src={publication.coverImage}
          alt={publication.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 right-4">
          {publication.type === "newsletter" ? (
            <FileText className="w-6 h-6 text-white" />
          ) : (
            <Book className="w-6 h-6 text-white" />
          )}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {publication.title}
        </h3>
        <p className="text-gray-600 mb-4">{publication.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center text-gray-500">
            <Calendar className="w-4 h-4 mr-2" />
            <span className="text-sm">
              {new Date(publication.publishDate).toLocaleDateString()}
            </span>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => onRead(publication)}
              className="bg-[#FF6F00] text-white px-4 py-2 rounded-lg hover:bg-[#FF8F00] transition-colors duration-300"
            >
              Read
            </button>
            <button
              onClick={() => onDownload(publication.fileUrl)}
              className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-300 flex items-center"
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Publications; 