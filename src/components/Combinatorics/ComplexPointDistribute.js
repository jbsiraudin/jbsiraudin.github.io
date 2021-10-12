import React, { useRef, useState, useEffect } from "react";
import update from "immutability-helper";
import katex from "katex";

const Configurations = () => {
  const spanRef = useRef(null);
  const [options, setOptions] = useState([3, 1, 3, 2, 1]);

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
              Add constraint
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Configurations;
