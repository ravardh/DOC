import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import {
  IoLogoInstagram as Insta,
  IoLogoYoutube as Youtube,
} from "react-icons/io5";
import { FaXTwitter as Twitter } from "react-icons/fa6";
import { FaFacebookSquare as Facebook } from "react-icons/fa";
import { BsLinkedin as LinkedIn } from "react-icons/bs";

const TopHeader = () => {
  return (
    <div className="bg-[#FF6F00] text-white py-2 px-2 sm:px-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0 text-xs sm:text-sm">
        <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2 sm:gap-4">
          <a
            href="mailto:contactus@dropsofchange.in"
            className="flex items-center gap-1 hover:text-gray-200"
          >
            <Mail size={14} className="hidden sm:block" />
            <span>contactus@dropsofchange.in</span>
          </a>
          <a
            href="tel:+919138322232"
            className="flex items-center gap-1 hover:text-gray-200"
          >
            <Phone size={14} className="hidden sm:block" />
            <span>+91 91383 22232</span>
          </a>
          <a
            href="https://maps.app.goo.gl/7ciRGDzf6BGfuzsT9"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-gray-200"
          >
            <MapPin size={14} className="hidden sm:block" />
            <span>Find Us</span>
          </a>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <a
            href="https://www.instagram.com/dropsofchange"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300"
          >
            <Insta className="h-3 w-3 sm:h-4 sm:w-4" />
          </a>
          {/* Other social media links with same icon size adjustments */}
          <a
            href="https://www.facebook.com/dropsofchange"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300"
          >
            <Facebook className="h-3 w-3 sm:h-4 sm:w-4" />
          </a>
          <a
            href="https://www.youtube.com/@dropsofchange1242"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300"
          >
            <Youtube className="h-3 w-3 sm:h-4 sm:w-4" />
          </a>
          <a
            href="http://x.com/Dropsofchange"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300"
          >
            <Twitter className="h-3 w-3 sm:h-4 sm:w-4" />
          </a>
          <a
            href="https://www.linkedin.com/company/drops-of-change-welfare-society/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300"
          >
            <LinkedIn className="h-3 w-3 sm:h-4 sm:w-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
