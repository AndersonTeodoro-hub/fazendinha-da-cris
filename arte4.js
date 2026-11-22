/* ---------- novas culturas ---------- */
function arvoreta(g,f,copa,fruta,verde,pera){
  forma(g,'#8a5a34',g=>{g.moveTo(-1.3,0);g.lineTo(-.8,-6);g.lineTo(.8,-6);g.lineTo(1.3,0);});
  uni(g,luz(g,copa,-14,-4,.16),[E(0,-9.5,4.6,4.4),E(-3.4,-7.4,3.2,3),E(3.4,-7.6,3.2,3),E(0,-6.4,3.6,2.8)]);el(g,-1.4,-11,1.8,1.1,'rgba(180,235,150,.4)',-.3,0);
  if(f>.6){const c=f>=1?fruta:verde;[[-3,-7],[2.6,-9.6],[.4,-5.6],[-.8,-11]].forEach(([x,y])=>{el(g,x,y,pera?1:1.25,pera?1.6:1.25,c);});}
}
Object.assign(DES,{
 capim(g,f){for(let i=-4;i<=4;i++){const c=i%2?'#4c9a4a':'#6cc45c';tubo(g,c,.6,g=>{g.moveTo(i*.7,0);g.quadraticCurveTo(i*1.1,-5,i*1.9,-9.5+Math.abs(i)*.7);});}},
 salsa(g,f){for(let i=-3;i<=3;i++){tubo(g,'#4c9a4a',.35,g=>{g.moveTo(i*.4,0);g.lineTo(i*1.5,-5.6+Math.abs(i)*.5);});el(g,i*1.5,-6.2+Math.abs(i)*.5,1.5,1.2,i%2?'#6cc45c':'#58b368');}},
 couve(g,f){for(const[a,l]of[[-1.2,6],[1.2,6],[-.6,7.6],[.6,7.6],[0,8.4]]){g.save();g.rotate(a);el(g,0,-l/2-1,2.6,l/2,a?'#3f8f6a':'#4fa37c');g.strokeStyle='rgba(220,250,230,.7)';g.lineWidth=.3;g.beginPath();g.moveTo(0,-1);g.lineTo(0,-l);g.stroke();pronto(g);g.restore();}},
 feijao(g,f){uni(g,'#4c9a4a',[E(0,-5,4.2,4),E(-2.8,-3,2.6,2.4),E(2.8,-3.2,2.6,2.4)]);el(g,-1,-6.4,1.6,1.1,'rgba(140,215,110,.5)',-.3,0);
  if(f>.6){const c=f>=1?'#d9c58a':'#8fcf6a';[[-2.6,-3.4,.5],[2,-5,-.4],[.2,-2,.2]].forEach(([x,y,r])=>el(g,x,y,.7,2.2,c,r));}},
 arroz(g,f){const c=f>=1?'#e3c96a':'#9fcf6a';for(const i of[-2,-1,0,1,2]){tubo(g,f>=1?'#c9b24a':'#6fb04f',.45,g=>{g.moveTo(i*.5,0);g.quadraticCurveTo(i*1.2,-7,i*2.6,-8.4);});if(f>.6)for(let j=0;j<3;j++)el(g,i*2.6+i*.5*j,-8.2+j*1.1,.75,.5,c,.5);}},
 quiabo(g,f){tubo(g,'#4c9a4a',.7,g=>{g.moveTo(0,0);g.lineTo(0,-11.5);});for(const[y,s]of[[-3,1],[-5.6,-1],[-8,1]]){el(g,s*2.6,y,2.6,1.4,'#58b368',s*-.4);}
  if(f>.6)for(const[y,s]of[[-4.4,-1],[-7,1],[-9.6,-1]])forma(g,f>=1?'#5fae4a':'#9fcf6a',g=>{g.moveTo(s*.6,y);g.lineTo(s*1.8,y-.4);g.lineTo(s*2.2,y-3.8);});
  for(let k=0;k<5;k++){const a=k/5*TAU;el(g,Math.cos(a)*.9,-12.2+Math.sin(a)*.9,.7,.7,'#f6e7a0',0,0);}el(g,0,-12.2,.45,.45,'#7a2a3a',0,0);},
 berinjela(g,f){uni(g,'#4c9a4a',[E(0,-6.4,4,4.2),E(-2.6,-4,2.6,2.6),E(2.6,-4.2,2.6,2.6)]);el(g,-1,-7.8,1.6,1.1,'rgba(140,215,110,.5)',-.3,0);
  if(f>.6)[[-2.4,-2.6],[2.2,-3.2]].forEach(([x,y])=>{el(g,x,y,1.25,2.2,f>=1?'#6b3fa0':'#b9a0d9');el(g,x,y-2,1.1,.6,'#3f8c3d');el(g,x-.4,y-.4,.3,.7,'rgba(255,255,255,.5)',0,0);});},
 laranja(g,f){arvoreta(g,f,'#3f8f47','#f29b30','#9fcf5a');},
 abacate(g,f){arvoreta(g,f,'#2f7a4a','#3f6b3a','#8fbf6a',1);}
});
const tigela=(c1,c2)=>g=>{forma(g,luz(g,'#fbf0d2',-1,3.4,.1),g=>{g.moveTo(-4.2,-.8);g.lineTo(4.2,-.8);g.quadraticCurveTo(3.6,3.4,0,3.4);g.quadraticCurveTo(-3.6,3.4,-4.2,-.8);});el(g,0,-.8,4.2,1.4,c1);
  [[-1.6,-1],[.2,-.5],[1.8,-1.1],[-.4,-1.4]].forEach(([x,y])=>el(g,x,y,.7,.4,c2,.4,0));};
Object.assign(ICO,{
 capim(g){for(let i=-3;i<=3;i++)tubo(g,i%2?'#4c9a4a':'#6cc45c',.7,g=>{g.moveTo(i*.5,4);g.quadraticCurveTo(i*.8,-1,i*1.5,-4.4+Math.abs(i)*.5);});tubo(g,'#d9a93a',.8,g=>{g.moveTo(-2.2,1.6);g.lineTo(2.2,1.6);});},
 salsa(g){tubo(g,'#4c9a4a',.5,g=>{g.moveTo(0,4.4);g.lineTo(0,-.4);});for(const[x,y]of[[-2.2,-1],[2.2,-1],[0,-2.8],[-1.4,-3.4],[1.4,-3.4],[0,-.6]])el(g,x,y,1.6,1.3,'#6cc45c');},
 couve(g){forma(g,luz(g,'#3f8f6a',-4.6,4,.14),g=>{g.moveTo(0,4.6);g.bezierCurveTo(-5.4,2,-4.6,-4,0,-4.8);g.bezierCurveTo(4.6,-4,5.4,2,0,4.6);});g.strokeStyle='rgba(220,250,230,.8)';g.lineWidth=.4;g.beginPath();g.moveTo(0,4);g.lineTo(0,-3.6);for(const y of[2,0,-2]){g.moveTo(0,y);g.lineTo(-2.4,y-1.6);g.moveTo(0,y);g.lineTo(2.4,y-1.6);}g.stroke();pronto(g);},
 feijao(g){for(const[x,y,r]of[[-2,.6,.5],[1.4,-1.4,-.3],[1.8,2.2,.9]])el(g,x,y,2,1.3,luz(g,'#8a4a2f',y-1.3,y+1.3,.16),r);el(g,-2.2,.3,.5,.3,'rgba(255,255,255,.5)',0,0);},
 arroz(g){tubo(g,'#c9b24a',.5,g=>{g.moveTo(-3,4.4);g.quadraticCurveTo(-1,-2,3,-3.4);});for(let i=0;i<5;i++){el(g,-1.6+i*1.1,-.2-i*.8,.9,.55,'#f1e0a0',.8);el(g,-.6+i*1.1,1-i*.8,.9,.55,'#f1e0a0',.2);}},
 quiabo(g){g.save();g.rotate(.6);forma(g,luz(g,'#5fae4a',-4.6,4,.14),g=>{g.moveTo(-1.5,-3.4);g.lineTo(1.5,-3.4);g.quadraticCurveTo(1.6,1,0,4.8);g.quadraticCurveTo(-1.6,1,-1.5,-3.4);});el(g,0,-3.6,1.7,.8,'#3f8c3d');g.lineWidth=.3;g.beginPath();g.moveTo(0,-3);g.lineTo(0,3.6);g.stroke();pronto(g);g.restore();},
 berinjela(g){g.save();g.rotate(.5);el(g,0,.8,2.5,3.8,luz(g,'#6b3fa0',-3,4.6,.16));el(g,-.8,0,.5,1.4,'rgba(255,255,255,.45)',.1,0);forma(g,'#3f8c3d',g=>{g.moveTo(-2,-2.4);g.lineTo(0,-1.6);g.lineTo(2,-2.4);g.lineTo(.5,-3.6);g.lineTo(.4,-4.8);g.lineTo(-.4,-4.8);g.lineTo(-.5,-3.6);});g.restore();},
 laranja(g){el(g,0,.4,3.4,3.3,luz(g,'#f29b30',-2.9,3.7,.16));el(g,-1.2,-.8,.8,.5,'rgba(255,255,255,.6)',-.5,0);el(g,1,-3.4,1.6,.8,'#58b368',-.5);},
 abacate(g){forma(g,luz(g,'#3f6b3a',-4.4,4.2,.16),g=>{g.moveTo(0,-4.4);g.bezierCurveTo(1.8,-4.4,1.6,-1,3,1);g.bezierCurveTo(4,3,2,4.4,0,4.4);g.bezierCurveTo(-2,4.4,-4,3,-3,1);g.bezierCurveTo(-1.6,-1,-1.8,-4.4,0,-4.4);});
  forma(g,'#e4eba0',g=>{g.moveTo(0,-3);g.bezierCurveTo(1,-3,1,-1,2,1);g.bezierCurveTo(2.8,2.6,1.4,3.4,0,3.4);g.bezierCurveTo(-1.4,3.4,-2.8,2.6,-2,1);g.bezierCurveTo(-1,-1,-1,-3,0,-3);});el(g,0,1.4,1.2,1.2,'#8a5a34');},
 tropeiro:tigela('#8a4a2f','#4fa37c'),
 arrozq:tigela('#fbfbf4','#5fae4a')
});

/* ---------- fogão a lenha de roça ---------- */
MV.fogao=function(g,m,t){
  const ac=typeof fogo!=='undefined'&&fogo>0;
  g.beginPath();g.rect(10,-54,8,32);g.fillStyle=luz(g,'#b5503a',-54,-22,.1);g.fill();g.stroke();g.beginPath();g.rect(8.8,-56,10.4,2.6);g.fillStyle='#8a3a2a';g.fill();g.stroke();
  g.lineWidth=.3;g.beginPath();for(let y=-50;y<-24;y+=4){g.moveTo(10,y);g.lineTo(18,y);g.moveTo(14+((y/4|0)%2?2:-2),y);g.lineTo(14+((y/4|0)%2?2:-2),y+4);}g.stroke();pronto(g);
  g.beginPath();g.roundRect(-19,-22,38,22,1.6);g.fillStyle=luz(g,'#f8f1e2',-22,0,.07);g.fill();g.stroke();
  g.beginPath();g.rect(-19,-6.4,38,6.4);g.fillStyle='#b5412f';g.fill();g.stroke();
  g.strokeStyle='rgba(150,130,100,.35)';g.lineWidth=.3;g.beginPath();g.moveTo(-15,-18);g.lineTo(-11,-15);g.moveTo(8,-12);g.lineTo(12,-10);g.stroke();pronto(g);
  g.beginPath();g.roundRect(-11,-18,14,11.6,[7,7,0,0]);g.fillStyle=ac?'#3a1408':'#1d1a22';g.fill();g.stroke();
  if(ac){g.save();g.beginPath();g.roundRect(-11,-18,14,11.6,[7,7,0,0]);g.clip();for(let i=0;i<3;i++){const x=-7.6+i*3.6,h=6+Math.sin(t*9+i*2)*2.4;forma(g,i%2?'#f6c945':'#f08a2a',g=>{g.moveTo(x-2.2,-6.4);g.quadraticCurveTo(x-1.6,-6.4-h*.6,x,-6.4-h);g.quadraticCurveTo(x+1.6,-6.4-h*.6,x+2.2,-6.4);});}g.restore();el(g,-4,-11,13,11,'rgba(255,170,60,.18)',0,0);}
  for(const[x,y]of[[-9,-7.6],[-5,-7.6]]){g.beginPath();g.roundRect(x,y,7,2,1);g.fillStyle='#8a5a34';g.fill();g.stroke();}
  for(const[x,y]of[[7,-2.4],[11,-2.4],[9,-4.6]]){g.beginPath();g.roundRect(x-2.4,y-1.1,5.6,2.2,1.1);g.fillStyle='#a9713f';g.fill();g.stroke();el(g,x+2.6,y,.7,.9,'#e9c9a0');}
  g.beginPath();g.roundRect(-20.5,-25.4,41,3.8,.8);g.fillStyle='#2f2a33';g.fill();g.stroke();el(g,-9,-23.6,4.4,1,'#15131a',0,0);el(g,3,-23.6,3.6,.9,'#15131a',0,0);
  g.beginPath();g.roundRect(-14,-31.4,10,6.2,[.8,.8,3,3]);g.fillStyle='#2a2630';g.fill();g.stroke();el(g,-9,-31.4,5.2,1.2,'#3a3540');el(g,-9,-32.6,.8,.6,'#3a3540');
  tubo(g,'#2a2630',.6,g=>{g.moveTo(-14,-29.6);g.lineTo(-16,-29.6);});tubo(g,'#2a2630',.6,g=>{g.moveTo(-4,-29.6);g.lineTo(-2,-29.6);});
  el(g,3,-28.6,3,3.2,luz(g,'#4c7fd0',-31.8,-25.4,.16));forma(g,'#4c7fd0',g=>{g.moveTo(5.4,-28.6);g.lineTo(8,-31);g.lineTo(8.4,-30.2);g.lineTo(6,-27.2);});el(g,3,-31.8,1.7,.6,'#3f6fb5');el(g,3,-32.6,.5,.5,'#f6c945');
  g.fillStyle='#fff';[[2,-29.4],[4,-28],[2.8,-27]].forEach(([x,y])=>{g.beginPath();g.arc(x,y,.3,0,TAU);g.fill();});
  if(ac){g.strokeStyle='rgba(255,255,255,.75)';g.lineWidth=.5;g.beginPath();for(const x of[-10.6,-7.4]){const o=Math.sin(t*3+x)*.8;g.moveTo(x,-33.6);g.quadraticCurveTo(x-1.4+o,-36.4,x+o,-39.2);}g.stroke();
   for(let i=0;i<3;i++){const k=(t*.5+i/3)%1;el(g,14+Math.sin(t+i)*1.4+k*3,-58-k*14,1.6+k*2.4,1.4+k*2,'rgba(255,255,255,'+(.45-k*.45)+')',0,0);}pronto(g);}
};
