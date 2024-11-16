import React from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../../../Components/ui/Slider.css"; // If you need to add custom styles

export default function SimpleSlider() {
  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    arrows: false,
    speed: 900,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,
    pauseOnHover: true,
    pauseOnFocus: true,
  };

  return (
    <div className="slider-container w-full max-w-4xl mx-auto pt-9 rounded-lg">
      <Slider {...settings}>
        <div className="flex justify-center items-center bg-gradient-to-r from-blue-500 to-teal-400 rounded-xl h-72 shadow-xl">
          <h3 className="text-white text-4xl font-semibold tracking-wide">1</h3>
        </div>
        <div className="flex justify-center items-center bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl h-72 shadow-xl">
          <h3 className="text-white text-4xl font-semibold tracking-wide">2</h3>
        </div>
        <div className="flex justify-center items-center bg-gradient-to-r from-yellow-500 to-red-500 rounded-xl h-72 shadow-xl">
          <h3 className="text-white text-4xl font-semibold tracking-wide">3</h3>
        </div>
        <div className="flex justify-center items-center bg-gradient-to-r from-green-500 to-teal-500 rounded-xl h-72 shadow-xl">
          <h3 className="text-white text-4xl font-semibold tracking-wide">4</h3>
        </div>
        <div className="flex justify-center items-center bg-gradient-to-r from-indigo-500 to-blue-500 rounded-xl h-72 shadow-xl">
          <h3 className="text-white text-4xl font-semibold tracking-wide">5</h3>
        </div>
        <div className="flex justify-center items-center bg-gradient-to-r from-red-500 to-orange-500 rounded-xl h-72 shadow-xl">
          <h3 className="text-white text-4xl font-semibold tracking-wide">6</h3>
        </div>
      </Slider>
    </div>
  );
}
