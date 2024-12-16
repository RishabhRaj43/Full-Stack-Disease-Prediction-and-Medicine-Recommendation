import React from "react";
import {
  faTwitter,
  faGithub,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className=" bg-gradient-to-r from-blue-900 to-purple-800 text-white py-10">
      <div className=" mx-auto px-6 lg:px-20">
        <div className="flex flex-wrap justify-between">
          <div className="mb-8 lg:mb-0 lg:w-1/2">
            <h4 className="text-3xl font-bold">Let's Keep in Touch!</h4>
            <p className="mt-4 text-lg">
              Your symptoms. Our guidance. Stay connected for updates and
              healthcare solutions.
            </p>
            <div className="flex mt-6 space-x-4 w-full">
              <Link to="/user" target="_blank">
                <div className="bg-white hover:bg-blue-500 text-blue-500 hover:text-white p-3 rounded-full w-12 h-12 flex items-center justify-center cursor-pointer">
                  <FontAwesomeIcon icon={faTwitter} size="xl" />
                </div>
              </Link>
              <Link to="https://github.com/RishabhRaj43" target="_blank">
                <div className="bg-white hover:bg-gray-900 text-black hover:text-white p-3 rounded-full w-12 h-12 flex items-center justify-center cursor-pointer">
                  <FontAwesomeIcon icon={faGithub} size="xl" />
                </div>
              </Link>
              <Link to="/user" target="_blank">
                <div className="bg-white hover:bg-pink-500 text-pink-500 hover:text-white p-3 rounded-full w-12 h-12 flex items-center justify-center cursor-pointer">
                  <FontAwesomeIcon icon={faInstagram} size="xl" />
                </div>
              </Link>
            </div>
          </div>
          <div className="lg:w-1/3">
            <h5 className="text-xl font-semibold mb-4 underline">
              Useful Links
            </h5>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/user/about"
                  className="hover:underline hover:text-gray-200 cursor-pointer"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/user/prediction"
                  className="hover:underline hover:text-gray-200 cursor-pointer"
                >
                  Prediction
                </Link>
              </li>
              <li>
                <Link
                  to="/user/about"
                  className="hover:underline hover:text-gray-200 cursor-pointer"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to={import.meta.env.VITE_DOCTOR_PORTAL}
                  target="_blank"
                  className="hover:underline hover:text-gray-200 cursor-pointer"
                >
                  Book Appointments
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <hr className="my-6 border-gray-600" />
        <div className="text-center">
          <p className="text-sm">
            © 2024 | Made with ❤️ by{" "}
            <Link
              to="https://github.com/RishabhRaj43"
              target="_blank"
              className="hover:underline cursor-pointer"
            >
              Team Rishabh
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
