import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import useBaseUrl from "@docusaurus/useBaseUrl";

const CarouselImage = ({ srcImages, keyInit }) => {
  return (
    <Carousel>
      {srcImages.map((val, i) => (
        <img key={`${keyInit}-${i + 1}`} src={useBaseUrl(val)} />
      ))}
    </Carousel>
  );
};

export default CarouselImage;
