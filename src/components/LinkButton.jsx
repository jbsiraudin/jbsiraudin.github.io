import React from "react";
import { readableColor } from "polished";

function LinkButton({ link, text = "Check it out", bgColor = "#efce2b" }) {
  return (
    <div
      style={{
        width: "fit-content",
        margin: "auto",
        marginTop: "30px",
        marginBottom: "30px",
      }}
    >
      <a
        className="LinkButton"
        href={link}
        style={{
          paddingTop: "10px",
          paddingBottom: "10px",
          paddingLeft: "30px",
          paddingRight: "30px",
          borderRadius: "200px",
          backgroundColor: bgColor,
          margin: "auto",
          textDecoration: "none",
          color: readableColor(bgColor),
          fontWeight: "bold",
          transition: "all 0.5s ease",
        }}
      >
        {text}
      </a>
    </div>
  );
}

export default LinkButton;
