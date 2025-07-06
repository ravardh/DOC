import React, { useState, useEffect } from "react";
import {
  IoLogoInstagram as Insta,
  IoLogoYoutube as Youtube,
  IoHeartCircle as Heart,
} from "react-icons/io5";
import { FaXTwitter as Twitter } from "react-icons/fa6";
import { FaFacebookSquare as Facebook } from "react-icons/fa";
import { BsLinkedin as LinkedIn } from "react-icons/bs";
import { IoLogoWhatsapp as WhatsApp } from "react-icons/io5";
import { Link } from "react-router-dom";
import axios from "../config/api";

function Footer() {
  const [visitorCount, setVisitorCount] = useState(0);

  useEffect(() => {
    const incrementVisitor = async () => {
      try {
        const response = await axios.post("/api/public/increment-visitor");
        setVisitorCount(response.data.count);
      } catch (error) {
        console.error("Error updating visitor count:", error);
      }
    };

    incrementVisitor();
  }, []);

  // WhatsApp message handler
  const handleWhatsAppClick = () => {
    const phoneNumber = "919138322232";
    const message = encodeURIComponent(
      "Hello Drops of Change! 🌟\n\nI'm interested in learning more about your wonderful initiatives and how I can contribute to making a positive impact in children's lives. Could you please share more information about your programs?\n\nThank you for the amazing work you do! 💙"
    );
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <>
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Organization Info */}
            <div>
              <div className="flex items-center mb-4">
                <span className="text-lg font-bold text-[#FF6F00]">
                  Drops of Change Welfare Society
                </span>
              </div>
              <p className="text-gray-400">
                Reaching every corner of the nation to educate young minds and
                eradicate unemployment and financial distress resulting from
                persistent illiteracy.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-[#FF6F00]">
                Quick Links
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/about" className="text-gray-400 hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/campaigns"
                    className="text-gray-400 hover:text-white"
                  >
                    Our Campaigns
                  </Link>
                </li>
                <li>
                  <Link to="/gallery" className="text-gray-400 hover:text-white">
                    Gallery
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-400 hover:text-white">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support Us */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-[#FF6F00]">
                Support Us
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/support/donate"
                    className="text-gray-400 hover:text-white"
                  >
                    Donate
                  </Link>
                </li>
                <li>
                  <Link
                    to="/support/volunteer"
                    className="text-gray-400 hover:text-white"
                  >
                    Volunteer
                  </Link>
                </li>
                <li>
                  <Link
                    to="/support/internship"
                    className="text-gray-400 hover:text-white"
                  >
                    Internships
                  </Link>
                </li>
                <li>
                  <Link to="/support" className="text-gray-400 hover:text-white">
                    Sponsor a Child
                  </Link>
                </li>
              </ul>
            </div>

            {/* Social Media & Contact */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-[#FF6F00]">
                Connect With Us
              </h3>
              <div className="flex space-x-4">
                <a
                  href="https://www.linkedin.com/company/drops-of-change-welfare-society/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white"
                >
                  <LinkedIn className="h-6 w-6" />
                </a>
                <a
                  href="https://www.facebook.com/dropsofchange"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white"
                >
                  <Facebook className="h-6 w-6" />
                </a>
                <a
                  href="https://www.youtube.com/@dropsofchange1242"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white"
                >
                  <Youtube className="h-6 w-6" />
                </a>
                <a
                  href="http://x.com/Dropsofchange"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white"
                >
                  <Twitter className="h-6 w-6" />
                </a>
                <a
                  href="https://www.instagram.com/dropsofchange"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white"
                >
                  <Insta className="h-6 w-6" />
                </a>
              </div>
              <div className="mt-5">
                Email:{" "}
                <a
                  href="mailto:contactus@dropsofchange.in"
                  className="text-gray-400 hover:text-white"
                >
                  contactus@dropsofchange.in
                </a>
              </div>
              <div className="mt-2">
                Phone:{" "}
                <a
                  href="tel:+919138322232"
                  className="text-gray-400 hover:text-white"
                >
                  +91-91383-22232
                </a>
              </div>
            </div>
          </div>

          {/* Footer Bottom Section */}
          <div className="border-t border-gray-800 mt-4 pt-4">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
              <p className="text-gray-400 text-sm sm:text-base text-center sm:text-left">
                © {new Date().getFullYear()} Drops of Change. All rights reserved.
              </p>
              <span className="text-lg sm:text-xl font-bold text-[#FF6F00] order-first sm:order-none">
                Total Visitors: {visitorCount.toLocaleString()}
              </span>
              <p className="text-gray-400 flex gap-2 items-center text-sm sm:text-base">
                Made with{" "}
                <Heart className="fill-red-500 h-5 w-5" /> by
                <a
                  href="https://www.linkedin.com/in/ravardh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#FF6F00] font-bold hover:underline ml-1"
                >
                  Raj Vardhan
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={handleWhatsAppClick}
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transform transition-all duration-300 hover:scale-110 hover:shadow-xl animate-pulse"
          aria-label="Contact us on WhatsApp"
        >
          <WhatsApp className="h-8 w-8" />
        </button>

        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-2 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="bg-gray-800 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap">
            Chat with us on WhatsApp
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-gray-800"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
