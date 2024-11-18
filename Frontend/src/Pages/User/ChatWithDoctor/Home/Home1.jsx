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

  const images = [
    {
      img: "https://plus.unsplash.com/premium_photo-1661281397737-9b5d75b52beb?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      heading: "Heading 1",
    },
    {
      img: "https://img.freepik.com/free-photo/close-up-doctor-with-stethoscope_23-2149191355.jpg",
      heading: "Heading 2",
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto mt-9 rounded-3xl overflow-hidden">
      <Slider {...settings}>
        {images.map((image, ind) => (
          <div
            key={ind}
            className="relative flex justify-center items-center rounded-3xl h-[30rem]"
          >
            <img
              src={image.img}
              className="w-full h-full object-cover rounded-3xl object-top"
              alt=""
            />
            <h3 className="absolute text-white text-4xl font-semibold z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              {image.heading}
            </h3>
          </div>
        ))}
      </Slider>
    </div>
  );
}
