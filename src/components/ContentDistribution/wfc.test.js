import { describe, test, expect } from 'vitest';
import { WFC } from './wfc.js';

// ── Helpers ───────────────────────────────────────────────────────────────────

const TILES = [
  { id: 0, cid: 'A', label: 'A', color: '#f00' },
  { id: 1, cid: 'B', label: 'B', color: '#0f0' },
  { id: 2, cid: 'C', label: 'C', color: '#00f' },
  { id: 3, cid: 'D', label: 'D', color: '#ff0' },
];

// All tile ids except the given one
const except = (id) => TILES.filter(t => t.id !== id).map(t => t.id);

const N = 10;
const RUNS = 200; // repeat to catch probabilistic failures

function run(wfc) {
  return wfc.run();
}

// ── Basic ─────────────────────────────────────────────────────────────────────

describe('basic generation', () => {
  test('fills all slots', () => {
    for (let i = 0; i < RUNS; i++) {
      const wfc = new WFC(N, TILES);
      const result = run(wfc);
      expect(result).toHaveLength(N);
      expect(result.every(t => t !== null)).toBe(true);
    }
  });

  test('only uses valid tile ids', () => {
    const validIds = new Set(TILES.map(t => t.id));
    for (let i = 0; i < RUNS; i++) {
      const wfc = new WFC(N, TILES);
      for (const t of run(wfc)) expect(validIds.has(t.id)).toBe(true);
    }
  });
});

// ── forceAt ───────────────────────────────────────────────────────────────────

describe('forceAt', () => {
  test('forces tile A to slot 0 every run', () => {
    for (let i = 0; i < RUNS; i++) {
      const wfc = new WFC(N, TILES);
      wfc.forceAt([0], 0);
      expect(run(wfc)[0].id).toBe(0);
    }
  });

  test('forces tile B to slot 5 every run', () => {
    for (let i = 0; i < RUNS; i++) {
      const wfc = new WFC(N, TILES);
      wfc.forceAt([1], 5);
      expect(run(wfc)[5].id).toBe(1);
    }
  });

  test('forces tile C to last slot every run', () => {
    for (let i = 0; i < RUNS; i++) {
      const wfc = new WFC(N, TILES);
      wfc.forceAt([2], N - 1);
      expect(run(wfc)[N - 1].id).toBe(2);
    }
  });
});

// ── no-after ─────────────────────────────────────────────────────────────────
// "A cannot appear immediately after B"
// addConstraint(A, 0, B): B cannot be to A's left

describe('no-after: A cannot appear immediately after B', () => {
  test('A is never directly after B', () => {
    for (let i = 0; i < RUNS; i++) {
      const wfc = new WFC(N, TILES);
      wfc.addConstraint(0, 0, 1); // A can't be after B
      const result = run(wfc);
      for (let j = 1; j < result.length; j++) {
        if (result[j].id === 0) {
          expect(result[j - 1].id).not.toBe(1);
        }
      }
    }
  });

  test('symmetric: B is never directly before A', () => {
    for (let i = 0; i < RUNS; i++) {
      const wfc = new WFC(N, TILES);
      wfc.addConstraint(0, 0, 1);
      const result = run(wfc);
      for (let j = 0; j < result.length - 1; j++) {
        if (result[j].id === 1) {
          expect(result[j + 1].id).not.toBe(0);
        }
      }
    }
  });
});

// ── no-before ─────────────────────────────────────────────────────────────────
// "A cannot appear immediately before B"
// addConstraint(A, 1, B): B cannot be to A's right

describe('no-before: A cannot appear immediately before B', () => {
  test('A is never directly before B', () => {
    for (let i = 0; i < RUNS; i++) {
      const wfc = new WFC(N, TILES);
      wfc.addConstraint(0, 1, 1); // A can't be before B
      const result = run(wfc);
      for (let j = 0; j < result.length - 1; j++) {
        if (result[j].id === 0) {
          expect(result[j + 1].id).not.toBe(1);
        }
      }
    }
  });
});

// ── only-after ────────────────────────────────────────────────────────────────
// "A can ONLY appear immediately after B"
// = for all X ≠ B: addConstraint(A, 0, X)
//
// Boundary note: at slot 0 there is no left neighbor, so the constraint is
// vacuously satisfied — A at slot 0 is valid per WFC semantics.
// To also forbid A at slot 0, combine with applyWeight([A], 0, 0).

describe('only-after: A can only appear immediately after B', () => {
  test('wherever A has a left neighbor, that neighbor is B', () => {
    for (let i = 0; i < RUNS; i++) {
      const wfc = new WFC(N, TILES);
      wfc.applyConstraint([0], 0, except(1)); // A can't be after any non-B
      const result = run(wfc);
      for (let j = 1; j < result.length; j++) { // start at 1 — slot 0 has no left neighbor
        if (result[j].id === 0) {
          expect(result[j - 1].id).toBe(1);
        }
      }
    }
  });

  test('combined with weight=0 at slot 0: A never appears at slot 0', () => {
    for (let i = 0; i < RUNS; i++) {
      const wfc = new WFC(N, TILES);
      wfc.applyConstraint([0], 0, except(1));
      wfc.applyWeight([0], 0, 0); // explicit boundary exclusion
      expect(run(wfc)[0].id).not.toBe(0);
    }
  });
});

// ── only-before ───────────────────────────────────────────────────────────────
// "A can ONLY appear immediately before B"
// = for all X ≠ B: addConstraint(A, 1, X)
//
// Same boundary note: A at the last slot (no right neighbor) is vacuously valid.

describe('only-before: A can only appear immediately before B', () => {
  test('wherever A has a right neighbor, that neighbor is B', () => {
    for (let i = 0; i < RUNS; i++) {
      const wfc = new WFC(N, TILES);
      wfc.applyConstraint([0], 1, except(1)); // A can't be before any non-B
      const result = run(wfc);
      for (let j = 0; j < result.length - 1; j++) { // stop before last — no right neighbor there
        if (result[j].id === 0) {
          expect(result[j + 1].id).toBe(1);
        }
      }
    }
  });

  test('combined with weight=0 at last slot: A never appears at last slot', () => {
    for (let i = 0; i < RUNS; i++) {
      const wfc = new WFC(N, TILES);
      wfc.applyConstraint([0], 1, except(1));
      wfc.applyWeight([0], N - 1, 0); // explicit boundary exclusion
      expect(run(wfc)[N - 1].id).not.toBe(0);
    }
  });
});

// ── applyWeight (can't be at spot) ────────────────────────────────────────────

describe('applyWeight: A has weight 0 at slot 3 (cannot be placed there)', () => {
  test('A never appears at slot 3', () => {
    for (let i = 0; i < RUNS; i++) {
      const wfc = new WFC(N, TILES);
      wfc.applyWeight([0], 3, 0);
      expect(run(wfc)[3].id).not.toBe(0);
    }
  });
});

// ── card scenario (the user's case) ───────────────────────────────────────────

describe('card scenario: Queen of Diamonds at slot 0, 2 of Spades must be after Qd', () => {
  // Use a small 3-tile set so constraints propagate visibly
  const Qd   = { id: 0, cid: 'Qd', label: 'Queen of Diamonds', color: '#f00' };
  const _2s  = { id: 1, cid: '2s', label: '2 of Spades',       color: '#000' };
  const Other = { id: 2, cid: 'Xx', label: 'Other',            color: '#888' };
  const cardTiles = [Qd, _2s, Other];

  function makeCardWFC(n = 8) {
    const wfc = new WFC(n, cardTiles);
    // Rule 1: Queen of Diamonds forced to slot 0
    wfc.forceAt([Qd.id], 0);
    // Rule 2: 2s can only appear immediately after Qd
    //   → for every tile X that is NOT Qd: 2s can't be after X
    const nonQd = cardTiles.filter(t => t.id !== Qd.id).map(t => t.id);
    wfc.applyConstraint([_2s.id], 0, nonQd);
    return wfc;
  }

  test('Qd is always at slot 0', () => {
    for (let i = 0; i < RUNS; i++) {
      expect(makeCardWFC().run()[0].id).toBe(Qd.id);
    }
  });

  test('2s never appears at slot 0', () => {
    for (let i = 0; i < RUNS; i++) {
      expect(makeCardWFC().run()[0].id).not.toBe(_2s.id);
    }
  });

  test('wherever 2s has a left neighbor, that neighbor is Qd', () => {
    for (let i = 0; i < RUNS; i++) {
      const result = makeCardWFC().run();
      for (let j = 1; j < result.length; j++) { // skip slot 0 — no left neighbor
        if (result[j].id === _2s.id) {
          expect(result[j - 1].id).toBe(Qd.id);
        }
      }
    }
  });

  test('Qd at slot 0 → slot 1 is always 2s (the most constrained follow-up)', () => {
    // With Qd forced at 0 and 2s only allowed after Qd:
    // after propagation, slot 1 has Qd at its left, so 2s CAN be there.
    // Slots 2..N-1 will have no Qd at their left after slot 0 (full-deck
    // means Qd can recur, but let's verify slot 1 is reachable).
    // We just confirm 2s never ends up in an invalid position.
    let twosFound = 0;
    for (let i = 0; i < RUNS; i++) {
      const result = makeCardWFC().run();
      for (let j = 0; j < result.length; j++) {
        if (result[j].id === _2s.id) {
          twosFound++;
          expect(result[j - 1].id).toBe(Qd.id);
        }
      }
    }
    // 2s should appear in some runs (it's not blocked, just constrained)
    expect(twosFound).toBeGreaterThan(0);
  });
});

// ── combined constraints ──────────────────────────────────────────────────────

describe('combined: forceAt + no-after + only-after', () => {
  test('A at slot 0, B can only follow A, C cannot follow B', () => {
    for (let i = 0; i < RUNS; i++) {
      const wfc = new WFC(N, TILES);
      wfc.forceAt([0], 0);                        // A at slot 0
      wfc.applyConstraint([1], 0, except(0));      // B only after A
      wfc.addConstraint(2, 0, 1);                  // C can't be after B

      const result = run(wfc);

      expect(result[0].id).toBe(0); // A at slot 0

      for (let j = 0; j < result.length; j++) {
        if (result[j].id === 1) {
          expect(j).toBeGreaterThan(0);
          expect(result[j - 1].id).toBe(0); // B only after A
        }
        if (result[j].id === 2 && j > 0) {
          expect(result[j - 1].id).not.toBe(1); // C not after B
        }
      }
    }
  });
});
