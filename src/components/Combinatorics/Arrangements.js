import React, { useRef, useState, useEffect } from "react";
import katex from "katex";

const factorial = (n) => [...Array(n + 1).keys()].slice(1).reduce((acc, cur) => acc * cur, 1);

const Arrangements = () => {
  const [n, setN] = useState(10);
  const [nIsValid, setNIsValid] = useState(true);
  const [k, setK] = useState(5);
  const [kIsValid, setKIsValid] = useState(true);
  const spanRef = useRef(null);

  useEffect(() => {
    const result = Math.floor(factorial(n) / factorial(n - k));
    const equation = String.raw`A_{n}^{k} = A_{${n}}^{${k}} = \frac{${n}!}{(${n}-${k})!} = ${result}`;
    const html = katex.renderToString(equation, {
      throwOnError: false,
    });
    spanRef.current.innerHTML = html;
  }, [n, k]);

  const onChangeN = (e) => {
    const int = parseInt(e.target.value);
    if (int >= k) {
      setN(int);
    } else {
      setN(k);
    }
  };

  const onChangeK = (e) => {
    const int = parseInt(e.target.value);
    if (int <= n) {
      setK(int);
    } else {
      setK(n);
    }
  };

  return (
    <div className="arrangements">
      <div className="input-container">
        <div className="input" style={{ marginRight: 30 }}>
          <p>n =</p>
          <input
            type="number"
            value={n}
            min={k}
            step={1}
            onChange={onChangeN}
            onInput="this.value = this.value.replace(/[^0-9.]/g, ''); this.value = this.value.replace(/(\..*)\./g, '$1');"
          />
        </div>
        <div className="input">
          <p>k =</p>
          <input
            type="number"
            value={k}
            min={0}
            step={1}
            onChange={onChangeK}
            onInput="this.value = this.value.replace(/[^0-9.]/g, ''); this.value = this.value.replace(/(\..*)\./g, '$1');"
          />
        </div>
      </div>
      <div className="math math-display">
        <span ref={spanRef} className="katex-display" style={{ fontSize: "1.5em" }} />
      </div>
    </div>
  );
};

export default Arrangements;
