import React, { useState, useEffect } from 'react';
import axios from '../config/api';
import { FaBullhorn } from 'react-icons/fa';

const BreakingNews = () => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    fetchAnnouncements();
    // Fetch announcements every 5 minutes to keep them updated
    const interval = setInterval(fetchAnnouncements, 300000);
    return () => clearInterval(interval);
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get('/api/public/Announcement');
      const data = Array.isArray(response.data) ? response.data : [];
      const sortedAnnouncements = data.sort((a, b) => a.order - b.order);
      setAnnouncements(sortedAnnouncements);
    } catch (error) {
      console.error('Error fetching announcements:', error);
      setAnnouncements([]);
    }
  };

  if (!announcements.length) {
    return null;
  }

  // Format each announcement with proper spacing
  const formattedAnnouncements = announcements.map(announcement => (
    `${announcement.Announcement}`
  ));

  const renderAnnouncementGroup = (key) => (
    <div key={key} className="inline-flex items-center py-1">
      {formattedAnnouncements.map((text, index) => (
        <React.Fragment key={`${key}-${index}`}>
          <span className="text-base whitespace-nowrap">{text}</span>
          <span className="mx-8 opacity-50 select-none">•</span>
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <div className="bg-[#FF6F00] text-white relative overflow-hidden">
      <div className="flex items-center h-8">
        <div className="flex-shrink-0 px-4 border-r border-white/30 h-full flex items-center">
          <FaBullhorn className="h-5 w-5 animate-pulse" />
        </div>
        <div className="news-ticker-wrap flex-1">
          <div className="news-ticker-move">
            {renderAnnouncementGroup('group-1')}
            {renderAnnouncementGroup('group-2')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreakingNews;
