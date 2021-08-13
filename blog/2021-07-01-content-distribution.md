---
slug: content-distribution
title: Designing randomness
draft: true
tags: [procedural, game design, tools]
---

Let's distribute cards. But better.

<!--truncate-->

import ContentDistribution from "../src/components/ContentDistribution/ContentDistribution"
import Image from "../src/components/Image"

_**Procedural generation**_ is a term probably overused in videogame production. It's so trendy, it makes your system sound so smart where you often just call `random()` a bunch of times.

<Image srcImage="img/illustrations/wiki-procedural.png" altText="wiki-procedural" legend="Randomly generated redirects here. Oof." />

I personnally see _**procedural generation**_ as a glorified name to designate a function with a few small inputs that spits out a big output. And for me, this is the whole point: from a minimal input, get the maximal output that you can through a _procedure_, an _algorithm_, a _piece of code_, to avoid handcrafting everything.

If _**procedural generation**_ is already ubiquitous in the art pipelines of most videogame/VFX/animation studio, it also lives for a long time in the field of game design, even if it's not necessarily as obvious.

In game design, _**procedural generation**_ is often focused on _**generating game content**_ : making an infinite amount of dungeons for the player to explore in a roguelike is the quintessential example.

The content procedurally placed in the world the Ephemeral Zone system.
Hosts in the world can welcome various layouts, thus **populating the hosts with layouts in an important key to a well-designed world**.

The **use of randomness is essential** to keep the world fresh and
unpredictible for players, but we still need to have **a level of control on the populate algorithm to inject level design rules** (for pacing, logic, avoiding repetition).

Imagine here that each card is an Ephemeral Zone layout, and play with the different
populate algorithms.

<ContentDistribution />
