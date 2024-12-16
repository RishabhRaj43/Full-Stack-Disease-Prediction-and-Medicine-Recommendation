import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa"; // Social media icons
import { FaMeta } from "react-icons/fa6";

const Footer = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-gradient-to-r from-gray-800 to-blue-900 text-white py-16"
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Us Section */}
        <div className="text-center md:text-left">
          <h3 className="text-2xl font-semibold mb-4">About Us</h3>
          <p className="text-sm text-gray-300">
            Our platform connects patients with top-rated doctors, streamlines
            appointment management, and provides insightful health content to
            guide your wellness journey.
          </p>
        </div>

        {/* Quick Links Section */}
        <div className="text-center md:text-left">
          <h3 className="text-2xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-3 text-sm text-gray-300">
            <li>
              <Link to="/doctor-appointment" className="hover:underline">
                Book an Appointment
              </Link>
            </li>
            <li>
              <Link to="/profile?tab=fav-posts" className="hover:underline">
                Liked Posts
              </Link>
            </li>
            <li>
              <Link to="/profile?tab=appointments" className="hover:underline">
                My Appointments
              </Link>
            </li>
            <li>
              <Link to="/profile?tab=curr-info" className="hover:underline">
                Manage Profile
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="text-center md:text-left">
          <h3 className="text-2xl font-semibold mb-4">Contact</h3>
          <p className="text-sm text-gray-300 mb-2">
            Need assistance? Reach out to us!
          </p>
          <p className="text-sm text-gray-300">
            Email: {" "}
            <span className="text-blue-500 hover:underline">
              support@medguide.com
            </span>
          </p>
          <p className="text-sm text-gray-300">Phone: +1 234 567 890</p>
        </div>
      </div>

      {/* Social Media Links Section */}
      <div className="flex justify-center space-x-6 mt-8">
        <Link
          to="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-300 hover:text-blue-500"
        >
          <FaMeta size="1.5em" />
        </Link>
        <Link
          to="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-300 hover:text-blue-500"
        >
          <FaTwitter size="1.5em" />
        </Link>
        <Link
          to="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-300 hover:text-pink-500"
        >
          <FaInstagram size="1.5em" />
        </Link>
        <Link
          to="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-300 hover:text-blue-500"
        >
          <FaLinkedin size="1.5em" />
        </Link>
        <Link
          to={"https://github.com"}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-300 hover:text-black"
        >
          <FaGithub size="1.5em" />
        </Link>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Healthcare Platform. All rights reserved.
      </div>
    </motion.div>
  );
};

export default Footer;
