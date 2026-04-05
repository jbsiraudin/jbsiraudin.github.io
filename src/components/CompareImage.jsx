import React from "react";
import ReactCompareImage from "react-compare-image";

function CompareImage({
  leftImage,
  rightImage,
  leftImageLabel = null,
  rightImageLabel = null,
}) {
  return (
    <ReactCompareImage
      leftImage={leftImage}
      leftImageLabel={leftImageLabel}
      rightImage={rightImage}
      rightImageLabel={rightImageLabel}
      style={{ marginBottom: "1em" }}
    />
  );
}

export default CompareImage;
