import _ from "lodash";

function pickOne(array) {
  let index = 0;
  let selector = Math.random();
  while (selector > 0) {
    selector -= array[index].distribution;
    index++;
  }
  // Because the selector was decremented before key was
  // incremented we need to decrement the key to get the
  // element that actually exited the loop.
  index--;

  return index;
}

export class WFC {
  constructor(n, tiles) {
    this.n = n;
    // timeline array is gonna contain the final choices for each slot
    this.timeline = new Array(n);
    this.entropies = new Array(n);

    this.tiles = new Array(tiles.length);
    this.n_tiles = tiles.length;
    for (let i = 0; i < tiles.length; i++) {
      const tile = tiles[i];
      this.tiles[i] = {
        id: tile.id,
        cid: tile.cid,
        label: tile.label,
        color: tile.color,
        weights: new Array(n).fill(1),
      };
    }

    // wave contains all the possibilities for each slot
    this.wave = new Array(n);
    this.wavefront = new Array(n).fill(false);
    this.wave_save = new Array(n);

    this.constraints_propagator = [
      new Array(this.n_tiles).fill(new Array(this.n_tiles).fill(true)),
      new Array(this.n_tiles).fill(new Array(this.n_tiles).fill(true)),
    ];
    this.preferences_propagator = [];

    this.ready = false;

    this.DEBUG_LOGS = false;
  }

  init() {
    this.setupWave();
    //console.log(this.wave);
  }

  getWave() {
    return this.wave;
  }

  getTimeline() {
    return this.timeline;
  }

  reset() {
    this.setupWave();
    this.timeline = new Array(this.n);
  }

  resetConstraints() {
    this.constraints_propagator = [
      new Array(this.n_tiles).fill(new Array(this.n_tiles).fill(true)),
      new Array(this.n_tiles).fill(new Array(this.n_tiles).fill(true)),
    ];
  }

  setupWave() {
    this.wave = new Array(this.n);
    this.wavefront = new Array(this.n).fill(false);

    for (let i = 0; i < this.n; i++) {
      this.wave[i] = [];

      for (let j = 0; j < this.tiles.length; j++) {
        if (this.tiles[j].weights[i] > 0) {
          this.wave[i].push({
            id: this.tiles[j].id,
            cid: this.tiles[j].cid,
            label: this.tiles[j].label,
            color: this.tiles[j].color,
            weights: this.tiles[j].weights[i],
            distribution: 0,
          });
        }
      }
    }
  }

  setupPropagators() {
    this.constraints_propagator = [
      new Array(this.n_tiles).fill(new Array(this.n_tiles).fill(true)),
      new Array(this.n_tiles).fill(new Array(this.n_tiles).fill(true)),
    ];

    /* this.preferences_propagator = [
      new Array(this.n).fill(new Array(this.n_tiles).fill(0)),
      new Array(this.n).fill(new Array(this.n_tiles).fill(0)),
    ]; */

    /* Object.values(this.tiles).forEach((tile, i) => {
      tile.constraints.forEach((constraint) => {
        this.constraints_propagator[constraint[0]][tile.id][
          constraint[1]
        ] = false;
        this.constraints_propagator[(constraint[0] + 1) % 2][constraint[1]][
          tile.id
        ] = false;
      });
    }); */
  }

  applyConstraint(entryIdList, constraintType, exitIdList) {
    for (let i = 0; i < entryIdList.length; i++) {
      for (let j = 0; j < exitIdList.length; j++) {
        this.addConstraint(entryIdList[i], constraintType, exitIdList[j]);
      }
    }
  }

  addConstraint(entryTileId, constraintType, exitTileId) {
    this.constraints_propagator[constraintType][entryTileId][
      exitTileId
    ] = false;
    this.constraints_propagator[(constraintType + 1) % 2][exitTileId][
      entryTileId
    ] = false;
  }

  resetWeights() {
    for (let i = 0; i < this.tiles.length; i++) {
      this.tiles[i].weights = new Array(this.n).fill(1);
    }
  }

  applyWeight(tileIdxList, spotIdxList, value) {
    for (let i = 0; i < tileIdxList.length; i++) {
      this.tiles[tileIdxList[i]].weights[spotIdxList[0]] = value;
    }
  }

  /* addConstraint2(tileId, constraint) {
    this.constraints_propagator[constraint[0]][tileId][constraint[1]] = false;
    this.constraints_propagator[(constraint[0] + 1) % 2][constraint[1]][
      tileId
    ] = false;
  } 
  removeConstraint(tileId, constraint) {
    this.constraints_propagator[constraint[0]][tileId][constraint[1]] = true;
    this.constraints_propagator[(constraint[0] + 1) % 2][constraint[1]][
      tileId
    ] = true;
  }*/

  computeEntropy() {
    for (let i = 0; i < this.n; i++) {
      if (this.wavefront[i]) {
        this.entropies[i] = 100000000;
        continue;
      }
      const spot = this.wave[i];
      let one = 0;
      for (let j = 0; j < spot.length; j++) {
        one += spot[j].weights;
      }
      let S = 0;
      for (let j = 0; j < spot.length; j++) {
        const pj = spot[j].weights / one;
        spot[j].distribution = pj;
        if (pj !== 0) {
          S -= pj * Math.log(pj);
        }
      }
      this.entropies[i] = _.round(S, 5);
    }
  }

  observe() {
    let min = Number.MAX_VALUE,
      min_index = -1;
    let indexes = [];

    for (let i = 0; i < this.n; i++) {
      if (this.wavefront[i]) {
        continue;
      }

      const value = this.entropies[i];
      if (value < min) {
        min = value;
        min_index = 0;
        indexes = [i];
      } else if (value === min) {
        indexes.push(i);
      }
    }

    if (min_index === -1) {
      throw console.error("ENTROPIES WRONGLY COMPUTED");
    }

    return indexes[_.random(indexes.length - 1)];
  }

  isDone() {
    let done = true;
    for (let i = 0; i < this.n; i++) {
      if (!this.wavefront[i]) {
        done = false;
        break;
      }
    }
    return done;
  }

  propagate(index, idx) {
    //this.wave[index]
    //console.log(this.constraints_propagator);
    //console.log(index);
    //console.log(idx);
    this.timeline[index] = this.wave[index][idx];

    const id = this.wave[index][idx].id;
    this.wave[index] = this.wave[index][idx];
    this.wavefront[index] = true;
    //console.log(this.wave);
    let k = 0;
    // propagate for the place wave[index] where the tile[id] is picked
    // propagate for the left side
    if (index > 0 && this.wavefront[index - 1] === false) {
      const arr_bool = this.constraints_propagator[0][id];
      _.remove(this.wave[index - 1], function (obj) {
        if (!arr_bool[obj.id]) {
          k += 1;
          return true;
        }
        return false;
      });
    }

    if (index < this.n - 1 && this.wavefront[index + 1] === false) {
      const arr_bool = this.constraints_propagator[1][id];
      // console.log(id);
      // console.log(this.constraints_propagator[1][id]);
      _.remove(this.wave[index + 1], function (obj) {
        if (!arr_bool[obj.id]) {
          k += 1;
          return true;
        }
        return false;
      });
    }

    return k;
  }

  step() {
    this.computeEntropy();
    const obs = this.observe();
    const pick = pickOne(this.wave[obs]);
    const prop = this.propagate(obs, pick);

    if (this.DEBUG_LOGS) {
      console.log(
        `The tile ${pick} was placed at the spot ${obs}, ${prop} elements were removed from a potential spot during propagation`
      );
    }
  }

  run() {
    while (!this.isDone()) {
      this.step();
    }
  }

  slowRun(interval) {
    while (!this.isDone()) {
      setTimeout(this.step(), interval);
    }
  }
}

export class FullDeck {
  constructor(n, tiles) {
    this.n = n;
    this.timeline = new Array(n);
    this.deck = [...tiles];
    this.DEBUG_LOGS = false;
  }

  getTimeline() {
    return this.timeline;
  }

  run() {
    for (let i = 0; i < this.n; i++) {
      const idx = _.random(this.deck.length - 1);
      this.timeline[i] = this.deck[idx];
    }
  }
}

export class NormalDeck {
  constructor(n, tiles) {
    this.n = n;
    this.timeline = new Array(n);
    this.deck = [...tiles];
    this.deck_save = [...tiles];
    this.DEBUG_LOGS = false;
  }

  reset() {
    this.deck = [...this.deck_save];
  }

  getTimeline() {
    return this.timeline;
  }

  run() {
    for (let i = 0; i < this.n; i++) {
      const idx = _.random(this.deck.length - 1);
      this.timeline[i] = this.deck[idx];
      _.pullAt(this.deck, [idx]);
    }
  }
}
