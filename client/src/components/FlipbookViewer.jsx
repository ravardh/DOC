import React, { useState } from "react";
import { Loader2, AlertCircle, ExternalLink } from "lucide-react";

const FlipbookViewer = ({ fileUrl, onClose }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Extract file ID from Google Drive URL
  const fileId = fileUrl.match(/[-\w]{25,}/);
  const directPdfUrl = fileId 
    ? `https://drive.google.com/file/d/${fileId[0]}/preview` 
    : fileUrl;

  // Simulate loading for a better UX
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-[#FF6F00]" />
        <p className="mt-4 text-gray-600">Loading PDF viewer...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-4">
        <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
        <p className="text-red-500 text-center mb-4">{error}</p>
        <p className="text-gray-600 text-center mb-6">
          You can still view the PDF using the link below.
        </p>
        <div className="flex space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >
            Close
          </button>
          <a
            href={fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-[#FF6F00] text-white rounded hover:bg-[#FF8F00] flex items-center"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Open PDF
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 p-4">
        <iframe
          src={directPdfUrl}
          className="w-full h-full rounded-lg border-0"
          title="PDF Viewer"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <div className="p-4 border-t flex justify-between items-center">
        <p className="text-sm text-gray-500">
          If the PDF doesn't load properly, you can open it in a new tab.
        </p>
        <a
          href={fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#FF6F00] hover:text-[#FF8F00] flex items-center"
        >
          <ExternalLink className="w-4 h-4 mr-1" />
          Open in new tab
        </a>
      </div>
    </div>
  );
};

export default FlipbookViewer; 