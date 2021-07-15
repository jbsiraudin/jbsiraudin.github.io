import React from "react";
import ReactCompareImage from "react-compare-image";
import BrowserOnly from "@docusaurus/BrowserOnly";
import useBaseUrl from "@docusaurus/useBaseUrl";

function CompareImage({
  leftImage,
  rightImage,
  leftImageLabel = null,
  rightImageLabel = null,
}) {
  return (
    <BrowserOnly fallback={<div>Error loading the images.</div>}>
      {() => {
        // Something that should be excluded during build process prerendering.
        return (
          <ReactCompareImage
            leftImage={useBaseUrl(leftImage)}
            leftImageLabel={leftImageLabel}
            rightImage={useBaseUrl(rightImage)}
            rightImageLabel={rightImageLabel}
            style={{ marginBottom: "1em" }}
          />
        );
      }}
    </BrowserOnly>
  );
}

export default CompareImage;
