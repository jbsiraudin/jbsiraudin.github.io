import React, { useState, useRef, useEffect } from "react";
import _ from "lodash";
import update from "immutability-helper";
import { Network, DataSet } from "vis-network/standalone";
import useThemeContext from "@theme/hooks/useThemeContext";

const defaultText = {
  actors: "entity",
  actions: "does something",
  subjects: "entity",
  effects: "does something"
};
// https://www.npmjs.com/package/vis-network

const olive = "#42af7e";
const teal = "#39c7cc";
const orange = "#ff851b";
const red = "#ff4136";

const options = (isDarkTheme) => {
  return {
    physics: {
      solver: "barnesHut"
    },
    interaction: {
      dragView: true,
      zoomView: true,
      selectable: false
    },
    edges: {
      width: 5,
      arrows: {
        to: {
          enabled: true
        }
      },
      color: {
        color: olive,
        highlight: "#848484",
        hover: "#848484",
        inherit: "from",
        opacity: 1.0
      },
      font: {
        color: isDarkTheme ? "white" : "black",
        strokeWidth: 0
      }
    },
    nodes: {
      borderWidth: 0,
      borderWidthSelected: 0,
      color: {
        border: "#2B7CE9",
        background: "#97C2FC",
        highlight: {
          border: "#2B7CE9",
          background: "#D2E5FF"
        },
        hover: {
          border: "#2B7CE9",
          background: "#D2E5FF"
        }
      },
      shape: "dot",
      size: 15,
      font: {
        color: isDarkTheme ? "white" : "black"
      }
    }
  };
};

const labels = ["actor", "action", "subject", "effect"];

function Rules() {
  const { isDarkTheme, setLightTheme, setDarkTheme } = useThemeContext();
  const networkContainerRef = useRef(null);
  const networkRef = useRef(null);

  const [ingredients, setIngredients] = useState({
    actors: ["player1", "player2", "player3", "player4", "an enemy"],
    actions: [
      "jumps",
      "shoots",
      "touches a wall",
      "picks up an item",
      "bumps in another player",
      "kills an enemy",
      "pushes a block",
      "pulls a lever",
      "crouches"
    ],
    subjects: ["player1", "player2", "player3", "player4", "an enemy", "a plant", "a door"],
    effects: [
      "jumps",
      "shoots",
      "is killed",
      "drops an item",
      "burns",
      "is stuck on the floor",
      "becomes invisible",
      "dashes forward",
      "freezes",
      "is struck by lightning"
    ]
  });
  const [rules, setRules] = useState([]);

  function addIngredient(ingredient) {
    setIngredients(
      update(ingredients, {
        [ingredient]: { $push: [defaultText[ingredient]] }
      })
    );
  }

  function removeIngredient(ingredient, i) {
    setIngredients(update(ingredients, { [ingredient]: { $splice: [[i, 1]] } }));
    reset();
  }

  function updateIngredient(ingredient, i, value) {
    setIngredients(update(ingredients, { [ingredient]: { [i]: { $set: value } } }));
  }

  function reset() {
    setRules([]);
  }

  function gen() {
    setRules(
      update(rules, {
        $push: [
          [
            _.random(0, ingredients.actors.length - 1, false),
            _.random(0, ingredients.actions.length - 1, false),
            _.random(0, ingredients.subjects.length - 1, false),
            _.random(0, ingredients.effects.length - 1, false)
          ]
        ]
      })
    );
  }

  useEffect(() => {
    const nodes = new DataSet([
      { id: 1, label: "actor" },
      { id: 2, label: "subject" }
    ]);

    // create an array with edges
    const edges = new DataSet([{ from: 1, to: 2 }]);

    const data = {
      nodes: nodes,
      edges: edges
    };

    networkRef.current = new Network(networkContainerRef.current, data, options(isDarkTheme));
  }, []);

  useEffect(() => {
    networkRef.current.setOptions(options(isDarkTheme));
  }, [isDarkTheme]);

  useEffect(() => {
    const nodes = new DataSet();
    const edges = new DataSet();
    const nodesObject = {};

    for (let i = 0; i < ingredients.actors.length; i++) {
      const actor = ingredients.actors[i];
      if (!Object.keys(nodesObject).includes(actor)) {
        nodesObject[actor] = {
          actorIndex: i,
          subjectIndex: null
        };
      }
    }

    for (let i = 0; i < ingredients.subjects.length; i++) {
      const subject = ingredients.subjects[i];
      if (!Object.keys(nodesObject).includes(subject)) {
        nodesObject[subject] = {
          actorIndex: null,
          subjectIndex: i
        };
      } else {
        nodesObject[subject].subjectIndex = i;
      }
    }

    for (let i = 0; i < Object.keys(nodesObject).length; i++) {
      const [key, value] = Object.entries(nodesObject)[i];

      if (value.actorIndex !== null && value.subjectIndex === null) {
        nodes.add({
          id: key,
          label: key,
          color: { border: red, background: "transparent" },
          borderWidth: 8,
          borderWidthSelected: 8
        });
      } else if (value.actorIndex !== null && value.subjectIndex === null) {
        nodes.add({
          id: key,
          label: key,
          color: { background: orange }
        });
      } else {
        nodes.add({
          id: key,
          label: key,
          color: { border: red, background: orange },
          borderWidth: 8,
          borderWidthSelected: 8
        });
      }
    }

    rules.forEach((rule, i) => {
      edges.add({
        from: ingredients.actors[rule[0]],
        to: ingredients.subjects[rule[2]],
        label: `Rule ${i + 1}`
      });
    });

    const data = {
      nodes: nodes,
      edges: edges
    };

    networkRef.current.setData(data);
  }, [rules, ingredients]);

  return (
    <div className="rules-app">
      <div className="app-header">
        <h2>Rules game system</h2>
        <p>Player finds scrolls during his/her exploration of the level.</p>
        <p>Each scroll is a new rule procedurally built from the rule ingredients specified.</p>
        <p>Exploration in the game becomes also an exploration of the rules of the game.</p>
        <p>It provides gameplay variety between each run.</p>
        <p>Half of the game is learning what you or others do.</p>
      </div>

      <div className="buttons">
        <button className="reset" onClick={reset}>
          <span>RESET</span>
        </button>
        <button className="make" onClick={gen}>
          <span>MAKE NEW RULE</span>
        </button>
      </div>

      <div className="rules-container">
        {rules.length === 0 ? (
          <h3>
            When{" "}
            <span className="actor-colored">
              <em>actor</em>
            </span>{" "}
            does{" "}
            <span className="action-colored">
              <em>action</em>
            </span>
            ,{" "}
            <span className="subject-colored">
              <em>subject</em>
            </span>{" "}
            undergoes{" "}
            <span className="effect-colored">
              <em>effect</em>
            </span>
            .
          </h3>
        ) : (
          <div className="rules">
            {rules
              .map((rule, i) => (
                <h3 key={`rule-${i}`}>
                  #{i + 1} - When{" "}
                  <span className="actor-colored">
                    <em>{ingredients.actors[rule[0]]}</em>
                  </span>{" "}
                  <span className="action-colored">
                    <em>{ingredients.actions[rule[1]]}</em>
                  </span>
                  ,{" "}
                  <span className="subject-colored">
                    <em>{ingredients.subjects[rule[2]]}</em>
                  </span>{" "}
                  <span className="effect-colored">
                    <em>{ingredients.effects[rule[3]]}</em>
                  </span>
                  .
                </h3>
              ))
              .reverse()}
          </div>
        )}
      </div>

      <div className="network-container" ref={networkContainerRef}></div>

      <div className="choices-container">
        <h3>Sentences ingredients</h3>
        <div className="choices">
          {Object.keys(ingredients).map((ingredient, i) => (
            <div className="choice" key={`ingredient-${i}`}>
              <div className="firstLine">{_.capitalize(ingredient)}</div>
              <div className="choice-line">
                {ingredients[ingredient].map((item, j) => (
                  <div className="definition" key={`ingredient-${ingredient}-${j}`}>
                    <div className="text">
                      <input
                        type="text"
                        placeholder="Normal text"
                        value={item}
                        onChange={(e) => updateIngredient(ingredient, j, e.target.value)}
                      />
                    </div>
                    <div className="remove">
                      <button
                        className="outline-danger"
                        style={{
                          borderRadius: "200px",
                          padding: 0,
                          paddingBottom: "2px",
                          width: "28px"
                        }}
                        onClick={() => removeIngredient(ingredient, j)}
                      >
                        -
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="lastLine">
                <button className="outline-success" onClick={() => addIngredient(ingredient)}>
                  Add {labels[i]}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Rules;
