import React, { useState } from "react";
import update from "immutability-helper";
import { sum } from "lodash";

const Configurations = () => {
  const [options, setOptions] = useState([3, 1, 3, 2, 1]);

  function moveUpOption(i) {
    if (sum(options) < 10) {
      setOptions(update(options, { [i]: { $set: options[i] + 1 } }));
    }
  }

  function moveDownOption(i) {
    if (options[i] > 0) {
      setOptions(update(options, { [i]: { $set: options[i] - 1 } }));
    }
  }

  return (
    <div className="pointDistribute">
      <div className="options">
        <div className="firstLine">
          <div className="text">Points left: {10 - sum(options)}</div>
        </div>
        {options.map((option, i) => (
          <div className="option" key={`option-${i}`}>
            <button onClick={() => moveDownOption(i)}>-</button>
            <div className="text">{option}</div>
            <button onClick={() => moveUpOption(i)} disabled={sum(options) >= 10}>
              +
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Configurations;
