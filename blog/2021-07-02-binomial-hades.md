---
slug: binomial-hades
title: How many different runs can you get in Hades?
draft: true
tags: [maths for game design, hades]
---

Let's conjure the old god Combinatorics' most overpowered boon: the [_binomial coefficient_](https://en.wikipedia.org/wiki/Binomial_coefficient).

<!--truncate-->

---

> [Combinatorics](https://en.wikipedia.org/wiki/Combinatorics) is an area of mathematics primarily concerned with counting, both as a means and an end in obtaining results, and certain properties of finite structures. It is closely related to many other areas of mathematics and has many applications ranging from logic to statistical physics, from evolutionary biology to computer science, ... **and game design!**

Okay, I added the last part. But I'll show you that it's true in a few lines.

My favorite games are the ones where, like a good standup comedy bit, every minute a new punchline is dropped and I'm thinking to myself "Oh shit, that's fun". And then, on the way home, while remembering all the jokes, I'm thinking to myself "Oh shit, that's smart". And **Hades** is definitely one of these.

## Hades on the box but Zagreus on the pad

**Hades** is a roguelike where you embody Zagreus, son of Hades, while trying to break out of a eternally changing Hell (to not say _procedurally generated_). You can choose a weapon from your arsenal for each run and receive boons, abilities and powers from the gods of Olympus, to build up Zagreus' power during the run.

**Hades** is a phenomenal game that shines in every department: it is a blast to play its combat, a joy to marvel at its art, a pleasure to dive in its narrative.

**Wether you like roguelikes or not, you should play Hades.** And this article spoils a large part of its game systems, so I advise you to download it and to come back after 20 hours of playtime.

---

## Hades, a supergiant game

**Hades** is game made by _Supergiant games_, the team behind **Bastion**, **Transistor** and **Pyre**. The team grew from 4 developers to nearly 20 for the development of **Hades**, and that growth was followed by _larger_ and better games. And if I emphasized the adjective _larger_, it is because _Supergiant games_ are always very generous when it comes to the content of their games.

**Hades** is a very large yet ultra polished game, pushing the standards of the industry altogether (so much that its relatively low price at 25€ was a subject of heated conversations in the indie community).

Being a roguelike, **Hades** is focused on replayability: each run must be new, yet using the same grammar so that the player can still learn the game and get better at it.

Scoping such a /chantier/ must be a tough task, so let's crunch some numbers to better analyze the situation!

---

A run of Hades will be differ through 2 main factors (mostly independant from each other): the dungeon and the blessings proposed overall.

Demo to calculate the number of arrangements of rooms (with variations of charon's well, treasure, mirrors, the blessings that you will find) in one floor.

Demo to calculate the number of possibilities in the pact of punishment/DS3 chara builder with k parmi n

Code to enumerate all possibilities and assigning them an ID.

Conclude by citing all the other parameters affecting the difference nature of a run : the weapon (and its form) chosen, the boon builds, the keepsakes, ...
The smart thing is that progression is tied to the procedural generation so you keep discovering things, weapons, rooms, late in the game.

You progress too much? Let's make the world around progress then.

I suspect that 99% of players will have 100 runs maximum. And Hades has millions of different runs for you.
