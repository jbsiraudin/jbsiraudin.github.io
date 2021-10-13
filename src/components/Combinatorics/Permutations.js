import React, { useRef, useState, useEffect } from "react";
import katex from "katex";
import update from "immutability-helper";
import { sum } from "lodash";

const Permutations = () => {
  const [n, setN] = useState(15);
  const [k, setK] = useState(10);
  const spanRef = useRef(null);
  const [options, setOptions] = useState(Array(k).fill(1));
  const [pointsLeft, setPointsLeft] = useState(15);

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
      throwOnError: false
    });
    spanRef.current.innerHTML = html;
  }, [n, k]);

  useEffect(() => {
    setPointsLeft(n - sum(options));
  }, [n, options]);

  const onChangeN = (e) => {
    const int = parseInt(e.target.value);
    if (!isNaN(int)) {
      if (int < n) {
        setOptions(Array(k).fill(1));
      }
      if (int >= k) {
        setN(int);
      } else {
        setN(k);
      }
    }
  };

  const onChangeK = (e) => {
    let int = parseInt(e.target.value);
    if (!isNaN(int)) {
      if (int > n) {
        int = n;
        setK(n);
      }
      setK(int);

      if (int < k) {
        setOptions(Array(int).fill(1));
      } else {
        setOptions(update(options, { $push: Array(int - k).fill(0) }));
      }
    }
  };

  return (
    <div
      style={{
        marginTop: 30,
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <div className="arrangements" style={{ flex: "1 1" }}>
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

      <div className="pointDistribute" style={{ margin: "0 20px" }}>
        <div className="options">
          <div className="firstLine">
            <div className="text">Points left: {pointsLeft}</div>
          </div>
          {options.map((option, i) => (
            <div className="option" key={`option-${i}`}>
              <button onClick={() => moveDownOption(i)}>-</button>
              <div className="text">{option}</div>
              <button onClick={() => moveUpOption(i)} disabled={sum(options) >= n}>
                +
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Permutations;
