"use strict";(self.webpackChunkjb_blog=self.webpackChunkjb_blog||[]).push([[690],{8313:function(e,t,n){var a=n(7294);t.Z=function(e){var t=e.srcUrl,n=e.width,r=void 0===n?560:n,i=e.height,s=void 0===i?315:i,o=e.legend,l=void 0===o?"":o;return a.createElement(a.Fragment,null,a.createElement("div",{style:{width:"fit-content",display:"flex",justifyContent:"center",margin:"auto",marginBottom:"30px"}},a.createElement("iframe",{className:"illustration",width:r,height:s,src:t,frameBorder:"0",allow:"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture",allowFullScreen:!0})),a.createElement("p",{style:{fontSize:"small",textAlign:"center",marginTop:"-20px"}},l))}},7993:function(e,t,n){var a=n(7294),r=n(4996);t.Z=function(e){var t=e.srcImage,n=e.legend,i=void 0===n?"":n,s=e.altText,o=void 0===s?"":s,l=e.halfWidth,c=void 0!==l&&l;return a.createElement(a.Fragment,null,a.createElement("div",{style:{width:"fit-content",display:"flex",margin:"auto",marginBottom:"30px"}},a.createElement("img",{alt:o,style:{width:c?"400px":"auto",margin:"auto"},src:(0,r.Z)(t)})),a.createElement("p",{style:{fontSize:"small",textAlign:"center",marginTop:"-20px"}},i))}},8417:function(e,t,n){n.r(t),n.d(t,{assets:function(){return P},contentTitle:function(){return z},default:function(){return X},frontMatter:function(){return R},metadata:function(){return J},toc:function(){return Q}});var a=n(7462),r=n(3366),i=n(7294),s=n(3905),o=n(7326),l=n(4578),c=n(5697),u=n.n(c),h=n(6486),d=n.n(h);var m=function(){function e(e,t){this.n=e,this.timeline=new Array(e),this.entropies=new Array(e),this.tiles=new Array(t.length),this.n_tiles=t.length;for(var n=0;n<t.length;n++){var a=t[n];this.tiles[n]={id:a.id,cid:a.cid,label:a.label,color:a.color,weights:new Array(e).fill(1)}}this.wave=new Array(e),this.wavefront=new Array(e).fill(!1),this.wave_save=new Array(e),this.constraints_propagator=[new Array(this.n_tiles).fill(new Array(this.n_tiles).fill(!0)),new Array(this.n_tiles).fill(new Array(this.n_tiles).fill(!0))],this.preferences_propagator=[],this.ready=!1,this.DEBUG_LOGS=!1}var t=e.prototype;return t.init=function(){this.setupWave()},t.getWave=function(){return this.wave},t.getTimeline=function(){return this.timeline},t.reset=function(){this.setupWave(),this.timeline=new Array(this.n)},t.resetConstraints=function(){this.constraints_propagator=[new Array(this.n_tiles).fill(new Array(this.n_tiles).fill(!0)),new Array(this.n_tiles).fill(new Array(this.n_tiles).fill(!0))]},t.setupWave=function(){this.wave=new Array(this.n),this.wavefront=new Array(this.n).fill(!1);for(var e=0;e<this.n;e++){this.wave[e]=[];for(var t=0;t<this.tiles.length;t++)this.tiles[t].weights[e]>0&&this.wave[e].push({id:this.tiles[t].id,cid:this.tiles[t].cid,label:this.tiles[t].label,color:this.tiles[t].color,weights:this.tiles[t].weights[e],distribution:0})}},t.setupPropagators=function(){this.constraints_propagator=[new Array(this.n_tiles).fill(new Array(this.n_tiles).fill(!0)),new Array(this.n_tiles).fill(new Array(this.n_tiles).fill(!0))]},t.applyConstraint=function(e,t,n){for(var a=0;a<e.length;a++)for(var r=0;r<n.length;r++)this.addConstraint(e[a],t,n[r])},t.addConstraint=function(e,t,n){this.constraints_propagator[t][e][n]=!1,this.constraints_propagator[(t+1)%2][n][e]=!1},t.resetWeights=function(){for(var e=0;e<this.tiles.length;e++)this.tiles[e].weights=new Array(this.n).fill(1)},t.applyWeight=function(e,t,n){for(var a=0;a<e.length;a++)this.tiles[e[a]].weights[t[0]]=n},t.computeEntropy=function(){for(var e=0;e<this.n;e++)if(this.wavefront[e])this.entropies[e]=1e8;else{for(var t=this.wave[e],n=0,a=0;a<t.length;a++)n+=t[a].weights;for(var r=0,i=0;i<t.length;i++){var s=t[i].weights/n;t[i].distribution=s,0!==s&&(r-=s*Math.log(s))}this.entropies[e]=d().round(r,5)}},t.observe=function(){for(var e=Number.MAX_VALUE,t=-1,n=[],a=0;a<this.n;a++)if(!this.wavefront[a]){var r=this.entropies[a];r<e?(e=r,t=0,n=[a]):r===e&&n.push(a)}if(-1===t)throw console.error("ENTROPIES WRONGLY COMPUTED");return n[d().random(n.length-1)]},t.isDone=function(){for(var e=!0,t=0;t<this.n;t++)if(!this.wavefront[t]){e=!1;break}return e},t.propagate=function(e,t){this.timeline[e]=this.wave[e][t];var n=this.wave[e][t].id;this.wave[e]=this.wave[e][t],this.wavefront[e]=!0;var a=0;if(e>0&&!1===this.wavefront[e-1]){var r=this.constraints_propagator[0][n];d().remove(this.wave[e-1],(function(e){return!r[e.id]&&(a+=1,!0)}))}if(e<this.n-1&&!1===this.wavefront[e+1]){var i=this.constraints_propagator[1][n];d().remove(this.wave[e+1],(function(e){return!i[e.id]&&(a+=1,!0)}))}return a},t.step=function(){this.computeEntropy();var e=this.observe(),t=function(e){for(var t=0,n=Math.random();n>0;)n-=e[t].distribution,t++;return--t}(this.wave[e]),n=this.propagate(e,t);this.DEBUG_LOGS&&console.log("The tile "+t+" was placed at the spot "+e+", "+n+" elements were removed from a potential spot during propagation")},t.run=function(){for(;!this.isDone();)this.step()},t.slowRun=function(e){for(;!this.isDone();)setTimeout(this.step(),e)},e}(),p=function(){function e(e,t){this.n=e,this.timeline=new Array(e),this.deck=[].concat(t),this.DEBUG_LOGS=!1}var t=e.prototype;return t.getTimeline=function(){return this.timeline},t.run=function(){for(var e=0;e<this.n;e++){var t=d().random(this.deck.length-1);this.timeline[e]=this.deck[t]}},e}(),f=function(){function e(e,t){this.n=e,this.timeline=new Array(e),this.deck=[].concat(t),this.deck_save=[].concat(t),this.DEBUG_LOGS=!1}var t=e.prototype;return t.reset=function(){this.deck=[].concat(this.deck_save)},t.getTimeline=function(){return this.timeline},t.run=function(){for(var e=0;e<this.n;e++){var t=d().random(this.deck.length-1);this.timeline[e]=this.deck[t],d().pullAt(this.deck,[t])}},e}(),g=function(){function e(e,t){this.n=e,this.timeline=new Array(e),this.tiles=new Array(t.length);for(var n=0;n<t.length;n++){var a=t[n];this.tiles[n]={id:a.id,cid:a.cid,weight:1}}this.deck=[].concat(t),this.DEBUG_LOGS=!1}var t=e.prototype;return t.reset=function(){this.timeline=new Array(this.n)},t.resetWeights=function(){for(var e=0;e<this.tiles.length;e++)this.tiles[e].weight=1},t.applyWeight=function(e,t){this.tiles[e].weight=t},t.resetWeight=function(e){this.tiles[e].weight=1},t.getTimeline=function(){return this.timeline},t.run=function(){for(var e=0,t=0;t<this.tiles.length;t++)e+=this.tiles[t].weight;console.log(this.tiles),console.log(e);for(var n=0;n<this.n;n++)for(var a=d().random(e),r=0,i=0;i<this.tiles.length;i++)if((r+=this.tiles[i].weight)>a){this.timeline[n]=this.tiles[i];break}},e}(),v=20,k={cid:"00",label:"",color:"#fff"},y=["s","h","d","c"],w=["Spades","Hearts","Diamonds","Clubs"];function b(e,t){var n="";return n=11===t?"Jack of ":12===t?"Queen of ":13===t?"King of ":t+" of ",n+=w[e]}function E(e,t){var n="";return n=11===t?"J":12===t?"Q":13===t?"K":""+t,n+=y[e]}for(var N=[],x=0;x<4;x++)for(var C=1;C<14;C++)N.push({id:13*x+C-1,cid:E(x,C),label:b(x,C),color:"#868686"});new Array(v).fill(1),new Array(v).fill(1),new Array(v).fill(1),new Array(v).fill(1),new Array(v).fill(1),new Array(v).fill(1),new Array(v).fill(1);var A=[{key:"any",text:"Any",value:"0"},{key:"ace",text:"Ace",value:"1"},{key:"2",text:"2",value:"2"},{key:"3",text:"3",value:"3"},{key:"4",text:"4",value:"4"},{key:"5",text:"5",value:"5"},{key:"6",text:"6",value:"6"},{key:"7",text:"7",value:"7"},{key:"8",text:"8",value:"8"},{key:"9",text:"9",value:"9"},{key:"10",text:"10",value:"10"},{key:"jack",text:"Jack",value:"J"},{key:"queen",text:"Queen",value:"Q"},{key:"king",text:"King",value:"K"}],G=[{key:"0",text:"Suit",value:"0",color:"#495057"},{key:"s",text:"\u2660\ufe0f",value:"s",color:"black"},{key:"h",text:"\u2665\ufe0f",value:"h",color:"red"},{key:"h",text:"\u2666\ufe0f",value:"d",color:"red"},{key:"c",text:"\u2663\ufe0f",value:"c",color:"black"}],T=[{key:"0",text:"1",value:"0"},{key:"1",text:"2",value:"1"},{key:"2",text:"3",value:"2"},{key:"3",text:"4",value:"3"},{key:"4",text:"5",value:"4"},{key:"5",text:"6",value:"5"},{key:"6",text:"7",value:"6"},{key:"7",text:"8",value:"7"},{key:"8",text:"9",value:"8"},{key:"9",text:"10",value:"9"},{key:"10",text:"11",value:"10"},{key:"11",text:"12",value:"11"},{key:"12",text:"13",value:"12"},{key:"13",text:"14",value:"13"},{key:"14",text:"15",value:"14"},{key:"15",text:"16",value:"15"},{key:"16",text:"17",value:"16"},{key:"17",text:"18",value:"17"},{key:"18",text:"19",value:"18"},{key:"19",text:"20",value:"19"}],S=[{key:"type",text:"Type",value:"0"},{key:"no-after",text:"Can't be after",value:"no-after"},{key:"no-before",text:"Can't be before",value:"no-before"},{key:"only-after",text:"Must be after",value:"only-after"},{key:"only-before",text:"Must be before",value:"only-before"},{key:"no-at",text:"Can't be at spot",value:"no-at"},{key:"prefers-at",text:"Must be at spot",value:"prefers-at"}],D=["blue","green","orange","red"];function W(e){var t=e.wave,n=e.mode,a=void 0===n?0:n;return i.createElement("div",{className:"scroll timeline"},i.createElement("div",{className:"canvas"},i.createElement("div",{className:"line"}),t.map((function(e,t){return i.createElement("span",{key:"wave"+t},i.createElement("span",null,i.createElement("div",{className:"slot",key:"t-"+t,"data-tip":"Info about the genk dslkfjlsdkj <br> sfdldkj sdflkjfd sdlkdfj fskdshfez azoelk.","data-for":"calendar"},i.createElement("div",{className:"card-t"},i.createElement("card-t",{cid:e.cid,backtext:"",backcolor:D[a]})))))}))))}W.propTypes={wave:u().array,mode:u().number,noir:u().bool};var _=function(e){var t=e.title,n=e.onChange,a=e.id,r=e.width;return i.createElement("label",{className:"switch-label",onClick:function(){return n(a)},style:{width:r}},t.split(/\s+/).map((function(e){return e[0].toUpperCase()+e.slice(1)})).join(" "))};_.propTypes={title:u().string,onChange:u().func,id:u().number};var I=function(e){var t=e.checked;return i.createElement("input",{className:"switch-radio",type:"radio",name:"switch",checked:t,readOnly:!0})};I.propTypes={checked:u().bool};var Z=function(e){function t(){for(var t,n=arguments.length,a=new Array(n),r=0;r<n;r++)a[r]=arguments[r];return(t=e.call.apply(e,[this].concat(a))||this).state={selected:t.props.selected},t.handleChange=function(e){t.setState({selected:e}),t.props.handleSelect(e)},t.selectionStyle=function(){return{left:t.state.selected/t.props.values.length*100+"%",width:100/t.props.values.length+"%"}},t}return(0,l.Z)(t,e),t.prototype.render=function(){var e=this,t=this.state.selected;return i.createElement("div",{className:"switch"},this.props.values.map((function(n,a){return i.createElement("span",{className:"switch-container",key:n},i.createElement(I,{checked:t===a}),i.createElement(_,{title:n,onChange:e.handleChange,id:a,width:100/e.props.values.length+"%"}))})),i.createElement("span",{className:"switch-selection",style:this.selectionStyle()}))},t}(i.Component);Z.propTypes={values:u().array,selected:u().number,handleSelect:u().func},Z.defaultProps={values:["days","weeks","months"],selected:0};var L=n(7145),M=n.n(L),H=function(e){var t=e.mode,n=null;return n=0===t?i.createElement("p",null,"At each position, we pick a card from a full 52-cards deck."):1===t?i.createElement("p",null,"At each position, we pick a card from a deck and we take out the card from the deck."):2===t?i.createElement("p",null,"At each position, we pick a card from a weighted deck we define.",i.createElement("br",null)," A card with a weight 10 will have 10 times more chances to be picked than a card with a weight 1."):i.createElement("p",null,"We apply a constraint-based algorithm (Wave Function Collapse) to distribute our cards.",i.createElement("br",null),"You can define the constraints below."),i.createElement("div",{className:"app-header"},n)};H.propTypes={mode:u().number};var B=function(e){function t(t){var n;return(n=e.call(this,t)||this).state={wave:new Array(v).fill(k),constraints:[[!0,"0","h","no-after","0","s","0"],[!0,"0","c","no-at","0","s","1"],[!0,"0","s","no-at","0","s","1"],[!0,"Q","d","prefers-at","0","s","0"],[!0,"1","s","no-after","1","0","0"]],weights:[[!0,"1","s",20],[!0,"5","d",5]],mode:0,configHasChanged:!0},n.N=v,n.data=N,n.gen=n.gen.bind((0,o.Z)(n)),n.init=n.init.bind((0,o.Z)(n)),n.reset=n.reset.bind((0,o.Z)(n)),n.onConfigChange=n.onConfigChange.bind((0,o.Z)(n)),n.onModeSelect=n.onModeSelect.bind((0,o.Z)(n)),n.addConstraint=n.addConstraint.bind((0,o.Z)(n)),n.removeConstraint=n.removeConstraint.bind((0,o.Z)(n)),n.updateConstraint=n.updateConstraint.bind((0,o.Z)(n)),n}(0,l.Z)(t,e);var a=t.prototype;return a.componentDidMount=function(){n.e(459).then(n.bind(n,5459)),this.init()},a.gen=function(){var e=this.state,t=e.mode,n=e.configHasChanged,a=null;0===t?(this.fullDeckGenerator.run(),a=this.fullDeckGenerator.getTimeline()):1===t?(this.normalDeckGenerator.reset(),this.normalDeckGenerator.run(),a=this.normalDeckGenerator.getTimeline()):2===t?(n&&(this.weightedDeckGenerator.resetWeights(),this.convertWeights()),this.weightedDeckGenerator.reset(),this.weightedDeckGenerator.run(),a=this.weightedDeckGenerator.getTimeline()):3===t&&(n?(this.wfcGenerator.resetWeights(),this.wfcGenerator.resetConstraints(),this.convertConstraints(),this.wfcGenerator.reset(),this.wfcGenerator.run(),a=this.wfcGenerator.getTimeline()):(this.wfcGenerator.reset(),this.wfcGenerator.run(),a=this.wfcGenerator.getTimeline())),this.setState({wave:a,configHasChanged:!1})},a.reset=function(){this.wfcGenerator.reset(),this.normalDeckGenerator.reset(),this.weightedDeckGenerator.reset(),this.setState({wave:new Array(this.N).fill(k)})},a.init=function(){this.wfcGenerator=new m(this.N,this.data),this.wfcGenerator.init(),this.fullDeckGenerator=new p(this.N,this.data),this.normalDeckGenerator=new f(this.N,this.data),this.weightedDeckGenerator=new g(this.N,this.data)},a.onConfigChange=function(e){var t=this;this.N!==e.N?(this.N=e.N,this.setState({constraints:e.constraints,configHasChanged:!0},(function(){return t.init()}))):this.setState({constraints:e.constraints,configHasChanged:!0})},a.onModeSelect=function(e){this.setState({mode:e})},a.addWeight=function(){this.setState((function(e){return{weights:[].concat(e.weights,[[!1,"0","0",1]]),configHasChanged:!0}}))},a.removeWeight=function(e){this.setState({weights:M()(this.state.weights,{$splice:[[e,1]]}),configHasChanged:!0})},a.updateWeight=function(e,t,n){var a,r;this.setState({weights:M()(this.state.weights,(r={},r[e]=(a={},a[t]={$set:n},a),r)),configHasChanged:!0})},a.convertWeights=function(){for(var e=this.state.weights,t=0;t<e.length;t++){var n=e[t];if(n[0])if("0"!==n[1]||"0"!==n[2])if("0"===n[1]&&"0"!==n[2])for(var a=0;a<this.data.length;a++)this.data[a].cid.charAt(1)===n[2]&&this.weightedDeckGenerator.applyWeight(this.data[a].id,n[3]);else if("0"!==n[1]&&"0"===n[2])for(var r=0;r<this.data.length;r++)this.data[r].cid.charAt(0)===n[1]&&this.weightedDeckGenerator.applyWeight(this.data[r].id,n[3]);else for(var i=0;i<this.data.length;i++)this.data[i].cid===""+n[1]+n[2]&&this.weightedDeckGenerator.applyWeight(this.data[i].id,n[3]);else this.updateWeight(t,0,!1)}},a.addConstraint=function(){this.setState((function(e){return{constraints:[].concat(e.constraints,[[!1,"0","0","0","0","0"]]),configHasChanged:!0}}))},a.removeConstraint=function(e){this.setState({constraints:M()(this.state.constraints,{$splice:[[e,1]]}),configHasChanged:!0})},a.updateConstraint=function(e,t,n){var a,r;this.setState({constraints:M()(this.state.constraints,(r={},r[e]=(a={},a[t]={$set:n},a),r)),configHasChanged:!0})},a.convertConstraints=function(){for(var e=this,t=this.state.constraints,n=function(n){var a=t[n];if(!a[0])return"continue";var r=[],i=[],s=0,o=0,l=!1;switch(a[3]){case"no-after":s=0;break;case"no-before":s=1;break;case"only-after":l=!0,s=0;break;case"only-before":l=!0,s=1;break;case"no-at":s=2,o=0;break;case"prefers-at":s=2,o=1e4;break;default:return e.updateConstraint(n,0,!1),"continue"}if(l){if("0"===a[1]&&"0"===a[2])return e.updateConstraint(n,0,!1),"continue";if("0"===a[1]&&"0"!==a[2])for(var c=d().filter(e.data,(function(e){return e.cid.charAt(1)!==a[2]})),u=0;u<c.length;u++)r.push(c[u].id);else if("0"!==a[1]&&"0"===a[2])for(var h=d().filter(e.data,(function(e){return e.cid.charAt(0)!==a[1]})),m=0;m<h.length;m++)r.push(h[m].id);else for(var p=d().filter(e.data,(function(e){return e.cid===""+a[1]+a[2]})),f=0;f<p.length;f++)r.push(p[f].id)}else{if("0"===a[1]&&"0"===a[2])return e.updateConstraint(n,0,!1),"continue";if("0"===a[1]&&"0"!==a[2])for(var g=d().filter(e.data,(function(e){return e.cid.charAt(1)===a[2]})),v=0;v<g.length;v++)r.push(g[v].id);else if("0"!==a[1]&&"0"===a[2])for(var k=d().filter(e.data,(function(e){return e.cid.charAt(0)===a[1]})),y=0;y<k.length;y++)r.push(k[y].id);else{var w=d().findIndex(e.data,(function(e){return e.cid===""+a[1]+a[2]}));r.push(e.data[w].id)}}if(s<2){if("0"===a[4]&&"0"===a[5])return e.updateConstraint(n,0,!1),"continue";if("0"===a[4]&&"0"!==a[5])for(var b=d().filter(e.data,(function(e){return e.cid.charAt(1)===a[5]})),E=0;E<b.length;E++)i.push(b[E].id);else if("0"!==a[4]&&"0"===a[5])for(var N=d().filter(e.data,(function(e){return e.cid.charAt(0)===a[4]})),x=0;x<N.length;x++)i.push(N[x].id);else{var C=d().findIndex(e.data,(function(e){return e.cid===""+a[4]+a[5]}));i.push(e.data[C].id)}}else i.push(parseInt(a[6]));s<2?e.wfcGenerator.applyConstraint(r,s,i):e.wfcGenerator.applyWeight(r,i,o)},a=0;a<t.length;a++)n(a)},a.render=function(){var e=this,t=this.state,n=t.wave,a=t.configHasChanged,r=t.mode,s=t.constraints,o=t.weights;return i.createElement(i.Fragment,null,i.createElement("div",{className:"app-container"},i.createElement(Z,{values:["Many full decks","One deck distributed","Weighted decks","Constrained decks"],selected:r,handleSelect:this.onModeSelect}),i.createElement(H,{mode:r}),i.createElement(W,{wave:n,mode:r}),i.createElement("div",{className:"buttons"},i.createElement("button",{className:"reset run",onClick:this.reset},i.createElement("span",null,"RESET")),i.createElement("button",{className:"run",onClick:this.gen},i.createElement("span",null,"GEN"),a&&2===r?i.createElement("span",{className:"warn"},"!"):i.createElement(i.Fragment,null))),i.createElement("div",{className:"constraints-container",hidden:2!==r},i.createElement("h3",null,"Weights definition"),i.createElement("div",{className:"constraints"},i.createElement("div",{className:"constraints-line firstLine"},i.createElement("div",{className:"number"},"#"),i.createElement("div",{className:"use"},"Use"),i.createElement("div",{className:"selector"},"Selector"),i.createElement("div",{className:"weight"},"Weight")),o.map((function(t,n){return i.createElement("div",{className:"constraints-line midLine",key:"w-key-"+n},i.createElement("div",{className:"number"},"#",n+1),i.createElement("div",{className:"use"},i.createElement("input",{type:"checkbox",checked:t[0],onChange:function(t){return e.updateWeight(n,0,t.target.checked)}})),i.createElement("div",{className:"selector"},i.createElement("select",{className:"select-text",value:t[1],onChange:function(t){return e.updateWeight(n,1,t.target.value)}},A.map((function(e){return i.createElement("option",{key:"w-"+e.key,value:e.value},e.text)}))),i.createElement("select",{value:t[2],onChange:function(t){return e.updateWeight(n,2,t.target.value)},style:{color:"h"===t[2]||"d"===t[2]?"red":"black"}},G.map((function(e,t){return i.createElement("option",{key:"w-"+e.key+"-"+n+"-"+t,value:e.value,style:{color:e.color}},e.text)})))),i.createElement("div",{className:"weight"},i.createElement("input",{type:"number",min:"0",value:t[3],onChange:function(t){return e.updateWeight(n,3,t.target.valueAsNumber)}})),i.createElement("div",{className:"remove"},i.createElement("button",{style:{borderRadius:"200px",padding:0,paddingBottom:"2px",width:"28px"},onClick:function(){return e.removeWeight(n)}},"-")))})),i.createElement("div",{className:"constraints-line lastLine"},i.createElement("button",{onClick:function(){return e.addWeight()}},"Add constraint")))),i.createElement("div",{className:"constraints-container",hidden:3!==r},i.createElement("h3",null,"Constraints definition"),i.createElement("div",{className:"constraints"},i.createElement("div",{className:"constraints-line firstLine"},i.createElement("div",{className:"number"},"#"),i.createElement("div",{className:"use"},"Use"),i.createElement("div",{className:"selector"},"Selector"),i.createElement("div",{className:"type"},"Constraint type"),i.createElement("div",{className:"selector"},"Selector"),i.createElement("div",{className:"remove"},"Suppr.")),s.map((function(t,n){return i.createElement("div",{className:"constraints-line midLine",key:"key-"+n},i.createElement("div",{className:"number"},"#",n+1),i.createElement("div",{className:"use"},i.createElement("input",{type:"checkbox",checked:t[0],onChange:function(t){return e.updateConstraint(n,0,t.target.checked)}})),i.createElement("div",{className:"selector"},i.createElement("select",{className:"select-text",value:t[1],onChange:function(t){return e.updateConstraint(n,1,t.target.value)}},A.map((function(e,t){return i.createElement("option",{key:e.key+"-"+n+"-"+t,value:e.value},e.text)}))),i.createElement("select",{value:t[2],onChange:function(t){return e.updateConstraint(n,2,t.target.value)},style:{color:"h"===t[2]||"d"===t[2]?"red":"black"}},G.map((function(e,t){return i.createElement("option",{key:e.key+"-"+n+"-"+t,value:e.value,style:{color:e.color}},e.text)})))),i.createElement("div",{className:"type"},i.createElement("select",{value:t[3],onChange:function(t){return e.updateConstraint(n,3,t.target.value)}},S.map((function(e){return i.createElement("option",{key:e.key,value:e.value},e.text)})))),"no-at"!==t[3]&&"prefers-at"!==t[3]?i.createElement("div",{className:"selector"},i.createElement("select",{className:"select-text",value:t[4],onChange:function(t){return e.updateConstraint(n,4,t.target.value)}},A.map((function(e,t){return i.createElement("option",{key:"2-"+e.key+"-"+n+"-"+t,value:e.value},e.text)}))),i.createElement("select",{value:t[5],onChange:function(t){return e.updateConstraint(n,5,t.target.value)},style:{color:"h"===t[5]||"d"===t[5]?"red":"black"}},G.map((function(e,t){return i.createElement("option",{key:"2-"+e.key+"-"+n+"-"+t,value:e.value,style:{color:e.color}},e.text)})))):i.createElement("div",{className:"selector"},i.createElement("select",{value:t[6],onChange:function(t){return e.updateConstraint(n,6,t.target.value)}},T.map((function(e){return i.createElement("option",{key:e.key,value:e.value},e.text)})))),i.createElement("div",{className:"remove"},i.createElement("button",{style:{borderRadius:"200px",padding:0,paddingBottom:"2px",width:"28px"},onClick:function(){return e.removeConstraint(n)}},"-")))})),i.createElement("div",{className:"constraints-line lastLine"},i.createElement("button",{onClick:function(){return e.addConstraint()}},"Add constraint"))))))},t}(i.Component),U=B,j=n(7993),O=n(8313),F=["components"],R={slug:"content-distribution",title:"Designing randomness: Content distribution",draft:!1,tags:["designing randomness","procedural","game design","tools"]},z=void 0,J={permalink:"/blog/content-distribution",source:"@site/blog/2021-07-01-content-distribution.md",title:"Designing randomness: Content distribution",description:"Let's distribute cards. But better.",date:"2021-07-01T00:00:00.000Z",formattedDate:"July 1, 2021",tags:[{label:"designing randomness",permalink:"/blog/tags/designing-randomness"},{label:"procedural",permalink:"/blog/tags/procedural"},{label:"game design",permalink:"/blog/tags/game-design"},{label:"tools",permalink:"/blog/tags/tools"}],readingTime:3.235,truncated:!0,authors:[],nextItem:{title:"Designing information: communicating science",permalink:"/blog/science-popularization"}},P={authorsImageUrls:[]},Q=[],K={toc:Q};function X(e){var t=e.components,n=(0,r.Z)(e,F);return(0,s.kt)("wrapper",(0,a.Z)({},K,n,{components:t,mdxType:"MDXLayout"}),(0,s.kt)("p",null,"Let's distribute cards. But better."),(0,s.kt)("hr",null),(0,s.kt)("p",null,(0,s.kt)("em",{parentName:"p"},(0,s.kt)("strong",{parentName:"em"},"Procedural generation"))," is a term probably overused in videogame production. It's so trendy, it makes your system sound so smart where you often just call ",(0,s.kt)("inlineCode",{parentName:"p"},"random()")," a bunch of times."),(0,s.kt)(j.Z,{srcImage:"img/illustrations/wiki-procedural.png",altText:"wiki-procedural",legend:"Randomly generated redirects here. Oof.",mdxType:"Image"}),(0,s.kt)("p",null,"I personally see ",(0,s.kt)("em",{parentName:"p"},(0,s.kt)("strong",{parentName:"em"},"procedural generation"))," as a glorified name to designate ",(0,s.kt)("strong",{parentName:"p"},"a function with a small input that spits out a big output"),". And for me, this is the whole point: from a minimal input, get the maximal output that you can get through a ",(0,s.kt)("em",{parentName:"p"},"procedure"),", an ",(0,s.kt)("em",{parentName:"p"},"algorithm"),", a ",(0,s.kt)("em",{parentName:"p"},"piece of code"),", ... to avoid handcrafting everything."),(0,s.kt)("p",null,"If ",(0,s.kt)("em",{parentName:"p"},(0,s.kt)("strong",{parentName:"em"},"procedural generation"))," is already ubiquitous in the art pipelines of most videogame/VFX/animation studio, it also lives for a long time in the field of game design."),(0,s.kt)("p",null,"In this ",(0,s.kt)("a",{parentName:"p",href:"/blog/tags/designing-randomness"},"series of short articles")," called ",(0,s.kt)("em",{parentName:"p"},(0,s.kt)("strong",{parentName:"em"},"Designing randomness")),", I dive into the field of ",(0,s.kt)("strong",{parentName:"p"},"procedural game design"),"."),(0,s.kt)("hr",null),(0,s.kt)("p",null,"In game design, ",(0,s.kt)("em",{parentName:"p"},(0,s.kt)("strong",{parentName:"em"},"procedural generation"))," is often focused on ",(0,s.kt)("em",{parentName:"p"},(0,s.kt)("strong",{parentName:"em"},"generating game content"))," : making an infinite amount of dungeons for the player to explore in a roguelike is the quintessential example, so let's take it."),(0,s.kt)("p",null,"Dungeons in roguelikes are not generated through some kind of superpowerful algorithm, redrawing every position of every brick to create a new yet coherent piece of architecture. The problem is much simpler, and it starts with defining a dungeon from a level design perspective:"),(0,s.kt)("p",{style:{textAlign:"center",fontWeight:"bold",marginTop:"20px",fontSize:"18px"}},"99,9% of the time, a dungeon is an assemblage of pre-made rooms."),(0,s.kt)("p",null,"Generating a dungeon then becomes choosing rooms from an existing library and linking rooms with doors. Much better!"),(0,s.kt)("br",null),(0,s.kt)(O.Z,{srcUrl:"https://www.youtube.com/embed/1-HIA6-LBJc",legend:"The original programmer of Binding of Isaac on the Room Generation algorithm he conceived for the game",mdxType:"Iframe"}),(0,s.kt)("br",null),(0,s.kt)("p",null,"This subspace of procedural generation, ",(0,s.kt)("em",{parentName:"p"},(0,s.kt)("strong",{parentName:"em"},"scattering pre-existing content")),", is really natural for game design. Thus, design tasks are split in two layers: ",(0,s.kt)("strong",{parentName:"p"},"designing individuals rooms")," to serve the second to second gameplay, ",(0,s.kt)("strong",{parentName:"p"},"designing the rules of assemblage")," to serve the minute to minute exploration of our dungeon."),(0,s.kt)("p",null,"This second layer is where procedural game design takes center stage: the ",(0,s.kt)("strong",{parentName:"p"},"use of randomness is essential")," to keep the world fresh and unpredictible for players, but we still need ",(0,s.kt)("strong",{parentName:"p"},"a level of control on the assemblage algorithm to inject level design rules")," (for pacing, logic, avoiding repetition). Easier said than done! Striking a design balance between the predictability of rules and the impredictability of their random use is key to generate endless amounts of enjoyable dungeons."),(0,s.kt)("br",null),(0,s.kt)(O.Z,{srcUrl:"https://www.youtube.com/embed/ClZe5x8Tfiw",legend:"Hades world structure uses this exact principle: a series of rooms that you cross one after the other!",mdxType:"Iframe"}),(0,s.kt)("br",null),(0,s.kt)("hr",null),(0,s.kt)("p",null,"Let's simplify the problem a bit more: ",(0,s.kt)("strong",{parentName:"p"},"let's say our dungeon is a straight corridor of 20 rooms back to back"),". Our brave designer created a library of 52 rooms that can be represented by the usual poker cards. I like the card representation because I think it mimics well ",(0,s.kt)("em",{parentName:"p"},"the reality of content development"),": you have ",(0,s.kt)("strong",{parentName:"p"},"many ways to subdivide a given set"),". In the case of cards: ",(0,s.kt)("strong",{parentName:"p"},"suit, color, value, figures"),"."),(0,s.kt)("p",null,(0,s.kt)("strong",{parentName:"p"},"This next interactive toy lets you play with 4 different ways to distribute 20 ordered cards"),", 4 different ways to build a dungeon, from dumb to smart, from dead simple to not-so-simple."),(0,s.kt)("p",null,"With the last one, I tried to strike the balance between random and rules I talked earlier by using a ",(0,s.kt)("strong",{parentName:"p"},"constraint based algorithm (the popular Wave Function Collapse): it's often simpler to say to the computer what you don't want and then let it generate something that respects that"),"."),(0,s.kt)("p",null,"It's obviously applied on a very simple problem"),(0,s.kt)(U,{mdxType:"ContentDistribution"}),(0,s.kt)("br",null))}X.isMDXComponent=!0}}]);