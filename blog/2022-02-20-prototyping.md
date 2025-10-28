---
slug: fast-ugly-prototyping
title: Fast and not so ugly prototyping in game development
draft: true
tags: [ux, game design]
---

My personal workflow for prototyping efficiently with web tools : Papertoy.

<!--truncate-->

import Image from "../src/components/Image"
import Iframe from "../src/components/Iframe"

---

This is the adaptation of a talk I did for the _Ubisoft's UX Days_ in November 2021 called _**Designing UI features with Web prototypes**_. The UX Days is a full week of conferences made by Ubisoft designers around UX problems and solutions in their latest work. At the time, my lead Jean-Baptiste Oger suggested I apply to present some of the prototyping workflows I developped during the development of Skull & Bones. A few weeks later, I got scheduled for a 15 minutes slot to present all of this.

<Image srcImage="img/illustrations/UXDays.png" altText="ux-days-2021" legend="Look at this baby developer giving a talk... Aaaw" />

I can't show you (yet?) the big prototype example I articulated the talk with, so it will be fairly theorical at the beginning. However, I still have something to show...

---

Many UX concepts presented here are taken from [Assertive Instincts](https://jenson.org/instincts/), a 2020 blog post from Scott Jenson. Read it, it's brilliant!

---

## Developers & unknown knowledge...

Game developers have the _**stupidest problem**_ in the world:

<p style={{ textAlign: "center", fontWeight: "bold", marginTop: "20px", fontSize: "21px" }}>
  We <i style={{ color: "Crimson" }}>don't know</i> what we <i style={{ color: "Crimson" }}>don't know</i>.<span style={{ fontSize: "12px", position: "relative", bottom: "28px" }}><a href="https://jenson.org/instincts/">(Scott Jenson)</a></span>
</p>

We swim in a sea of uncertainty in which we have to navigate multiple conflicting requirements. We have an art direction to follow but engineering constraints to respect, we have unstable engines with performance pitfalls, huge teams working in silos (in the context of Ubisoft's AAA development), ...

With hundreds of variables to take into account, **it is impossible to plan for everything** and game development inevitably becomes a very chaotic process.

In the subtopic of Game UX, <b>we <i style={{ color: "Crimson" }}>don't know</i> what we <i style={{ color: "Crimson" }}>don't know</i></b> is particularly true when we talk about <i style={{ color: "gold" }}><b>accessibility</b></i>.
The development of accessibility options can be very nebulous for people that are not directly impacted by it. And even if the industry seems to have figured out a set of good recipes to have for every game, the deepest and best integrations of a11y options is still a monumental design effort for the majority of teams.

## Designers & biaised knowledge

In order to navigate this complexity, designers compensate their _**lack of knowledge**_ with:

<p style={{ textAlign: "center", fontWeight: "bold", marginTop: "20px", fontSize: "28px" }}>
  Assertive <i style={{ color: "seagreen" }}>instincts</i><span style={{ fontSize: "12px", position: "relative", bottom: "28px" }}><a href="https://jenson.org/instincts/">(Scott Jenson)</a></span>
</p>

Those are our recipes and shortcuts that form a **gut instinct** that is developed and reinforced by experience. It is what allow us to brut-force problems and <i style={{ color: "seagreen" }}>get the job done quickly</i>.

There are 3 major problems with **Assertive Instincts**:
1. Instincts are a <i style={{ color: "seagreen" }}>comfort zone</i>, where innovation requires <i style={{ color: "crimson" }}>exploration of uncharted territories</i>.
2. Our instincts are usually a bit _**off**_, because you're going to <i style={{ color: "crimson" }}>apply this instinct way too broadly</i>, without seeing all the edge cases.
3. Assertiveness can <i style={{ color: "seagreen" }}>harm the collaborative spirit</i> in a team.

Let me elaborate on that last point: UX is often about getting everyone to agree on something, so that in every part of the game, the player has a consistent journey. It is, in essence, a communication problem: between the game and players and between the developers themselves. For a  designer with a big mouth and really strong opinions in a meeting _can_ be useful to make things move forward faster, but it can also brush people in the wrong way.

## Me & prototyping knowledge

Scott Jenson describes a few ways to **break out of our instincts**: _name your pain_, _ask questions_ and ... _build <i style={{ color: "yellow" }}>fast</i> and <i style={{ color: "crimson" }}>ugly</i> prototypes_. Take time to research and explore in a safe space without concerns of execution quality in order to  This is a well known recipe in design and game development, but not that much applied in AAA game development from what I saw.

But <i style={{ color: "yellow" }}>fast</i> and <i style={{ color: "crimson" }}>ugly</i> is a bit vague ... 

The 5 pillars of fast and ugly prototypes:
- interactive
- small
- agile
- shareable
- disposable

### interactive
interactive = playable prototype
You learn much more when a prototype doesn't fake interaction.
You prototype because you want to think with your hands. WE LEARN MUCH MORE. Get as close as you can get to final controls in terms of input.

XD's prototypes can be helpul but can quickly show limits.

Adobe XD is just an improved version of Powerpoint. In UI and UX, so much is about the micro interactions and details that you put in.
Access to a gamepad API is essential

Multiple levels of interaction: player level, design level (custom properties), logic level

### small
Find the balance between the time you put in and the complexity of the result (pareto's limit).

Choosing the right size is also to balance the time you put in the prototype so that it's still worth it. You want something pretty small. Bring (back) spontaneity in our way of creating (time between an idea and a playable thing must be shortened, or the idea will die).

focus on the hardest problem: ask the question the prototype should answer
choose the minimal form: you don't have to create everything

### agile

it's not just about iteration speed, it's having a workflow made to catch ideas
Bret Victor, [inventing on principle](https://youtu.be/PUv66718DII)
Gopro [quik](https://youtu.be/OppIAKy5O5E) And it's open-source: [gopro-lib-node.gl](https://github.com/gopro/gopro-lib-node.gl)

Creators need immediate connection to what they are creating ✨
development = test

IMPROVISATION, research and exploration.

Closest environment for this is shadertoy or web development, hot reloading is basically guaranteed

### shareable

no install, no download, just a link to share everything

hat you write is what you see instantly shareable: remote, install or download are boring, ... web is essential
It helps immensely in this post covid context, people can play it easily. a few minutes to update.

### disposable

minimal cost: only one person for a few hours

better cuts: early decisions are motivated by much better information
fun "proof": most of what I prototyped is cut today

disposable: super easy to cut, not time-consuming, cutting for good reasons because you have good data to motivate the cut
We prototype because we want to take decisions.

It helped! It worked a bit well, but at least it was not cut after 3 months of GPP work. Of course it's a to more complicated than that, because of the project.
It was never because the prototype did not work, it was more about "it doesn't fit in what we're trying to do".
I know that some of the stuff I presented seems technically difficult or scary to some of you. the godot editor is a godot application.




This talk focuses on how embracing web prototyping can lead to iteration-fueled design, easy delivery to your team while keeping decent visual quality. We had a complex map feature to implement, the "Sailing plan", which allows you to draw your route and weren't sure how to approach the gamepad controls. By leveraging the speed and flexibility of web programming, prototyping becomes much faster than in Anvil & Phoenix.​
