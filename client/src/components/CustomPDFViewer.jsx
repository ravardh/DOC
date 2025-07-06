import React, { useState, useCallback } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  ZoomOut, 
  RotateCw,
  Download,
  Maximize2,
  Minimize2,
  Loader2,
  AlertCircle
} from 'lucide-react';
import './CustomPDFViewer.css';

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const CustomPDFViewer = ({ fileUrl, title, onClose }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [rotation, setRotation] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentUrlIndex, setCurrentUrlIndex] = useState(0);

  // Convert Google Drive URL to direct download URL if needed
  const getDirectPDFUrl = (url) => {
    if (url.includes('drive.google.com')) {
      const fileId = url.match(/[-\w]{25,}/);
      if (fileId) {
        // Try both preview and direct download URLs
        return {
          preview: `https://drive.google.com/file/d/${fileId[0]}/preview`,
          download: `https://drive.google.com/uc?export=download&id=${fileId[0]}`,
          direct: `https://drive.google.com/file/d/${fileId[0]}/view`
        };
      }
    }
    return {
      preview: url,
      download: url,
      direct: url
    };
  };

  const urlOptions = getDirectPDFUrl(fileUrl);
  const urlsToTry = [urlOptions.direct, urlOptions.preview, urlOptions.download];
  const currentUrl = urlsToTry[currentUrlIndex];

  const onDocumentLoadSuccess = useCallback(({ numPages }) => {
    setNumPages(numPages);
    setLoading(false);
    setError(null);
  }, []);

  const onDocumentLoadError = useCallback((error) => {
    console.error('Error loading PDF:', error);
    
    // Try next URL if available
    if (currentUrlIndex < urlsToTry.length - 1) {
      setCurrentUrlIndex(currentUrlIndex + 1);
      setError(null);
      setLoading(true);
      return;
    }
    
    setError('Failed to load PDF document. The file might be protected or require special permissions. Please try downloading the file directly.');
    setLoading(false);
  }, [currentUrlIndex, urlsToTry]);

  const goToPrevPage = () => {
    setPageNumber(prevPageNumber => Math.max(prevPageNumber - 1, 1));
  };

  const goToNextPage = () => {
    setPageNumber(prevPageNumber => Math.min(prevPageNumber + 1, numPages || 1));
  };

  const handleZoomIn = () => {
    setScale(prevScale => Math.min(prevScale + 0.25, 3.0));
  };

  const handleZoomOut = () => {
    setScale(prevScale => Math.max(prevScale - 0.25, 0.5));
  };

  const handleRotate = () => {
    setRotation(prevRotation => (prevRotation + 90) % 360);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handlePageInputChange = (e) => {
    const page = parseInt(e.target.value);
    if (page >= 1 && page <= numPages) {
      setPageNumber(page);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-[#FF6F00]" />
        <p className="mt-4 text-gray-600">Loading PDF document...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-4">
        <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
        <p className="text-red-500 text-center mb-4">{error}</p>
        <div className="flex space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
          >
            Close
          </button>
          <a
            href={fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-[#FF6F00] text-white rounded hover:bg-[#FF8F00] transition-colors flex items-center"
          >
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col h-full ${isFullscreen ? 'fixed inset-0 z-50 bg-white' : ''}`}>
      {/* Toolbar */}
      <div className="flex items-center justify-between p-4 border-b bg-gray-50">
        <div className="flex items-center space-x-4">
          <h2 className="text-lg font-semibold text-gray-900 truncate">{title}</h2>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Page Navigation */}
          <div className="flex items-center space-x-2">
            <button
              onClick={goToPrevPage}
              disabled={pageNumber <= 1}
              className="p-2 text-gray-600 hover:text-gray-900 disabled:text-gray-300 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            <div className="flex items-center space-x-2">
              <input
                type="number"
                min="1"
                max={numPages}
                value={pageNumber}
                onChange={handlePageInputChange}
                className="w-16 px-2 py-1 text-center border rounded text-sm"
              />
              <span className="text-sm text-gray-600">/ {numPages}</span>
            </div>
            
            <button
              onClick={goToNextPage}
              disabled={pageNumber >= numPages}
              className="p-2 text-gray-600 hover:text-gray-900 disabled:text-gray-300 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Zoom Controls */}
          <div className="flex items-center space-x-1 border-l pl-2">
            <button
              onClick={handleZoomOut}
              disabled={scale <= 0.5}
              className="p-2 text-gray-600 hover:text-gray-900 disabled:text-gray-300 disabled:cursor-not-allowed"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            
            <span className="text-sm text-gray-600 min-w-[3rem] text-center">
              {Math.round(scale * 100)}%
            </span>
            
            <button
              onClick={handleZoomIn}
              disabled={scale >= 3.0}
              className="p-2 text-gray-600 hover:text-gray-900 disabled:text-gray-300 disabled:cursor-not-allowed"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>

          {/* Other Controls */}
          <div className="flex items-center space-x-1 border-l pl-2">
            <button
              onClick={handleRotate}
              className="p-2 text-gray-600 hover:text-gray-900"
              title="Rotate"
            >
              <RotateCw className="w-4 h-4" />
            </button>
            
            <button
              onClick={toggleFullscreen}
              className="p-2 text-gray-600 hover:text-gray-900"
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
            
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-600 hover:text-gray-900"
              title="Download PDF"
            >
              <Download className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* PDF Viewer */}
      <div className="flex-1 overflow-auto bg-gray-100 flex justify-center items-start p-4">
        <div className="bg-white shadow-lg">
          <Document
            file={currentUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading={<div className="p-8 text-center">Loading page...</div>}
            error={<div className="p-8 text-center text-red-500">Error loading page</div>}
            options={{
              cMapUrl: 'https://unpkg.com/pdfjs-dist@3.11.174/cmaps/',
              cMapPacked: true,
              standardFontDataUrl: 'https://unpkg.com/pdfjs-dist@3.11.174/standard_fonts/',
            }}
          >
            <Page
              pageNumber={pageNumber}
              scale={scale}
              rotate={rotation}
              loading={<div className="p-8 text-center">Loading page...</div>}
              error={<div className="p-8 text-center text-red-500">Error loading page</div>}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          </Document>
        </div>
      </div>

      {/* Close button for fullscreen mode */}
      {isFullscreen && (
        <button
          onClick={() => {
            setIsFullscreen(false);
            onClose();
          }}
          className="absolute top-4 right-4 bg-white bg-opacity-90 hover:bg-opacity-100 p-2 rounded-full shadow-lg"
        >
          <Minimize2 className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default CustomPDFViewer;
