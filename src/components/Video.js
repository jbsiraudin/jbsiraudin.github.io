import React from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";

function Iframe({ srcVideo, width = 560, height = 315, legend = "" }) {
  return (
    <>
      <div
        style={{
          width: "fit-content",
          display: "flex",
          justifyContent: "center",
          margin: "auto",
          marginBottom: "30px",
        }}
      >
        <video preload="auto" controls width={width} height={height}>
          <source src={useBaseUrl(srcVideo)} type="video/webm" />
          Sorry, your browser doesn't support embedded videos.
        </video>
      </div>
      <p style={{ fontSize: "small", textAlign: "center", marginTop: "-20px" }}>{legend}</p>
    </>
  );
}

export default Iframe;
