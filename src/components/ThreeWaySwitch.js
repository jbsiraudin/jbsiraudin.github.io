import React, { Component } from "react";
import PropTypes from "prop-types";

const titleCase = (str) =>
  str
    .split(/\s+/)
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ");

const ClickableLabel = ({ title, onChange, id }) => (
  <label className="switch-label" onClick={() => onChange(id)}>
    {titleCase(title)}
  </label>
);

ClickableLabel.propTypes = {
  title: PropTypes.string,
  onChange: PropTypes.func,
  id: PropTypes.number,
};

const ConcealedRadio = ({ checked }) => (
  <input className="switch-radio" type="radio" name="switch" checked={checked} readOnly />
);

ConcealedRadio.propTypes = {
  checked: PropTypes.bool,
};

export default class ToggleSwitch extends Component {
  state = { selected: this.props.selected };

  handleChange = (val) => {
    this.setState({ selected: val });
    this.props.handleSelect(val);
  };

  selectionStyle = () => {
    return {
      left: `${(this.state.selected / 3) * 100}%`,
    };
  };

  render() {
    const { selected } = this.state;
    return (
      <div className="switch">
        {this.props.values.map((val, i) => {
          return (
            <span className="switch-container" key={val}>
              <ConcealedRadio checked={selected === i} />
              <ClickableLabel title={val} onChange={this.handleChange} id={i} />
            </span>
          );
        })}
        <span className="switch-selection" style={this.selectionStyle()} />
      </div>
    );
  }
}

ToggleSwitch.propTypes = {
  values: PropTypes.array,
  selected: PropTypes.number,
  handleSelect: PropTypes.func,
};

ToggleSwitch.defaultProps = {
  values: ["days", "weeks", "months"],
  selected: 0,
};
