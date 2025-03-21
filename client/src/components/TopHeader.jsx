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
            href="https://www.instagram.com/dropsofchange"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300"
          >
            <Insta className="h-4 w-4" />
          </a>
          <a
            href="https://www.facebook.com/dropsofchange"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300"
          >
            <Facebook className="h-4 w-4" />
          </a>
          <a
            href="https://www.youtube.com/@dropsofchange1242"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300"
          >
            <Youtube className="h-4 w-4" />
          </a>
          <a
            href="http://x.com/Dropsofchange"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300"
          >
            <Twitter className="h-4 w-4" />
          </a>
          <a
            href="https://www.linkedin.com/company/drops-of-change-welfare-society/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300"
          >
            <LinkedIn className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
