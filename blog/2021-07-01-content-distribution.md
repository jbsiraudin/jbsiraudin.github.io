---
slug: content-distribution
title: "Designing randomness, part 1: Content distribution"
draft: true
tags: [designing randomness, procedural, game design, tools]
---

Let's distribute cards. But better.

<!--truncate-->

import ContentDistribution from "../src/components/ContentDistribution/ContentDistribution"
import Image from "../src/components/Image"

---

_**Procedural generation**_ is a term probably overused in videogame production. It's so trendy, it makes your system sound so smart where you often just call `random()` a bunch of times.

<Image srcImage="img/illustrations/wiki-procedural.png" altText="wiki-procedural" legend="Randomly generated redirects here. Oof." />

I personally see _**procedural generation**_ as a glorified name to designate **a function with a few small inputs that spits out a big output**. And for me, this is the whole point: from a minimal input, get the maximal output that you can through a _procedure_, an _algorithm_, a _piece of code_, to avoid handcrafting everything.

If _**procedural generation**_ is already ubiquitous in the art pipelines of most videogame/VFX/animation studio, it also lives for a long time in the field of game design.

In this [series of short articles](/blog/tags/designing-randomness) called _**Designing randomness**_, I dive deep into the field of **procedural game design**.

---

In game design, _**procedural generation**_ is often focused on _**generating game content**_ : making an infinite amount of dungeons for the player to explore in a roguelike is the quintessential example, so let's take it.

Dungeons in roguelikes are not generated through some kind of superpowerful algorithm, redrawing every position of every brick to create a new yet coherent piece of architecture. The problem is much simpler, and it starts with defining a dungeon from a level design perspective.

> 99,9% of the time, a dungeon is an assemblage of rooms.

A dungeon generation problem becomes a problem of generating an assemblage of rooms : choosing rooms from an existing library, linking rooms with doors. Much better!

This subspace of procedural generation, _**scattering pre-existing content**_, is really natural for game design. Thus, design tasks are split in two layers: **designing individuals rooms** to serve the second to second gameplay, **designing the rules of assemblage** to serve the minute to minute exploration of our dungeon.

This second layer is where procedural game design takes center stage: the **use of randomness is essential** to keep the world fresh and unpredictible for players, but we still need **a level of control on the assemblage algorithm to inject level design rules** (for pacing, logic, avoiding repetition). Easier said than done! Striking a design balance between the predictability of rules and the impredictability of their random use is key to generate endless amounts of enjoyable dungeons.

---

Let's simplify the problem a bit more: **let's say our dungeon is a straight corridor of 20 rooms back to back**. Our brave designer created a library of 52 rooms that can be represented by the usual poker cards. I like the card representation because I think it mimics well _the reality of content development_: you have **many ways to subdivide a given set**. In the case of cards: suit, color, value, figure vs number.

**This next interactive toy lets you play with 4 different ways to distribute 20 ordered cards**, 4 different ways to build a dungeon, from dumb to smart, from simple to complex.

With the last one, I tried to strike the balance between random and rules I talked earlier by using a constraint based algorithm: it's often simpler to say to the computer what you don't want and then let it generate something that respects that.

next steps :

- weighted random
- card analyzer
- dungeon analyzer (dire si répétition)
- fix bug: initial list of constraints is not respected
- autogen every 2 seconds
- add roguelikes dungeon illustration (isaac, hades, the stanley parable...)

<ContentDistribution />

<br/>
