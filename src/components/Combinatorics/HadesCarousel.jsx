import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const HadesCarousel = ({ world, length }) => {
  const extension = world === "Tartarus" ? "jpg" : "png";
  return (
    <Carousel>
      {Array(length)
        .fill(0)
        .map((val, i) => (
          <img
            key={`${world}-${i + 1}`}
            src={`https://cinedata-stills.s3.eu-west-3.amazonaws.com/Hades/${world}/${world}-${
              i + 1
            }.${extension}`}
          />
        ))}
    </Carousel>
  );
};

export default HadesCarousel;
