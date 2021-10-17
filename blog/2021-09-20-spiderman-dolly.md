---
slug: spiderman-dolly
title: "The almost unintentional dolly of Insomniac's Spidercam"
draft: true
hide_table_of_contents: true
tags: [game design, 3C, camera]
---

Let's face it: Alfred Hitchcock didn't plan for this.

<!--truncate-->

import Image from "../src/components/Image"
import Iframe from "../src/components/Iframe"
import Video from "../src/components/Video"
import Dolly from "../src/components/Dolly/Dolly"

---

**Thanks to the incredible work of Insomniac Games, you can shoot webs and swing your way across Manhattan's rooftops with Spider-Man.** I lived and worked in New York for about half a year during my studies and revisiting the city like this was a joy, especially during this pandemic. I remembered the constant buzz outside my window, the shitty subway, the incredible restaurants and the many drunk parties where I'd leave convinced that I could just go back home by foot even though I was in the middle of Brooklyn at 3am and my rented place was in East Harlem, 15 kilometers away.

**That's the main thing you quickly learn about New York: it's huge**. I spent the majority of my life around Paris and its suburbs, an arguably big city, but I was still surprised by the scale of New York. I'm used to walk a lot in Paris, and you can go nearly anywhere in about an hour of walk, something not really possible in New York with its lengthy rectangular shape. The height of the buildings, the length of the streets, ... it was a change of perspective about how I could move in an urban space.

**Talking about perspective, Spider-Man's traversal gameplay was quite the change ... and literally too.**

<Iframe srcUrl="https://giphy.com/embed/0m5fac1iC8gNhjEUzV" legend="Focus on the buildings ahead." />

This is the first thing I noticed when I started swinging: **the street seems to elongate itself with the acceleration of each swing.** Time to investigate this theory.

In the GDC talk [Concrete Jungle Gym: Building Traversal in Marvel's Spider-Man](https://youtu.be/OEaGEaCUq3g), gameplay programmer Doug Sheahan explains the requirements on a _dynamic camera_ for their mandate **"Play as a superhero movie feels"**:

> The look and feel of swinging needed to be fluid, fast, exciting and especially _cinematic_. We needed a camera that helped translate all that high-flying acrobatics and velocity into a really visceral experience for the player, something that they could just feel in their gut.

**So from a minimim amount of player input, all that speed and that perfect pendulum physics needs to be communicated to the player visually.** They are doing a lot of smart dynamic framing, like adjusting the camera pitch to the tangent of the pendulum arc as well as moving the character screen position up and down along the arc to help sensing the verticality of the pendulum.

But **for feeling the speed**, even if sound wooshes and motion will help immensely, **Insomniac developed other visual cues in order to sell changes of speed specifically.**

**Two parameters are dynamically increased in real-time according to the character's speed: FoV and follow distance** (in cinematography language: the focal length and the distance between the camera and the character).

<br/>
<Video srcVideo="img/illustrations/Dolly3.mp4" legend="Doug blesses us with debug display footage showing the dynamic control of FoV and follow distance." />
<br/>

Notice how every web shoot triggers a bump in FoV, giving us for an instant ... **a Dolly Zoom**.

<Image srcImage="img/illustrations/vertigo.gif" legend="Vertigo (1958)" />

The **Dolly Zoom** is a camera shot invented by the cameraman Irmin Roberts for **Alfred Hitchcock's Vertigo**, initially in order to convey the feeling of **acrophobia** (intensely felt by the character played by James Stewart in the film).

The principle behind the shot is very simple: **zoom in with the lens while simultaneously moving the camera backwards … or vice versa.**

<br/>
<Image srcImage="https://upload.wikimedia.org/wikipedia/commons/c/c7/Contra-zoom_aka_dolly_zoom_animation.gif" legend="A Dolly Zoom setup" />
<br/>

Since Vertigo, it has been used countless times in other movies. Unfortunately, it's often used because it looks cool rather than using it because it conveys a particular emotion in the context of the film.

Among the [best dolly zooms of all time](https://vimeo.com/84548119), you'll find the ones from **Jaws, Raging Bull or La Haine**:

<Image srcImage="https://c.tenor.com/aGjB0c7wgOYAAAAC/jaws-dolly.gif" legend="Jaws (1975)" />

<Image srcImage="https://i.gifer.com/5ZGr.gif" legend="Raging Bull (1980)"/>

<Image srcImage="https://filmschoolrejects.com/wp-content/uploads/2021/01/Fellowship-of-the-Ring-dolly-zoom.gif" legend="The Lord of the Rings: The Fellowship of the Ring (2001)" />

<Image srcImage="https://64.media.tumblr.com/a4df39f5cc65ce932ae05d6d12e3f962/tumblr_nukogo6nqd1td9opyo1_400.gifv" legend="La Haine (1995)"/>

From spotting a deadly shark, the climax of a box fight and the turning point for a group of friends, **all those shots use the Dolly Zoom for a particular effect and a particular meaning.**

**La Haine** is a movie split in two parts: first, we follow the characters in their hometown, a place they are familiar and comfortable with, shot with short focal length cameras on steadycams. But when the characters head to Paris, this Dolly Zoom shifts the camera to use a long focal length for the rest of the film, squashing perspectives and visually feedbacking the uneasiness of the characters in this environment.

You can spot dolly zooms in the camera work of video games too, sometimes as a direct recreation of the Vertigo shot.

<Iframe srcUrl="https://www.youtube.com/embed/YpTI8wpKDk8" legend="In The Last of Us 2, Abby is terrified of heights." />

<p style={{fontSize: 24, textAlign: "center", fontWeight: "bold", marginTop: 72 }}>
But why do we even have a Dolly effect in Spider-Man?
</p>

The principle behind the Dolly effect we see in Spider-Man or Vertigo is to **zoom out with the lens while moving the camera forward**. But as Doug Sheahan showed us, **the FoV and the Follow Distance both increase as the acceleration kick in: isn't this the wrong setup?**.

<br/>
<Iframe srcUrl="https://giphy.com/embed/0m5fac1iC8gNhjEUzV" legend="Do you see it better now?" />

Well no, it's still the correct setup. **As you saw in the previous shots, the subject of the dolly zoom in cinema is static, whereas Spider-Man is moving forward at 80 miles an hour (not a real value).**

**So, even if the follow distance increases, the camera is still going forward while the FoV increases in world coordinates**: this is what creates the Dolly Zoom. The increase in follow-distance actually helps maintaining the Dolly effect as long as possible since it briefly decreases the forward speed of the camera in world coordinates.

The high forward speed of Spider-Man also explains why the effect fades out so quickly and naturally too.

**Another great feature of Spider-Man improving the Dolly effect is Manhattan.** Indeed the Dolly Zoom is particularly effective in corridors, when you can observe the walls on the side changing length:

<Image srcImage="https://filmschoolrejects.com/wp-content/uploads/2021/01/Poltergeist-dolly-zoom.gif" legend="Poltergeist (1982)" />

The geometry of Manhattan coupled with Spider-Man swing high rythm creates this Dolly heartbeat, where you're constantly feeling the rush of an acceleration.

<Iframe srcUrl="https://giphy.com/embed/uLMttwMsaBIEPKmEEU" legend="Next, give us the glider of the Green Goblin please." />

**Spider-Man's camera is the quintessential example of creating a positive interaction between classic optics effects and all the properties of its world and its character.** And I can't wait to see more soon!

<!--
<Image srcImage="https://vashivisuals.com/wp-content/uploads/2014/01/Halt-Catch-Fire-Zoom.gif" legend="Halt and Catch Fire (2014-2017)" />
https://en.wikipedia.org/wiki/Dolly_zoom
https://vashivisuals.com/evolution-dolly-zoom/
https://en.wikipedia.org/wiki/Dolly_zoom
https://giphy.com/explore/the-dolly-zoom

<Iframe srcUrl="https://www.shadertoy.com/embed/tljcDK?gui=false&t=0&paused=true&muted=true" />
 -->

---

If you want to do a Dolly at home, I'll give you a bit of help. An effective dolly zoom keeps the subject exactly at the same size, while everything else scales. Thus, if we position our center on the subject, if we want to know the new camera position $x_{1}$ from the initial camera position $x_{0}$, the initial fov angle $\alpha$ and the zoom factor $z$ we want for our Dolly, the formula is:

$$
x_{1} = \frac{tan(\frac{\alpha}{2})}{tan(\frac{\alpha}{2*z})}*x_{0} = a*x_{0}
$$

You can control below the zoom factor to see how $a$ evolves on the drawing:

<Dolly />

<p style={{fontSize: 12}}>All the Spider-Man additional gameplay of this article was extracted from <a href="https://youtu.be/eEPG4TMhwtk" target="_blank" rel="noopener noreferrer">this video</a>.</p>
