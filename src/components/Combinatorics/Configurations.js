import React, { useRef, useState, useEffect } from "react";
import update from "immutability-helper";
import katex from "katex";

const Configurations = () => {
  const spanRef = useRef(null);
  const [options, setOptions] = useState([3, 4, 3, 2]);

  useEffect(() => {
    const result = options.reduce((a, b) => a * b, 1);
    let tmp = "";
    for (let i = 0; i < options.length - 1; i++) {
      tmp += `${options[i]}*`;
    }
    tmp += `${options[options.length - 1]}`;

    const equation = String.raw`{\textstyle \scriptsize Product = ${tmp} = ${result}}`;
    const html = katex.renderToString(equation, {
      throwOnError: false,
      displayMode: false,
    });
    spanRef.current.innerHTML = html;
  }, [options]);

  function addOption(option) {
    setOptions(
      update(options, {
        $push: [option],
      })
    );
  }

  function removeOption(i) {
    setOptions(update(options, { $splice: [[i, 1]] }));
    reset();
  }

  function updateOption(i, value) {
    const int = parseInt(value);
    setOptions(update(options, { [i]: { $set: int } }));
  }

  return (
    <div className="configurations">
      <div className="choices-container">
        <div className="choices">
          <div className="firstLine">
            <div className="text">Option</div>
            <div className="number">Choices</div>
          </div>
          {options.map((option, i) => (
            <div className="choice" key={`option-${i}`}>
              <div className="text">#{i + 1}</div>
              <input
                className="number"
                type="number"
                min={1}
                step={1}
                value={option}
                onChange={(e) => updateOption(i, e.target.valueAsNumber)}
                onInput="this.value = this.value.replace(/[^0-9.]/g, ''); this.value = this.value.replace(/(\..*)\./g, '$1');"
              />
              <div className="remove">
                <button
                  className="outline-danger"
                  style={{
                    borderRadius: "200px",
                    padding: 0,
                    paddingBottom: "2px",
                    width: "28px",
                  }}
                  onClick={() => removeOption(i)}
                >
                  -
                </button>
              </div>
            </div>
          ))}
          <div className="lastLine">
            <button className="outline-success" onClick={() => addOption(1)}>
              Add option
            </button>
          </div>
        </div>
      </div>
      <div className="math math-display">
        <span ref={spanRef} className="katex-display" style={{ fontSize: "1.5em" }} />
      </div>
    </div>
  );
};

export default Configurations;
