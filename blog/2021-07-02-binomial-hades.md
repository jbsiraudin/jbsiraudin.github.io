---
slug: arrangements-hades
title: How many different runs are in Hades?
draft: false
tags: [maths for game design, hades, procedural, game design]
---

Let's conjure the old god **Combinatorics**' most overpowered boons.

<!--truncate-->

import Image from "../src/components/Image"
import Iframe from "../src/components/Iframe"
import Arrangements from "../src/components/Combinatorics/Arrangements"
import Configurations from "../src/components/Combinatorics/Configurations"
import SimplePointDistribute from "../src/components/Combinatorics/SimplePointDistribute"
import Permutations from "../src/components/Combinatorics/Permutations"
import HadesCarousel from "../src/components/Combinatorics/HadesCarousel"

---

> [Combinatorics](https://en.wikipedia.org/wiki/Combinatorics) is an area of mathematics primarily concerned with counting, both as a means and an end in obtaining results, and certain properties of finite structures. It is closely related to many other areas of mathematics and has many applications ranging from logic to statistical physics, from evolutionary biology to computer science, ... **and game design!**

---

**My favorite games are similar to great standup comedy shows**. Every minute a new punchline is dropped and I'm thinking to myself "_Oh shit, that's fun_". And then, on the way home, while remembering all the jokes, I'm thinking to myself "_Oh shit, that's smart_".

**Hades** is definitely one of these.

<Image srcImage="https://upload.wikimedia.org/wikipedia/en/c/cc/Hades_cover_art.jpg" legend="Hades cover art" />

## Hades on the box, Zagreus on the pad

**Hades** is a roguelike where you embody Zagreus, son of Hades, while trying to break out of a eternally changing Hell (to not say _procedurally generated_). You can choose a weapon from your arsenal for each run and receive boons, abilities and powers from the gods of Olympus, to build up Zagreus' power during the run.

<Image srcImage="https://upload.wikimedia.org/wikipedia/en/1/1a/Hades_video_game_screenshot.jpg" legend="Hades uses an isometric view, with Zagreus on the center of the screen." />

**Hades** is a phenomenal game that shines in every department: it is a blast to play its combat, a joy to marvel at its art, a pleasure to dive in its narrative.

:::caution
**Wether you like roguelikes or not, you should play Hades.** And this article spoils a large part of its game systems, so I strongly advise you to play it first.
:::

---

## Hades, a supergiant game

**Hades** is game made by _Supergiant games_, the team behind **Bastion**, **Transistor** and **Pyre**. The team grew from 4 developers at the time of **Bastion** to nearly 20 for the development of **Hades**, and that growth was followed by _larger_ and better games. And if I emphasized the adjective _larger_, it is because _Supergiant games_ are always very generous when it comes to the content of their games.

**Hades** is a very large yet super polished game, pushing the standards of the industry altogether (so much that its relatively low price at 20€ was a subject of heated conversations in the indie community).

<Iframe srcUrl="https://www.youtube.com/embed/91t0ha9x0AE" legend="Official Animated Trailer for Hades" />

Being a roguelike, **Hades** is focused on **replayability**: each run must be new, yet using the same grammar so that the player can still learn the game and get better at it. Procedural generation is essential to both the design of a roguelike (to keep things fresh yet familiar) and the production team.

<p style={{ textAlign: "center", fontWeight: "bold", marginTop: "20px", fontSize: "18px" }}>
  You want to create a game with an infinite amount of runs,<br/>
  with a very finite amount of time and resources.
</p>

Scoping this kind of project is a tough task, so let's crunch some numbers!

---

### The size of Hell

On of the biggest task to tackle in a videogame like **Hades** is to create its world. _Supergiant_ has a lot of experience in that matter, and were extra smart about designing their own version of a procedural Hell.

**The player explores the world by stepping into a succession of rooms across 4 biomes : Tartarus, Asphodel, Elysium and the Temple of Styx.** The room before each biome is a boss room, containing a particularly tough but constant challenge, the boss itself and the layout of its room remaining unchanged across runs (well up until the endgame starts). What _does_ change in each biome is the rooms you cross before the boss.

_Supergiant_ is using a technique [I described before as **content distribution**](/blog/content-distribution) : Hell is not redrawn from scratch every time Zagreus steps into Tartarus _yet again_, Hell is pulling rooms from an existing library and linking them with doors.

This technique is great because it automatically gives you a distributed design process split in two layers : **designing individuals rooms** and **designing the rules of assemblage**. Even then, it doesn't mean that it becomes easy: it will take many iterations to nail the level design of the rooms, artists will spend days preping every room into looking gorgeous, a programmer will write and rewrite dozens of times the algorithm of generation.

Here are the standard rooms of the first 3 biomes ([source](https://www.hades-guides.ovh/index.php/chamber-layout/)):

<p style={{ textAlign: "center", fontWeight: "bold", marginTop: 20, marginBottom: 10, fontSize: "24px" }}>
  24 rooms of Tartarus
</p>
<HadesCarousel world="Tartarus" length={24} />
<p style={{ textAlign: "center", fontWeight: "bold", marginTop: 20, marginBottom: 10, fontSize: "24px" }}>
  11 rooms of Asphodel
</p>
<HadesCarousel world="Asphodel" length={11} />
<p style={{ textAlign: "center", fontWeight: "bold", marginTop: 20, marginBottom: 10, fontSize: "24px" }}>
  13 rooms of Elysium
</p>
<HadesCarousel world="Elysium" length={13} />

**The number of rooms you will cross in those 3 biomes is fixed for each run** :

- Tartarus starts in chamber 1, ends in chamber 12 (13 is the end shop).
- Asphodel starts in chamber 16, ends in chamber 22 (23 is the end shop).
- Elysium starts in chamber 26, ends in chamber 34 (35 is the end shop).

For Tartarus, that means that **we have to pick 12 rooms in our 24 rooms library**.

<p style={{ textAlign: "center", fontWeight: "bold", marginTop: 20, fontSize: "21px" }}>
  In this context, how many different Tartarus configurations exist?
</p>

<!--
// https://fr.wikiversity.org/wiki/Combinatoire/Arrangements_sans_r%C3%A9p%C3%A9tition
https://fr.wikipedia.org/wiki/Arrangement
https://fr.wikipedia.org/wiki/Principe_des_tiroirs
-->

<!--
https://www.alloprof.qc.ca/fr/eleves/bv/mathematiques/les-permutations-les-arrangements-et-les-combinai-m1346

Arrangement = order is important
Combination = order is not important

 -->

Since the order of the rooms is important, the combinatrics _boon_ we are going to use is **permutation**, an ordered arrangement of elements.

More specifically, we are trying to count the arrangements of 12 rooms taken from a set of 24 rooms, so we are talking about the k-permutations of n, where k is 12 and n is 24.

To discover the formula giving us the answer, we have to think of what happens when we are generating an arrangement. We start with our n rooms and the first thing to do is:

- Choosing our first room. **I have exactly _n_ choices at this point.** So I'm choosing a room at random and taking it out of the library.
- Ok so now let's choose a second room. **I have _n-1_ choices now**, because I can't choose the element I picked as the first room.
- On the third room, **I will have _n-2_ choices**, because I can't pick the first two elements.
- You get the idea: on the room n°X, **I will have _n-(X-1) = n-X+1_ choices**.
- On room n°k, **I will have _n-k+1_ choices**.

The final number of arrangements is the product of the possible choices at each step. Thus: $A_{n}^k = n*(n-1)*(n-2)*...*(n-k+2)*(n-k+1)$.

And this formula can be simplified with factorials like this:

$$
A_{n}^k = \frac{n!}{(n-k)!}
$$

$k$ is the number of rooms to choose, $n$ is the total number of rooms

So in the case of Tartarus:

$$
\scriptsize A_{24}^{12} = \frac{24!}{(24-12)!} = \frac{24!}{12!} = 1295295050649600
$$

In the case of Asphodel:

$$
\scriptsize A_{11}^{6} = \frac{11!}{(11-6)!} = \frac{11!}{5!} = 332640
$$

In the case of Elysium:

$$
\scriptsize A_{13}^{8} = \frac{13!}{(13-8)!} = \frac{13!}{5!} = 51891840
$$

Just for the first biome, we have a number with 16 digits. And the situation is even more crazy since each chamber can be mirrored, each chamber can welcome different challenges, each chamber can contain or not chests and pots. And I don't count the special chambers or internal mini-bosses in the mix. **In any case, the real number of arrangements is of course higher**.

<p style={{ textAlign: "center", fontWeight: "bold", marginTop: 20, fontSize: "21px" }}>
  With those kind of numbers,<br/>a player will never pass through the same version of Hell.
</p>

You can set up your own numbers and calculate the number of arrangements directly below (until it goes over the maximum integer authorized by JS):

<Arrangements />

<br/>

:::note

I find this calculus fun for hero-based arena games, like _League of Legends_ or _Rainbow Six Siege_. The roster of the characters is often huge, theoretically offering unique combinations each game.

:::

---

### The size of the Pact of Punishment

<Image srcImage="https://interfaceingame.com/wp-content/uploads/hades/hades-pact-of-punishment.jpg" legend="The infernal Pact of punishment." />

<br/>

The **_Pact of Punishment_** is the main feature driving the endgame of **Hades**, unlocked after your 10th successful run.

**At this point of the game, you are in a good spot** : you invested the different currencies of the game into improving the power of Zagreus, you spent [approximately 20 hours](https://howlongtobeat.com/game?id=62941) in the game already so you know the game systems, enemies, weapons and characters well.

You progressed too much! The game is too easy for you! Let's make the game progress then. But on the contrary to most "high difficulty" modes you can encounter, **Hades** lets you choose the stick to be beaten with.

Indeed, the **_Pact of Punishment_** lets you customize the increased difficulty of your run through control of many parameters of the game : health/speed/power of your enemies, alternate versions of the bosses, time limits, ... The smart thing here is to tye progression with the procedural generation of the dungeon in order to keep discovering things, weapons, rooms, etc late in the game.

**All of those changes adds up in a single value exposed to players**: <span style={{fontWeight: "bold", color: "red"}}>heat</span>. And so naturally, the game encourages you to complete the game with increasing levels of heat, for every weapon form there is, each new heat level giving access to precious resources that you can only loot once per level of heat and per weapon.

Giving the players the choice of their challenge is a genius move, as it involves them much more in the conception of the rules of the game, something utterly motivating. I believe you'll see this approach being used more and more by the industry.

<Image srcImage="https://interfaceingame.com/wp-content/uploads/shadow-of-the-tomb-raider/shadow-of-the-tomb-raider-select-difficulty-1920x1080.jpg" legend="Shadow the Tomb Raider drops the overall difficulty [Easy, Normal, Hard] for something more granular on its 3 gameplay pillars: combat, exploration, puzzle." />

<p style={{ textAlign: "center", fontWeight: "bold", marginTop: 20, fontSize: "21px" }}>
  But exactly how many choices does this kind of menu create for players? How many configurations of the <i>Pact of Punishment</i> exist?
</p>

Well for the total number of configurations, the answer is really easy to compute. As reminder here is a summary of the **_Pact of Punishment_** options, and how many "ranks" there is per option:
<br/>

| Condition            | Ranks | Condition           | Ranks  |
| -------------------- | ----- | ------------------- | ------ |
| Hard Labor           | 5     | Underworld Customs  | 1      |
| Lasting Consequences | 4     | Forced Overtime     | 2      |
| Convenience Fee      | 2     | Heightened Security | 1      |
| Jury Summons         | 3     | Routine Inspection  | 4      |
| Extreme Measures     | 4     | Damage Control      | 2      |
| Calisthenics Program | 2     | Approval Process    | 2      |
| Benefits Package     | 2     | Tight Deadline      | 3      |
| Middle Management    | 1     |                     |        |
|                      |       | **Total**           | **37** |

<br/>

Like before, let's think about what happens when a player makes a configuration:

- On the first option "Hard Labor", **I have _5+1=6_ choices**, the 5 ranks and the choice to not activate this option at all.
- On the second option "Lasting Consequences", **I have _4+1=5_ choices**, the 4 ranks and the choice to not activate this option at all.
- You get the idea: on option n°X, **I have _n+1_ choices**, _n_ being the number of ranks possible in this option.

The final number of configurations is the product of the possible choices at each step. Thus:

$$
\scriptsize Pact = 6*5*3*4*5*3*3*2*2*3*2*5*3*3*4 = 69984000
$$

**Close to 70 millions possibilities!** Not bad for just 15 options!

You can set up your own options and calculate the total number of configurations directly below:

<Configurations />

So calculating the total is pretty easy right? What if I want something a bit more subtle now?

Because of the <span style={{fontWeight: "bold", color: "red"}}>heat</span> value exposition, the **_Pact of Punishment_** looks a lot like a point attribution system. Something that you would see in for a character build in an RPG for example.

<Image srcImage="https://www.gameuidatabase.com/uploads/Disco-Elysium12152020-023713-4326.jpg" legend="Disco Elysium makes you spend skill points in variety of sub-categories." />

<Image srcImage="https://www.gameuidatabase.com/uploads/Dark-Souls07152020-084348-29696.jpg" legend="In Dark Souls, you spend souls to level up, and you redistribute your level points in the properties of your character: Vitality, Attunement, Endurance, ..."/>

So, according to me, an interesting question would be:

<p style={{ textAlign: "center", fontWeight: "bold", marginTop: 20, fontSize: "21px" }}>
  At a given <span style={{fontWeight: "bold", color: "red"}}>heat</span>, how many configurations<br/> of the <i>Pact of Punishment</i> exist?
</p>

Because each option has a different maximum attributed, it would make the whole calculation very very complex, so we'll make this much more simpler.

Let's say I have 10 points to distribute into 5 differents categories like this:

<SimplePointDistribute />

<p style={{ textAlign: "center", fontWeight: "bold", marginTop: 20, fontSize: "21px" }}>
  How many point distributions exist?
</p>

To discover this formula, **we're gonna change the problem again and make it look like another problem where we might know the answer.**

Fundamentally speaking, a distribution is an addition of 5 elements that equals to 10. So the question becomes:

<p style={{ textAlign: "center", fontWeight: "bold", marginTop: 20, fontSize: "21px" }}>
  How many ways to cut 10 in 5 exist?
</p>

Now let's say I represent 10 with 10 symbols such as this star $*$. A distribution becomes something like this:

$$
***+*+***+**+*
$$

And other solutions might look this:

$$
******+*+*+*+*
$$

$$
**+**+**+**+**
$$

$$
**********++++
$$

And for that matter, we can replace the $*$ symbol with a letter and the $+$ sign with another letter and the solutions will stay the same:

$$
AAAAAABABABABA
$$

$$
AABAABAABAABAA
$$

$$
AAAAAAAAAABBBB
$$

So the problem becomes:

<p style={{ textAlign: "center", fontWeight: "bold", marginTop: 20, fontSize: "21px" }}>
  How many words can we make with 10 A and 4 B?
</p>

Or in a more mathematic way:

<p style={{ textAlign: "center", fontWeight: "bold", marginTop: 20, fontSize: "21px" }}>
  How many permutations of 14 symbols (10 * and 4 +) exist?
</p>

In mathematics, we're saying that we're looking for the number of **permutations with repetitions**.

To discover this formula we first have to look at a simpler case where all the elements are distincts.

If all the $n$ elements are distincts (so **permutations without repetitions**), let's analyze what happens when we generate an arrangement:

- On the first pick, **I have exactly _n_ choices**.
- On the second pick, **I have exactly _n-1_ choices**, because I can't choose
- On the third pick, **I will have _n-2_ choices**, because I can't pick the first two elements.
- You get the idea: on the pick n°X, **I will have _n-(X-1) = n-X+1_ choices**.
- On the last pick, **I will have _1_ choice**.

The final number of arrangements is the product of the possible choices at each step. Thus: $P_{n} = n*(n-1)*(n-2)*...*2*1$.

And this formula is quite literaly:

$$
P_{n} = n!
$$

But now, **let's reintroduce the fact that the $n$ elements are such that there are $n_{1}$ identical objects and $n_{2}$ other identical objects and $n_{1}+n_{2}=n$** (in our example $n_{1}=10$ and $n_{2}=4$).

For each of the $P_{n} = n!$ permutations, **we can permute the $n_{1}$ identical objects and the arrangement would be the same**. And since we have $n_{1}$ elements, there are $n_{1}!$ ways to permute those elements without changing the arrangement. Same thing for the other $n_{2}$ elements.

So the number of permutations of $n$ elements with $n_{1}$ identical objects and $n_{2}$ other identical objects is:

$$
\scriptsize P(n_{1}, n_{2}) = \frac{(n_{1}+n_{2})!}{n_{1}!n_{2}!}
$$

Thus, if I have $n$ points and $k$ categories, the number of possible distributions is:

$$
P(n, k-1) = \frac{(n+k-1)!}{n!(k-1)!}
$$

As a consequence, the number of distributions of 10 points in 5 categories is:

$$
\scriptsize P(10, 5-1) = P(10, 4) = \frac{14!}{10!4!} = 1001
$$

Again, passing a thousand possibilities with those small numbers seems crazy, and I'll address this point in the next part. In the meantime, you can set up your own numbers and calculate the number of permutations directly below:

<Permutations />

<br/>

:::info

An interesting thing to note here is that:

$$
\scriptsize P(n, k-1) = \frac{(n+k-1)!}{n!(k-1)!} = \binom{n+k-1}{k-1} = C_{n+k-1}^{k-1}
$$

The [_binomial coefficient_](https://en.wikipedia.org/wiki/Binomial_coefficient) finds its way into our calculus (as it usually does).

:::

---

## Plot twist: these numbers are stupid

I didn't present all the systems of **Hades** that introduces differences for each run: the mirror of night, the weapons, the keepsakes, the boons, ... with everything combined, **this game offers more than billions of billions of variations**.

And now, the hard truth:

<p style={{ textAlign: "center", fontWeight: "bolder", marginTop: 20, fontSize: "21px", color: "crimson" }}>
  The mathematical variations are <span style={{color: "red"}}>not</span> game design variations.
</p>

The numbers I developed do not represent the _**variety feel**_ of players in **Hades**. It doesn't mean that it's completely useless, it means that we need to reinterpret them a bit. And my first argument is:

### The majority of mathematical variations are insignificant

The size of Hell doesn't matter that much because players won't make a huge deal out of the fact that they won't cross the same rooms in the exact same order as their last run. What is important for sizing Hell is how many rooms do I cross each time out of how many rooms exist, so the **coverage** of the set of rooms.

<p style={{ textAlign: "center"}}>
Tartarus picks 12 rooms out of its 24 choices,<br/>so you'll see <b>50%</b> of the library on each run.
</p>
<p style={{ textAlign: "center"}}>
Asphodel picks 6 rooms out of its 11 choices,<br/>so you'll see <b>54%</b> of the library on each run.
</p>
<p style={{ textAlign: "center"}}>
Elysium picks 8 rooms out of its 13 choices,<br/>so you'll see <b>61%</b> of the library on each run.
</p>

And that is **by design**: a roguelike like Hades rewards learning through repetition. If you step into a completely new room you're not gonna feel as in control as if you step into a room you crossed 50 times already. And like most games, **Hades**' players thrive on the power fantasy the game offers.

**Striking a balance between variety and familiarity on the same game system is tough, that's why roguelikes found a neat technique : just make two game systems on top of each other.** One is predictible (the dungeon generation) and you can learn it quickly, and the other is way more _random_ so you can't predict its behavior easily (the character build per run system). This separation allows the two game systems to have more focused role while complementing each other.

Indeed, you want players to keep building their runs on the knowledge accumulated on the first system, enough to give them the confidence to improvise and try something new in the other system. **The _variety feel_ is created by the players themselves through their engagement in a complex system, made possible by their mastery of another underlying one.**

<br/>
<Iframe srcUrl="https://www.youtube.com/embed/aozqa_7PLhE" legend="No Man's Sky claims it has over 18 quintillion planets."/>

The 18 quintillions planets of No Man's Sky are meaningless if they all play the same. The 1 billion weapons of Borderlands 3 are meaningless if they all play the same.

Those huge numbers behind procedural generation hide the true depth of their game systems behind mathematical reasoning. **Hades** is great because many game systems introduces significant gameplay variations: the mirror of night, the weapons, the keepsakes, the boons, the pact of punishment, ... With just those, **Hades** can offer easily 1000 entirely different runs, when 99% of players won't go past 100.

### Also: we suck at math

You may have been surprised by the gigantic numbers the different calculus outputted. The thing is: **we are really bad with dealing with huge numbers**. It's really difficult to get a natural hunch about combinatorics, because our brain is not natively wired for it.

An [indian legend](https://en.wikipedia.org/wiki/Wheat_and_chessboard_problem) tells the story of the king Belbik who promised a reward for anyone who could distract him out of his boredom. The brahmin Sissa invents chess to the delight of the king, who asks Sissa how he wants be rewarded. Sissa tells the king to put one grain of rice on the first square of the chessboard, two on the second square, four on the third, and so on doubling the number of grains on each square : Sissa will only take the grains on the 64th square of the chessboard. The king is amused by this request and accept immediately. Here is what the numbers would look like on the chessboard:

<Image srcImage="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Wheat_Chessboard_with_line.svg/1024px-Wheat_Chessboard_with_line.svg.png" halfWidth legend="You can imagine the drop of sweat on the face of the King Belbik now. (Source wikipedia)"/>

The 64th square would contain $2^{64} = 9,223,372,036,854,775,808$ grains of rice, 10 billions of billions of grains, so 300 years at the actual rice mondial production rate! This quantity can't be hold on a single square since if we put the grains on the area of Paris, the layer would be 2km tall, weighing 200 billions of tons ([source](https://theconversation.com/face-au-mur-de-la-croissance-exponentielle-135331)).

The king didn't anticipate the crazy growth of a number doubled 63 times, probably because 63 is already a big number to apprehend for us! Like the king, nowadays against the exponential growth of the pandemic or climate change, we are not equipped mentally to imagine the consequences.

:::info

Sissa only asks for the quantity on the last square, since the last square contains as many grains as the rest of the squares on the board. Another fun and unintuitive property of this problem.

:::

We all have a lot of automatisms in order to simplify an issue, trying to bring it under 10 in order to solve this on our fingers. **Thus, if I come across a menu with 10 points to distribute across 5 sliders, I will see 5 choices to make, not 1 choice out of 1001 combinations**.

As designers, programmers, game makers, ... we might know the full complexity of our systems, but we must never assume that players will or should have that knowledge.

---

## Conclusion

Like any scientific measure, sizing your game systems must be analyzed and put in context. A big number doesn't necessarily mean big in-game value. And that's what I find fascinating about game design: its defiance towards mathematical logic.
