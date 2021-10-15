---
slug: sentences-rule
title: "Sentences? They rule: syntax as a game mechanic"
draft: true
hide_table_of_contents: true
tags: [procedural, game design]
---

Language is just another complex game system, out of the box.

<!--truncate-->

import Image from "../src/components/Image"
import Iframe from "../src/components/Iframe"
import CarouselImage from "../src/components/CarouselImage"
import Rules from "../src/components/Rules/Rules"

---

<p style={{fontSize: 36, textAlign: "center", fontWeight: "bold"}}>
I love puns.
</p>

Making jokes with the language itself is fascinating to me: it defies and collides with our social rules of communications in order to explore uncharted shores of our brains. Without puns, no language would progress or evolve. Next time you make a pun, think of it as an active act of evolution of the humankind, and it might alleviate the pain of your probable social demise.

In french, "pun" is translated as **"jeu de mots"**, litteraly **"game of words"**. Indeed, **a pun is the result of being playful with language**, but what if you tried to translate this concept to video games?

You could end up with something ressembling **Baba Is you**.

<Iframe srcUrl="https://www.youtube.com/embed/U7MJljsoUSo" legend="Watch the video to understand what I'll talk about." />
<br/>

With the words of its creator:

> Baba Is You is a puzzle game where the rules you have to follow are present as physical objects in the game world. By manipulating the rules, you can change how the game works, repurpose things you find in the levels and cause surprising interactions! ([source](https://hempuli.com/baba/))

**Baba Is You** is a variant of [_Sokoban_](https://en.wikipedia.org/wiki/Sokoban), a 1981 japanese game about a small guy pushing crates in the correct positions in a warehouse.

<br/>
<Image srcImage="https://upload.wikimedia.org/wikipedia/commons/4/4b/Sokoban_ani.gif" legend="A Sokoban puzzle being solved." />
<br/>

Many puzzle games took _Sokoban_ as a basis for their gameplay, but few did it with the creativity of **Baba Is You**. Because here, you're not pushing boxes, **you're pushing _nouns_, _verbs_, ... _words_ into or out of _sentences_ that controls the rules of the level**.

<br/>
<Image srcImage="https://i.imgur.com/VIy5nNi.gif" legend="Walls will stop Baba until the rule 'WALL IS STOP' is dismantled." />
<br/>

Thus, the core game system of **Baba Is You** is actually _the syntax of the English language_. Syntax is defined as the _arrangement of words and phrases to create well-formed sentences in a language_. This definition works for linguistics as well as for computer science, where the syntax of a computer language defines the structure of statements, the "how-to write in ...".

**Baba Is You use the internal rules of the English language as the pillar on top of which players will form sentences by moving some blocks and assembling them in the correct order**. So it's more that just using words: every game uses words, just by the fact that you have to read text while playing, but they can be easily translated to any language whereas **Baba Is You**'s mechanics are so deeply rooted in English that a translation seems impossible without changing the whole game.

<br/>
<Image srcImage="img/illustrations/babaIsYou2.jpg" legend="A level can accumulate of lots of rules." />
<br/>

Of course, the end goal is not to make elaborate litterature, but to manipulate **rules**: rules that controls who the player is, what they can push, what the obstacles are and even what the winning objective is.

And **Baba Is You** encourages you to be creative, to bend the levels with literal _puns_ in order to solve its puzzles. The game is often built for this, forcing you to adopt a particularly non-sensical solution in order to create a "surprise", an "epiphany" moment when you discover the trick you needed. It's not my favorite type of puzzle, because it creates a lot of frustrating moments where you're just stuck on a level, missing the _mental trick_ to go through at all.

<br/>
<Image srcImage="img/illustrations/babaIsYou1.png" legend="If 'WALLS IS BABA AND BABA IS YOU' then all the walls becomes Baba and you can control all of them at the same time." />
<br/>

But I still love **Baba Is You** because I'm obsessed with **rules**. Engaging the player in the definition of the game, writing and rewriting the game as you progress, ... I can't think of a more fascinating design sandbox. This is the kind of sandbox where you can profit or suffer from _design puns_, where the game is playful with itself and the player.

One of my absolute favorite implementation of the **rules** philosophy is in the mobile roguelike **Seven Scrolls**:

<br/>
<Image srcImage="img/illustrations/7scrolls0.png" legend="In Seven Scrolls, you're a Monk trying to survive in a dungeon. Sort of a follow-up to The Name of the Rose." />
<br/>

**Seven Scrolls** is a turn-based strategy puzzler, where you can move in 4 directions, shoot beams to fight and kill monsters. Collect the key to unlock the access to the next floor and move to the stairs to go there. Simple.

But on each floor, you can also collect **_scrolls_**, up to seven of them of course, which unlocks a particular **_spell_**. A **_spell_** is structured like so:

<p style={{fontSize: 21, textAlign: "center", fontWeight: "bold"}}>
When <span style={{color: "#ff851b"}}>[trigger]</span> happens, <span style={{color: "#ff4136"}}>[target]</span> receives <span style={{color: "#39c7cc"}}>[effect]</span>.
</p>

<p>Each <span style={{color: "#ff851b"}}>[trigger]</span> and <span style={{color: "#39c7cc"}}>[effect]</span> is randomly picked from a different list that the player uncovers as things progress and as spells are picked up. The <span style={{color: "#ff4136"}}>[target]</span> is always the Monk or a Monster.</p>

<CarouselImage srcImages={["img/illustrations/7scrolls1.png", "img/illustrations/7scrolls2.png", "img/illustrations/7scrolls3.png", "img/illustrations/7scrolls4.png"]} keyInit="7scrolls" />

Quickly, **you'll find yourself chaining or avoiding triggers to use your spells in the most effective way**. You can also trigger a spell manually, with the caveat that its scroll will be removed after use but it's necessary to make room for new ones or discard unwanted ones.

With this really simple setup, built around the most basic syntax you could think of, this mobile game provides a variety of gameplay and strategies often not reached by many AAA games. **Exploration in the game becomes also an exploration of the rules of the game, thus half of the game is learning what you can do.**

Seven Scrolls is a fantastic example of a **simple but not simplistic game system**.

## Let's make a simple rules system

Let's imagine a game where players find scrolls during their exploration of the level. Each scroll is a new rule procedurally built from ingredients' lists.

**Create your ingredients, generate rules and analyze the interactions with a simple network dataviz.**

<Rules />
