# Storygine — Phase 1

**A timeline engine for generating the daily agendas of non-player characters using Wave Function Collapse.**

---

## What is Storygine?

Storygine is an engine for procedurally generating plausible daily schedules for entities in a simulation — primarily NPCs in a game, but the same system works for any entity that follows time-structured patterns: weather systems, economic cycles, animal behaviour, and so on.

The core idea is simple: a day is divided into 24 hourly slots, and each slot must be "collapsed" into a concrete event drawn from a defined library of story objects. The algorithm that performs this collapse is borrowed from Wave Function Collapse.

---

## Objectives

### What problem does Storygine solve?

Game worlds feel hollow when NPCs stand in place waiting for the player to interact with them. The alternative — hand-authoring a schedule for every character — does not scale. A village of thirty NPCs, each with a meaningful daily routine, would require hundreds of hand-tuned state machine rules or scripted sequences, and none of it would vary between playthroughs.

Storygine addresses this with a data-driven approach: a designer specifies *what kinds of things an entity does* and *when they tend to do them*, and the engine generates a concrete, coherent daily schedule from that specification. The designer writes story objects, not schedules. The variety comes from the algorithm.

More specifically, Storygine targets the following:

**Believable temporal rhythms.** A blacksmith who works in the morning, breaks for lunch, returns to the forge in the afternoon, and drinks at the tavern in the evening — not because that sequence is scripted, but because the weights and constraints make it the most probable outcome of the solver.

**Plausible variety without incoherence.** Two runs of the same NPC specification should produce different but equally believable days. One day the blacksmith visits the market before work; another day she skips it. Neither day should produce her going to the tavern at 8am or sleeping through lunch.

**Decoupled data and logic.** Adding a new NPC type, a new activity, or a new constraint should require only writing a story object — not modifying solver code. The engine is generic; the personality of an NPC lives entirely in its tile library.

**Generalisability beyond NPCs.** The same engine should work for any time-structured system. Weather patterns, economic cycles, animal activity, shop opening hours — anything that can be described as a sequence of named states with temporal preferences and adjacency rules is a valid input.

**Debuggability.** Procedural systems are notoriously hard to tune because their outputs are not deterministic. Storygine addresses this with a seeded solver (same seed = same day, always) and a companion analytics engine that measures the statistical behaviour of any tile set across hundreds of runs, making data problems visible before they appear in the game.

---

## Approach: Pros and Cons

### Advantages

**Expressive with minimal data.** A story object with 24 weight values and a short repeat curve already captures the full temporal personality of an activity. Complex daily rhythms emerge from the interaction of a handful of these objects, without any procedural code per NPC type.

**Locally coherent by construction.** Because WFC propagates constraints bidirectionally at each collapse step, adjacency rules are always respected. You cannot get a sequence that violates a constraint — the constraint matrix makes it structurally impossible, not just unlikely.

**Stochastic duration without duration fields.** The `repeatProbabilities` curve produces variable-length event blocks that feel natural rather than metronomic. Sleep runs 6–8 hours, not exactly 7, and the variation comes from the data, not from adding noise to a fixed value.

**Deterministic and auditable.** Seeded generation means any generated day can be reproduced exactly for debugging. The analytics engine means the statistical properties of any tile set can be measured quantitatively, not just eyeballed from sample outputs.

**No solver changes for new content.** New NPC archetypes, new activities, new settings — all are expressed as new tile libraries. The solver is generic. A medieval villager, a modern office worker, and a deep-sea fish follow different rhythms because their story objects differ, not because the engine knows about them.

**Composable with Phase 2.** The modifier system (Phase 2) injects world state as a weight perturbation before entropy computation — the same hook used by the repeat bias. No new solver primitives are needed to add weather influence or social effects.

### Limitations and Trade-offs

**No global narrative structure.** WFC is a local coherence algorithm. It guarantees that adjacent slots are compatible, but it has no concept of a narrative arc across the whole day. An NPC will not "save" an activity for the end of the day because it's dramatically appropriate — she will do it whenever the weights and entropy make it locally optimal. Days that require a guaranteed structure (a festival that must culminate at midnight, a shift pattern with a fixed end time) need explicit weight engineering or hard constraints to enforce it.

**Constraints are binary.** The constraint system expresses "A cannot follow B" but not "A should follow B with probability 0.7" or "A must follow B if B was preceded by C". Soft preferences are approximated through weight manipulation, not first-class constraints. This is intentional — a richer constraint language would increase data complexity significantly — but it is a real expressive limitation.

**Tuning requires analytics.** The interaction between `weights`, `repeatProbabilities`, and the bias multiplier is not immediately intuitive. Without the analytics engine, it is easy to write tile data that produces plausible-looking individual timelines but has pathological statistical properties at scale (one event dominating, another never appearing). The analytics suite is not optional — it is part of the authoring workflow.

**24-slot granularity is fixed.** The engine resolves one slot per hour. Activities that last minutes (a short conversation, a transaction) are not modelled at this granularity. Storygine describes *what an NPC is broadly doing each hour*, not a fine-grained action sequence. For minute-level behaviour, a different system (a behaviour tree, a state machine) is more appropriate and could be driven by Storygine's hourly outputs.

**Soft fallback on contradiction.** When constraint propagation empties a slot's candidate list, the solver restores the slot from its initial wave rather than backtracking. This means a rare but possible contradictory configuration will silently relax its constraints rather than failing or retrying. For the 24-slot single-timeline case this is acceptable; it may need revisiting when cross-timeline constraints are introduced in Phase 2.

---

## A Brief Introduction to Wave Function Collapse

Wave Function Collapse (WFC) is a constraint-satisfaction algorithm originally designed for procedural texture and level generation. The name comes from quantum mechanics, where a particle exists in a superposition of states and "collapses" to a single definite state when observed.

In WFC, you start with a grid where every cell is in a superposition — it could become any valid tile. The algorithm proceeds in three repeating steps:

**1. Compute entropy.** For each uncollapsed cell, calculate the Shannon entropy of its remaining possibilities weighted by their probabilities. A cell with many equally-likely options has high entropy; a cell with one dominant option has low entropy.

**2. Observe.** Select the uncollapsed cell with the lowest entropy — the most constrained cell. Sample one option from its weighted distribution. That cell is now collapsed.

**3. Propagate.** The collapsed cell's choice may eliminate options from neighbouring cells (a "grass" tile cannot be adjacent to a "deep water" tile, for example). Remove any now-invalid options from neighbours, which may in turn lower their entropy and trigger further propagation.

Repeat until all cells are collapsed.

The result is locally coherent — neighbours always respect each other's constraints — and statistically shaped by the weights you assign. The original paper by Maxim Gumin demonstrated this for 2D bitmap textures, but the algorithm generalises naturally to any constrained sequence problem, including one-dimensional timelines.

---

## Design

### The Story Object

The fundamental unit in Storygine is the **story object** — a named, configurable event that can occupy one or more slots in a timeline. Each story object carries:

**`_id`** — unique identifier, used in constraint references and analytics output.

**`title`, `description`, `color`** — descriptive and presentational metadata.

**`weights: number[24]`** — an array of 24 unnormalized floats, one per hour of the day. A weight of zero means the event cannot start at that hour; a weight of 10 means it is strongly preferred. These become the sampling probabilities during WFC entropy computation. A merchant's "Open Shop" event has high weights from 9am to 6pm and zero everywhere else. Sleep has high weights from 10pm to 6am.

**`repeatProbabilities: number[]`** — a decay curve that controls how likely an event is to persist into the next hour once it has already started. The index represents the current consecutive streak length: `repeatProbabilities[0]` is the probability of repeating after 1 hour, `repeatProbabilities[1]` after 2 consecutive hours, and so on. If the streak exceeds the array length, the last value applies. A value of `[0.90, 0.80, 0.60, 0.30]` produces events that tend to run 2–3 hours and then taper off. An empty array or `[0]` means the event never self-perpetuates.

**`constraints: [direction, id][]`** — a list of adjacency rules. Direction `0` means the referenced event cannot appear *after* this one; direction `1` means this event cannot appear *after* the referenced one. These are symmetric and are compiled into a bidirectional constraint propagator matrix at initialisation.

### Interaction Between `weights` and `repeatProbabilities`

The repeat probability is not applied in isolation. Before an event is allowed to repeat into the next hour, its probability is dampened by the spawn weight factor at that hour:

```
effectiveRepeatProb = repeatProbabilities[streak - 1] × (weight[hour] / maxWeight)
```

This means an event that has a high intrinsic persistence will still fade out naturally when the clock moves past its intended window. Sleep does not persist into the afternoon even if its repeat curve says `0.90`, because its weight at hour 14 is zero, making the effective repeat probability zero. This coupling between the two arrays is what gives story objects their temporal shape without requiring explicit duration fields.

### No Duration Field

An early design considered a `duration` field to specify how many hours an event lasts. This was dropped in favour of the `repeatProbabilities` curve. Duration propagation requires resolving slots sequentially and locking forward slots, which conflicts with WFC's non-sequential collapse order (lowest entropy first). The repeat curve achieves stochastic duration naturally: a high decay curve produces long runs, a steep drop-off produces short ones, and the result is more varied and believable than a hard duration.

---

## Technical Design

### The Timeline Class

`Timeline` is the core solver class. It is instantiated with a size `n` (24 for a day) and an array of story objects.

**Initialisation** sets up two data structures:

- `wave[n]` — each slot starts as an array of all possible events, each carrying its weight for that hour and a computed distribution value. A deep copy `wave_save` is kept for contradiction recovery.
- `constraints_propagator[2][id][id]` — a bidirectional boolean matrix. `propagator[0][A][B]` is `false` if B cannot appear to the left of A; `propagator[1][A][B]` is `false` if B cannot appear to the right of A. Built once from each event's `constraints` array.

**The repeat bias** is injected into entropy computation before each collapse. For each uncollapsed slot, the solver walks left to find the most recently collapsed slot, computes the current streak of that event, calculates the dampened repeat probability, and multiplies the weight of that event in the current slot's candidate list. This causes the repeat candidate to compete with a boosted weight in the WFC entropy calculation rather than bypassing WFC entirely.

The bias multiplier is a global scalar (currently `3`) that controls how aggressively repeat probability boosts the weight. A multiplier of `1` gives repeat no special advantage beyond its base weight; `10` effectively locks events in place once started. The value `3` was chosen empirically via an analytics sweep to give a repeat share of approximately 60–74% at peak hours for a streak-1 event, which produces natural-feeling runs without over-extending them.

**Entropy computation** follows Shannon entropy:

```
S = -Σ p_i × log(p_i)
```

where `p_i` is the normalised weight of candidate `i` in a given slot. High entropy = many equally-weighted options; low entropy = one option dominates.

**The observe step** selects the uncollapsed slot with the lowest entropy. Ties are broken left-to-right by iterating the slots array in order and keeping only strict improvements — this preserves temporal coherence, ensuring earlier hours resolve before later ones when equally constrained.

**Propagation** collapses the chosen slot and prunes both neighbours using the constraint matrix. If pruning empties a neighbour's candidate list (a contradiction), the neighbour is restored from `wave_save` — a soft fallback that relaxes the violated constraint rather than backtracking. Full backtracking was considered but rejected: for 24-slot one-dimensional timelines, contradiction frequency is low enough that soft fallback produces acceptable results without the complexity overhead.

**Streak computation** is a post-process over the fully resolved `resolved[]` array, entirely decoupled from the solver. The streak displayed for any slot is simply how many consecutive hours the same event has run up to and including that slot in the final output, regardless of whether persistence came from the repeat bias or from a fresh WFC collapse that happened to pick the same event. This avoids a subtle display bug where a fresh re-selection of an event mid-block would reset the visible streak counter to 1.

### The `solveTimeline` Wrapper

A convenience function that instantiates `Timeline`, injects a seeded LCG random number generator, runs the solver, and returns a `TimelineResult` with fully computed streak lengths. The LCG seed makes timelines deterministic and reproducible: the same seed always produces the same day.

### The Analytics Engine

A companion module that runs `N` independent simulations over any tile set and computes four categories of measurement:

**Distribution** — total hour share per event across all runs, average and max block lengths, and p50/p90 block length percentiles. Surfaces events that are starved (never appear), dominant (crowd out others), or prone to overlong blocks.

**Block histograms** — frequency distribution of block lengths per event, showing the full shape of how long each event typically runs rather than just the average.

**Temporal heatmap** — a 24×N grid of event × hour occurrence frequencies. Makes it immediately visible whether an event is appearing at unexpected hours — an early indicator of weight or constraint data bugs.

**Transition matrix** — the empirical from→to probability for all event pairs. Reveals funneling (one event always leads to the same successor), orphaned events (nothing transitions into them), and constraint-induced dead ends.

The analytics engine treats the solver as a black box and operates only on resolved timeline outputs, which means it remains compatible with any future solver changes as long as the output format is preserved.

### Preset Data

Phase 1 ships with two preset tile libraries:

**Village NPC events** — Sleep, Breakfast, Work, Lunch, Market, Tavern, Stroll, Dinner. Weights are shaped around a plausible medieval village workday. Work has a forced weight of `0` at noon (hour 12) to guarantee a lunch break regardless of streak state. Analytics-guided tuning reduced Work's average block from 7.3h to 1.9h and eliminated 9h+ marathon blocks.

**Weather events** — Sunny, Cloudy, Rain, Storm, Fog. Constraints prevent direct Storm→Sunny transitions and disallow Rain after Storm (a storm must clear to cloudy first). Fog is weighted toward night and early morning hours.

---

## Files

| File | Purpose |
|---|---|
| `storygine-wfc.ts` | Core engine: `Timeline` class, `solveTimeline`, type definitions, preset data |
| `storygine-demo-wfc.jsx` | Interactive React demo: 24-slot timeline visualisation, seed control, multi-NPC and weather rows |
| `storygine-analytics.jsx` | Analytics dashboard: N-run simulation suite, distribution, block, temporal, and transition views with automatic health flags |

---

## Other Applications

Storygine's model — 24 weighted slots, a persistence curve, binary adjacency constraints — generalises to any domain where something transitions through named states over the course of a day. The following examples are not implemented but are straightforward to define as tile libraries.

### Hospital Ward

A hospital ward cycles through care routines, administrative shifts, and quiet periods. Story objects would include *Morning Rounds* (weighted 7–9am, high persistence), *Surgical Block* (weighted 8am–2pm, long repeat curve, cannot follow *Emergency*), *Visiting Hours* (weighted 3–8pm), *Night Monitoring* (weighted 10pm–6am, very high persistence), and *Emergency* (low weights across all hours but non-zero everywhere, cannot be followed by *Visiting Hours*). The transition matrix would surface whether emergencies are realistically distributed across the day or accidentally clustered.

This is useful in a hospital management game or simulation where wards have their own operational rhythm independently of individual staff schedules.

### Predator/Prey Animal Behaviour

A nocturnal predator like an owl has near-zero activity weights during daylight hours and high weights from dusk to dawn. Story objects would include *Roosting* (dawn to dusk, high persistence), *Hunting* (dusk to midnight, moderate repeat), *Feeding* (brief, low repeat, cannot precede *Roosting*), and *Territorial Call* (scattered low-weight slots across the night). A prey animal — a mouse — would have complementary weights: active in twilight periods, burrowed during the owl's peak hunting hours.

The constraint system naturally models predator-prey tension: a mouse's *Foraging* event can have a constraint against following the owl's *Hunting* event if timelines are eventually coupled in Phase 2. In Phase 1, each animal's independent rhythm is already meaningful for a wildlife simulation or a game with observable animal behaviour.

### A Ship's Watch System

A naval vessel runs on a 24-hour watch rotation: *First Watch* (8pm–midnight), *Middle Watch* (midnight–4am), *Morning Watch* (4–8am), *Forenoon Watch* (8am–noon), *Afternoon Watch* (noon–4pm), *First Dog Watch* (4–6pm), *Last Dog Watch* (6–8pm). Each watch has specific activities — *Navigation Check*, *Engine Room Inspection*, *Crew Mess*, *Helm Duty*, *Lookout Post* — with weights clustered within the appropriate watch window and hard constraints preventing certain maintenance tasks from occurring during active manoeuvring.

The analytics engine would be particularly useful here to verify that safety-critical tasks (hull inspection, fire drill) appear with the right frequency and are never crowded out by lower-priority activities.

### Stock Market Session

Financial markets have a strong intraday rhythm: a pre-market period of low liquidity, an opening bell with high volatility, a midday lull, an afternoon ramp into the close, and after-hours thin trading. Story objects would include *Pre-market Drift* (5–9am, low persistence), *Opening Volatility* (9–10am, cannot follow *After-hours*), *Trend Day* (10am–3pm, high persistence once established), *Lunch Lull* (11am–1pm, competes with Trend Day), *Power Hour* (3–4pm, moderate weight, high repeat), *Closing Auction* (4pm, brief), and *After-hours* (4–8pm, low activity). Constraints prevent the market from jumping directly from *Pre-market Drift* into *Power Hour* without passing through the opening.

This could drive procedural financial data for a trading simulation, or provide a world-state timeline that biases the activity of NPC traders and merchants in a game world.

### Volcano Activity

A geological system has a much slower perceived rhythm but the same structural model applies if the 24 slots represent geological phases across a longer time span — days or months compressed into a 24-unit sequence. Story objects would include *Dormant* (very high persistence), *Fumarolic Activity* (elevated gas emissions, moderate repeat, must follow *Dormant* or *Cooling*), *Seismic Swarm* (cannot precede *Dormant* directly), *Dome Growth* (sustained, very high repeat, cannot follow *Eruption*), *Eruption* (low base weight but reachable after a long *Dome Growth* streak — the repeat decay is tuned to drop sharply past 4 periods, making prolonged dome growth increasingly likely to tip over), and *Cooling* (high persistence, must follow *Eruption*). The constraints form a one-way cycle: Dormant → Fumarolic → Seismic → Dome Growth → Eruption → Cooling → Dormant.

Useful in a survival or city-builder game where the volcano's state drives evacuation planning, resource availability, and NPC anxiety — and where a purely random eruption schedule would feel arbitrary rather than earned.

### Café or Restaurant Service

A food service venue has a clear operational rhythm distinct from its staff's personal schedules. Story objects would include *Prep* (5–9am, high persistence, cannot follow *Closed*), *Breakfast Service* (7–10am, moderate repeat), *Lull* (10am–noon, competes with Prep for cleaning and restocking), *Lunch Rush* (noon–2pm, high weight, high persistence), *Afternoon Quiet* (2–5pm), *Dinner Prep* (4–6pm), *Dinner Service* (6–10pm, high persistence), *Last Orders* (10–11pm, brief), and *Closed* (11pm–5am, very high persistence). Constraints enforce operational logic: *Breakfast Service* cannot follow *Dinner Service* without *Closed* in between.

This is a separate timeline from the individual staff working the venue — one timeline per location, staff timelines driven by their own story objects. In Phase 2, the venue timeline would emit a world state (current service phase) that biases each staff member's activity towards appropriate tasks for that phase.