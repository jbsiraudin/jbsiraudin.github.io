import React from "react";

function Image({ srcImage, legend = "", altText = "", halfWidth = false }) {
  return (
    <>
      <div style={{ width: "fit-content", display: "flex", margin: "auto", marginBottom: "30px" }}>
        <img
          alt={altText}
          style={{ width: halfWidth ? "400px" : "auto", margin: "auto" }}
          src={srcImage}
        />
      </div>
      <p style={{ fontSize: "small", textAlign: "center", marginTop: "-20px" }}>{legend}</p>
    </>
  );
}

export default Image;
