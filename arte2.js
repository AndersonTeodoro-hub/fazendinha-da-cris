/* ---------- pessoas ---------- */
function pessoa(g,p,t,o){
  const a=p.mov?Math.sin(p.ph*1.3):0,f=o.f||0,bob=p.mov?Math.abs(Math.cos(p.ph*1.3))*.7:Math.sin(t*2+f)*.15,
    m={pisca:(t+f)%3.3<.12,contente:o.contente,dorme:o.dorme},cab=o.cab,pele='#f6cfae',cor=o.cor,jeans='#3f6fb5';
  for(const s of[-1,1]){const l=Math.max(0,a*s)*1.8,x=s*2;
    g.beginPath();g.roundRect(x-(o.saia?.95:1.6),-8.6-l,o.saia?1.9:3.2,5.8,.8);g.fillStyle=o.saia?pele:jeans;g.fill();g.stroke();
    g.beginPath();g.roundRect(x-1.6,-3.4-l,3.5,3.4,[1,1.6,1,1]);g.fillStyle='#7a4a2a';g.fill();g.stroke();}
  g.save();g.translate(0,-bob);
  if(o.tranca||o.laco)el(g,0,-19,5.7,o.laco?5.2:6.6,cab);
  for(const s of[-1,1]){tubo(g,o.saia?pele:cor,1.6,g=>{g.moveTo(s*3.7,-15.4);g.quadraticCurveTo(s*(5.4+a*s*.6),-13,s*5.2+a*1.6,-9.8);});if(!o.saia)el(g,s*5.2+a*1.6,-9.6,.95,.95,pele);}
  if(o.saia){
    forma(g,luz(g,cor,-17,-5,.1),g=>{g.moveTo(-3.7,-16.6);g.lineTo(3.7,-16.6);g.lineTo(5.9,-6.4);g.quadraticCurveTo(0,-4.6,-5.9,-6.4);});
    g.fillStyle='rgba(255,255,255,.55)';[[-3.6,-9],[3.4,-8.6],[-4.3,-7],[4.4,-6.8],[-2.9,-15],[3,-14.6],[-3.9,-12],[3.9,-11.6]].forEach(([x,y])=>{g.beginPath();g.arc(x,y,.42,0,TAU);g.fill();});
    if(o.avental){g.beginPath();g.roundRect(-2.7,-14,5.4,7,1.3);g.fillStyle='#fffaf0';g.fill();g.stroke();g.lineWidth=.3;g.beginPath();g.roundRect(-1.4,-10.6,2.8,2.2,.5);g.stroke();pronto(g);}
    for(const s of[-1,1])el(g,s*3.5,-15.6,1.7,1.5,cor);
  }else{
    g.beginPath();g.roundRect(-4.2,-16.8,8.4,9.4,1.8);g.fillStyle=luz(g,cor,-17,-7,.1);g.fill();g.stroke();
    g.strokeStyle='rgba(255,255,255,.35)';g.lineWidth=.3;g.beginPath();for(let x=-3;x<=3;x+=2){g.moveTo(x,-16.4);g.lineTo(x,-8);}for(let y=-15;y<-8;y+=2.2){g.moveTo(-4,y);g.lineTo(4,y);}g.stroke();pronto(g);
    g.beginPath();g.roundRect(-4.2,-9.2,8.4,2.4,.6);g.fillStyle=jeans;g.fill();g.stroke();
    g.beginPath();g.roundRect(-2.7,-14,5.4,5.4,.8);g.fillStyle=jeans;g.fill();g.stroke();
    tubo(g,jeans,.9,g=>{g.moveTo(-2.3,-14);g.lineTo(-3,-16.6);});tubo(g,jeans,.9,g=>{g.moveTo(2.3,-14);g.lineTo(3,-16.6);});
    el(g,-2.1,-13.3,.4,.4,'#f6c945');el(g,2.1,-13.3,.4,.4,'#f6c945');
  }
  if(o.tranca)for(const s of[-1,1]){tubo(g,cab,1.5,g=>{g.moveTo(s*4.6,-19);g.quadraticCurveTo(s*5.6,-16,s*4.9,-13.2);});el(g,s*4.9,-12.8,.9,.7,'#f6c945');}
  if(o.laco)for(const s of[-1,1]){el(g,s*5.6,-21.4,2,2.3,cab,s*.4);el(g,s*4.5,-22.6,.9,.9,'#e0475a');}
  if(o.coque)el(g,0,-25.3,2.8,2.4,cab);
  el(g,0,-20,4.7,4.5,pele);
  if(o.barba){g.beginPath();g.ellipse(0,-19.2,4.5,4.2,0,.2,Math.PI-.2);g.quadraticCurveTo(0,-17.6,4.4,-18.4);g.fillStyle='rgba(74,47,26,.5)';g.fill();}
  if(o.saia){g.beginPath();g.ellipse(0,-21.6,4.75,3.3,0,Math.PI,0);g.quadraticCurveTo(2,-20.4,0,-21.2);g.quadraticCurveTo(-2.4,-20.2,-4.75,-21.6);g.fillStyle=cab;g.fill();g.stroke();}
  else{g.beginPath();g.ellipse(0,-21.9,4.75,3,0,Math.PI,0);g.closePath();g.fillStyle=cab;g.fill();g.stroke();}
  const d=p.dir*.5;olho(g,-1.7+d,-19.5,.72,m);olho(g,1.7+d,-19.5,.72,m);
  if(o.oculos){g.lineWidth=.35;el(g,-1.7+d,-19.5,1.55,1.45,'rgba(255,255,255,.28)');el(g,1.7+d,-19.5,1.55,1.45,'rgba(255,255,255,.28)');g.beginPath();g.moveTo(-.2+d,-19.6);g.lineTo(.2+d,-19.6);g.stroke();pronto(g);}
  if(o.saia){el(g,-2.9+d,-18,1,.6,'rgba(232,80,110,.35)',0,0);el(g,2.9+d,-18,1,.6,'rgba(232,80,110,.35)',0,0);}
  g.beginPath();g.moveTo(-1.1+d,-17.6);g.quadraticCurveTo(d,-16.6,1.1+d,-17.6);g.stroke();
  if(o.chapeu&&!o.dorme){
    el(g,0,-23.3,7.8,2.1,luz(g,'#f0cf6b',-25.4,-21.2,.12));
    g.beginPath();g.ellipse(0,-23.8,4.5,3.9,0,Math.PI,0);g.closePath();g.fillStyle='#f0cf6b';g.fill();g.stroke();
    g.beginPath();g.rect(-4.4,-25.2,8.8,1.3);g.fillStyle=o.fita;g.fill();g.stroke();
    g.strokeStyle='rgba(120,80,20,.35)';g.lineWidth=.25;g.beginPath();for(let x=-6;x<=6;x+=2){g.moveTo(x,-23.4);g.lineTo(x*1.12,-21.8);}g.stroke();pronto(g);
  }
  g.restore();
}

/* ---------- ícones novos ---------- */
Object.assign(ICO,{
 trigo(g){g.save();g.rotate(.3);for(const s of[-1,0,1]){tubo(g,'#d9a93a',.5,g=>{g.moveTo(s*1.1,4.4);g.lineTo(s*2,-.6);});for(let i=0;i<3;i++){el(g,s*2-.7,-1-i*1.25,.9,.6,'#f0c64a',-.6);el(g,s*2+.7,-1-i*1.25,.9,.6,'#f0c64a',.6);}}g.restore();},
 tomate(g){el(g,0,.5,3.4,3.1,luz(g,'#e5483f',-2.6,3.6,.16));forma(g,'#4c9a4a',g=>{g.moveTo(0,-1.9);g.lineTo(-2.2,-3.1);g.lineTo(-.7,-2.4);g.lineTo(0,-4);g.lineTo(.7,-2.4);g.lineTo(2.2,-3.1);});el(g,-1.3,-.5,.8,.5,'rgba(255,255,255,.6)',-.5,0);},
 morango(g){forma(g,luz(g,'#e83a4e',-2.4,4,.14),g=>{g.moveTo(-3,-1.6);g.quadraticCurveTo(0,-3.4,3,-1.6);g.quadraticCurveTo(2.6,2.4,0,4);g.quadraticCurveTo(-2.6,2.4,-3,-1.6);});
  g.fillStyle='#ffe9a8';[[-1.2,-.4],[1.2,-.2],[0,1.4],[-1.4,1.1],[1.3,1.3],[0,-1.2]].forEach(([x,y])=>{g.beginPath();g.arc(x,y,.28,0,TAU);g.fill();});
  forma(g,'#4c9a4a',g=>{g.moveTo(-2.8,-2);g.lineTo(-1,-3.7);g.lineTo(0,-2.7);g.lineTo(1,-3.7);g.lineTo(2.8,-2);g.quadraticCurveTo(0,-1.2,-2.8,-2);});},
 abobora(g){forma(g,'#4c9a4a',g=>{g.moveTo(-.7,-2.2);g.lineTo(-.3,-4.3);g.lineTo(1,-4);g.lineTo(.7,-2.2);});uni(g,luz(g,'#f08a2a',-2.6,3.6,.14),[E(-2.2,.7,2.4,2.9),E(2.2,.7,2.4,2.9),E(0,.7,2.6,3.1)]);
  g.lineWidth=.3;g.beginPath();g.moveTo(-1,-2.1);g.quadraticCurveTo(-1.9,.7,-1,3.5);g.moveTo(1,-2.1);g.quadraticCurveTo(1.9,.7,1,3.5);g.stroke();pronto(g);},
 racao(g){forma(g,luz(g,'#d9b382',-3,4,.12),g=>{g.moveTo(-2.6,-2.6);g.quadraticCurveTo(-4.4,1,-3.2,4);g.lineTo(3.2,4);g.quadraticCurveTo(4.4,1,2.6,-2.6);});el(g,0,-3.3,2.3,1.1,'#c9a36b');tubo(g,'#e0475a',.5,g=>{g.moveTo(-2.4,-2.5);g.lineTo(2.4,-2.5);});
  el(g,0,1,1.9,1.6,'#fbf0d2');el(g,0,1.3,.8,.6,'#a8742c',0,0);el(g,-.8,.3,.35,.35,'#a8742c',0,0);el(g,0,0,.35,.35,'#a8742c',0,0);el(g,.8,.3,.35,.35,'#a8742c',0,0);},
 saquinho(g){g.beginPath();g.roundRect(-2.9,-3.9,5.8,7.8,.7);g.fillStyle='#fbf0d2';g.fill();g.stroke();g.beginPath();g.rect(-2.9,-3.9,5.8,1.7);g.fillStyle='#58b368';g.fill();g.stroke();
  tubo(g,'#4c9a4a',.5,g=>{g.moveTo(0,3);g.lineTo(0,.2);});el(g,-1.2,-.2,1.4,.8,'#58b368',-.6);el(g,1.2,-.2,1.4,.8,'#58b368',.6);},
 mochila(g){g.lineWidth=.9;g.beginPath();g.arc(0,-3,1.6,Math.PI,0);g.stroke();pronto(g);g.beginPath();g.roundRect(-3.5,-3.2,7,7.6,2.2);g.fillStyle=luz(g,'#4c7fd0',-3,4.4,.14);g.fill();g.stroke();
  g.beginPath();g.roundRect(-2.3,.4,4.6,3,.9);g.fillStyle='#7aa5e8';g.fill();g.stroke();g.beginPath();g.moveTo(-3.4,-.8);g.lineTo(3.4,-.8);g.stroke();el(g,0,-.8,.7,.6,'#f6c945');},
 lua(g){forma(g,luz(g,'#f6e7a0',-4,4,.12),g=>{g.arc(0,0,3.9,.75,TAU-.75);g.arc(1.9,0,3.1,TAU-1,1,true);});el(g,2.8,-2.6,.5,.5,'#f6e7a0',0,0);el(g,3.6,1.6,.35,.35,'#f6e7a0',0,0);},
 sol(g){for(let i=0;i<8;i++){const a=i/8*TAU;tubo(g,'#f6c945',.6,g=>{g.moveTo(Math.cos(a)*3.2,Math.sin(a)*3.2);g.lineTo(Math.cos(a)*4.4,Math.sin(a)*4.4);});}el(g,0,0,2.6,2.6,luz(g,'#f6c945',-2.6,2.6,.16));},
 mao(g){uni(g,'#f6cfae',[g=>g.roundRect(-2.6,-.8,5.4,4.8,1.8),g=>g.roundRect(-2.6,-3.9,1.3,4,.65),g=>g.roundRect(-1.2,-4.7,1.3,5,.65),g=>g.roundRect(.2,-4.5,1.3,5,.65),g=>g.roundRect(1.6,-3.6,1.3,4,.65),g=>g.ellipse(-3.2,1,.9,1.9,-.6,0,TAU)]);},
 enxada(g){g.save();g.rotate(-.7);tubo(g,'#a9713f',.9,g=>{g.moveTo(0,4.6);g.lineTo(0,-4);});forma(g,luz(g,'#9fa8b5',-5,-2,.2),g=>{g.moveTo(-.4,-4.6);g.lineTo(3.6,-4.4);g.lineTo(3.2,-1.6);g.lineTo(.2,-2.8);});g.restore();},
 machado(g){g.save();g.rotate(.7);tubo(g,'#a9713f',.9,g=>{g.moveTo(0,4.8);g.lineTo(0,-4);});forma(g,luz(g,'#b5bcc8',-5,-1,.2),g=>{g.moveTo(-.5,-4.6);g.quadraticCurveTo(2.4,-5.6,3.8,-3.6);g.quadraticCurveTo(4.2,-2,3.2,-.4);g.quadraticCurveTo(1.6,-2,-.5,-1.8);});g.restore();},
 regador(g){tubo(g,'#5aa9e6',.8,g=>{g.moveTo(2,-.4);g.lineTo(4.6,-3);});el(g,4.8,-3.3,.9,.6,'#5aa9e6',-.8);g.lineWidth=.8;g.beginPath();g.arc(-2.6,.6,2,1.2,4.6);g.stroke();pronto(g);
  g.beginPath();g.roundRect(-2.6,-2,5,5.6,1);g.fillStyle=luz(g,'#5aa9e6',-2,3.6,.16);g.fill();g.stroke();el(g,-.1,-2,2.5,.7,'#3f86c4');},
 madeira(g){for(const[x,y]of[[-1.6,1.6],[1.8,1.6],[.1,-1.4]]){g.beginPath();g.roundRect(x-2.6,y-1.5,5.2,3,1.4);g.fillStyle='#a9713f';g.fill();g.stroke();el(g,x+1.5,y,.95,1.25,'#e9c9a0');el(g,x+1.5,y,.35,.5,'#c9955f',0,0);}},
 porta(g){g.beginPath();g.roundRect(-2.8,-4.2,5.6,8.4,[2.8,2.8,.3,.3]);g.fillStyle=luz(g,'#3f8f8a',-4,4,.14);g.fill();g.stroke();g.beginPath();g.roundRect(-1.6,-2.6,3.2,2.4,.6);g.fillStyle='#bfe6ff';g.fill();g.stroke();el(g,1.6,1,.5,.5,'#f6c945');},
 sopa(g){forma(g,luz(g,'#fbf0d2',-1,3.4,.1),g=>{g.moveTo(-4.2,-.8);g.lineTo(4.2,-.8);g.quadraticCurveTo(3.6,3.4,0,3.4);g.quadraticCurveTo(-3.6,3.4,-4.2,-.8);});el(g,0,-.8,4.2,1.3,'#f29b30');el(g,-1.2,-.9,.6,.3,'#58b368',0,0);el(g,1,-.6,.6,.3,'#58b368',0,0);
  g.strokeStyle='rgba(255,255,255,.8)';g.lineWidth=.4;g.beginPath();g.moveTo(-1,-2.4);g.quadraticCurveTo(-1.8,-3.4,-1,-4.4);g.moveTo(1,-2.4);g.quadraticCurveTo(.2,-3.4,1,-4.4);g.stroke();pronto(g);},
 omelete(g){el(g,0,1,4.6,2.4,'#fbfbff');forma(g,luz(g,'#f6c945',-1.6,2.6,.12),g=>{g.moveTo(-3.2,1.2);g.quadraticCurveTo(-2.6,-2,0,-1.8);g.quadraticCurveTo(2.8,-2,3.2,1.2);g.quadraticCurveTo(0,2.6,-3.2,1.2);});el(g,-1,0,.6,.5,'#e5483f',0,0);el(g,1,.4,.6,.5,'#e5483f',0,0);el(g,.2,-.8,.5,.3,'#58b368',0,0);},
 bolo(g){g.beginPath();g.roundRect(-3.6,-.8,7.2,4.6,1);g.fillStyle='#f3d9a0';g.fill();g.stroke();forma(g,'#fff5f7',g=>{g.moveTo(-3.8,-1.2);g.quadraticCurveTo(0,-3,3.8,-1.2);g.lineTo(3.8,.2);g.quadraticCurveTo(2.6,1.6,1.4,.3);g.quadraticCurveTo(0,1.8,-1.2,.3);g.quadraticCurveTo(-2.6,1.6,-3.8,.2);});
  g.beginPath();g.moveTo(-3.5,2);g.lineTo(3.5,2);g.strokeStyle='#f08ca0';g.lineWidth=.6;g.stroke();pronto(g);el(g,0,-2.8,1.2,1.2,'#e83a4e');el(g,0,-3.7,.7,.3,'#4c9a4a');},
 torta(g){forma(g,luz(g,'#d9a05a',-1,3.4,.12),g=>{g.moveTo(-4.4,-.4);g.lineTo(4.4,-.4);g.lineTo(3.2,3.2);g.lineTo(-3.2,3.2);});el(g,0,-.5,4.4,1.5,'#f08a2a');
  g.lineWidth=.9;g.strokeStyle='#e9c48a';g.beginPath();for(let i=-3;i<=3;i+=1.5){g.moveTo(i,-1.4);g.lineTo(i+.6,.4);}g.stroke();pronto(g);el(g,0,-.5,4.4,1.5,null);}
});

/* ---------- plantas ---------- */
const DES={
 cenoura(g,f){if(f>=1)forma(g,'#f29b30',g=>{g.moveTo(-2.1,0);g.quadraticCurveTo(0,-3,2.1,0);});for(let i=-2;i<=2;i++){tubo(g,'#4c9a4a',.6,g=>{g.moveTo(i*.4,-.9);g.quadraticCurveTo(i*1.4,-5,i*2.2,-8+Math.abs(i));});el(g,i*2.2,-8.2+Math.abs(i),1.3,.8,'#58b368',i*.4);}},
 trigo(g,f){const c=f>=1?'#e9bf45':'#8fc45a';for(const i of[-2,-1,0,1,2]){const x=i*1.5;tubo(g,f>=1?'#d9a93a':'#6fb04f',.45,g=>{g.moveTo(x*.5,0);g.lineTo(x,-8);});if(f>.6)for(let j=0;j<3;j++){el(g,x-.6,-8.4-j*1.2,.8,.55,c,-.6);el(g,x+.6,-8.4-j*1.2,.8,.55,c,.6);}}},
 tomate(g,f){tubo(g,'#a9713f',.5,g=>{g.moveTo(0,0);g.lineTo(0,-11.5);});uni(g,'#4c9a4a',[E(0,-6,4.2,4.6),E(-2.6,-3.6,2.6,2.6),E(2.6,-3.8,2.6,2.6)]);el(g,-1,-7.4,1.6,1.2,'rgba(140,215,110,.5)',-.3,0);
  if(f>.6){const c=f>=1?'#e5483f':'#9fcf5a';[[-2.3,-4.3],[1.9,-6.5],[.5,-2.6]].forEach(([x,y])=>{el(g,x,y,1.45,1.35,c);el(g,x-.4,y-.4,.4,.3,'rgba(255,255,255,.6)',0,0);});}},
 morango(g,f){for(const i of[-1,1])el(g,i*2.8,-2,2.5,1.6,'#4c9a4a',i*.5);el(g,0,-3.4,2.3,1.7,'#58b368');
  if(f>.6){const c=f>=1?'#e83a4e':'#f3d9a0';[[-2.6,-.4],[2.5,-.2]].forEach(([x,y])=>forma(g,c,g=>{g.moveTo(x-1.3,y-1);g.quadraticCurveTo(x,y-1.8,x+1.3,y-1);g.quadraticCurveTo(x+1,y+1,x,y+1.6);g.quadraticCurveTo(x-1,y+1,x-1.3,y-1);}));}
  for(let k=0;k<5;k++){const a=k/5*TAU;el(g,Math.cos(a)*.8,-5.2+Math.sin(a)*.8,.6,.6,'#fff',0,0);}el(g,0,-5.2,.45,.45,'#f6c945',0,0);},
 abobora(g,f){tubo(g,'#4c9a4a',.6,g=>{g.moveTo(-6,-.5);g.quadraticCurveTo(0,-3.4,6,-.8);});el(g,-5,-2.2,2.8,2,'#4c9a4a',-.3);el(g,4.8,-2.6,2.6,1.9,'#58b368',.4);
  if(f>.5){const r=f>=1?1:.55;g.save();g.translate(0,-2.8*r);g.scale(r,r);uni(g,luz(g,f>=1?'#f08a2a':'#b9c75a',-3,3,.14),[E(-2.2,0,2.4,2.8),E(2.2,0,2.4,2.8),E(0,0,2.6,3)]);
   g.lineWidth=.3;g.beginPath();g.moveTo(-1,-2.8);g.quadraticCurveTo(-1.9,0,-1,2.8);g.moveTo(1,-2.8);g.quadraticCurveTo(1.9,0,1,2.8);g.stroke();pronto(g);el(g,0,-3.2,.6,.9,'#4c9a4a');g.restore();}}
};
function planta(g,k,f,morta,t){
  if(morta){tubo(g,'#8a6a45',.7,g=>{g.moveTo(0,0);g.quadraticCurveTo(1,-4,3.4,-3);});el(g,3.6,-2.4,1.8,.8,'#a8875a',.6);el(g,-1.6,-.8,1.8,.7,'#a8875a',-.3);return;}
  if(f<.3){tubo(g,'#58b368',.6,g=>{g.moveTo(0,0);g.lineTo(0,-2.4);});el(g,-1.3,-2.8,1.5,.8,'#58b368',-.5);el(g,1.3,-2.8,1.5,.8,'#58b368',.5);return;}
  const s=.35+.65*Math.min(1,f);g.save();g.scale(s,s);g.rotate(Math.sin(t*1.6)*.05);DES[k](g,f);g.restore();
}
function canteiro(g,c){
  g.beginPath();g.roundRect(c.x-14,c.y-10,28,20,4);
  if(!c.lavrado){g.fillStyle='#a98a5e';g.fill();g.stroke();g.strokeStyle='#6cc45c';g.lineWidth=.4;g.beginPath();for(let i=0;i<7;i++){const x=c.x-11+i*3.6,y=c.y-5+(i*7%11);g.moveTo(x,y);g.lineTo(x+.5,y-2);g.moveTo(x+1,y);g.lineTo(x+1.6,y-1.6);}g.stroke();pronto(g);return;}
  const molhado=c.agua>0&&c.k&&!c.morta;g.fillStyle=luz(g,molhado?'#5f3d26':'#8b5e3c',c.y-10,c.y+10,.12);g.fill();g.stroke();
  g.strokeStyle=molhado?'rgba(30,15,10,.5)':'rgba(60,35,20,.45)';g.lineWidth=.5;g.beginPath();for(let y=-6;y<=6;y+=4){g.moveTo(c.x-11,c.y+y);g.quadraticCurveTo(c.x,c.y+y+1.2,c.x+11,c.y+y);}g.stroke();
  g.strokeStyle='rgba(255,230,190,.25)';g.beginPath();for(let y=-7;y<=5;y+=4){g.moveTo(c.x-11,c.y+y);g.quadraticCurveTo(c.x,c.y+y+1.2,c.x+11,c.y+y);}g.stroke();pronto(g);
}

/* ---------- cenário novo ---------- */
function casaFora(g,b){
  el(g,400,b+1,44,4.5,'rgba(20,50,20,.28)',0,0);
  g.beginPath();g.rect(418,b-64,8,16);g.fillStyle='#b5503a';g.fill();g.stroke();g.beginPath();g.rect(416.6,b-66,10.8,3);g.fillStyle='#8a3a2a';g.fill();g.stroke();
  g.beginPath();g.rect(366,b-31,68,31);g.fillStyle=luz(g,'#fbefd2',b-31,b,.08);g.fill();g.stroke();
  g.beginPath();g.rect(366,b-5,68,5);g.fillStyle='#b9b2a8';g.fill();g.stroke();g.lineWidth=.3;g.beginPath();for(let x=372;x<434;x+=7){g.moveTo(x,b-5);g.lineTo(x,b);}g.stroke();pronto(g);
  forma(g,luz(g,'#c8553d',b-54,b-28,.14),g=>{g.moveTo(359,b-28);g.lineTo(372,b-54);g.lineTo(428,b-54);g.lineTo(441,b-28);});
  g.strokeStyle='rgba(90,25,15,.4)';g.lineWidth=.35;g.beginPath();for(let i=1;i<5;i++){const y=b-54+i*5.2,k=i*2.6;g.moveTo(372-k,y);g.lineTo(428+k,y);}for(let x=366;x<438;x+=6){g.moveTo(x,b-28);g.lineTo(x+ (400-x)*.16,b-54);}g.stroke();pronto(g);
  for(const x of[371,415]){g.beginPath();g.rect(x-2.4,b-24,2.4,13);g.rect(x+14,b-24,2.4,13);g.fillStyle='#4c9a4a';g.fill();g.stroke();
    g.beginPath();g.rect(x,b-24,14,13);g.fillStyle='#bfe6ff';g.fill();g.stroke();g.beginPath();g.moveTo(x+7,b-24);g.lineTo(x+7,b-11);g.moveTo(x,b-17.5);g.lineTo(x+14,b-17.5);g.stroke();
    g.beginPath();g.roundRect(x-1.4,b-11,16.8,3.2,.8);g.fillStyle='#a9713f';g.fill();g.stroke();for(let i=0;i<4;i++){el(g,x+1.6+i*3.6,b-12,1.5,1.3,'#58b368');el(g,x+1.6+i*3.6,b-13,1,1,i%2?'#f08ca0':'#f6c945');}}
  g.beginPath();g.roundRect(391.4,b-24.6,17.2,24.6,[8.6,8.6,0,0]);g.fillStyle='#fffaf0';g.fill();g.stroke();
  g.beginPath();g.roundRect(393,b-23,14,23,[7,7,0,0]);g.fillStyle=luz(g,'#3f8f8a',b-23,b,.14);g.fill();g.stroke();
  g.beginPath();g.roundRect(396.4,b-19,7.2,6,[3.6,3.6,.6,.6]);g.fillStyle='#bfe6ff';g.fill();g.stroke();el(g,404.4,b-9,.8,.8,'#f6c945');
  g.beginPath();g.roundRect(389,b-1.2,22,3,1);g.fillStyle='#b9b2a8';g.fill();g.stroke();
}
function poco(g,x,y){
  el(g,x,y+1,11,3,'rgba(20,50,20,.26)',0,0);
  tubo(g,'#8a5a34',1.2,g=>{g.moveTo(x-6.5,y-6);g.lineTo(x-6.5,y-21);});tubo(g,'#8a5a34',1.2,g=>{g.moveTo(x+6.5,y-6);g.lineTo(x+6.5,y-21);});
  tubo(g,'#c9a36b',.5,g=>{g.moveTo(x,y-20);g.lineTo(x,y-11);});g.beginPath();g.roundRect(x-1.8,y-12,3.6,3.4,.6);g.fillStyle='#a9713f';g.fill();g.stroke();
  g.beginPath();g.roundRect(x-8,y-9,16,9,2);g.fillStyle=luz(g,'#b9b2a8',y-9,y,.14);g.fill();g.stroke();
  g.lineWidth=.3;g.beginPath();g.moveTo(x-8,y-6);g.lineTo(x+8,y-6);g.moveTo(x-8,y-3);g.lineTo(x+8,y-3);for(let i=-5;i<8;i+=4){g.moveTo(x+i,y-9);g.lineTo(x+i,y-6);g.moveTo(x+i-2,y-6);g.lineTo(x+i-2,y-3);g.moveTo(x+i,y-3);g.lineTo(x+i,y);}g.stroke();pronto(g);
  el(g,x,y-9,8,2,'#5aa9e6');
  forma(g,luz(g,'#c8553d',y-29,y-20,.14),g=>{g.moveTo(x-10.5,y-20);g.lineTo(x,y-29);g.lineTo(x+10.5,y-20);});
}
function arvoreCorte(g,a,t){
  const x=a.x,y=a.y;
  if(a.hp<=0){
    el(g,x,y+.6,6,1.8,'rgba(20,50,20,.25)',0,0);g.beginPath();g.roundRect(x-3.4,y-4,6.8,4.4,1);g.fillStyle='#8a5a34';g.fill();g.stroke();el(g,x,y-4,3.4,1.3,'#e9c9a0');el(g,x,y-4,1.6,.6,null);
    if(a.t<a.total*.6){const k=1-a.t/(a.total*.6);tubo(g,'#4c9a4a',.6,g=>{g.moveTo(x+4.6,y);g.lineTo(x+4.6,y-2-k*5);});el(g,x+3.2,y-3-k*5,1.6+k,.9+k*.5,'#58b368',-.5);el(g,x+6,y-3.4-k*5,1.6+k,.9+k*.5,'#58b368',.5);}
    return;}
  let s=a.i*97+13;const r=()=>(s=s*16807%2147483647)/2147483647;
  g.save();g.translate(x,y);g.rotate(a.treme>0?Math.sin(t*50)*.05*a.treme:Math.sin(t*.9+a.i)*.008);g.scale(.78,.78);arvore(g,0,0,r);
  for(let i=a.hp;i<3;i++){g.beginPath();g.moveTo(-3,-4-i*3.4);g.lineTo(.6,-5.2-i*3.4);g.lineTo(-3,-6.4-i*3.4);g.fillStyle='#e9c9a0';g.fill();g.stroke();}
  g.restore();
}

/* ---------- casa por dentro ---------- */
const PAREDES=['#f3d9b8','#cfe3d4','#f2c7cf','#cbd8ee','#f1e3a4'];
function sala(g,RW,RH,WALLH,parede,escuro){
  g.beginPath();g.rect(0,0,RW,WALLH);g.fillStyle=luz(g,PAREDES[parede%PAREDES.length],0,WALLH,.06);g.fill();
  g.fillStyle='rgba(255,255,255,.22)';for(let x=4;x<RW;x+=10)g.fillRect(x,0,4,WALLH);
  g.beginPath();g.rect(0,WALLH,RW,RH-WALLH);g.fillStyle=luz(g,'#c9955f',WALLH,RH,.1);g.fill();
  g.strokeStyle='rgba(90,55,25,.45)';g.lineWidth=.4;g.beginPath();for(let y=WALLH+9,i=0;y<RH;y+=9,i++){g.moveTo(0,y);g.lineTo(RW,y);for(let x=(i%2)*17+8;x<RW;x+=34){g.moveTo(x,y-9);g.lineTo(x,y);}}g.stroke();pronto(g);
  g.beginPath();g.rect(0,WALLH-4,RW,4);g.fillStyle='#8a5a34';g.fill();g.stroke();g.beginPath();g.rect(0,0,RW,3);g.fillStyle='#8a5a34';g.fill();g.stroke();
  /* porta */
  g.beginPath();g.rect(20.4,11.4,23.2,WALLH-11.4);g.fillStyle='#fffaf0';g.fill();g.stroke();g.beginPath();g.rect(22,13,20,WALLH-13);g.fillStyle=luz(g,'#3f8f8a',13,WALLH,.14);g.fill();g.stroke();
  g.beginPath();g.roundRect(26,18,12,12,[6,6,1,1]);g.fillStyle=escuro>.5?'#2a3566':'#bfe6ff';g.fill();g.stroke();el(g,39,40,.9,.9,'#f6c945');
  g.beginPath();g.roundRect(20,WALLH+1,24,7,2);g.fillStyle='#b5503a';g.fill();g.stroke();
  /* janela */
  const wx=138,wy=14;g.beginPath();g.rect(wx,wy,30,24);g.fillStyle=escuro>.5?'#1f2a5c':'#9fd8ff';g.fill();
  g.save();g.clip();if(escuro>.5){el(g,wx+21,wy+8,3.4,3.4,'#f6e7a0',0,0);g.fillStyle='#fff';[[5,5],[11,13],[16,4],[24,17],[7,19]].forEach(([a,b])=>g.fillRect(wx+a,wy+b,.7,.7));}
  else{el(g,wx+8,wy+8,5,2.4,'#fff',0,0);el(g,wx+12,wy+6.6,3.6,2.2,'#fff',0,0);el(g,wx+16,wy+27,22,9,'#6cc45c',0,0);}g.restore();
  g.beginPath();g.rect(wx,wy,30,24);g.moveTo(wx+15,wy);g.lineTo(wx+15,wy+24);g.moveTo(wx,wy+12);g.lineTo(wx+30,wy+12);g.lineWidth=1.1;g.strokeStyle='#fffaf0';g.stroke();pronto(g);g.beginPath();g.rect(wx-.8,wy-.8,31.6,25.6);g.stroke();
  for(const s of[0,1])forma(g,'#e0475a',g=>{const x=wx+(s?30:0),d=s?-1:1;g.moveTo(x-d*2,wy-2);g.lineTo(x+d*8,wy-2);g.quadraticCurveTo(x+d*7,wy+12,x+d*2,wy+27);g.lineTo(x-d*2,wy+27);});
  tubo(g,'#8a5a34',.9,g=>{g.moveTo(wx-4,wy-2.4);g.lineTo(wx+34,wy-2.4);});
  g.beginPath();g.rect(0,0,RW,RH);g.lineWidth=1.2;g.stroke();pronto(g);
}
const MV={
 cama(g){g.beginPath();g.roundRect(-18,-31,36,13,3.5);g.fillStyle=luz(g,'#8a5a34',-31,-18,.14);g.fill();g.stroke();g.beginPath();g.roundRect(-18,-23,36,23,3);g.fillStyle='#a9713f';g.fill();g.stroke();
  g.beginPath();g.roundRect(-16.4,-22,32.8,19,3);g.fillStyle='#fffaf0';g.fill();g.stroke();g.beginPath();g.roundRect(-11.5,-21,23,6.4,2.8);g.fillStyle='#fff';g.fill();g.stroke();
  g.beginPath();g.roundRect(-16.4,-13.6,32.8,10.6,[1,1,3,3]);g.fillStyle=luz(g,'#e0475a',-13.6,-3,.12);g.fill();g.stroke();g.beginPath();g.rect(-16.4,-13.6,32.8,2.6);g.fillStyle='#fbd0d6';g.fill();g.stroke();
  g.fillStyle='rgba(255,255,255,.5)';for(let i=0;i<8;i++){g.beginPath();g.arc(-13+i*3.8,-6.6+(i%2)*2.2,.5,0,TAU);g.fill();}},
 sofa(g){g.beginPath();g.roundRect(-18,-21,36,13,4.5);g.fillStyle=luz(g,'#4c9a8a',-21,-8,.14);g.fill();g.stroke();g.beginPath();g.roundRect(-16,-11.4,32,9.4,2.6);g.fillStyle='#63b3a2';g.fill();g.stroke();
  g.beginPath();g.moveTo(0,-11.4);g.lineTo(0,-2);g.stroke();for(const s of[-1,1]){g.beginPath();g.roundRect(s>0?14:-20,-15,6,14,3);g.fillStyle='#4c9a8a';g.fill();g.stroke();g.beginPath();g.rect(s*14-1,-1,2,1.4);g.fillStyle='#5a3a22';g.fill();g.stroke();}
  g.beginPath();g.roundRect(-13,-17,7,6.4,2);g.fillStyle='#f6c945';g.fill();g.stroke();},
 mesa(g){for(const x of[-10,8.4]){g.beginPath();g.rect(x,-11,1.8,11);g.fillStyle='#8a5a34';g.fill();g.stroke();}el(g,0,-10.6,15,6.2,'#8a5a34');el(g,0,-12,15,6.2,luz(g,'#c98a4b',-18,-6,.12));
  el(g,0,-12,8,3.2,'#fffaf0');g.beginPath();g.roundRect(-1.6,-17.4,3.2,5,.8);g.fillStyle='#5aa9e6';g.fill();g.stroke();for(const[x,c]of[[-1.6,'#f08ca0'],[0,'#f6c945'],[1.6,'#f08ca0']]){tubo(g,'#4c9a4a',.4,g=>{g.moveTo(0,-17.4);g.lineTo(x,-20.6);});el(g,x,-21,.95,.95,c);}},
 cadeira(g){for(const x of[-4.4,3.2]){g.beginPath();g.rect(x,-8,1.3,8);g.fillStyle='#8a5a34';g.fill();g.stroke();}g.beginPath();g.roundRect(-5,-19,10,10.6,2);g.fillStyle=luz(g,'#c98a4b',-19,-8,.12);g.fill();g.stroke();
  g.lineWidth=.35;g.beginPath();for(const x of[-2,0,2]){g.moveTo(x,-17.6);g.lineTo(x,-9.6);}g.stroke();pronto(g);el(g,0,-8,6.2,2.6,'#e0475a');},
 tapete(g){el(g,0,0,24,10,'#e9c46a');el(g,0,0,20,8,'#e0475a');el(g,0,0,15,5.8,'#fbf0d2');el(g,0,0,9,3.4,'#4c9a8a');el(g,0,0,3.4,1.3,'#f6c945');},
 planta(g){for(const[a,l]of[[-1,9],[-.5,12],[0,13.5],[.5,12],[1,9]]){g.save();g.translate(0,-8);g.rotate(a);el(g,0,-l/2,2.2,l/2,a?'#4c9a4a':'#58b368');g.beginPath();g.moveTo(0,0);g.lineTo(0,-l+1.5);g.lineWidth=.3;g.stroke();pronto(g);g.restore();}
  forma(g,luz(g,'#c8553d',-9,0,.14),g=>{g.moveTo(-5,-9);g.lineTo(5,-9);g.lineTo(3.6,0);g.lineTo(-3.6,0);});g.beginPath();g.roundRect(-5.6,-10.4,11.2,2.6,.8);g.fillStyle='#b5503a';g.fill();g.stroke();},
 estante(g){g.beginPath();g.roundRect(-12,-37,24,37,1.6);g.fillStyle=luz(g,'#8a5a34',-37,0,.1);g.fill();g.stroke();
  for(let i=0;i<3;i++){const y=-34.4+i*11.6;g.beginPath();g.rect(-10.2,y,20.4,9.6);g.fillStyle='#5a3a22';g.fill();g.stroke();
   const cs=['#e0475a','#4c7fd0','#f6c945','#58b368','#b58cf0','#f29b30'];let x=-9.6;for(let b=0;b<6&&x<8;b++){const w=2+((b*7+i*3)%3)*.6,h=6.4+((b*5+i)%3);g.beginPath();g.rect(x,y+9.6-h,w,h);g.fillStyle=cs[(b+i*2)%6];g.fill();g.stroke();x+=w+.3;}}},
 abajur(g){el(g,0,-.8,4.4,1.5,'#5a3a22');tubo(g,'#8a5a34',.8,g=>{g.moveTo(0,-1);g.lineTo(0,-23);});el(g,0,-26,10,9,'rgba(255,230,140,.22)',0,0);
  forma(g,luz(g,'#f9e3a0',-32,-22,.12),g=>{g.moveTo(-6.4,-22);g.lineTo(-4,-32);g.lineTo(4,-32);g.lineTo(6.4,-22);});},
 quadro(g){g.beginPath();g.roundRect(-9.5,-7.5,19,15,1);g.fillStyle='#d9a93a';g.fill();g.stroke();g.beginPath();g.rect(-7.6,-5.6,15.2,11.2);g.fillStyle='#9fd8ff';g.fill();g.save();g.clip();el(g,-2,7,9,6,'#58b368',0,0);el(g,6,7.6,7,5,'#4c9a4a',0,0);el(g,4,-2.4,1.8,1.8,'#f6c945',0,0);g.restore();g.beginPath();g.rect(-7.6,-5.6,15.2,11.2);g.stroke();},
 fogao(g,m,t){const ac=typeof fogo!=='undefined'&&fogo>0;
  g.beginPath();g.roundRect(3.4,-46,4,22,1);g.fillStyle='#4a4450';g.fill();g.stroke();
  g.beginPath();g.roundRect(-12,-24,24,22,2);g.fillStyle=luz(g,'#4a4450',-24,-2,.14);g.fill();g.stroke();for(const x of[-10.6,8.6]){g.beginPath();g.rect(x,-2,2,2);g.fillStyle='#2f2a33';g.fill();g.stroke();}
  g.beginPath();g.roundRect(-13,-26.6,26,3.4,1);g.fillStyle='#2f2a33';g.fill();g.stroke();
  g.beginPath();g.roundRect(-8.6,-19.6,17.2,12.4,[5,5,1,1]);g.fillStyle=ac?'#3a1408':'#1d1a22';g.fill();g.stroke();
  if(ac){g.save();g.beginPath();g.roundRect(-8.6,-19.6,17.2,12.4,[5,5,1,1]);g.clip();for(let i=0;i<4;i++){const x=-5.4+i*3.6,h=6+Math.sin(t*9+i*2)*2.4;forma(g,i%2?'#f6c945':'#f08a2a',g=>{g.moveTo(x-2.2,-7);g.quadraticCurveTo(x-1.6,-7-h*.6,x,-7-h);g.quadraticCurveTo(x+1.6,-7-h*.6,x+2.2,-7);});}g.restore();el(g,0,-13,16,14,'rgba(255,170,60,.16)',0,0);}
  else{for(const x of[-3,1.6]){g.beginPath();g.roundRect(x-2.4,-10,6,2.4,1.2);g.fillStyle='#8a5a34';g.fill();g.stroke();}}
  g.beginPath();g.roundRect(-4.6,-31.4,9.2,5,[1,1,2,2]);g.fillStyle='#e0475a';g.fill();g.stroke();el(g,0,-31.4,4.6,1.2,'#b5503a');
  if(ac){g.strokeStyle='rgba(255,255,255,.7)';g.lineWidth=.5;g.beginPath();for(const x of[-1.6,1.6]){const o=Math.sin(t*3+x)*.8;g.moveTo(x,-33.4);g.quadraticCurveTo(x-1.4+o,-36,x+o,-38.6);}g.stroke();pronto(g);}},
 geladeira(g){g.beginPath();g.roundRect(-10,-38,20,38,2.6);g.fillStyle=luz(g,'#e6eff4',-38,0,.08);g.fill();g.stroke();g.beginPath();g.moveTo(-10,-24);g.lineTo(10,-24);g.stroke();
  for(const[y,h]of[[-34,7],[-21,10]]){g.beginPath();g.roundRect(6,y,1.4,h,.7);g.fillStyle='#9fa8b5';g.fill();g.stroke();}el(g,-4,-31,1.3,1.3,'#e0475a');el(g,0,-29,1.1,1.1,'#f6c945');g.beginPath();g.rect(-6.4,-18,4.4,5);g.fillStyle='#fffaf0';g.fill();g.stroke();},
 lareira(g,m,t){g.beginPath();g.roundRect(-18,-31,36,31,3);g.fillStyle=luz(g,'#b9b2a8',-31,0,.12);g.fill();g.stroke();
  g.lineWidth=.3;g.beginPath();for(let y=-26;y<0;y+=5){g.moveTo(-18,y);g.lineTo(18,y);for(let x=-14+((y/5|0)%2)*4;x<18;x+=8){g.moveTo(x,y);g.lineTo(x,y+5);}}g.stroke();pronto(g);
  g.beginPath();g.roundRect(-10.5,-20,21,20,[9,9,0,0]);g.fillStyle='#2a1512';g.fill();g.stroke();
  for(const x of[-4,2]){g.beginPath();g.roundRect(x-2.6,-3.4,7.4,2.8,1.4);g.fillStyle='#8a5a34';g.fill();g.stroke();}
  for(let i=0;i<4;i++){const x=-5.4+i*3.6,h=9+Math.sin(t*8+i*2.3)*3;forma(g,i%2?'#f6c945':'#f08a2a',g=>{g.moveTo(x-2.6,-3);g.quadraticCurveTo(x-2,-3-h*.6,x,-3-h);g.quadraticCurveTo(x+2,-3-h*.6,x+2.6,-3);});}
  el(g,0,-9,20,15,'rgba(255,170,60,.14)',0,0);g.beginPath();g.roundRect(-20,-34.4,40,4.4,1.2);g.fillStyle='#8a5a34';g.fill();g.stroke();}
};
