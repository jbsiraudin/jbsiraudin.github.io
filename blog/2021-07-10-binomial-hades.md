---
slug: permutations-pact-of-punishment-hades
title: The endgame of Hades loves the binomial coefficient, while human brains hate it
draft: false
tags: [maths for game design, hades, procedural, game design]
---

**Combinatorics** is not dead. Let's take another stab at it.

<!--truncate-->

import Image from "../src/components/Image"
import Iframe from "../src/components/Iframe"
import Configurations from "../src/components/Combinatorics/Configurations"
import SimplePointDistribute from "../src/components/Combinatorics/SimplePointDistribute"
import Permutations from "../src/components/Combinatorics/Permutations"

---

> [Combinatorics](https://en.wikipedia.org/wiki/Combinatorics) is an area of mathematics primarily concerned with counting, both as a means and an end in obtaining results, and certain properties of finite structures. It is closely related to many other areas of mathematics and has many applications ranging from logic to statistical physics, from evolutionary biology to computer science, ... **and game design!**

---

**Hades** blossoms in the repetition of runs, so of course I would do more than one article on it. I recommend reading the [first article](/blog/arrangements-hell-hades) before this one though!

---

## The size of the Pact of Punishment

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

## Also: we suck at math

You may have been surprised by the gigantic numbers the different calculus outputted. The thing is: **we are really bad with dealing with huge numbers**. It's really difficult to get a natural hunch about combinatorics, because our brain is not natively wired for it.

An [indian legend](https://en.wikipedia.org/wiki/Wheat_and_chessboard_problem) tells the story of the king Belbik who promised a reward for anyone who could distract him out of his boredom. The brahmin Sissa invents chess to the delight of the king, who asks Sissa how he wants be rewarded. Sissa tells the king to put one grain of rice on the first square of the chessboard, two on the second square, four on the third, and so on doubling the number of grains on each square : Sissa will only take the grains on the 64th square of the chessboard. The king is amused by this request and accept immediately. Here is what the numbers would look like on the chessboard:

<Image srcImage="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Wheat_Chessboard_with_line.svg/1024px-Wheat_Chessboard_with_line.svg.png" halfWidth legend="You can imagine the drop of sweat on the face of the King Belbik now. (Source wikipedia)"/>

The 64th square would contain $2^{64} = 9,223,372,036,854,775,808$ grains of rice, 10 billions of billions of grains, so 300 years at the actual rice mondial production rate! This quantity can't be hold on a single square since if we put the grains on the area of Paris, the layer would be 2km tall, weighing 200 billions of tons ([source](https://theconversation.com/face-au-mur-de-la-croissance-exponentielle-135331)).

The king didn't anticipate the crazy growth of a number doubled 63 times, probably because 63 is already a big number to apprehend for us! Like the king, nowadays against the exponential growth of the pandemic or climate change, we are not equipped mentally to imagine the consequences.

:::info

Sissa only asks for the quantity on the last square, since the last square contains as many grains as the rest of the squares on the board. Another fun and unintuitive property of this problem.

:::

We all have a lot of automatisms in order to simplify an issue, trying to bring it under 10 in order to solve this on our fingers. **Thus, if I come across a menu with 10 points to distribute across 5 sliders, I will see 5 choices to make, not 1 choice out of 1001 combinations**. To further cancel this potential complexity, most games won't allow you to reinvest freely your points into an entirely new build: you spend your points one by one, without reimbursement, so you make your way into the system, 5 choices at a time.

As designers, programmers, game makers, ... we might know the full complexity of our systems, but we must never assume that players will or should have that knowledge.

---

## Conclusion (bis)

Like any scientific measure, sizing your game systems must be analyzed and put in context. A big number doesn't necessarily mean big in-game value. And that's what I find fascinating about game design: its _defiance_ towards mathematical logic.
