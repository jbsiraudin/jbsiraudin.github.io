import React from "react";

function Small({ children }) {
  return (
    <div
      style={{
        fontSize: "small",
      }}
    >
      {children}
    </div>
  );
}

export default Small;
