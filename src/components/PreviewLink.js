import React from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";

const PreviewLink = ({
  url,
  thumbnailUrl,
  title,
  description,
  small = true,
  width = "200px",
  height = "300px",
  callToAction = "READ MORE",
}) => {
  return (
    <div
      className="previewlink-container"
      style={{
        width: width,
        height: height,
      }}
    >
      <a className="img" href={url} target="_blank">
        <img
          alt=""
          src={useBaseUrl(thumbnailUrl)}
          style={{
            width: "100%",
          }}
        />
      </a>
      <a
        className="h2"
        href={url}
        target="_blank"
        style={{
          fontSize: small ? "18px" : "28px",
        }}
      >
        {title}
      </a>
      <a
        className="p"
        href={url}
        target="_blank"
        style={{
          fontSize: small ? "10px" : "14px",
        }}
      >
        {description}
      </a>
      <a
        className="read"
        href={url}
        target="_blank"
        style={{
          fontSize: small ? "14px" : "18px",
        }}
      >
        {callToAction}
      </a>
    </div>
  );
};

export default PreviewLink;
