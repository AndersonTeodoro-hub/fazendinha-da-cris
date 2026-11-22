/* ---------- construções dos bichos, lago, papagaio e pássaros ---------- */
function galinheiro(g,ovos){
  for(const x of[-12,10]){g.beginPath();g.rect(x,-7,2,7);g.fillStyle='#8a5a34';g.fill();g.stroke();}
  forma(g,'#a9713f',g=>{g.moveTo(-3,-7.6);g.lineTo(3,-7.6);g.lineTo(9,0);g.lineTo(4,0);});
  g.lineWidth=.3;g.beginPath();for(let i=1;i<4;i++){g.moveTo(-1+i*2,-7.6+i*1.9);g.lineTo(3.4+i*1.5,-7.6+i*1.9);}g.stroke();pronto(g);
  g.beginPath();g.roundRect(-15,-25,30,18,1.2);g.fillStyle=luz(g,'#e3b877',-25,-7,.12);g.fill();g.stroke();
  g.strokeStyle='rgba(120,80,40,.4)';g.lineWidth=.3;g.beginPath();for(let y=-21.5;y<-8;y+=3.5){g.moveTo(-15,y);g.lineTo(15,y);}g.stroke();pronto(g);
  g.beginPath();g.roundRect(-4,-19,8,11.4,[4,4,0,0]);g.fillStyle='#3b2a2a';g.fill();g.stroke();
  g.beginPath();g.rect(7,-21,5.6,5);g.fillStyle='#bfe6ff';g.fill();g.stroke();g.beginPath();g.moveTo(9.8,-21);g.lineTo(9.8,-16);g.stroke();
  forma(g,luz(g,'#c8553d',-36,-24,.14),g=>{g.moveTo(-18.5,-24);g.lineTo(0,-36);g.lineTo(18.5,-24);});
  g.beginPath();g.roundRect(-22,-13,8,6,1);g.fillStyle='#c98a4b';g.fill();g.stroke();el(g,-18,-13,3.8,1.3,'#f0cf6b');
  for(let i=0;i<Math.min(3,ovos);i++)el(g,-19.6+i*1.7,-13.6,.9,1.15,'#fbf1dc');
  el(g,0,-29.6,1.6,1.6,'#fffaf0');
}
function casinha(g,nome){
  forma(g,luz(g,'#c98a4b',-17,0,.12),g=>{g.moveTo(-9,0);g.lineTo(-9,-11);g.lineTo(0,-18);g.lineTo(9,-11);g.lineTo(9,0);});
  g.strokeStyle='rgba(120,70,30,.4)';g.lineWidth=.3;g.beginPath();for(let y=-9;y<0;y+=3){g.moveTo(-9,y);g.lineTo(9,y);}g.stroke();pronto(g);
  g.beginPath();g.roundRect(-4.6,-10,9.2,10,[4.6,4.6,0,0]);g.fillStyle='#3b2a2a';g.fill();g.stroke();
  tubo(g,'#c8553d',2.2,g=>{g.moveTo(-11.4,-9.6);g.lineTo(0,-19.2);g.lineTo(11.4,-9.6);});
  if(nome){g.beginPath();g.roundRect(-5.5,-14.4,11,3.2,.8);g.fillStyle='#fffaf0';g.fill();g.stroke();g.font='600 2.2px Fredoka,sans-serif';g.textAlign='center';g.fillStyle=LN;g.fillText(nome.slice(0,8),0,-12);}
  g.save();g.translate(13.5,-.6);forma(g,'#4c7fd0',g=>{g.moveTo(-3,-1.6);g.lineTo(3,-1.6);g.lineTo(2.2,.8);g.lineTo(-2.2,.8);});el(g,0,-1.6,3,.8,'#6ec1f2');g.restore();
}
function abrigo(g){
  for(const x of[-30,-10,10,30]){g.beginPath();g.rect(x-1.2,-22,2.4,22);g.fillStyle='#8a5a34';g.fill();g.stroke();}
  g.beginPath();g.rect(-30,-12,60,2);g.fillStyle='#a9713f';g.fill();g.stroke();
  uni(g,luz(g,'#e9c46a',-10,0,.14),[E(-16,-4,9,5),E(-6,-3,7,4),E(-22,-2.4,6,3)]);
  g.strokeStyle='rgba(140,95,20,.5)';g.lineWidth=.3;g.beginPath();for(let i=0;i<9;i++){g.moveTo(-24+i*3,-1);g.lineTo(-22+i*3,-6-(i%3));}g.stroke();pronto(g);
  forma(g,luz(g,'#c8553d',-34,-22,.14),g=>{g.moveTo(-36,-21);g.lineTo(-30,-33);g.lineTo(30,-33);g.lineTo(36,-21);});
  g.strokeStyle='rgba(90,25,15,.4)';g.lineWidth=.35;g.beginPath();for(let x=-26;x<=26;x+=6.5){g.moveTo(x,-33);g.lineTo(x*1.2,-21);}g.stroke();pronto(g);
}
function cocho(g){forma(g,luz(g,'#a9713f',-6,0,.12),g=>{g.moveTo(-10,-6);g.lineTo(10,-6);g.lineTo(8,0);g.lineTo(-8,0);});el(g,0,-6,10,1.8,'#6ec1f2');el(g,-3,-6.2,2.4,.4,'rgba(255,255,255,.7)',0,0);}
function juncos(g,t){for(let i=-2;i<=2;i++){const b=Math.sin(t*1.3+i)*.6;tubo(g,i%2?'#4c9a4a':'#3f8c3d',.6,g=>{g.moveTo(i*1.4,0);g.quadraticCurveTo(i*1.6+b,-6,i*2+b*2,-11-Math.abs(i));});}
  for(const i of[-1,1]){g.beginPath();g.roundRect(i*2-1,-14,2,4.4,1);g.fillStyle='#7a4a21';g.fill();g.stroke();}}
function papagaio(g,t,fala){
  const bal=Math.sin(t*2.4)*.5,asa=fala?Math.sin(t*26)*.5:0,bico=fala?Math.abs(Math.sin(t*18))*1.2:0;
  forma(g,'#e0475a',g=>{g.moveTo(-2,2);g.quadraticCurveTo(-4.4,7,-3.4,11.6);g.lineTo(-1.4,11.6);g.quadraticCurveTo(-.4,7,0,2.4);});
  forma(g,'#4c7fd0',g=>{g.moveTo(-1,3);g.lineTo(-.6,10.6);g.lineTo(.8,10.6);g.lineTo(1,3);});
  el(g,0,0,3.4,4.6,luz(g,'#3fae4a',-4.6,4.6,.18));
  g.save();g.translate(-1.8,-1);g.rotate(.25+asa);forma(g,'#2f8f3f',g=>{g.moveTo(0,-2.4);g.quadraticCurveTo(-3.6,1,-2.2,6);g.quadraticCurveTo(.6,3.4,1.4,-1);});el(g,-1.6,4.2,.9,1.6,'#4c7fd0',.3);el(g,-.7,2.6,.8,1.4,'#f6c945',.3);g.restore();
  g.save();g.translate(.6,-5.4+bal);
  el(g,0,0,2.9,2.8,luz(g,'#4fc05a',-2.8,2.8,.14));el(g,.4,-1.8,2,1,'#e0475a',0,0);el(g,1,.2,1.2,1.2,'#fffaf0');el(g,1.2,.2,.5,.55,'#1d1a22',0,0);
  forma(g,'#f6c945',g=>{g.moveTo(2.2,-1);g.quadraticCurveTo(5.4,-.6,4.6,2.2-bico*.2);g.quadraticCurveTo(3.4,1.2,2.2,1);});
  forma(g,'#3b2a2a',g=>{g.moveTo(2.3,1.1);g.quadraticCurveTo(3.4,1.4,3.8,2.6+bico);g.quadraticCurveTo(2.6,2.8+bico,2,1.8);});
  g.restore();
  for(const x of[-.8,1])tubo(g,'#8a8a94',.5,g=>{g.moveTo(x,4.2);g.lineTo(x,5.6);});
}
function viveiro(g,t,fala){
  el(g,0,.6,19,5,luz(g,'#d9cdb8',-4,5,.1));
  g.fillStyle='#b9ad98';for(let i=0;i<10;i++){const a=i/10*TAU;g.beginPath();g.ellipse(Math.cos(a)*15,.6+Math.sin(a)*3.6,2.2,1,0,0,TAU);g.fill();}
  for(const[x,c]of[[-17,'#f08ca0'],[-13.5,'#f6c945'],[14,'#b58cf0'],[17.5,'#f08ca0']]){tubo(g,'#4c9a4a',.5,g=>{g.moveTo(x,1);g.lineTo(x,-3.4);});el(g,x,-4.2,1.5,1.5,c);el(g,x,-4.2,.5,.5,'#f6c945',0,0);}
  const ouro='#d9a93a',barras=n=>{g.strokeStyle=ouro;g.lineWidth=.45;g.beginPath();for(let i=0;i<n;i++){const x=-13+i*26/(n-1);g.moveTo(x,-3);g.lineTo(x,-34);g.quadraticCurveTo(x*.9,-46,0,-50);}g.stroke();pronto(g);};
  el(g,0,-3,13.6,3.2,'#8a5a34');barras(9);
  tubo(g,'#8a5a34',.9,g=>{g.moveTo(-9,-20);g.lineTo(9,-20);});
  g.save();g.translate(-1,-25.4);g.scale(1.25,1.25);papagaio(g,t,fala);g.restore();
  g.save();g.translate(7,-11);g.rotate(Math.sin(t*1.7)*.12);g.strokeStyle=ouro;g.lineWidth=.35;g.beginPath();g.moveTo(-2.4,-22);g.lineTo(-2.4,0);g.moveTo(2.4,-22);g.lineTo(2.4,0);g.stroke();pronto(g);g.beginPath();g.roundRect(-3.4,-.6,6.8,1.3,.6);g.fillStyle='#a9713f';g.fill();g.stroke();g.restore();
  el(g,-8,-6,2.6,1.2,'#4c7fd0');el(g,-8,-6.4,2,.6,'#f0cf6b',0,0);
  barras(5);
  g.strokeStyle=ouro;g.lineWidth=.9;g.beginPath();g.ellipse(0,-3,13.4,3.1,0,0,Math.PI);g.stroke();g.beginPath();g.ellipse(0,-34,13.2,2.6,0,0,Math.PI);g.stroke();pronto(g);
  el(g,0,-51.4,1.5,1.5,luz(g,'#f6c945',-53,-50,.2));tubo(g,ouro,.6,g=>{g.moveTo(0,-53);g.lineTo(0,-56);});el(g,0,-56.6,.9,.9,'#e0475a');
}
const PENAS=[['#8a5a34','#c9a36b'],['#4c7fd0','#bfe0ff'],['#f6c945','#fff3b0'],['#e0475a','#f6c0a0'],['#4a4450','#b9b2c2']];
function passaro(g,cor,voa,t){
  const[c1,c2]=PENAS[cor%PENAS.length];
  if(voa){const a=Math.sin(t*22);forma(g,c1,g=>{g.moveTo(-1,-.4);g.lineTo(-.4,-3.6*a-.6);g.lineTo(1.6,-.4);});
    forma(g,c1,g=>{g.moveTo(-2.4,.2);g.lineTo(-4.6,-.4);g.lineTo(-4.4,1);});el(g,0,0,2.6,1.3,c1);el(g,.4,.5,1.6,.7,c2,0,0);el(g,2.4,-.5,1.1,1,c1);
    forma(g,'#f29b30',g=>{g.moveTo(3.3,-.8);g.lineTo(4.6,-.4);g.lineTo(3.3,0);});el(g,2.7,-.7,.25,.25,'#1d1a22',0,0);
    forma(g,tom(c1,-.2),g=>{g.moveTo(-.6,-.2);g.lineTo(.4,3.4*a+.4);g.lineTo(1.8,-.2);});return;}
  const b=Math.abs(Math.sin(t*3))>.96?.5:0;
  tubo(g,'#8a8a94',.3,g=>{g.moveTo(-.4,0);g.lineTo(-.4,-1);});tubo(g,'#8a8a94',.3,g=>{g.moveTo(.6,0);g.lineTo(.6,-1);});
  forma(g,c1,g=>{g.moveTo(-1.6,-1.6);g.lineTo(-4,-.6);g.lineTo(-1.4,-.4);});el(g,0,-2,2,1.7,c1);el(g,.5,-1.5,1.3,1,c2,0,0);el(g,-.5,-2.2,1.3,.9,tom(c1,-.18),.3,0);
  el(g,1.5,-3.6+b,1.2,1.1,c1);forma(g,'#f29b30',g=>{g.moveTo(2.5,-3.9+b);g.lineTo(3.7,-3.5+b);g.lineTo(2.5,-3.1+b);});el(g,1.8,-3.8+b,.25,.25,'#1d1a22',0,0);
}
Object.assign(ICO,{
 peixe(g){forma(g,luz(g,'#6aa9d9',-2.6,2.6,.2),g=>{g.moveTo(-4.4,-2.2);g.lineTo(-2.4,0);g.lineTo(-4.4,2.2);g.lineTo(-2,.6);g.quadraticCurveTo(1,3.2,4.4,0);g.quadraticCurveTo(1,-3.2,-2,-.6);});
  el(g,2.4,-.5,.5,.5,'#1d1a22',0,0);g.lineWidth=.3;g.beginPath();g.arc(1.2,0,1.6,-1,1);g.stroke();pronto(g);el(g,.4,-1,1.4,.4,'rgba(255,255,255,.5)',-.2,0);},
 frito(g){el(g,0,1.4,4.8,2.4,'#fbfbff');forma(g,luz(g,'#d9a05a',-1.4,2,.14),g=>{g.moveTo(-4,-.8);g.lineTo(-2.4,.6);g.lineTo(-4,2);g.lineTo(-2,1.2);g.quadraticCurveTo(.6,2.8,3.6,.6);g.quadraticCurveTo(.6,-1.6,-2,0);});
  el(g,2.6,2,1.2,.8,'#f6c945');el(g,-1,2.6,.8,.4,'#58b368',0,0);}
});
