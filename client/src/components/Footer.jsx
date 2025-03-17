import React from "react";
import { 
  FacebookIcon, TwitterIcon, InstagramIcon, YoutubeIcon, LinkedinIcon 
} from "lucide-react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <span className="ml-2 text-xl font-bold">Drops of Change</span>
            </div>
            <p className="text-gray-400">
              Creating an equitable society by ensuring every child has access to education and opportunities for personal growth.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/campaigns" className="text-gray-400 hover:text-white">
                  Our Campaigns
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-gray-400 hover:text-white">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Support Us</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/support" className="text-gray-400 hover:text-white">
                  Donate
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-gray-400 hover:text-white">
                  Volunteer
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-gray-400 hover:text-white">
                  Internships
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-gray-400 hover:text-white">
                  Sponsor a Child
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="https://www.linkedin.com/company/drops-of-change-welfare-society/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <LinkedinIcon className="h-6 w-6" />
              </a>
              <a href="https://www.facebook.com/dropsofchange" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <FacebookIcon className="h-6 w-6" />
              </a>
              <a href="https://www.youtube.com/@dropsofchange1242" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <YoutubeIcon className="h-6 w-6" />
              </a>
              <a href="http://x.com/Dropsofchange" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <TwitterIcon className="h-6 w-6" />
              </a>
              <a href="https://www.instagram.com/dropsofchange" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <InstagramIcon className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Drops of Change. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
