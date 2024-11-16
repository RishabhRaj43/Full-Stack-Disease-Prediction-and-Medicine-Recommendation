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
    <footer className="relative bg-blueGray-200 bottom-0 pt-8 pb-6 bg-[#6A9AB0] ">
      <div className="container mx-auto px-4 cursor-default">
        <div className="flex flex-wrap text-left lg:text-left">
          <div className="w-full lg:w-6/12 px-4">
            <h4 className="text-4xl font-semibold text-blueGray-700">
              Let's keep in touch!
            </h4>
            <h5 className="text-xl mt-0 mb-2 text-blueGray-600 ">
              Your symptoms. Our guidance.
            </h5>
            <div className="mt-6 lg:mb-0 mb-6">
              <Link to={"/user"} target="_blank">
                <button
                  className="bg-white shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2 hover:bg-[#1DA1F2] hover:text-white text-[#1DA1F2] "
                  type="button"
                >
                  <FontAwesomeIcon icon={faTwitter} size="lg" />
                </button>
              </Link>
              <Link to={"https://github.com/RishabhRaj43"} target="_blank">
                <button
                  className="bg-white text-black shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2 hover:bg-black hover:text-white"
                  type="button"
                >
                  <FontAwesomeIcon icon={faGithub} size="lg" />
                </button>
              </Link>
              <Link to={"/user"} target="_blank">
                <button
                  className="bg-white text-[#EE66A6] shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2 hover:bg-[#EE66A6] hover:text-white"
                  type="button"
                >
                  <FontAwesomeIcon icon={faInstagram} size="lg" />
                </button>
              </Link>
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4">
            <div className="flex flex-wrap items-top mb-6">
              <div className="w-full lg:w-4/12 px-4 ml-auto">
                <span className="block uppercase text-blueGray-500 text-md font-semibold mb-2 underline">
                  Useful Links
                </span>
                <ul className="list-unstyled">
                  <li>
                    <Link
                      to={"/user/about"}
                      className="text-blueGray-600 hover:text-gray-300 font-semibold block pb-2 text-sm"
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/user/features/prediction"}
                      className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm hover:text-gray-300"
                    >
                      Prediction
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"https://github.com/RishabhRaj43"}
                      target="_blank"
                      className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm hover:text-gray-300"
                    >
                      Github
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/Contact"}
                      className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm hover:text-gray-300"
                    >
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <hr className="my-6 border-blueGray-300" />
        <div className="flex flex-wrap items-center md:justify-between justify-center">
          <div className="w-full md:w-4/12 px-4 mx-auto text-center">
            <div className="text-sm text-blueGray-500 font-semibold py-1">
              Copyright © <span id="get-current-year">2024 | </span> Made with
              ❤️ by{" "}
              <Link
                to={"/"}
                className="text-blueGray-500 hover:text-blueGray-800"
              >
                Team Rishabh
              </Link>
              .
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
