import React from "react";

function Iframe({ srcUrl, width = 560, height = 315, legend = "" }) {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "auto",
          marginBottom: "30px"
        }}
      >
        <iframe
          className="illustration"
          width={width}
          height={height}
          src={srcUrl}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <p style={{ fontSize: "small", textAlign: "center", marginTop: "-20px" }}>{legend}</p>
    </>
  );
}

export default Iframe;
