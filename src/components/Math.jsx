import React, { useRef, useEffect } from "react";
import katex from "katex";

const Math = ({ equation }) => {
  const divRef = useRef(null);
  const html = katex.renderToString(equation, {
    throwOnError: false,
  });

  useEffect(() => {
    const x = document.createElement("span");
    x.className = "katex-display";
    x.innerHTML = html;
    x.style.fontSize = "2em";
    divRef.current.appendChild(x);
  }, []);

  return <div ref={divRef} className="math math-display"></div>;
};

export default Math;
