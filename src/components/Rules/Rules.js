import React, { useState } from "react";
import _ from "lodash";
import update from "immutability-helper";
import { Form, Button } from "react-bootstrap";
import "./Rules.scss";

const defaultText = {
  actors: "entity",
  actions: "does something",
  subjects: "entity",
  effects: "does something",
};

function Rules() {
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
      "crouches",
    ],
    subjects: [
      "player1",
      "player2",
      "player3",
      "player4",
      "an enemy",
      "a plant",
      "a door",
    ],
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
      "is struck by lightning",
    ],
  });
  const [rules, setRules] = useState([]);

  function addConstraint(ingredient) {
    setIngredients(
      update(ingredients, {
        [ingredient]: { $push: [defaultText[ingredient]] },
      })
    );
  }

  function removeConstraint(ingredient, i) {
    setIngredients(
      update(ingredients, { [ingredient]: { $splice: [[i, 1]] } })
    );
    reset();
  }

  function updateConstraint(ingredient, i, value) {
    setIngredients(
      update(ingredients, { [ingredient]: { [i]: { $set: value } } })
    );
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
            _.random(0, ingredients.effects.length - 1, false),
          ],
        ],
      })
    );
  }

  return (
    <div className="app-container">
      <div className="app-header">
        <h2>Rules game system</h2>
        <p>Player finds scrolls during his/her exploration of the level.</p>
        <p>
          Each scroll is a new rule procedurally built from the rule ingredients
          specified.
        </p>
        <p>
          Exploration in the game becomes also an exploration of the rules of
          the game.
        </p>
        <p>It provides gameplay variety between each run.</p>
        <p>Half of the game is learning what you or others do.</p>
      </div>

      <div className="buttons">
        <button className="reset" onClick={reset}>
          <span>RESET</span>
        </button>
        <button className="run" onClick={gen}>
          <span>MAKE NEW RULE</span>
        </button>
      </div>

      <div className="rules-container">
        {rules.length === 0 ? (
          <h3>
            When{" "}
            <span className="colored">
              <em>actor</em>
            </span>{" "}
            does{" "}
            <span className="b-colored">
              <em>action</em>
            </span>
            ,{" "}
            <span className="colored">
              <em>subject</em>
            </span>{" "}
            undergoes{" "}
            <span className="b-colored">
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
                  <span className="colored">
                    <em>{ingredients.actors[rule[0]]}</em>
                  </span>{" "}
                  <span className="b-colored">
                    <em>{ingredients.actions[rule[1]]}</em>
                  </span>
                  ,{" "}
                  <span className="colored">
                    <em>{ingredients.subjects[rule[2]]}</em>
                  </span>{" "}
                  <span className="b-colored">
                    <em>{ingredients.effects[rule[3]]}</em>
                  </span>
                  .
                </h3>
              ))
              .reverse()}
          </div>
        )}
      </div>

      <div className="choices-container">
        <h3>Sentences ingredients</h3>
        <div className="choices">
          {Object.keys(ingredients).map((ingredient, i) => (
            <div className="choice" key={`ingredient-${i}`}>
              <div className="firstLine">{_.capitalize(ingredient)}</div>
              <div className="choice-line">
                {ingredients[ingredient].map((item, j) => (
                  <div
                    className="definition"
                    key={`ingredient-${ingredient}-${j}`}
                  >
                    <div className="text">
                      <Form.Control
                        type="text"
                        placeholder="Normal text"
                        value={item}
                        onChange={(e) =>
                          updateConstraint(ingredient, j, e.target.value)
                        }
                      />
                    </div>
                    <div className="remove">
                      <Button
                        variant="outline-danger"
                        style={{
                          borderRadius: "200px",
                          padding: 0,
                          paddingBottom: "2px",
                          width: "28px",
                        }}
                        onClick={() => removeConstraint(ingredient, j)}
                      >
                        -
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="lastLine">
                <Button
                  variant="outline-success"
                  onClick={() => addConstraint(ingredient)}
                >
                  Add constraint
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Rules;
