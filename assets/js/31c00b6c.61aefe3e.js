"use strict";(self.webpackChunkjb_blog=self.webpackChunkjb_blog||[]).push([[1501],{2960:(e,s,n)=>{n.r(s),n.d(s,{assets:()=>x,contentTitle:()=>d,default:()=>u,frontMatter:()=>m,metadata:()=>p,toc:()=>g});var t=n(4848),a=n(8453),i=n(2929),l=n(2446),r=n(3559),o=n(6540),c=n(5293);const h=()=>{const{colorMode:e,setColorMode:s}=(0,c.G)(),n=(0,o.useRef)(null);return(0,o.useEffect)((()=>{!function(){const s=`\n<!DOCTYPE html>\n<html>\n<head>\n\x3c!-- Load the Paper.js library --\x3e\n<script src="https://cdnjs.cloudflare.com/ajax/libs/paper.js/0.12.15/paper-full.js" integrity="sha512-XV5MGZ7Tv+G60rzU8P7tPUlaf0yz7SJ/uI9CLAwyLcZKl9kzxJQFs3nsBNZVNVAwNOkBLqrzMvjGMEycDccqiA==" crossorigin="anonymous" referrerpolicy="no-referrer"><\/script>\n\x3c!-- Define inlined PaperScript associate it with myCanvas --\x3e\n<script type="text/paperscript" canvas="paper-canvas">\n  var colReadable = ${"dark"===e?"'white'":"'black'"};\n  \nfunction drawAngle(center, angle, label, value) {\n\tvar radius = 25, threshold = 10;\n\tvar init = new Point(radius, 0);\n\tvar from = init.rotate(-angle / 2)\n\tvar through = from.rotate(angle / 2);\n\tvar to = from.rotate(angle);\n\tvar end = center + to;\n\tvar line = new Path.Line({\n\t    from: center,\n\t\tto: center + new Point(radius + threshold, 0),\n\t    strokeColor: '#8b8b8b',\n\t\tfillColor: null,\n\t\tdashArray: [1, 2],\n        strokeWidth: 1,\n\t});\n\tvar arc = new Path.Arc({\n        from: center + from,\n        through: center + through,\n        to: end,\n        strokeColor: '#8b8b8b',\n\t\tfillColor: null,\n\t\tdashArray: [1, 2],\n\t\tstrokeWidth: 1,\n    });\n\n\tif (Math.abs(angle) > 15) {\n\t\tvar arrowVector = to.normalize(7.5).rotate(angle < 0 ? -90 : 90);\n\t\t\n\t\tvar path = new Path.Arc({\n            segments: [\n\t\t\t\tend + arrowVector.rotate(135),\n\t\t\t\tend,\n\t\t\t\tend + arrowVector.rotate(-135)\n\t\t],\n            strokeColor: '#8b8b8b',\n    \t\tfillColor: null,\n    \t\tdashArray: [1, 2]\n        });\n\t};\n\t\n\tif (label) {\n\t\t// Angle Label\n\t\tvar text = new PointText(center\n\t\t\t\t+ through.normalize(radius + 10) + new Point(0, -15));\n\t\ttext.content = 'zoom: ' + value.toFixed(2);\n\t\ttext.fontSize = 12;\n    text.fillColor = colReadable;\n\t}\n\treturn true;\n}\n\nfunction drawLength(from, to, sign, label, value, prefix) {\n\tvar lengthSize = 5;\n\tvar vector = to - from;\n\tvar awayVector = vector.normalize(lengthSize).rotate(90 * sign);\n\tvar upVector = vector.normalize(lengthSize).rotate(45 * sign);\n\tvar downVector = upVector.rotate(-90 * sign);\n\tvar lengthVector = vector.normalize(\n\t\t\tvector.length / 2 - lengthSize * Math.sqrt(2));\n\tvar line = new Path();\n\tline.add(from + awayVector);\n\tline.lineBy(upVector);\n\tline.lineBy(lengthVector);\n\tline.lineBy(upVector);\n\tvar middle = line.lastSegment.point;\n\tline.lineBy(downVector);\n\tline.lineBy(lengthVector);\n\tline.lineBy(downVector);\n\t\n\tline.strokeColor= '#8b8b8b';\n\tline.fillColor= null;\n\tline.dashArray= [1, 2];\n\n\tif (label) {\n\t\t// Length Label\n\t\tvar textAngle = Math.abs(vector.angle) > 90\n\t\t\t\t? textAngle = 180 + vector.angle : vector.angle;\n\t\t// Label needs to move away by different amounts based on the\n\t\t// vector's quadrant:\n\t\tvar away = (sign >= 0 ? [1, 4] : [2, 3]).indexOf(vector.quadrant) != -1\n\t\t\t\t? 8 : 0;\n\t\tvar text = new PointText({\n\t\t\tpoint: middle + awayVector.normalize(away + lengthSize),\n\t\t\tfontSize: 12,\n\t\t\tjustification: 'center',\n      fillColor: colReadable,\n\t\t});\n\t\ttext.rotate(textAngle);\n\t\tvalue = value || vector.length;\n    var valueToPrint = Math.floor(value * 1000) / 1000\n\t\ttext.content = 'a: ' + (prefix || '') + valueToPrint.toFixed(2);\n\t}\n}\n\nvar w = 500;\nvar h = 250;\n\n\nvar aW = 3;\nvar aH = 3;\nvar zeroX = 0.5*w;\n\n\nvar sizeCam = 5;\nvar sizeH = 100;\n\nfunction getTan(angle) {\n    return Math.tan(angle * Math.PI / 180)\n}\n\nfunction drawCamera(position, fov, color, id) {\n    var box = new Shape.Rectangle({\n        from: position - [sizeCam, sizeCam],\n        to: position + [sizeCam, sizeCam],\n        fillColor: color,\n        strokeWidth: 0\n    });\n    var line1 = new Path.Line({\n        from: position,\n        to: position + [sizeH/getTan(fov/2), sizeH],\n        strokeColor: color\n    })\n    var line2 = new Path.Line({\n        from: position,\n        to: position + [sizeH/getTan(fov/2), -sizeH],\n        strokeColor: color\n    })\n    var line3 = new Path.Line({\n        from: position + [sizeH/getTan(fov/2), sizeH],\n        to: position + [sizeH/getTan(fov/2), -sizeH],\n        strokeColor: color\n    });\n\n    var text = new PointText({\n        content: id,\n        point: position + [0, 20],\n        fontSize: 12,\n        justification: 'center',\n        fillColor: color,\n    });\n}\n\nview.onFrame = function(event) {\n    project.clear();\n    var zoomAmplitude = (2-0.5)/2;\n    var z = 0.5 + (zoomAmplitude)*(1 + Math.sin(event.time*0.5));\n    var fov = 60;\n    var zero = new Point(zeroX, h/2);\n\n    var axis = new Path.Line({\n        from: [0, h/2],\n        to: [w, h/2],\n        strokeColor: colReadable,\n        strokeWidth: 1,\n    });\n    var arrowAxis = new Path({\n        segments: [[w-aW, h/2-aH], [w, h/2], [w-aW, h/2+aH]],\n        fillColor: 'transparent',\n        strokeColor: colReadable,\n        strokeWidth: 1,\n    });\n\n    var segmentZero = new Path.Line({\n        from: [zeroX, h/2-5],\n        to: [zeroX, h/2+5],\n        strokeColor: colReadable,\n        strokeWidth: 1,\n    })\n\n    var cam1 = new Point(zeroX - 100, h/2);\n    var a = getTan(fov/2)/getTan(fov/(2*z));\n    var cam2 = new Point(zeroX - a*100, h/2);\n\n    drawCamera(cam1, fov, "red", "x0");\n    drawCamera(cam2, fov/z, "green", "x1");\n\n    drawLength(cam2 + [0, 40], zero + [0, 40], 1, true, a, "");\n    drawAngle(cam2, fov/z, true, z);\n}\n\n<\/script>\n<style>\nhtml,\nbody {\n    width: 100%;\n    height: 100%;\n    margin: 0;\n}\n\n/* Scale canvas with resize attribute to full size */\ncanvas {\n    width: 100%;\n    height: 100%;\n}\n</style>\n</head>\n<body>\n\t<canvas id="paper-canvas" resize></canvas>\n</body>\n</html>\n    `;n.current.contentDocument.open(),n.current.contentDocument.write(s),n.current.contentDocument.close()}()}),[e]),(0,t.jsx)("div",{className:"dolly",children:(0,t.jsx)("iframe",{ref:n,width:500,height:250})})},m={slug:"spiderman-dolly",title:"The almost unintentional dolly of Insomniac's Spidercam",draft:!1,hide_table_of_contents:!0,tags:["game design","3C","camera"]},d=void 0,p={permalink:"/blog/spiderman-dolly",source:"@site/blog/2021-09-20-spiderman-dolly.md",title:"The almost unintentional dolly of Insomniac's Spidercam",description:"Let's face it: Alfred Hitchcock didn't plan for this.",date:"2021-09-20T00:00:00.000Z",formattedDate:"September 20, 2021",tags:[{label:"game design",permalink:"/blog/tags/game-design"},{label:"3C",permalink:"/blog/tags/3-c"},{label:"camera",permalink:"/blog/tags/camera"}],readingTime:6.985,hasTruncateMarker:!0,authors:[],frontMatter:{slug:"spiderman-dolly",title:"The almost unintentional dolly of Insomniac's Spidercam",draft:!1,hide_table_of_contents:!0,tags:["game design","3C","camera"]},unlisted:!1,prevItem:{title:"A pixel is not a \u25fb",permalink:"/blog/pixels"},nextItem:{title:"Sentences? They rule: syntax as a game mechanic",permalink:"/blog/sentences-rule"}},x={authorsImageUrls:[]},g=[];function j(e){const s={a:"a",annotation:"annotation",blockquote:"blockquote",em:"em",hr:"hr",math:"math",mfrac:"mfrac",mi:"mi",mn:"mn",mo:"mo",mrow:"mrow",msub:"msub",p:"p",semantics:"semantics",span:"span",strong:"strong",...(0,a.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(s.p,{children:"Let's face it: Alfred Hitchcock didn't plan for this."}),"\n","\n","\n",(0,t.jsx)(s.hr,{}),"\n",(0,t.jsxs)(s.p,{children:[(0,t.jsx)(s.strong,{children:"Thanks to the incredible work of Insomniac Games, you can shoot webs and swing your way across Manhattan's rooftops with Spider-Man."})," I lived and worked in New York for about half a year during my studies and revisiting the city like this was a joy, especially during this pandemic. I remembered the constant buzz outside my window, the shitty subway, the incredible restaurants and the many drunk parties where I'd leave convinced that I could just go back home by foot even though I was in the middle of Brooklyn at 3am and my rented place was in East Harlem, 15 kilometers away."]}),"\n",(0,t.jsxs)(s.p,{children:[(0,t.jsx)(s.strong,{children:"That's the main thing you quickly learn about New York: it's huge"}),". I spent the majority of my life around Paris and its suburbs, an arguably big city, but I was still surprised by the scale of New York. I'm used to walk a lot in Paris, and you can go nearly anywhere in about an hour of walk, something not really possible in New York with its lengthy rectangular shape. The height of the buildings, the length of the streets, ... it was a change of perspective about how I could move in an urban space."]}),"\n",(0,t.jsx)(s.p,{children:(0,t.jsx)(s.strong,{children:"Talking about perspective, Spider-Man's traversal gameplay was quite the change ... and literally too."})}),"\n",(0,t.jsx)(l.A,{srcUrl:"https://giphy.com/embed/0m5fac1iC8gNhjEUzV",legend:"Focus on the buildings ahead."}),"\n",(0,t.jsxs)(s.p,{children:["This is the first thing I noticed when I started swinging: ",(0,t.jsx)(s.strong,{children:"the street seems to elongate itself with the acceleration of each swing."})," Time to investigate this theory."]}),"\n",(0,t.jsxs)(s.p,{children:["In the GDC talk ",(0,t.jsx)(s.a,{href:"https://youtu.be/OEaGEaCUq3g",children:"Concrete Jungle Gym: Building Traversal in Marvel's Spider-Man"}),", gameplay programmer Doug Sheahan explains the requirements on a ",(0,t.jsx)(s.em,{children:"dynamic camera"})," for their mandate ",(0,t.jsx)(s.strong,{children:'"Play as a superhero movie feels"'}),":"]}),"\n",(0,t.jsxs)(s.blockquote,{children:["\n",(0,t.jsxs)(s.p,{children:["The look and feel of swinging needed to be fluid, fast, exciting and especially ",(0,t.jsx)(s.em,{children:"cinematic"}),". We needed a camera that helped translate all that high-flying acrobatics and velocity into a really visceral experience for the player, something that they could just feel in their gut."]}),"\n"]}),"\n",(0,t.jsxs)(s.p,{children:[(0,t.jsx)(s.strong,{children:"So from a minimim amount of player input, all that speed and that perfect pendulum physics needs to be communicated to the player visually."})," They are doing a lot of smart dynamic framing, like adjusting the camera pitch to the tangent of the pendulum arc as well as moving the character screen position up and down along the arc to help sensing the verticality of the pendulum."]}),"\n",(0,t.jsxs)(s.p,{children:["But ",(0,t.jsx)(s.strong,{children:"for feeling the speed"}),", even if sound wooshes and motion will help immensely, ",(0,t.jsx)(s.strong,{children:"Insomniac developed other visual cues in order to sell changes of speed specifically."})]}),"\n",(0,t.jsxs)(s.p,{children:[(0,t.jsx)(s.strong,{children:"Two parameters are dynamically increased in real-time according to the character's speed: FoV and follow distance"})," (in cinematography language: the focal length and the distance between the camera and the character)."]}),"\n",(0,t.jsx)("br",{}),"\n",(0,t.jsx)(r.A,{srcVideo:"img/illustrations/Dolly3.mp4",legend:"Doug blesses us with debug display footage showing the dynamic control of FoV and follow distance."}),"\n",(0,t.jsx)("br",{}),"\n",(0,t.jsxs)(s.p,{children:["Notice how every web shoot triggers a bump in FoV, giving us for an instant ... ",(0,t.jsx)(s.strong,{children:"a Dolly Zoom"}),"."]}),"\n",(0,t.jsx)(i.A,{srcImage:"img/illustrations/vertigo.gif",legend:"Vertigo (1958)"}),"\n",(0,t.jsxs)(s.p,{children:["The ",(0,t.jsx)(s.strong,{children:"Dolly Zoom"})," is a camera shot invented by the cameraman Irmin Roberts for ",(0,t.jsx)(s.strong,{children:"Alfred Hitchcock's Vertigo"}),", initially in order to convey the feeling of ",(0,t.jsx)(s.strong,{children:"acrophobia"})," (intensely felt by the character played by James Stewart in the film)."]}),"\n",(0,t.jsxs)(s.p,{children:["The principle behind the shot is very simple: ",(0,t.jsx)(s.strong,{children:"zoom in with the lens while simultaneously moving the camera backwards \u2026 or vice versa."})]}),"\n",(0,t.jsx)("br",{}),"\n",(0,t.jsx)(i.A,{srcImage:"https://upload.wikimedia.org/wikipedia/commons/c/c7/Contra-zoom_aka_dolly_zoom_animation.gif",legend:"A Dolly Zoom setup"}),"\n",(0,t.jsx)("br",{}),"\n",(0,t.jsx)(s.p,{children:"Since Vertigo, it has been used countless times in other movies. Unfortunately, it's often used because it looks cool rather than using it because it conveys a particular emotion in the context of the film."}),"\n",(0,t.jsxs)(s.p,{children:["Among the ",(0,t.jsx)(s.a,{href:"https://vimeo.com/84548119",children:"best dolly zooms of all time"}),", you'll find the ones from ",(0,t.jsx)(s.strong,{children:"Jaws, Raging Bull or La Haine"}),":"]}),"\n",(0,t.jsx)(i.A,{srcImage:"https://c.tenor.com/aGjB0c7wgOYAAAAC/jaws-dolly.gif",legend:"Jaws (1975)"}),"\n",(0,t.jsx)(i.A,{srcImage:"https://i.gifer.com/5ZGr.gif",legend:"Raging Bull (1980)"}),"\n",(0,t.jsx)(i.A,{srcImage:"https://filmschoolrejects.com/wp-content/uploads/2021/01/Fellowship-of-the-Ring-dolly-zoom.gif",legend:"The Lord of the Rings: The Fellowship of the Ring (2001)"}),"\n",(0,t.jsx)(i.A,{srcImage:"https://64.media.tumblr.com/a4df39f5cc65ce932ae05d6d12e3f962/tumblr_nukogo6nqd1td9opyo1_400.gifv",legend:"La Haine (1995)"}),"\n",(0,t.jsxs)(s.p,{children:["From spotting a deadly shark, the climax of a box fight and the turning point for a group of friends, ",(0,t.jsx)(s.strong,{children:"all those shots use the Dolly Zoom for a particular effect and a particular meaning."})]}),"\n",(0,t.jsxs)(s.p,{children:[(0,t.jsx)(s.strong,{children:"La Haine"})," is a movie split in two parts: first, we follow the characters in their hometown, a place they are familiar and comfortable with, shot with short focal length cameras on steadycams. But when the characters head to Paris, this Dolly Zoom shifts the camera to use a long focal length for the rest of the film, squashing perspectives and visually feedbacking the uneasiness of the characters in this environment."]}),"\n",(0,t.jsx)(s.p,{children:"You can spot dolly zooms in the camera work of video games too, sometimes as a direct recreation of the Vertigo shot."}),"\n",(0,t.jsx)(l.A,{srcUrl:"https://www.youtube.com/embed/YpTI8wpKDk8",legend:"In The Last of Us 2, Abby is terrified of heights."}),"\n",(0,t.jsx)("p",{style:{fontSize:24,textAlign:"center",fontWeight:"bold",marginTop:72},children:(0,t.jsx)(s.p,{children:"But why do we even have a Dolly effect in Spider-Man?"})}),"\n",(0,t.jsxs)(s.p,{children:["The principle behind the Dolly effect we see in Spider-Man or Vertigo is to ",(0,t.jsx)(s.strong,{children:"zoom out with the lens while moving the camera forward"}),". But as Doug Sheahan showed us, ",(0,t.jsx)(s.strong,{children:"the FoV and the Follow Distance both increase as the acceleration kick in: isn't this the wrong setup?"}),"."]}),"\n",(0,t.jsx)("br",{}),"\n",(0,t.jsx)(l.A,{srcUrl:"https://giphy.com/embed/0m5fac1iC8gNhjEUzV",legend:"Do you see it better now?"}),"\n",(0,t.jsxs)(s.p,{children:["Well no, it's still the correct setup. ",(0,t.jsx)(s.strong,{children:"As you saw in the previous shots, the subject of the dolly zoom in cinema is static, whereas Spider-Man is moving forward at 80 miles an hour (not a real value)."})]}),"\n",(0,t.jsxs)(s.p,{children:[(0,t.jsx)(s.strong,{children:"So, even if the follow distance increases, the camera is still going forward while the FoV increases in world coordinates"}),": this is what creates the Dolly Zoom. The increase in follow-distance actually helps maintaining the Dolly effect as long as possible since it briefly decreases the forward speed of the camera in world coordinates."]}),"\n",(0,t.jsx)(s.p,{children:"The high forward speed of Spider-Man also explains why the effect fades out so quickly and naturally too."}),"\n",(0,t.jsxs)(s.p,{children:[(0,t.jsx)(s.strong,{children:"Another great feature of Spider-Man improving the Dolly effect is Manhattan."})," Indeed the Dolly Zoom is particularly effective in corridors, when you can observe the walls on the side changing length:"]}),"\n",(0,t.jsx)(i.A,{srcImage:"https://filmschoolrejects.com/wp-content/uploads/2021/01/Poltergeist-dolly-zoom.gif",legend:"Poltergeist (1982)"}),"\n",(0,t.jsx)(s.p,{children:"The geometry of Manhattan coupled with Spider-Man swing high rythm creates this Dolly heartbeat, where you're constantly feeling the rush of an acceleration."}),"\n",(0,t.jsx)(l.A,{srcUrl:"https://giphy.com/embed/uLMttwMsaBIEPKmEEU",legend:"Next, give us the glider of the Green Goblin please."}),"\n",(0,t.jsxs)(s.p,{children:[(0,t.jsx)(s.strong,{children:"Spider-Man's camera is the quintessential example of creating a positive interaction between classic optics effects and all the properties of its world and its character."})," And I can't wait to see more soon!"]}),"\n",(0,t.jsx)(s.hr,{}),"\n",(0,t.jsxs)(s.p,{children:["If you want to do a Dolly at home, I'll give you a bit of help. An effective dolly zoom keeps the subject exactly at the same size, while everything else scales. Thus, if we position our center on the subject, if we want to know the new camera position ",(0,t.jsxs)(s.span,{className:"katex",children:[(0,t.jsx)(s.span,{className:"katex-mathml",children:(0,t.jsx)(s.math,{xmlns:"http://www.w3.org/1998/Math/MathML",children:(0,t.jsxs)(s.semantics,{children:[(0,t.jsx)(s.mrow,{children:(0,t.jsxs)(s.msub,{children:[(0,t.jsx)(s.mi,{children:"x"}),(0,t.jsx)(s.mn,{children:"1"})]})}),(0,t.jsx)(s.annotation,{encoding:"application/x-tex",children:"x_{1}"})]})})}),(0,t.jsx)(s.span,{className:"katex-html","aria-hidden":"true",children:(0,t.jsxs)(s.span,{className:"base",children:[(0,t.jsx)(s.span,{className:"strut",style:{height:"0.5806em",verticalAlign:"-0.15em"}}),(0,t.jsxs)(s.span,{className:"mord",children:[(0,t.jsx)(s.span,{className:"mord mathnormal",children:"x"}),(0,t.jsx)(s.span,{className:"msupsub",children:(0,t.jsxs)(s.span,{className:"vlist-t vlist-t2",children:[(0,t.jsxs)(s.span,{className:"vlist-r",children:[(0,t.jsx)(s.span,{className:"vlist",style:{height:"0.3011em"},children:(0,t.jsxs)(s.span,{style:{top:"-2.55em",marginLeft:"0em",marginRight:"0.05em"},children:[(0,t.jsx)(s.span,{className:"pstrut",style:{height:"2.7em"}}),(0,t.jsx)(s.span,{className:"sizing reset-size6 size3 mtight",children:(0,t.jsx)(s.span,{className:"mord mtight",children:(0,t.jsx)(s.span,{className:"mord mtight",children:"1"})})})]})}),(0,t.jsx)(s.span,{className:"vlist-s",children:"\u200b"})]}),(0,t.jsx)(s.span,{className:"vlist-r",children:(0,t.jsx)(s.span,{className:"vlist",style:{height:"0.15em"},children:(0,t.jsx)(s.span,{})})})]})})]})]})})]})," from the initial camera position ",(0,t.jsxs)(s.span,{className:"katex",children:[(0,t.jsx)(s.span,{className:"katex-mathml",children:(0,t.jsx)(s.math,{xmlns:"http://www.w3.org/1998/Math/MathML",children:(0,t.jsxs)(s.semantics,{children:[(0,t.jsx)(s.mrow,{children:(0,t.jsxs)(s.msub,{children:[(0,t.jsx)(s.mi,{children:"x"}),(0,t.jsx)(s.mn,{children:"0"})]})}),(0,t.jsx)(s.annotation,{encoding:"application/x-tex",children:"x_{0}"})]})})}),(0,t.jsx)(s.span,{className:"katex-html","aria-hidden":"true",children:(0,t.jsxs)(s.span,{className:"base",children:[(0,t.jsx)(s.span,{className:"strut",style:{height:"0.5806em",verticalAlign:"-0.15em"}}),(0,t.jsxs)(s.span,{className:"mord",children:[(0,t.jsx)(s.span,{className:"mord mathnormal",children:"x"}),(0,t.jsx)(s.span,{className:"msupsub",children:(0,t.jsxs)(s.span,{className:"vlist-t vlist-t2",children:[(0,t.jsxs)(s.span,{className:"vlist-r",children:[(0,t.jsx)(s.span,{className:"vlist",style:{height:"0.3011em"},children:(0,t.jsxs)(s.span,{style:{top:"-2.55em",marginLeft:"0em",marginRight:"0.05em"},children:[(0,t.jsx)(s.span,{className:"pstrut",style:{height:"2.7em"}}),(0,t.jsx)(s.span,{className:"sizing reset-size6 size3 mtight",children:(0,t.jsx)(s.span,{className:"mord mtight",children:(0,t.jsx)(s.span,{className:"mord mtight",children:"0"})})})]})}),(0,t.jsx)(s.span,{className:"vlist-s",children:"\u200b"})]}),(0,t.jsx)(s.span,{className:"vlist-r",children:(0,t.jsx)(s.span,{className:"vlist",style:{height:"0.15em"},children:(0,t.jsx)(s.span,{})})})]})})]})]})})]}),", the initial fov angle ",(0,t.jsxs)(s.span,{className:"katex",children:[(0,t.jsx)(s.span,{className:"katex-mathml",children:(0,t.jsx)(s.math,{xmlns:"http://www.w3.org/1998/Math/MathML",children:(0,t.jsxs)(s.semantics,{children:[(0,t.jsx)(s.mrow,{children:(0,t.jsx)(s.mi,{children:"\u03b1"})}),(0,t.jsx)(s.annotation,{encoding:"application/x-tex",children:"\\alpha"})]})})}),(0,t.jsx)(s.span,{className:"katex-html","aria-hidden":"true",children:(0,t.jsxs)(s.span,{className:"base",children:[(0,t.jsx)(s.span,{className:"strut",style:{height:"0.4306em"}}),(0,t.jsx)(s.span,{className:"mord mathnormal",style:{marginRight:"0.0037em"},children:"\u03b1"})]})})]})," and the zoom factor ",(0,t.jsxs)(s.span,{className:"katex",children:[(0,t.jsx)(s.span,{className:"katex-mathml",children:(0,t.jsx)(s.math,{xmlns:"http://www.w3.org/1998/Math/MathML",children:(0,t.jsxs)(s.semantics,{children:[(0,t.jsx)(s.mrow,{children:(0,t.jsx)(s.mi,{children:"z"})}),(0,t.jsx)(s.annotation,{encoding:"application/x-tex",children:"z"})]})})}),(0,t.jsx)(s.span,{className:"katex-html","aria-hidden":"true",children:(0,t.jsxs)(s.span,{className:"base",children:[(0,t.jsx)(s.span,{className:"strut",style:{height:"0.4306em"}}),(0,t.jsx)(s.span,{className:"mord mathnormal",style:{marginRight:"0.04398em"},children:"z"})]})})]})," we want for our Dolly, the formula is:"]}),"\n",(0,t.jsx)(s.span,{className:"katex-display",children:(0,t.jsxs)(s.span,{className:"katex",children:[(0,t.jsx)(s.span,{className:"katex-mathml",children:(0,t.jsx)(s.math,{xmlns:"http://www.w3.org/1998/Math/MathML",display:"block",children:(0,t.jsxs)(s.semantics,{children:[(0,t.jsxs)(s.mrow,{children:[(0,t.jsxs)(s.msub,{children:[(0,t.jsx)(s.mi,{children:"x"}),(0,t.jsx)(s.mn,{children:"1"})]}),(0,t.jsx)(s.mo,{children:"="}),(0,t.jsxs)(s.mfrac,{children:[(0,t.jsxs)(s.mrow,{children:[(0,t.jsx)(s.mi,{children:"t"}),(0,t.jsx)(s.mi,{children:"a"}),(0,t.jsx)(s.mi,{children:"n"}),(0,t.jsx)(s.mo,{stretchy:"false",children:"("}),(0,t.jsxs)(s.mfrac,{children:[(0,t.jsx)(s.mi,{children:"\u03b1"}),(0,t.jsx)(s.mn,{children:"2"})]}),(0,t.jsx)(s.mo,{stretchy:"false",children:")"})]}),(0,t.jsxs)(s.mrow,{children:[(0,t.jsx)(s.mi,{children:"t"}),(0,t.jsx)(s.mi,{children:"a"}),(0,t.jsx)(s.mi,{children:"n"}),(0,t.jsx)(s.mo,{stretchy:"false",children:"("}),(0,t.jsxs)(s.mfrac,{children:[(0,t.jsx)(s.mi,{children:"\u03b1"}),(0,t.jsxs)(s.mrow,{children:[(0,t.jsx)(s.mn,{children:"2"}),(0,t.jsx)(s.mo,{children:"\u2217"}),(0,t.jsx)(s.mi,{children:"z"})]})]}),(0,t.jsx)(s.mo,{stretchy:"false",children:")"})]})]}),(0,t.jsx)(s.mo,{children:"\u2217"}),(0,t.jsxs)(s.msub,{children:[(0,t.jsx)(s.mi,{children:"x"}),(0,t.jsx)(s.mn,{children:"0"})]}),(0,t.jsx)(s.mo,{children:"="}),(0,t.jsx)(s.mi,{children:"a"}),(0,t.jsx)(s.mo,{children:"\u2217"}),(0,t.jsxs)(s.msub,{children:[(0,t.jsx)(s.mi,{children:"x"}),(0,t.jsx)(s.mn,{children:"0"})]})]}),(0,t.jsx)(s.annotation,{encoding:"application/x-tex",children:"x_{1} = \\frac{tan(\\frac{\\alpha}{2})}{tan(\\frac{\\alpha}{2*z})}*x_{0} = a*x_{0}"})]})})}),(0,t.jsxs)(s.span,{className:"katex-html","aria-hidden":"true",children:[(0,t.jsxs)(s.span,{className:"base",children:[(0,t.jsx)(s.span,{className:"strut",style:{height:"0.5806em",verticalAlign:"-0.15em"}}),(0,t.jsxs)(s.span,{className:"mord",children:[(0,t.jsx)(s.span,{className:"mord mathnormal",children:"x"}),(0,t.jsx)(s.span,{className:"msupsub",children:(0,t.jsxs)(s.span,{className:"vlist-t vlist-t2",children:[(0,t.jsxs)(s.span,{className:"vlist-r",children:[(0,t.jsx)(s.span,{className:"vlist",style:{height:"0.3011em"},children:(0,t.jsxs)(s.span,{style:{top:"-2.55em",marginLeft:"0em",marginRight:"0.05em"},children:[(0,t.jsx)(s.span,{className:"pstrut",style:{height:"2.7em"}}),(0,t.jsx)(s.span,{className:"sizing reset-size6 size3 mtight",children:(0,t.jsx)(s.span,{className:"mord mtight",children:(0,t.jsx)(s.span,{className:"mord mtight",children:"1"})})})]})}),(0,t.jsx)(s.span,{className:"vlist-s",children:"\u200b"})]}),(0,t.jsx)(s.span,{className:"vlist-r",children:(0,t.jsx)(s.span,{className:"vlist",style:{height:"0.15em"},children:(0,t.jsx)(s.span,{})})})]})})]}),(0,t.jsx)(s.span,{className:"mspace",style:{marginRight:"0.2778em"}}),(0,t.jsx)(s.span,{className:"mrel",children:"="}),(0,t.jsx)(s.span,{className:"mspace",style:{marginRight:"0.2778em"}})]}),(0,t.jsxs)(s.span,{className:"base",children:[(0,t.jsx)(s.span,{className:"strut",style:{height:"2.516em",verticalAlign:"-1.031em"}}),(0,t.jsxs)(s.span,{className:"mord",children:[(0,t.jsx)(s.span,{className:"mopen nulldelimiter"}),(0,t.jsx)(s.span,{className:"mfrac",children:(0,t.jsxs)(s.span,{className:"vlist-t vlist-t2",children:[(0,t.jsxs)(s.span,{className:"vlist-r",children:[(0,t.jsxs)(s.span,{className:"vlist",style:{height:"1.485em"},children:[(0,t.jsxs)(s.span,{style:{top:"-2.314em"},children:[(0,t.jsx)(s.span,{className:"pstrut",style:{height:"3em"}}),(0,t.jsxs)(s.span,{className:"mord",children:[(0,t.jsx)(s.span,{className:"mord mathnormal",children:"t"}),(0,t.jsx)(s.span,{className:"mord mathnormal",children:"an"}),(0,t.jsx)(s.span,{className:"mopen",children:"("}),(0,t.jsxs)(s.span,{className:"mord",children:[(0,t.jsx)(s.span,{className:"mopen nulldelimiter"}),(0,t.jsx)(s.span,{className:"mfrac",children:(0,t.jsxs)(s.span,{className:"vlist-t vlist-t2",children:[(0,t.jsxs)(s.span,{className:"vlist-r",children:[(0,t.jsxs)(s.span,{className:"vlist",style:{height:"0.6954em"},children:[(0,t.jsxs)(s.span,{style:{top:"-2.655em"},children:[(0,t.jsx)(s.span,{className:"pstrut",style:{height:"3em"}}),(0,t.jsx)(s.span,{className:"sizing reset-size6 size3 mtight",children:(0,t.jsxs)(s.span,{className:"mord mtight",children:[(0,t.jsx)(s.span,{className:"mord mtight",children:"2"}),(0,t.jsx)(s.span,{className:"mbin mtight",children:"\u2217"}),(0,t.jsx)(s.span,{className:"mord mathnormal mtight",style:{marginRight:"0.04398em"},children:"z"})]})})]}),(0,t.jsxs)(s.span,{style:{top:"-3.23em"},children:[(0,t.jsx)(s.span,{className:"pstrut",style:{height:"3em"}}),(0,t.jsx)(s.span,{className:"frac-line",style:{borderBottomWidth:"0.04em"}})]}),(0,t.jsxs)(s.span,{style:{top:"-3.394em"},children:[(0,t.jsx)(s.span,{className:"pstrut",style:{height:"3em"}}),(0,t.jsx)(s.span,{className:"sizing reset-size6 size3 mtight",children:(0,t.jsx)(s.span,{className:"mord mtight",children:(0,t.jsx)(s.span,{className:"mord mathnormal mtight",style:{marginRight:"0.0037em"},children:"\u03b1"})})})]})]}),(0,t.jsx)(s.span,{className:"vlist-s",children:"\u200b"})]}),(0,t.jsx)(s.span,{className:"vlist-r",children:(0,t.jsx)(s.span,{className:"vlist",style:{height:"0.345em"},children:(0,t.jsx)(s.span,{})})})]})}),(0,t.jsx)(s.span,{className:"mclose nulldelimiter"})]}),(0,t.jsx)(s.span,{className:"mclose",children:")"})]})]}),(0,t.jsxs)(s.span,{style:{top:"-3.23em"},children:[(0,t.jsx)(s.span,{className:"pstrut",style:{height:"3em"}}),(0,t.jsx)(s.span,{className:"frac-line",style:{borderBottomWidth:"0.04em"}})]}),(0,t.jsxs)(s.span,{style:{top:"-3.735em"},children:[(0,t.jsx)(s.span,{className:"pstrut",style:{height:"3em"}}),(0,t.jsxs)(s.span,{className:"mord",children:[(0,t.jsx)(s.span,{className:"mord mathnormal",children:"t"}),(0,t.jsx)(s.span,{className:"mord mathnormal",children:"an"}),(0,t.jsx)(s.span,{className:"mopen",children:"("}),(0,t.jsxs)(s.span,{className:"mord",children:[(0,t.jsx)(s.span,{className:"mopen nulldelimiter"}),(0,t.jsx)(s.span,{className:"mfrac",children:(0,t.jsxs)(s.span,{className:"vlist-t vlist-t2",children:[(0,t.jsxs)(s.span,{className:"vlist-r",children:[(0,t.jsxs)(s.span,{className:"vlist",style:{height:"0.6954em"},children:[(0,t.jsxs)(s.span,{style:{top:"-2.655em"},children:[(0,t.jsx)(s.span,{className:"pstrut",style:{height:"3em"}}),(0,t.jsx)(s.span,{className:"sizing reset-size6 size3 mtight",children:(0,t.jsx)(s.span,{className:"mord mtight",children:(0,t.jsx)(s.span,{className:"mord mtight",children:"2"})})})]}),(0,t.jsxs)(s.span,{style:{top:"-3.23em"},children:[(0,t.jsx)(s.span,{className:"pstrut",style:{height:"3em"}}),(0,t.jsx)(s.span,{className:"frac-line",style:{borderBottomWidth:"0.04em"}})]}),(0,t.jsxs)(s.span,{style:{top:"-3.394em"},children:[(0,t.jsx)(s.span,{className:"pstrut",style:{height:"3em"}}),(0,t.jsx)(s.span,{className:"sizing reset-size6 size3 mtight",children:(0,t.jsx)(s.span,{className:"mord mtight",children:(0,t.jsx)(s.span,{className:"mord mathnormal mtight",style:{marginRight:"0.0037em"},children:"\u03b1"})})})]})]}),(0,t.jsx)(s.span,{className:"vlist-s",children:"\u200b"})]}),(0,t.jsx)(s.span,{className:"vlist-r",children:(0,t.jsx)(s.span,{className:"vlist",style:{height:"0.345em"},children:(0,t.jsx)(s.span,{})})})]})}),(0,t.jsx)(s.span,{className:"mclose nulldelimiter"})]}),(0,t.jsx)(s.span,{className:"mclose",children:")"})]})]})]}),(0,t.jsx)(s.span,{className:"vlist-s",children:"\u200b"})]}),(0,t.jsx)(s.span,{className:"vlist-r",children:(0,t.jsx)(s.span,{className:"vlist",style:{height:"1.031em"},children:(0,t.jsx)(s.span,{})})})]})}),(0,t.jsx)(s.span,{className:"mclose nulldelimiter"})]}),(0,t.jsx)(s.span,{className:"mspace",style:{marginRight:"0.2222em"}}),(0,t.jsx)(s.span,{className:"mbin",children:"\u2217"}),(0,t.jsx)(s.span,{className:"mspace",style:{marginRight:"0.2222em"}})]}),(0,t.jsxs)(s.span,{className:"base",children:[(0,t.jsx)(s.span,{className:"strut",style:{height:"0.5806em",verticalAlign:"-0.15em"}}),(0,t.jsxs)(s.span,{className:"mord",children:[(0,t.jsx)(s.span,{className:"mord mathnormal",children:"x"}),(0,t.jsx)(s.span,{className:"msupsub",children:(0,t.jsxs)(s.span,{className:"vlist-t vlist-t2",children:[(0,t.jsxs)(s.span,{className:"vlist-r",children:[(0,t.jsx)(s.span,{className:"vlist",style:{height:"0.3011em"},children:(0,t.jsxs)(s.span,{style:{top:"-2.55em",marginLeft:"0em",marginRight:"0.05em"},children:[(0,t.jsx)(s.span,{className:"pstrut",style:{height:"2.7em"}}),(0,t.jsx)(s.span,{className:"sizing reset-size6 size3 mtight",children:(0,t.jsx)(s.span,{className:"mord mtight",children:(0,t.jsx)(s.span,{className:"mord mtight",children:"0"})})})]})}),(0,t.jsx)(s.span,{className:"vlist-s",children:"\u200b"})]}),(0,t.jsx)(s.span,{className:"vlist-r",children:(0,t.jsx)(s.span,{className:"vlist",style:{height:"0.15em"},children:(0,t.jsx)(s.span,{})})})]})})]}),(0,t.jsx)(s.span,{className:"mspace",style:{marginRight:"0.2778em"}}),(0,t.jsx)(s.span,{className:"mrel",children:"="}),(0,t.jsx)(s.span,{className:"mspace",style:{marginRight:"0.2778em"}})]}),(0,t.jsxs)(s.span,{className:"base",children:[(0,t.jsx)(s.span,{className:"strut",style:{height:"0.4653em"}}),(0,t.jsx)(s.span,{className:"mord mathnormal",children:"a"}),(0,t.jsx)(s.span,{className:"mspace",style:{marginRight:"0.2222em"}}),(0,t.jsx)(s.span,{className:"mbin",children:"\u2217"}),(0,t.jsx)(s.span,{className:"mspace",style:{marginRight:"0.2222em"}})]}),(0,t.jsxs)(s.span,{className:"base",children:[(0,t.jsx)(s.span,{className:"strut",style:{height:"0.5806em",verticalAlign:"-0.15em"}}),(0,t.jsxs)(s.span,{className:"mord",children:[(0,t.jsx)(s.span,{className:"mord mathnormal",children:"x"}),(0,t.jsx)(s.span,{className:"msupsub",children:(0,t.jsxs)(s.span,{className:"vlist-t vlist-t2",children:[(0,t.jsxs)(s.span,{className:"vlist-r",children:[(0,t.jsx)(s.span,{className:"vlist",style:{height:"0.3011em"},children:(0,t.jsxs)(s.span,{style:{top:"-2.55em",marginLeft:"0em",marginRight:"0.05em"},children:[(0,t.jsx)(s.span,{className:"pstrut",style:{height:"2.7em"}}),(0,t.jsx)(s.span,{className:"sizing reset-size6 size3 mtight",children:(0,t.jsx)(s.span,{className:"mord mtight",children:(0,t.jsx)(s.span,{className:"mord mtight",children:"0"})})})]})}),(0,t.jsx)(s.span,{className:"vlist-s",children:"\u200b"})]}),(0,t.jsx)(s.span,{className:"vlist-r",children:(0,t.jsx)(s.span,{className:"vlist",style:{height:"0.15em"},children:(0,t.jsx)(s.span,{})})})]})})]})]})]})]})}),"\n",(0,t.jsxs)(s.p,{children:["You can see below how ",(0,t.jsxs)(s.span,{className:"katex",children:[(0,t.jsx)(s.span,{className:"katex-mathml",children:(0,t.jsx)(s.math,{xmlns:"http://www.w3.org/1998/Math/MathML",children:(0,t.jsxs)(s.semantics,{children:[(0,t.jsx)(s.mrow,{children:(0,t.jsx)(s.mi,{children:"a"})}),(0,t.jsx)(s.annotation,{encoding:"application/x-tex",children:"a"})]})})}),(0,t.jsx)(s.span,{className:"katex-html","aria-hidden":"true",children:(0,t.jsxs)(s.span,{className:"base",children:[(0,t.jsx)(s.span,{className:"strut",style:{height:"0.4306em"}}),(0,t.jsx)(s.span,{className:"mord mathnormal",children:"a"})]})})]})," evolves according to the zoom factor on this drawing:"]}),"\n",(0,t.jsx)(h,{}),"\n",(0,t.jsxs)("p",{style:{fontSize:12},children:["All the Spider-Man additional gameplay of this article was extracted from ",(0,t.jsx)("a",{href:"https://youtu.be/eEPG4TMhwtk",target:"_blank",rel:"noopener noreferrer",children:"this video"}),"."]}),"\n",(0,t.jsx)(s.hr,{}),"\n",(0,t.jsxs)(s.p,{children:["Now, ",(0,t.jsx)(s.strong,{children:"should you put a Dolly Zoom in everything?"})," Please god, no."]}),"\n",(0,t.jsxs)(s.p,{children:["It's a fine line to walk between ",(0,t.jsx)(s.em,{children:"smart reuse of a proven recipe"})," and ",(0,t.jsx)(s.em,{children:"gimmicky reuse of an identified recipe"}),". And I don't want to Dolly Zoom to be the Wilhem scream of video games cameras."]}),"\n",(0,t.jsx)(s.p,{children:"Personally, I'm more and more attracted by doing more with less. For example, if I have to buy a new lens for my DSLR, I always go towards prime lenses, a fixed focal length lens. What you lose in versatility, you gain in optical quality, weight and maximum aperture. Designing constraints that are not only closing doors but opening others is liberating for any creative process."}),"\n",(0,t.jsx)(s.p,{children:"As Spiderman 2 is probably in the works, I'm wondering what trickery Insomniac can cook this time. But I know what I'd like: something simple, effective born out of opinionated constraints."})]})}function u(e={}){const{wrapper:s}={...(0,a.R)(),...e.components};return s?(0,t.jsx)(s,{...e,children:(0,t.jsx)(j,{...e})}):j(e)}},2446:(e,s,n)=>{n.d(s,{A:()=>a});n(6540);var t=n(4848);const a=function(e){let{srcUrl:s,width:n=560,height:a=315,legend:i=""}=e;return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("div",{style:{display:"flex",justifyContent:"center",margin:"auto",marginBottom:"30px"},children:(0,t.jsx)("iframe",{className:"illustration",width:n,height:a,src:s,frameBorder:"0",allow:"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture",allowFullScreen:!0})}),(0,t.jsx)("p",{style:{fontSize:"small",textAlign:"center",marginTop:"-20px"},children:i})]})}},2929:(e,s,n)=>{n.d(s,{A:()=>i});n(6540);var t=n(6025),a=n(4848);const i=function(e){let{srcImage:s,legend:n="",altText:i="",halfWidth:l=!1}=e;return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("div",{style:{width:"fit-content",display:"flex",margin:"auto",marginBottom:"30px"},children:(0,a.jsx)("img",{alt:i,style:{width:l?"400px":"auto",margin:"auto"},src:(0,t.A)(s)})}),(0,a.jsx)("p",{style:{fontSize:"small",textAlign:"center",marginTop:"-20px"},children:n})]})}},3559:(e,s,n)=>{n.d(s,{A:()=>i});n(6540);var t=n(6025),a=n(4848);const i=function(e){let{srcVideo:s,width:n=560,height:i=315,legend:l=""}=e;return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("div",{style:{display:"flex",justifyContent:"center",margin:"auto",marginBottom:"30px"},children:(0,a.jsxs)("video",{preload:"auto",controls:!0,width:n,children:[(0,a.jsx)("source",{src:(0,t.A)(s),type:"video/mp4"}),"Sorry, your browser doesn't support embedded videos."]})}),(0,a.jsx)("p",{style:{fontSize:"small",textAlign:"center",marginTop:"-20px"},children:l})]})}},8453:(e,s,n)=>{n.d(s,{R:()=>l,x:()=>r});var t=n(6540);const a={},i=t.createContext(a);function l(e){const s=t.useContext(i);return t.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function r(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:l(e.components),t.createElement(i.Provider,{value:s},e.children)}}}]);