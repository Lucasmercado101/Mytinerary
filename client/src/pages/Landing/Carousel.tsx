import React from "react";
import useStyles from "./Styles";
import carousel1img from "../../Images/carousel1.jpg";
import carousel2img from "../../Images/carousel2.jpg";
import carousel3img from "../../Images/carousel3.jpg";
import carousel4img from "../../Images/carousel4.jpg";
import carousel5img from "../../Images/carousel5.jpg";
import Slider from "react-animated-slider";
import "react-animated-slider/build/horizontal.css";
const images = [
  carousel1img,
  carousel2img,
  carousel3img,
  carousel4img,
  carousel5img
];

const Carousel: React.FC = () => {
  const { section, h2 } = useStyles({});
  return (
    <>
      <section className={section}>
        <h2 className={h2}>Popular MYtineraries</h2>

        <Slider style={{ backgroundColor: "red" }} autoplay={3000}>
          {images.map((item, index) => (
            <div
              key={index}
              style={{
                background: `url('${item}') no-repeat center center / cover`
              }}
            ></div>
          ))}
        </Slider>
      </section>
    </>
  );
};

export default Carousel;
