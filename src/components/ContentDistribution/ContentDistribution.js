import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { WFC, FullDeck, NormalDeck, WeightedDeck } from "./timeline";
import {
  N_init,
  undef,
  init_cards,
  positionOptions,
  suitOptions,
  cardOptions,
  typesOptions,
} from "./data";
import TimelineViewer from "./TimelineViewer";
import ToggleSwitch from "../ToggleSwitch";
import update from "immutability-helper";
// https://github.com/cardmeister/cardmeister.github.io

const Description = ({ mode }) => {
  let content = null;
  if (mode === 0) {
    content = <p>At each position, we pick a card from a full 52-cards deck.</p>;
  } else if (mode === 1) {
    content = (
      <p>At each position, we pick a card from a deck and we take out the card from the deck.</p>
    );
  } else if (mode === 2) {
    content = (
      <p>
        At each position, we pick a card from a weighted deck we define.
        <br /> A card with a weight 10 will have 10 times more chances to be picked than a card with
        a weight 1.
      </p>
    );
  } else {
    content = (
      <p>
        We apply a constraint-based algorithm (Wave Function Collapse) to distribute our cards.
        <br />
        You can define the constraints below.
      </p>
    );
  }
  return <div className="app-header">{content}</div>;
};

Description.propTypes = {
  mode: PropTypes.number,
};

export class ContentDistribution extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      wave: new Array(N_init).fill(undef),
      constraints: [
        [true, "0", "h", "no-after", "0", "s", "0"],
        [true, "0", "c", "no-at", "0", "s", "1"],
        [true, "0", "s", "no-at", "0", "s", "1"],
        [true, "Q", "d", "prefers-at", "0", "s", "0"],
        [true, "1", "s", "no-after", "1", "0", "0"],
      ],
      weights: [
        [true, "1", "s", 20],
        [true, "5", "d", 5],
      ],
      mode: 0,
      configHasChanged: true,
    };

    this.N = N_init;
    this.data = init_cards;

    this.gen = this.gen.bind(this);
    this.init = this.init.bind(this);
    this.reset = this.reset.bind(this);
    this.onConfigChange = this.onConfigChange.bind(this);
    this.onModeSelect = this.onModeSelect.bind(this);
    this.addConstraint = this.addConstraint.bind(this);
    this.removeConstraint = this.removeConstraint.bind(this);
    this.updateConstraint = this.updateConstraint.bind(this);
  }

  componentDidMount() {
    import("./cards");
    this.init();
  }

  gen() {
    const { mode, configHasChanged } = this.state;

    let wave_tmp = null;

    if (mode === 0) {
      this.fullDeckGenerator.run();
      wave_tmp = this.fullDeckGenerator.getTimeline();
    } else if (mode === 1) {
      this.normalDeckGenerator.reset();
      this.normalDeckGenerator.run();
      wave_tmp = this.normalDeckGenerator.getTimeline();
    } else if (mode === 2) {
      if (configHasChanged) {
        this.weightedDeckGenerator.resetWeights();
        this.convertWeights();
      }
      this.weightedDeckGenerator.reset();
      this.weightedDeckGenerator.run();
      wave_tmp = this.weightedDeckGenerator.getTimeline();
    } else if (mode === 3) {
      if (configHasChanged) {
        this.wfcGenerator.resetWeights();
        this.wfcGenerator.resetConstraints();
        this.convertConstraints();

        this.wfcGenerator.reset();
        //console.log(this.wfcGenerator.tiles);
        //console.log(this.wfcGenerator.wave);
        this.wfcGenerator.run();

        wave_tmp = this.wfcGenerator.getTimeline();
      } else {
        this.wfcGenerator.reset();
        this.wfcGenerator.run();

        wave_tmp = this.wfcGenerator.getTimeline();
        //console.log(wave_tmp);
        //wave_tmp = new Array(this.N);
        /* this.wfcGenerator.getWave().forEach((item, i) => {
          wave_tmp[i] = {
            name: this.data[item].label,
            color: this.data[item].color,
            cid: this.data[item].cid,
          };
        }); */
      }
    }

    this.setState({ wave: wave_tmp, configHasChanged: false });
  }

  reset() {
    this.wfcGenerator.reset();
    this.normalDeckGenerator.reset();
    this.weightedDeckGenerator.reset();
    this.setState({ wave: new Array(this.N).fill(undef) });
  }

  init() {
    this.wfcGenerator = new WFC(this.N, this.data);
    this.wfcGenerator.init();

    this.fullDeckGenerator = new FullDeck(this.N, this.data);
    this.normalDeckGenerator = new NormalDeck(this.N, this.data);
    this.weightedDeckGenerator = new WeightedDeck(this.N, this.data);
  }

  onConfigChange(e) {
    if (this.N !== e.N) {
      this.N = e.N;
      this.setState(
        {
          constraints: e.constraints,
          configHasChanged: true,
        },
        () => this.init()
      );
    } else {
      this.setState({
        constraints: e.constraints,
        configHasChanged: true,
      });
    }
  }

  onModeSelect(i) {
    this.setState({ mode: i });
  }

  addWeight() {
    this.setState((state) => {
      return {
        weights: [...state.weights, [false, "0", "0", 1]],
        configHasChanged: true,
      };
    });
  }

  removeWeight(i) {
    this.setState({
      weights: update(this.state.weights, { $splice: [[i, 1]] }),
      configHasChanged: true,
    });
  }

  updateWeight(i, j, value) {
    this.setState({
      weights: update(this.state.weights, {
        [i]: { [j]: { $set: value } },
      }),
      configHasChanged: true,
    });
  }

  convertWeights() {
    const { weights } = this.state;

    for (let i = 0; i < weights.length; i++) {
      const weight = weights[i];

      if (!weight[0]) {
        continue;
      }

      if (weight[1] === "0" && weight[2] === "0") {
        this.updateWeight(i, 0, false);
        continue;
      } else if (weight[1] === "0" && weight[2] !== "0") {
        for (let j = 0; j < this.data.length; j++) {
          if (this.data[j].cid.charAt(1) === weight[2]) {
            this.weightedDeckGenerator.applyWeight(this.data[j].id, weight[3]);
          }
        }
      } else if (weight[1] !== "0" && weight[2] === "0") {
        for (let j = 0; j < this.data.length; j++) {
          if (this.data[j].cid.charAt(0) === weight[1]) {
            this.weightedDeckGenerator.applyWeight(this.data[j].id, weight[3]);
          }
        }
      } else {
        for (let j = 0; j < this.data.length; j++) {
          if (this.data[j].cid === `${weight[1]}${weight[2]}`) {
            this.weightedDeckGenerator.applyWeight(this.data[j].id, weight[3]);
          }
        }
      }
      // this.weightedDeckGenerator.updateWeight()
    }
  }

  addConstraint() {
    this.setState((state) => {
      return {
        constraints: [...state.constraints, [false, "0", "0", "0", "0", "0"]],
        configHasChanged: true,
      };
    });
  }

  removeConstraint(i) {
    this.setState({
      constraints: update(this.state.constraints, { $splice: [[i, 1]] }),
      configHasChanged: true,
    });
  }

  updateConstraint(i, j, value) {
    this.setState({
      constraints: update(this.state.constraints, {
        [i]: { [j]: { $set: value } },
      }),
      configHasChanged: true,
    });
  }

  convertConstraints() {
    const { constraints } = this.state;

    for (let i = 0; i < constraints.length; i++) {
      const constraint = constraints[i];

      if (!constraint[0]) {
        continue;
      }

      let entryIdList = [];
      let exitIdList = [];
      let constraintMode = 0;
      let valueWeight = 0;
      let only = false;

      switch (constraint[3]) {
        case "no-after":
          constraintMode = 0;
          break;
        case "no-before":
          constraintMode = 1;
          break;
        case "only-after":
          only = true;
          constraintMode = 0;
          break;
        case "only-before":
          only = true;
          constraintMode = 1;
          break;
        case "no-at":
          constraintMode = 2;
          valueWeight = 0;
          break;
        case "prefers-at":
          constraintMode = 2;
          valueWeight = 10000;
          break;
        default:
          this.updateConstraint(i, 0, false);
          continue;
      }

      if (!only) {
        if (constraint[1] === "0" && constraint[2] === "0") {
          this.updateConstraint(i, 0, false);
          continue;
        } else if (constraint[1] === "0" && constraint[2] !== "0") {
          const dataFiltered = _.filter(this.data, (o) => {
            return o.cid.charAt(1) === constraint[2];
          });
          for (let j = 0; j < dataFiltered.length; j++) {
            entryIdList.push(dataFiltered[j].id);
          }
        } else if (constraint[1] !== "0" && constraint[2] === "0") {
          const dataFiltered = _.filter(this.data, (o) => {
            return o.cid.charAt(0) === constraint[1];
          });
          for (let j = 0; j < dataFiltered.length; j++) {
            entryIdList.push(dataFiltered[j].id);
          }
        } else {
          const idx = _.findIndex(this.data, (o) => {
            return o.cid === `${constraint[1]}${constraint[2]}`;
          });
          entryIdList.push(this.data[idx].id);
        }
      } else {
        if (constraint[1] === "0" && constraint[2] === "0") {
          this.updateConstraint(i, 0, false);
          continue;
        } else if (constraint[1] === "0" && constraint[2] !== "0") {
          const dataFiltered = _.filter(this.data, (o) => {
            return o.cid.charAt(1) !== constraint[2];
          });
          for (let j = 0; j < dataFiltered.length; j++) {
            entryIdList.push(dataFiltered[j].id);
          }
        } else if (constraint[1] !== "0" && constraint[2] === "0") {
          const dataFiltered = _.filter(this.data, (o) => {
            return o.cid.charAt(0) !== constraint[1];
          });
          for (let j = 0; j < dataFiltered.length; j++) {
            entryIdList.push(dataFiltered[j].id);
          }
        } else {
          const dataFiltered = _.filter(this.data, (o) => {
            return o.cid === `${constraint[1]}${constraint[2]}`;
          });
          for (let j = 0; j < dataFiltered.length; j++) {
            entryIdList.push(dataFiltered[j].id);
          }
        }
      }

      if (constraintMode < 2) {
        if (constraint[4] === "0" && constraint[5] === "0") {
          this.updateConstraint(i, 0, false);
          continue;
        } else if (constraint[4] === "0" && constraint[5] !== "0") {
          const dataFiltered = _.filter(this.data, (o) => {
            return o.cid.charAt(1) === constraint[5];
          });
          for (let j = 0; j < dataFiltered.length; j++) {
            exitIdList.push(dataFiltered[j].id);
          }
        } else if (constraint[4] !== "0" && constraint[5] === "0") {
          const dataFiltered = _.filter(this.data, (o) => {
            return o.cid.charAt(0) === constraint[4];
          });
          for (let j = 0; j < dataFiltered.length; j++) {
            exitIdList.push(dataFiltered[j].id);
          }
        } else {
          const idx = _.findIndex(this.data, (o) => {
            return o.cid === `${constraint[4]}${constraint[5]}`;
          });
          exitIdList.push(this.data[idx].id);
        }
      } else {
        exitIdList.push(parseInt(constraint[6]));
      }

      if (constraintMode < 2) {
        this.wfcGenerator.applyConstraint(entryIdList, constraintMode, exitIdList);
      } else {
        this.wfcGenerator.applyWeight(entryIdList, exitIdList, valueWeight);
      }
    }
  }

  render() {
    const { wave, configHasChanged, mode, constraints, weights } = this.state;
    return (
      <>
        <div className="app-container">
          <ToggleSwitch
            values={[
              "Many full decks",
              "One deck distributed",
              "Weighted decks",
              "Constrained decks",
            ]}
            selected={mode}
            handleSelect={this.onModeSelect}
          />
          <Description mode={mode} />
          <TimelineViewer wave={wave} mode={mode} />
          <div className="buttons">
            <button className="reset run" onClick={this.reset}>
              <span>RESET</span>
            </button>
            <button className="run" onClick={this.gen}>
              <span>GEN</span>
              {configHasChanged && mode === 2 ? <span className="warn">!</span> : <></>}
            </button>
          </div>
          <div className="constraints-container" hidden={mode !== 2}>
            <h3>Weights definition</h3>
            <div className="constraints">
              <div className="constraints-line firstLine">
                <div className="number">#</div>
                <div className="use">Use</div>
                <div className="selector">Selector</div>
                <div className="weight">Weight</div>
              </div>
              {weights.map((weight, i) => (
                <div className="constraints-line midLine" key={`w-key-${i}`}>
                  <div className="number">#{i + 1}</div>
                  <div className="use">
                    <input
                      type="checkbox"
                      checked={weight[0]}
                      onChange={(e) => this.updateWeight(i, 0, e.target.checked)}
                    />
                  </div>
                  <div className="selector">
                    <select
                      className="select-text"
                      value={weight[1]}
                      onChange={(e) => this.updateWeight(i, 1, e.target.value)}
                    >
                      {cardOptions.map((card) => (
                        <option key={`w-${card.key}`} value={card.value}>
                          {card.text}
                        </option>
                      ))}
                    </select>
                    <select
                      value={weight[2]}
                      onChange={(e) => this.updateWeight(i, 2, e.target.value)}
                      style={{
                        color: weight[2] === "h" || weight[2] === "d" ? "red" : "black",
                      }}
                    >
                      {suitOptions.map((suit, j) => (
                        <option
                          key={`w-${suit.key}-${i}-${j}`}
                          value={suit.value}
                          style={{ color: suit.color }}
                        >
                          {suit.text}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="weight">
                    <input
                      type="number"
                      min="0"
                      value={weight[3]}
                      onChange={(e) => this.updateWeight(i, 3, e.target.valueAsNumber)}
                    />
                  </div>
                  <div className="remove">
                    <button
                      style={{
                        borderRadius: "200px",
                        padding: 0,
                        paddingBottom: "2px",
                        width: "28px",
                      }}
                      onClick={() => this.removeWeight(i)}
                    >
                      -
                    </button>
                  </div>
                </div>
              ))}

              <div className="constraints-line lastLine">
                <button onClick={() => this.addWeight()}>Add constraint</button>
              </div>
            </div>
          </div>
          <div className="constraints-container" hidden={mode !== 3}>
            <h3>Constraints definition</h3>
            <div className="constraints">
              <div className="constraints-line firstLine">
                <div className="number">#</div>
                <div className="use">Use</div>
                <div className="selector">Selector</div>
                <div className="type">Constraint type</div>
                <div className="selector">Selector</div>
                <div className="remove">Suppr.</div>
              </div>
              {constraints.map((constraint, i) => (
                <div className="constraints-line midLine" key={`key-${i}`}>
                  <div className="number">#{i + 1}</div>
                  <div className="use">
                    <input
                      type="checkbox"
                      checked={constraint[0]}
                      onChange={(e) => this.updateConstraint(i, 0, e.target.checked)}
                    />
                  </div>
                  <div className="selector">
                    <select
                      className="select-text"
                      value={constraint[1]}
                      onChange={(e) => this.updateConstraint(i, 1, e.target.value)}
                    >
                      {cardOptions.map((card, j) => (
                        <option key={`${card.key}-${i}-${j}`} value={card.value}>
                          {card.text}
                        </option>
                      ))}
                    </select>
                    <select
                      value={constraint[2]}
                      onChange={(e) => this.updateConstraint(i, 2, e.target.value)}
                      style={{
                        color: constraint[2] === "h" || constraint[2] === "d" ? "red" : "black",
                      }}
                    >
                      {suitOptions.map((suit, j) => (
                        <option
                          key={`${suit.key}-${i}-${j}`}
                          value={suit.value}
                          style={{ color: suit.color }}
                        >
                          {suit.text}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="type">
                    <select
                      value={constraint[3]}
                      onChange={(e) => this.updateConstraint(i, 3, e.target.value)}
                    >
                      {typesOptions.map((type) => (
                        <option key={type.key} value={type.value}>
                          {type.text}
                        </option>
                      ))}
                    </select>
                  </div>
                  {constraint[3] !== "no-at" && constraint[3] !== "prefers-at" ? (
                    <div className="selector">
                      <select
                        className="select-text"
                        value={constraint[4]}
                        onChange={(e) => this.updateConstraint(i, 4, e.target.value)}
                      >
                        {cardOptions.map((card, j) => (
                          <option key={`2-${card.key}-${i}-${j}`} value={card.value}>
                            {card.text}
                          </option>
                        ))}
                      </select>
                      <select
                        value={constraint[5]}
                        onChange={(e) => this.updateConstraint(i, 5, e.target.value)}
                        style={{
                          color: constraint[5] === "h" || constraint[5] === "d" ? "red" : "black",
                        }}
                      >
                        {suitOptions.map((suit, j) => (
                          <option
                            key={`2-${suit.key}-${i}-${j}`}
                            value={suit.value}
                            style={{ color: suit.color }}
                          >
                            {suit.text}
                          </option>
                        ))}
                      </select>
                    </div>
                  ) : (
                    <div className="selector">
                      <select
                        value={constraint[6]}
                        onChange={(e) => this.updateConstraint(i, 6, e.target.value)}
                      >
                        {positionOptions.map((pos) => (
                          <option key={pos.key} value={pos.value}>
                            {pos.text}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                  <div className="remove">
                    <button
                      style={{
                        borderRadius: "200px",
                        padding: 0,
                        paddingBottom: "2px",
                        width: "28px",
                      }}
                      onClick={() => this.removeConstraint(i)}
                    >
                      -
                    </button>
                  </div>
                </div>
              ))}

              <div className="constraints-line lastLine">
                <button onClick={() => this.addConstraint()}>Add constraint</button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default ContentDistribution;
