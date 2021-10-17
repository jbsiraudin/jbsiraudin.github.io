import React from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";

function Video({ srcVideo, width = 560, height = 315, legend = "" }) {
  return (
    <>
      <div
        style={{
          //width: "fit-content",
          display: "flex",
          justifyContent: "center",
          margin: "auto",
          marginBottom: "30px",
        }}
      >
        <video preload="auto" controls width={width}>
          <source src={useBaseUrl(srcVideo)} type="video/mp4" />
          Sorry, your browser doesn't support embedded videos.
        </video>
      </div>
      <p style={{ fontSize: "small", textAlign: "center", marginTop: "-20px" }}>{legend}</p>
    </>
  );
}

export default Video;
