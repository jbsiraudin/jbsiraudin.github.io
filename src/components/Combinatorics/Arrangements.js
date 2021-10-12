import React, { useRef, useState, useEffect } from "react";
import katex from "katex";

const Arrangements = () => {
  const [n, setN] = useState(10);
  const [k, setK] = useState(5);
  const spanRef = useRef(null);

  const factorial = (n) => {
    if (n === 0 || n === 1) {
      return 1;
    } else {
      let tmp = 1;
      for (let i = 2; i < n + 1; i++) {
        tmp *= i;
      }
      return tmp;
    }
  };

  function A(n, k) {
    return Math.floor(factorial(n) / factorial(n - k));
  }

  useEffect(() => {
    const result = A(n, k);
    const equation = String.raw`A_{n}^{k} = A_{${n}}^{${k}} = \frac{${n}!}{(${n}-${k})!} = ${result}`;
    const html = katex.renderToString(equation, {
      throwOnError: false,
    });
    spanRef.current.innerHTML = html;
  }, [n, k]);

  const onChangeN = (e) => {
    const int = parseInt(e.target.value);
    if (!isNaN(int)) {
      if (int >= k) {
        setN(int);
      } else {
        setN(k);
      }
    }
  };

  const onChangeK = (e) => {
    const int = parseInt(e.target.value);
    if (!isNaN(int)) {
      if (int <= n) {
        setK(int);
      } else {
        setK(n);
      }
    }
  };

  return (
    <div className="arrangements">
      <div className="input-container">
        <div className="input" style={{ marginRight: 30 }}>
          <p>n =</p>
          <input type="number" value={n} min={k} step={1} onChange={onChangeN} />
        </div>
        <div className="input">
          <p>k =</p>
          <input type="number" value={k} min={0} step={1} onChange={onChangeK} />
        </div>
      </div>
      <div className="math math-display">
        <span ref={spanRef} className="katex-display" style={{ fontSize: "1.5em" }} />
      </div>
    </div>
  );
};

export default Arrangements;
