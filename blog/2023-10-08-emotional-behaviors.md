---
slug: emotional-behaviors
title: AI Emotional Models for games 
draft: true
tags: [game design]
---

Make AIs more alive? More susceptible?

<!--truncate-->

import Image from "../src/components/Image"
import Iframe from "../src/components/Iframe"

---

<!--
--->

For a certain game, I worked on adding an emotional behavior system for the NPC players.

We wanted to translate the pleasure of boardgames to video game context which is extremely hard to do.

So emotions and not just generic reactions. It's ambitious.


System : BDI state machine + classification of emotions.

Belief is kinda like a blackboard but usually more "opinionated" : antagonist belief, win belief, ... an opinionated answer to a question


Advantages :
- BDI is not a technical architecture, but a strong abstraction:
  - that's the key point, it's not guiding in any way the implementation, but it aligns people thinking about the system.
  - It create layers, dividing a huge problem into smaller ones.
  - it doesn't depreciate any previous work or tech done on AI systems : intentions are just your behavior trees, desires are made with your state machine
- Classification of emotions : super useful again for aligning people on npc topics, animators, voice designers, writers ...
  - much better to say 3 reactions to win with win with relief, win with gratification, etc
  - guides the performance and creates consistency across all of those content that are often not made at the same time
  - scalable : easy to extend, to create granularity where you need (for example with intensity of emotion)

--> Just a way of thinking about the "AI problems", creating consistency across departments  


Challenges :
- Not a gameplay priority so hard to prioritize, comes late, no time to tune properly
  - the earlier, the better ! like said earlier, it doesn't really affect technical decisions for normal gameplay things
- Had to work for FR and S, so super generic stuff
  - But also good because it would be used elsewhere if we want !
- Lack of a good way to queue lines in snowdrop :
  - we had lines which were triggered on gameplay phases, other by the emotional system
  - not every feedback was handled through the same system so it's kind of a mess to deal with the superposition of everything
    - ideally every feedback is also handled by the emotion system ... because it could be easily done like that
  - line + ono ideally


Next steps :
- our npcs are very selfish, lacking gloating/pity emotions
  - we harcoded relief when you're not the target of a shift card
- apply this approach to a much broader problem : combat npcs