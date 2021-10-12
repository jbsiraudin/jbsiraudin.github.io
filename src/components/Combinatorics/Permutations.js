import React, { useRef, useState, useEffect } from "react";
import katex from "katex";
import update from "immutability-helper";
import { sum } from "lodash";

const factorial = (n) => [...Array(n + 1).keys()].slice(1).reduce((acc, cur) => acc * cur, 1);

const Permutations = () => {
  const [n, setN] = useState(15);
  const [k, setK] = useState(10);
  const spanRef = useRef(null);
  const [options, setOptions] = useState(Array(k).fill(1));
  const [pointsLeft, setPointsLeft] = useState(15);

  function moveUpOption(i) {
    if (sum(options) < n) {
      setOptions(update(options, { [i]: { $set: options[i] + 1 } }));
    }
  }

  function moveDownOption(i) {
    if (options[i] > 0) {
      setOptions(update(options, { [i]: { $set: options[i] - 1 } }));
    }
  }

  useEffect(() => {
    const result = Math.floor(factorial(n + k - 1) / (factorial(n) * factorial(k - 1)));
    const equation = String.raw`P(${n}, ${k}-1) =\frac{${n + k - 1}!}{${n}!${k - 1}!} = ${result}`;
    const html = katex.renderToString(equation, {
      throwOnError: false,
    });
    spanRef.current.innerHTML = html;
  }, [n, k]);

  useEffect(() => {
    setPointsLeft(n - sum(options));
  }, [n, options]);

  const onChangeN = (e) => {
    const int = parseInt(e.target.value);
    if (int < n) {
      setOptions(Array(k).fill(1));
    }

    if (int >= k) {
      setN(int);
    } else {
      setN(k);
    }
  };

  const onChangeK = (e) => {
    const int = parseInt(e.target.value);
    if (int < k) {
      setOptions(Array(int).fill(1));
    } else {
      setOptions(update(options, { $push: [0] }));
    }

    if (int <= n) {
      setK(int);
    } else {
      setK(n);
    }
  };

  return (
    <div style={{ marginTop: 30, display: "flex", flexWrap: "wrap", alignItems: "center" }}>
      <div className="arrangements" style={{ flex: "1 1" }}>
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

      <div className="pointDistribute" style={{ margin: "0 20px" }}>
        <div className="options">
          <div className="firstLine">
            <div className="text">Points left: {pointsLeft}</div>
          </div>
          {options.map((option, i) => (
            <div className="option" key={`option-${i}`}>
              <button onClick={() => moveDownOption(i)}>-</button>
              <div className="text">{option}</div>
              <button onClick={() => moveUpOption(i)}>+</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Permutations;
