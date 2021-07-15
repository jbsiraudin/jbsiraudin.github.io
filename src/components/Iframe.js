import React from "react";

function Iframe({ srcUrl, width = 560, height = 315, legend = "" }) {
  return (
    <>
      <div style={{ width: "fit-content", margin: "auto", marginBottom: "30px" }}>
        <iframe
          className="illustration"
          width={width}
          height={height}
          src={srcUrl}
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
      <p style={{ fontSize: "small", textAlign: "center", marginTop: "-20px" }}>{legend}</p>
    </>
  );
}

export default Iframe;
