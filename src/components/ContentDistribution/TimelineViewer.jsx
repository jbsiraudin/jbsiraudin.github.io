import React from "react";
import PropTypes from "prop-types";
//import ReactTooltip from "react-tooltip";

const colors = ["blue", "green", "orange", "red"];

export default function TimelineViewer({ wave, mode = 0 }) {
  return (
    <div className="scroll timeline">
      <div className="canvas">
        <div className="line" />
        {wave.map((x, index) => (
          <span key={`wave${index}`}>
            <span>
              <div
                className="slot"
                key={`t-${index}`}
                /* style={{ backgroundColor: x.color }} */
                data-tip="Info about the genk dslkfjlsdkj <br> sfdldkj sdflkjfd sdlkdfj fskdshfez azoelk."
                data-for="calendar"
              >
                <div className="card-t">
                  <card-t
                    cid={x.cid}
                    backtext=""
                    backcolor={colors[mode]}
                  ></card-t>
                </div>
              </div>
            </span>
            {/* <ReactTooltip
              id="calendar"
              place="bottom"
              effect="solid"
              multiline={true}
            /> */}
          </span>
        ))}
      </div>
    </div>
  );
}

TimelineViewer.propTypes = {
  wave: PropTypes.array,
  mode: PropTypes.number,
  noir: PropTypes.bool,
};
