/**
 * Standalone 1D Wave Function Collapse
 * No external dependencies.
 *
 * Constraint semantics:
 *   constraints[0][A][B] = true  → B is allowed immediately to the LEFT of A
 *   constraints[1][A][B] = true  → B is allowed immediately to the RIGHT of A
 *
 * addConstraint(entryId, 0, exitId)  → "entry cannot appear immediately after exit"
 * addConstraint(entryId, 1, exitId)  → "entry cannot appear immediately before exit"
 */

function pickWeighted(options) {
  const total = options.reduce((s, o) => s + o.weight, 0);
  let r = Math.random() * total;
  for (const o of options) {
    r -= o.weight;
    if (r <= 0) return o;
  }
  return options[options.length - 1];
}

function shannonEntropy(options) {
  const total = options.reduce((s, o) => s + o.weight, 0);
  let S = 0;
  for (const o of options) {
    const p = o.weight / total;
    if (p > 0) S -= p * Math.log(p);
  }
  return Math.round(S * 1e5) / 1e5;
}

export class WFC {
  /**
   * @param {number} n - number of slots
   * @param {Array<{id: number, cid: string, label: string, color: string}>} tiles
   */
  constructor(n, tiles) {
    this.n = n;
    this.n_tiles = tiles.length;

    this.tiles = tiles.map(t => ({
      id: t.id,
      cid: t.cid,
      label: t.label,
      color: t.color,
      weights: new Array(n).fill(1),
    }));

    this._resetConstraints();
  }

  // ── Constraint setup ───────────────────────────────────────────────────────

  _resetConstraints() {
    this.constraints = [
      Array.from({ length: this.n_tiles }, () => new Array(this.n_tiles).fill(true)),
      Array.from({ length: this.n_tiles }, () => new Array(this.n_tiles).fill(true)),
    ];
  }

  resetConstraints() {
    this._resetConstraints();
  }

  resetWeights() {
    for (const t of this.tiles) t.weights = new Array(this.n).fill(1);
  }

  /**
   * Forbid entry from appearing immediately after/before exit.
   * type=0: "entry can't be after exit" (exit can't be to entry's left)
   * type=1: "entry can't be before exit" (exit can't be to entry's right)
   */
  addConstraint(entryId, type, exitId) {
    this.constraints[type][entryId][exitId] = false;
    this.constraints[(type + 1) % 2][exitId][entryId] = false;
  }

  applyConstraint(entryIds, type, exitIds) {
    for (const e of entryIds)
      for (const x of exitIds)
        this.addConstraint(e, type, x);
  }

  /**
   * Force specific tile(s) to a slot by zeroing all other tiles' weight there.
   * Guaranteed placement — no randomness at that slot.
   */
  forceAt(tileIds, spotIdx) {
    for (let i = 0; i < this.tiles.length; i++) {
      this.tiles[i].weights[spotIdx] = tileIds.includes(i) ? 1 : 0;
    }
  }

  applyWeight(tileIds, spotIdx, value) {
    for (const id of tileIds) this.tiles[id].weights[spotIdx] = value;
  }

  // ── Wave setup ─────────────────────────────────────────────────────────────

  _setupWave() {
    this.wave = Array.from({ length: this.n }, (_, i) =>
      this.tiles
        .filter(t => t.weights[i] > 0)
        .map(t => ({ id: t.id, cid: t.cid, label: t.label, color: t.color, weight: t.weights[i] }))
    );
    this.collapsed = new Array(this.n).fill(false);
    this.timeline = new Array(this.n).fill(null);
  }

  // ── Core algorithm ─────────────────────────────────────────────────────────

  _pickLowestEntropy() {
    let min = Infinity, candidates = [];
    for (let i = 0; i < this.n; i++) {
      if (this.collapsed[i]) continue;
      const e = shannonEntropy(this.wave[i]);
      if (e < min) { min = e; candidates = [i]; }
      else if (e === min) candidates.push(i);
    }
    return candidates[Math.floor(Math.random() * candidates.length)];
  }

  /**
   * Queue-based propagation: after any cell's options change, cascade
   * the constraint filtering through all affected neighbors until stable.
   *
   * Single-step propagation (the old approach) would leave inconsistencies
   * across the board whenever constraints span non-adjacent slots.
   */
  _propagate(startIdx) {
    const queue = [startIdx];
    const inQueue = new Set([startIdx]);

    while (queue.length > 0) {
      const idx = queue.shift();
      inQueue.delete(idx);

      const here = this.wave[idx]; // options currently possible at idx

      // ── left neighbor (idx - 1) ────────────────────────────────────────────
      if (idx > 0 && !this.collapsed[idx - 1]) {
        const left = this.wave[idx - 1];
        const before = left.length;

        // Keep tile X at left only if ≥1 tile in `here` allows X to its left
        //   constraints[0][here_tile][X] = true  →  X is OK to the left of here_tile
        this.wave[idx - 1] = left.filter(x =>
          here.some(t => this.constraints[0][t.id][x.id])
        );

        if (this.wave[idx - 1].length < before && !inQueue.has(idx - 1)) {
          queue.push(idx - 1);
          inQueue.add(idx - 1);
        }
      }

      // ── right neighbor (idx + 1) ───────────────────────────────────────────
      if (idx < this.n - 1 && !this.collapsed[idx + 1]) {
        const right = this.wave[idx + 1];
        const before = right.length;

        // Keep tile X at right only if ≥1 tile in `here` allows X to its right
        //   constraints[1][here_tile][X] = true  →  X is OK to the right of here_tile
        this.wave[idx + 1] = right.filter(x =>
          here.some(t => this.constraints[1][t.id][x.id])
        );

        if (this.wave[idx + 1].length < before && !inQueue.has(idx + 1)) {
          queue.push(idx + 1);
          inQueue.add(idx + 1);
        }
      }
    }
  }

  _step() {
    const idx = this._pickLowestEntropy();
    const tile = pickWeighted(this.wave[idx]);
    this.wave[idx] = [tile];
    this.collapsed[idx] = true;
    this.timeline[idx] = tile;
    this._propagate(idx);
  }

  // ── Public API ─────────────────────────────────────────────────────────────

  init() {
    this._setupWave();
  }

  reset() {
    this._setupWave();
  }

  run() {
    this._setupWave();
    let iters = 0;
    const maxIters = this.n * this.n_tiles * 10;
    while (!this.collapsed.every(Boolean)) {
      if (++iters > maxIters) throw new Error('WFC: contradiction reached (no valid solution)');
      this._step();
    }
    return this.timeline;
  }

  getTimeline() {
    return this.timeline;
  }
}
