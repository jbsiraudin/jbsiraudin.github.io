import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const CarouselImage = ({ srcImages, keyInit }) => {
  return (
    <Carousel>
      {srcImages.map((val, i) => (
        <img key={`${keyInit}-${i + 1}`} src={val} />
      ))}
    </Carousel>
  );
};

export default CarouselImage;
