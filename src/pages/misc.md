# jb siraudin's misc stuff (2023)

import Image from "../components/Image";
import CarouselImage from "../components/CarouselImage";
import Iframe from "../components/Iframe";
import Video from "../components/Video";
import Small from "../components/Small";

Random collection of small stuff I made.

---

### Shadertoy library
<br/>
<Iframe srcUrl="https://www.shadertoy.com/embed/Wd2fWR?gui=true&t=10&paused=true&muted=false" width="640" height="360" legend="Pure 2D sdf drawing to reacreate a 3D isometric effect" />
<br/>
<Iframe srcUrl="https://www.shadertoy.com/embed/M3SXzV?gui=true&t=10&paused=true&muted=false" width="640" height="360" legend="Super simple color vortex" />
<br/>

### THPS

Using Blender, I recreated a sketch from the game design document of _Tony Hawk Pro Skater_ I found online, pitching a map for the game. I found the sketch a really inspiring way to convey the mood and design elements of the level, and wanted to see it could be translated in 3D.

<CarouselImage srcImages={["img/misc/THPS_GDD.jpg", "img/misc/THPS-final.png"]} keyInit="thps" />
<p class="legend">
  Page from THPS GDD (left) and final render from Blender Eevee (right)
</p>
<br/>

### Animated posters

I really like [Kevin Tong's work](https://tragic-sunshine.myshopify.com/") so I took a shot at animating the two posters he did for Naughty Dog. All work was done with Photoshop and After Effects.

<div className="gallery">
  <Image
    srcImage="img/misc/tlou1.jpg"
    halfWidth
  />
  <Image
    srcImage="img/misc/tlou2.jpg"
    halfWidth
  />
</div>

<p class="legend">Kevin Tong's original posters</p>

<div className="gallery">
  <Video
    srcVideo="img/misc/tlouanim1.mp4"
    width="400"
    height="600"
  />
  <Video
    srcVideo="img/misc/tlouanim2.mp4"
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
