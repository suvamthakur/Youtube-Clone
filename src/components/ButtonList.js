import Button from "./Button";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const buttons = [
  "All",
  "Live",
  "News",
  "Music",
  "JavaScript",
  "Cricket",
  "Computer Programming",
  "Robotics",
  "Comedy",
  "Podcasts",
  "Football",
  "System Design",
  "Robotics",
  "Treding",
  "Recently Uploaded",
  "Watched",
];

const ButtonList = () => {
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    variableWidth: true,
    initialSlide: 0,
  };

  return (
    <div className="bg-neutral-950 py-2 ml-2 px-5 z-10 w-[95%] md:sticky top-[66px]">
      <div className="slider-container">
        <Slider {...settings}>
          {buttons.map((name, index) => (
            <Button key={index} buttonName={name} />
          ))}
        </Slider>
      </div>
    </div>
  );
};
export default ButtonList;
