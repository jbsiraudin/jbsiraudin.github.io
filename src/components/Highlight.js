import React from "react";
import { readableColor } from "polished";

const Highlight = ({
  children,
  color,
  pos = "center",
  width = "fit-content",
}) => (
  <div
    style={{
      backgroundColor: color,
      borderRadius:
        pos === "center"
          ? "4px"
          : pos === "left"
          ? "4px 0 0 4px"
          : "0 4px 4px 0",
      color: readableColor(color),
      padding: "0.4rem",
      marginBottom: "20px",
      width: width,
    }}
  >
    {children}
  </div>
);

export default Highlight;
