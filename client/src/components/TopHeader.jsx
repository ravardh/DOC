import React from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';

const TopHeader = () => {
  return (
    <div className="bg-[#FF6F00] text-white py-2 px-4">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center text-sm">
        <div className="flex flex-wrap items-center gap-4">
          <a 
            href="mailto:contactus@dropsofchange.in" 
            className="flex items-center gap-1 hover:text-gray-200"
          >
            <Mail size={16} />
            <span>contactus@dropsofchange.in</span>
          </a>
          <a 
            href="tel:+919138322232" 
            className="flex items-center gap-1 hover:text-gray-200"
          >
            <Phone size={16} />
            <span>+91 91383 22232</span>
          </a>
          <a 
            href="https://maps.app.goo.gl/7ciRGDzf6BGfuzsT9"
            target="_blank"
            rel="noopener noreferrer" 
            className="flex items-center gap-1 hover:text-gray-200"
          >
            <MapPin size={16} />
            <span>Find Us</span>
          </a>
        </div>
        
        <div className="flex items-center gap-4">
          <a 
            href="https://facebook.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-gray-200"
          >
            <Facebook size={16} />
          </a>
          <a 
            href="https://instagram.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-gray-200"
          >
            <Instagram size={16} />
          </a>
          <a 
            href="https://linkedin.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-gray-200"
          >
            <Linkedin size={16} />
          </a>
          <a 
            href="https://youtube.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-gray-200"
          >
            <Youtube size={16} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopHeader; 