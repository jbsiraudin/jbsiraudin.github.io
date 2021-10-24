# jb siraudin's portfolio (2021)

import Image from "../components/Image";
import Iframe from "../components/Iframe";
import Video from "../components/Video";
import Small from "../components/Small";

Here is a collection of visuals showcasing the various projects I worked on or currently working on.

---

## Games

### Skull and Bones (2020-...)

<Image srcImage="https://upload.wikimedia.org/wikipedia/en/8/81/Skull_%26_Bones_video_game.jpg" legend="The latest official poster of Skull and Bones ... until the new one is revealed!"/>

Game Design & Previz on Skull & Bones, an AAA Ubisoft Original.

- Helped multiple internal teams with design problems in a transversal previz role, with a focus on realization and user experience.
- Developed dozens of UX and design prototypes, written with Javascript and playable with a gamepad.
- Design owner on two PvPvE gameplay features, leading the implementation in the Anvil pipeline while collaborating with multiple departments.
- Edited 10 internal videos to showcase the work of the Paris team on important milestones.

I can't say much until the game is out! I'll update this section when I'm able to.

<br/>

### [papertoy.dev](https://www.papertoy.dev/) (2021)

<Image srcImage="img/illustrations/papertoy.png" legend="Papertoy Code Editor (October 2021)"/>

Inspired by [Shadertoy](https://www.shadertoy.com), **Papertoy** lets you build interactive prototypes in your browser, with Javascript and Paper.js. It is targeted to console developers, with full gamepad support.

I developed this code editor in a few days after a year of experimenting with web UX/UI prototyping at Ubisoft. I gave a conference about what I built and people were interested in adopting this kind of workflow, but without the barrier of knowing web development basics.

The project is still young and riddled with issues, but is very promising and will eventually be my main tool for building my own prototypes!

---

## [Scinema](https://www.youtube.com/c/Scinemax)

Scinema is a french YouTube channel about science + cinema.

I make videos about science by using the world of cinema as a hook. How strong the wind has to be in order to make Mary Poppins fly? Is 4K really useful for movies? How to simulate water in VFX? What is the science behind humor? That kind of stuff.

Scinema has over 120 000 subscribers, attracted a little bit over a million views, won the "Science popularization" award at the Frames Video Web Festival 2018 in France and was chosen by Arte and Youtube France to be featured on the "Learning" tab of Youtube.

Below is a description for 2 videos that attracted the most interest until now.

### The logic of humor

<Iframe srcUrl="https://www.youtube.com/embed/vUNPAkLGDiI" legend="No english subs yet, sorry!" />

This video gives an overview of the peculiar scientific field around humor, a field desperate to find some logic explanation behind it. The second part of the video focuses on a even more peculiar phenomenon : cringe comedy. And for that, I use the quintessential show in this matter : The Office.

<details>
  <summary>Behind the scenes (the win98 esthetic)</summary>
  <div>
    <Iframe srcUrl="https://www.youtube.com/embed/EHI464tJ07I" />
    <br/>
    <p>This live (in French sadly) described in details the edit in Premiere and the different rigs and comps I built in After Effects to achieve the win98 look.</p>
  </div>
</details>

I was lucky enough to be [featured again on the french magazine Télérama](https://www.telerama.fr/television/sur-la-chaine-scinema,-lhumour,-cest-du-serieux,n6625244.php) with a nice article about the video.

### Monsters & energy

<Iframe srcUrl="https://www.youtube.com/embed/KEtmZ8uMiWI" legend="English subs are available on this one!" />

What kind of monster would use children for their energy industry? Well ... a Pixar monster actually. This video analyzes how the monsters from Monsters, inc would convert children screams into electricity.

<details>
  <summary>Behind the scenes (the title sequence)</summary>
  <div>
  <p>
  As you may have noticed I reanimated the Monsters Inc's title sequence on the film. Here is a video comparing the two sequences.
  </p>
  
  <Iframe srcUrl="https://www.youtube.com/embed/LEk66Nasgjk" />
  <br/>
  <p>
  Everything is animated with After Effects, with a custom expression system for generating the look of each doors, leveraging master properties.
  </p>
  <Image
    srcImage="img/portfolio/mcie1.gif"
  />
  <p class="legend">A demo workflow for working with the doors</p>
  <br />
  <div class="gallery">
    <Image
      srcImage="img/portfolio/mcie2.gif"
      halfWidth
    />
    <Image
      srcImage="img/portfolio/mcie3.gif"
      halfWidth
    />
  </div>
  <p class="legend">
    Demo for the snake rig (left) and compositing details for a few shots (right)
  </p>
  <p>
  The video also features all kinds of motion graphics and compositing work.
  </p>
  <div class="gallery">
    <Image
      srcImage="img/portfolio/mcie6.png"
      halfWidth
    />
    <Image
      srcImage="img/portfolio/mcie7.png"
      halfWidth
    />
  </div>
  <div class="gallery">
    <Image
      srcImage="img/portfolio/mcie8.gif"
      halfWidth
    />
    <Image
      srcImage="img/portfolio/mcie9.gif"
      halfWidth
    />
  </div>
  <div class="gallery">
    <Image
      srcImage="img/portfolio/mcie4.png"
      halfWidth
    />
    <Image
      srcImage="img/portfolio/mcie5.png"
      halfWidth
    />
  </div>
  <p class="legend">Stills and gifs taken from the video</p>
  <br/>
  </div>
</details>

A few press articles covered it at the time and it was a nice [first feature in Télérama](https://www.telerama.fr/medias/monstres-energie-par-scinema-les-cris-denfants,-remede-a-la-crise-energetique,n6102988.php) for Scinéma!

---

## Graphics

### [The Shape of Movies](http://www.theshapeofmovies.com)

The Shape of Movies is a website about visualizing the colors of movies.

I developed the offline program to get the color palette of every frame of a movie, with OpenCV. Then I made this website to have an fun interactive viz of my results, with MeteorJS, ReactJS and PixiJS.

The design of the website is inspired by the plainness of scientific papers made with LateX.

<Image
  srcImage="img/portfolio/tsom2.png"
  altText="previous-website-look"
  legend="Demo look for a search request on the website"
/>

Other cool projects like the [Colors of Motion](https://thecolorsofmotion.com/) or [Cinemetrics](http://cinemetrics.fredericbrodbeck.de/) inspired my focus on movie color palettes.

I recently remade the website with NextJS to make it easier for me to handle in the future.

<Image
  srcImage="img/portfolio/tsom1.png"
  altText="current-website-look"
  legend="Front page of The Shape of Movies"
/>

### Animation with Kelvinlets

#### Streamlining a sculpting method for animation purposes

The idea is to apply sculpting brushes dynamically. I chose the Kelvinlets brush for their flexibility and scalability both in space and time. For the [github version build in C++ and Qt](https://github.com/jbsiraudin/unikel), you create a path with keyPoints, each keyPoint containing brush sculpting parameters (scale, rotation, radius of the brush, ...). The program create brushes along the path, interpolating the values of the keyPoints, always applying the translate brush. 3 brushes are applied at a time, selected close to the center of the bounding box of the model to ensure that the model "travels" along the
path.

Initially thought to be a solution for designing a vortex animation for a 3D animated short, I expanded the capacities with the implementation of Dynamic Kelvinlets, for secondary elastic movements.

<Video srcVideo="/img/portfolio/test1.webm" />

<Video srcVideo="/img/portfolio/test2.webm" />

<br/>

It was first a school project, and I made another implementation in Unity with compute shaders.

<br/>

<Iframe srcUrl="https://www.youtube.com/embed/icINRLGSq4Y" />

<br/>

---

## Random stuff

### Animated posters

I really like [Kevin Tong's work](https://tragic-sunshine.myshopify.com/") so I took a shot at animating the two posters he did for Naughty Dog. All work was done with Photoshop and After Effects.

<div className="gallery">
  <Image
    srcImage="img/portfolio/tlou1.jpg"
    halfWidth
  />
  <Image
    srcImage="img/portfolio/tlou2.jpg"
    halfWidth
  />
</div>

<p class="legend">Kevin Tong's original posters</p>

<div className="gallery">
  <Video
    srcVideo="img/portfolio/tlouanim1.mp4"
    width="400"
    height="600"
  />
  <Video
    srcVideo="img/portfolio/tlouanim2.mp4"
    width="400"
    height="600"
  />
</div>

<p class="legend">My animated versions of the posters</p>

### [Chrome extension "Buy mode"](https://chrome.google.com/webstore/detail/buy-mode/chelhfjncfodagiaajlcedabncohepag?hl=en)

A silly little chrome extension that launches The Sims' Buy Mode music playlist when you enter Amazon's website and stops it when you leave it.
The code is [available on my GitHub](https://github.com/jbsiraudin/buymode-amazon).

<br/>
<br/>
<br/>
