const $=id=>document.getElementById(id), R=Math.random, clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const LN='#3b2a2a', TAU=Math.PI*2;
if(!CanvasRenderingContext2D.prototype.roundRect)CanvasRenderingContext2D.prototype.roundRect=function(x,y,w,h){this.rect(x,y,w,h);};
/* ---------- pincéis ---------- */
function tom(h,a){const n=parseInt(h.slice(1),16),t=a<0?0:255,p=Math.abs(a),f=s=>Math.round((n>>s&255)*(1-p)+t*p);return'rgb('+f(16)+','+f(8)+','+f(0)+')';}
function pronto(g){g.lineWidth=.55;g.lineJoin=g.lineCap='round';g.strokeStyle=LN;}
function el(g,x,y,rx,ry,fill,rot,stroke){g.beginPath();g.ellipse(x,y,rx,ry,rot||0,0,TAU);if(fill){g.fillStyle=fill;g.fill();}if(stroke!==0)g.stroke();}
function luz(g,c,y0,y1,k){const q=g.createLinearGradient(0,y0,0,y1);k=k||.14;q.addColorStop(0,tom(c,k));q.addColorStop(.55,c);q.addColorStop(1,tom(c,-k));return q;}
const E=(x,y,rx,ry,r)=>g=>g.ellipse(x,y,rx,ry,r||0,0,TAU);
function uni(g,fill,fs){const w=g.lineWidth;g.lineWidth=w*2;fs.forEach(f=>{g.beginPath();f(g);g.stroke();});g.fillStyle=fill;fs.forEach(f=>{g.beginPath();f(g);g.fill();});g.lineWidth=w;}
function forma(g,fill,f){g.beginPath();f(g);g.closePath();g.fillStyle=fill;g.fill();g.stroke();}
function tubo(g,cor,w,f){const l=g.lineWidth,s=g.strokeStyle;g.lineWidth=w+1.1;g.beginPath();f(g);g.stroke();g.lineWidth=w;g.strokeStyle=cor;g.beginPath();f(g);g.stroke();g.lineWidth=l;g.strokeStyle=s;}
function perna(g,x,y,len,w,ang,fill,casco){g.save();g.translate(x,y);g.rotate(ang);g.beginPath();g.roundRect(-w/2,-1,w,len+1,w/2);g.fillStyle=fill;g.fill();g.stroke();
  if(casco){g.beginPath();g.roundRect(-w/2,len-1.5,w,1.5,[0,0,w/2,w/2]);g.fillStyle=casco;g.fill();g.stroke();}g.restore();}
function olho(g,x,y,r,m,o){o=o||{};
  if(m.dorme||m.pisca||m.contente){g.save();if(o.claro)g.strokeStyle='#f6efe2';g.lineWidth=.5;g.beginPath();
    if(m.dorme||m.pisca){g.moveTo(x-r,y);g.quadraticCurveTo(x,y+r*.9,x+r,y);}else{g.moveTo(x-r,y+r*.4);g.quadraticCurveTo(x,y-r*1.3,x+r,y+r*.4);}
    g.stroke();g.restore();return;}
  if(o.branco)el(g,x,y,r*1.45,r*1.55,'#fff',0,0);
  if(o.iris){el(g,x,y,r,r*1.1,o.iris);el(g,x,y,r*.34,r*.9,'#1d1a22',0,0);}else el(g,x,y,r,r*1.15,'#2a1f24',0,0);
  el(g,x+r*.3,y-r*.42,r*.34,r*.34,'#fff',0,0);
  if(m.triste){g.save();if(o.claro)g.strokeStyle='#f6efe2';g.beginPath();g.moveTo(x-r*1.5,y-r*2.3);g.lineTo(x+r*1.2,y-r*1.7);g.stroke();g.restore();}
}
/* corpo de quatro patas: o = {rx,ry,leg,lw,cor,casco,hx,hy,tail,det,pos,head} */
function quad(g,m,o){
  const d=m.dorme,leg=d?0:o.leg,by=-(leg+o.ry*.85)+(d?0:m.resp),sw=m.sw,longe=tom(o.cor,-.2);
  if(!d){perna(g,-o.rx*.55+1.4,by+o.ry*.4,leg+o.ry*.45,o.lw,-sw,longe,o.casco);perna(g,o.rx*.55+1.4,by+o.ry*.4,leg+o.ry*.45,o.lw,sw,longe,o.casco);}
  g.save();g.translate(-o.rx*.9,by-o.ry*.3);o.tail(g,m);g.restore();
  g.beginPath();g.ellipse(0,by,o.rx,o.ry,0,0,TAU);g.fillStyle=luz(g,o.cor,by-o.ry,by+o.ry);g.fill();
  if(o.det){g.save();g.clip();o.det(g,by);g.restore();g.beginPath();g.ellipse(0,by,o.rx,o.ry,0,0,TAU);}
  g.stroke();
  if(o.pos)o.pos(g,by);
  if(!d){perna(g,-o.rx*.55-1.2,by+o.ry*.45,leg+o.ry*.4,o.lw,sw,o.cor,o.casco);perna(g,o.rx*.55-1.2,by+o.ry*.45,leg+o.ry*.4,o.lw,-sw,o.cor,o.casco);}
  else{el(g,o.rx*.45,by+o.ry*.78,o.lw*.9,o.lw*.5,o.cor);el(g,-o.rx*.45,by+o.ry*.78,o.lw*.9,o.lw*.5,o.cor);}
  const bica=m.come?Math.abs(Math.sin(m.t*10))*2.2:0;
  g.save();g.translate(o.rx*o.hx,by+o.hy+(d?o.ry*.8-o.hy*.35:0)+bica);g.rotate(d?.22:m.come?.45:0);o.head(g,m);g.restore();
}

/* ---------- bichos ---------- */
const CO={
 cao:[{b:'#c98a4b',d:'#7a4a21',w:'#f1dfc0'},{b:'#f3ead8',d:'#b98b5e',w:'#ffffff',m:'#c9955f'},{b:'#6a5d68',d:'#3a3038',w:'#b3a9b7'},{b:'#e3b45a',d:'#a8742c',w:'#f9e9bf'}],
 gato:[{c:'#9aa0ad',w:'#eceef3',g:'#58b368',s:'#6f7684'},{c:'#e59a3c',w:'#fbe8c6',g:'#58b368',s:'#b96f1c'},{c:'#55505c',w:'#958d9c',g:'#f4c542'}],
 galinha:[{w:'#fbf6ea'},{w:'#c98a4b'},{w:'#e9c46a'}],
 ovelha:[{w:'#fbf6ea',g:'#4a4450'},{w:'#ecdcc0',g:'#6b4a33'}],
 porco:[{p:'#f5aebb',n:'#e07f96',q:'#b85f74'},{p:'#eebfa8',n:'#cf917a',q:'#a06a55',m:'#8a5a4a'}],
 vaca:[{w:'#fbf6ea',k:'#2f2a33'},{w:'#fbf6ea',k:'#8a5a34'}]
};
const SP={
 cao:{nome:'Cachorro',preco:50,vel:46,som:'Au au!',prod:'presente',val:8,bola:1,traz:1,segue:1,voz:[320,200,'square'],w:26,h:18,
  draw(g,a,m){const c=CO.cao[a.c];quad(g,m,{rx:9.5,ry:5,leg:5.5,lw:2.5,cor:c.b,hx:.98,hy:-5.6,
   tail(g,m){const v=m.f>60;g.rotate(.15+Math.sin(m.t*(v?15:3))*(v?.45:.12));forma(g,c.b,g=>{g.moveTo(.5,1.4);g.quadraticCurveTo(-5,.5,-6.5,-5.5);g.quadraticCurveTo(-3,-2.4,.5,-1.4);});},
   det(g,by){el(g,1,by+4.6,7.5,2.6,c.w,0,0);if(c.m){el(g,-4,by-3,4.2,3.2,c.m,-.3,0);el(g,4.5,by-4.4,2.4,1.8,c.m,.2,0);}},
   head(g,m){
    tubo(g,'#e0475a',1.3,g=>{g.moveTo(-4.4,.6);g.lineTo(-.8,4.6);});el(g,-2.9,3.9,1,1,'#f6c945');
    el(g,0,0,4.7,4.4,luz(g,c.b,-4.4,4.4));
    uni(g,c.w,[E(4.1,1.5,3.1,2.3)]);
    el(g,6.7,.5,1.15,.95,'#2a1f24',0,0);el(g,6.5,.2,.35,.25,'rgba(255,255,255,.6)',0,0);
    g.beginPath();g.moveTo(6.4,1.5);g.quadraticCurveTo(5.2,3.3,3.2,2.7);g.stroke();
    if(m.f>70&&!m.dorme){g.beginPath();g.roundRect(4,2.7,1.8,2.3+Math.sin(m.t*9)*.35,.9);g.fillStyle='#f08ca0';g.fill();g.stroke();}
    olho(g,1.7,-1.2,.9,m);
    g.save();g.translate(-1.8,-3.1);g.rotate(.15+m.sw*.35-(m.hop?.7:0));forma(g,c.d,g=>{g.moveTo(-1.8,0);g.quadraticCurveTo(-4.4,3,-2.6,7.2);g.quadraticCurveTo(.9,6,1.7,.5);});g.restore();
   }});}},
 gato:{nome:'Gato',preco:40,vel:50,som:'Miau!',prod:'presente',val:6,bola:1,segue:1,voz:[700,950,'triangle'],w:20,h:14,
  draw(g,a,m){const c=CO.gato[a.c];quad(g,m,{rx:7.4,ry:3.8,leg:4,lw:1.9,cor:c.c,hx:.98,hy:-4,
   tail(g,m){g.rotate(Math.sin(m.t*2.2)*.22);tubo(g,c.c,1.5,g=>{g.moveTo(.6,.6);g.bezierCurveTo(-5,0,-6.5,-5,-3.6,-9.5);});},
   det(g,by){el(g,.5,by+3.6,5.6,1.9,c.w,0,0);if(c.s){g.strokeStyle=c.s;g.lineWidth=.9;for(let i=0;i<4;i++){g.beginPath();g.moveTo(-5+i*2.8,by-4.2);g.lineTo(-4.4+i*2.8,by-1.4);g.stroke();}pronto(g);}},
   head(g,m){
    forma(g,c.c,g=>{g.moveTo(-3.9,-1.2);g.lineTo(-3.4,-6.4);g.lineTo(-.4,-3.2);});forma(g,c.c,g=>{g.moveTo(.6,-3.3);g.lineTo(3.2,-6.6);g.lineTo(4,-1.4);});
    forma(g,'#f2a3b3',g=>{g.moveTo(1.6,-3.2);g.lineTo(3,-5.2);g.lineTo(3.4,-2.6);});
    el(g,0,0,4.3,3.7,luz(g,c.c,-3.7,3.7));
    if(c.s){g.strokeStyle=c.s;g.lineWidth=.6;[-1.2,0,1.2].forEach(x=>{g.beginPath();g.moveTo(x,-3.4);g.lineTo(x*.8,-2.2);g.stroke();});pronto(g);}
    el(g,1.7,1.4,2.1,1.35,c.w,0,0);
    forma(g,'#f08ca0',g=>{g.moveTo(2.1,.5);g.lineTo(3.1,.5);g.lineTo(2.6,1.1);});
    g.beginPath();g.moveTo(2.6,1.1);g.quadraticCurveTo(2,2.2,1.2,1.7);g.moveTo(2.6,1.1);g.quadraticCurveTo(3.3,2.2,3.9,1.6);g.stroke();
    olho(g,.4,-.7,.85,m,{iris:c.g});olho(g,3.1,-.7,.7,m,{iris:c.g});
    g.lineWidth=.25;g.beginPath();g.moveTo(3.4,1.2);g.lineTo(6.8,.5);g.moveTo(3.4,1.6);g.lineTo(6.8,1.9);g.moveTo(.2,1.4);g.lineTo(-2.8,.9);g.stroke();pronto(g);
   }});}},
 galinha:{nome:'Galinha',preco:20,vel:32,som:'Có có!',prod:'ovo',val:5,voz:[900,700,'square'],w:13,h:13,
  draw(g,a,m){const c=CO.galinha[a.c].w,d=m.dorme,ly=d?0:3.6,by=-(ly+4.2)+m.resp;
   if(!d){g.strokeStyle='#d97f16';g.lineWidth=.8;for(const s of[-1,1]){const x=.3+s*1.3,dx=m.sw*s*2.4;g.beginPath();g.moveTo(x,by+3.4);g.lineTo(x+dx,0);g.moveTo(x+dx-1,0);g.lineTo(x+dx+1.7,0);g.stroke();}pronto(g);}
   for(let i=0;i<3;i++){g.save();g.translate(-4.2,by-.8);g.rotate(.5+i*.42+Math.sin(m.t*3+i)*.05);el(g,-2.5,0,2.9,1.15,tom(c,-.07*(i+1)));g.restore();}
   const pk=m.come?Math.abs(Math.sin(m.t*10)):0,hx=4+pk*1.6,hy=by-4.9+pk*5.2+(d?3.4:0);
   uni(g,luz(g,c,by-7,by+4.4),[E(0,by,5.5,4.4),E(3,by-2.6+pk*2.4,2.3,3.2,.5)]);
   g.save();g.translate(-.9,by+.3);g.rotate(.18+(m.hop?Math.sin(m.t*34)*.6:0));el(g,0,0,3.2,2.2,tom(c,-.1),.1);
   g.lineWidth=.3;g.beginPath();g.moveTo(-2.2,.6);g.quadraticCurveTo(-.5,1.6,1.8,.9);g.moveTo(-1.6,-.4);g.quadraticCurveTo(0,.5,2.2,-.1);g.stroke();pronto(g);g.restore();
   g.save();g.translate(hx,hy);g.rotate(pk*.9);
   for(let i=0;i<3;i++)el(g,-1.1+i*1.15,-2.7+Math.abs(i-1)*.45,.95,1.15,'#e0475a');
   el(g,2,2.3,.8,1.25,'#e0475a');
   el(g,0,0,2.75,2.65,luz(g,c,-2.6,2.6,.08));
   forma(g,'#f29b30',g=>{g.moveTo(2.2,-.6);g.lineTo(4.8,.5);g.lineTo(2.2,1.3);});
   olho(g,.9,-.5,.62,m);g.restore();
  }},
 ovelha:{nome:'Ovelha',preco:60,vel:28,som:'Mééé!',prod:'la',val:10,voz:[420,380,'sawtooth'],w:26,h:18,
  draw(g,a,m){const c=CO.ovelha[a.c],d=m.dorme,leg=d?0:5.5,by=-(leg+5.4)+(d?0:m.resp),sw=m.sw,casco='#2a2228';
   if(!d){perna(g,-4+1.2,by+3,leg+2.6,1.9,-sw,tom(c.g,-.25),casco);perna(g,4.6+1.2,by+3,leg+2.6,1.9,sw,tom(c.g,-.25),casco);}
   el(g,-9.6,by-.5,1.9,1.6,c.w);
   uni(g,luz(g,c.w,by-8,by+7,.1),[E(0,by,8.6,5.3),E(-6.6,by-2.2,3.6,3.4),E(-3,by-4.4,3.8,3.2),E(1.4,by-4.8,3.8,3.2),E(5.6,by-3.2,3.6,3.4),E(-7.9,by+1.4,3.2,3.2),E(7.3,by+1,3.2,3.4),E(-4.2,by+3.7,3.6,2.8),E(.4,by+4.1,3.8,2.8),E(4.8,by+3.5,3.4,2.8)]);
   g.strokeStyle=tom(c.w,-.2);g.lineWidth=.4;[[-5,-1],[-1,-2.4],[3.4,-1.2],[-2.6,1.8],[2,2],[6,1],[-6.6,1]].forEach(([x,y])=>{g.beginPath();g.arc(x,by+y,1.3,3.6,5.9);g.stroke();});pronto(g);
   if(!d){perna(g,-4-1.2,by+3.4,leg+2.2,1.9,sw,c.g,casco);perna(g,4.6-1.2,by+3.4,leg+2.2,1.9,-sw,c.g,casco);}
   const bica=m.come?Math.abs(Math.sin(m.t*10))*2.2:0;
   g.save();g.translate(9.4,by-2.6+(d?4:0)+bica);g.rotate(d?.2:m.come?.4:0);
   el(g,-2.9,-.9,2.3,1.05,c.g,.5);
   el(g,0,0,3.3,4,luz(g,c.g,-4,4,.1));
   el(g,1.4,2.5,1.7,1.15,tom(c.g,.22),0,0);g.save();g.strokeStyle='#f6efe2';g.lineWidth=.3;g.beginPath();g.moveTo(1.2,2.3);g.lineTo(1.6,2.8);g.lineTo(2,2.3);g.stroke();g.restore();
   uni(g,c.w,[E(-.4,-3.6,2.5,1.8),E(-2.1,-2.9,1.6,1.4),E(1.4,-3.2,1.6,1.4)]);
   olho(g,1.3,-.5,.7,m,{branco:1,claro:1});g.restore();
  }},
 porco:{nome:'Porco',preco:80,vel:30,som:'Oinc!',prod:'trufa',val:15,voz:[240,180,'sawtooth'],w:26,h:15,
  draw(g,a,m){const c=CO.porco[a.c];quad(g,m,{rx:10,ry:6,leg:3.4,lw:2.7,cor:c.p,casco:c.q,hx:.8,hy:-1.4,
   tail(g){tubo(g,c.p,.8,g=>{g.moveTo(.8,.5);g.bezierCurveTo(-2.6,0,-3.4,-3.6,-1.4,-3.8);g.bezierCurveTo(.2,-3.9,.1,-1.8,-1.4,-2.1);});},
   det(g,by){el(g,0,by+5.4,8,2.2,tom(c.p,.18),0,0);if(c.m){el(g,-4,by-3,3.6,2.8,c.m,.3,0);el(g,3,by-4.6,2.2,1.6,c.m,0,0);}},
   head(g,m){
    forma(g,tom(c.p,-.12),g=>{g.moveTo(-3,-3.4);g.quadraticCurveTo(-2.6,-7.6,-.4,-7.2);g.lineTo(1.2,-4.2);});
    el(g,0,0,5.4,5,luz(g,c.p,-5,5));
    forma(g,tom(c.p,-.06),g=>{g.moveTo(.4,-4.3);g.quadraticCurveTo(3,-8,4.6,-6.4);g.lineTo(4.2,-3);});
    el(g,5.1,1,2.4,2.1,c.n);el(g,4.5,1,.36,.62,'#7a3b4b',0,0);el(g,5.8,1,.36,.62,'#7a3b4b',0,0);
    el(g,1.4,2,1.4,.85,'rgba(232,80,110,.3)',0,0);
    g.beginPath();g.moveTo(2.2,3.3);g.quadraticCurveTo(3.4,4.2,4.8,3.4);g.stroke();
    olho(g,1.9,-1.4,.78,m);
   }});}},
 vaca:{nome:'Vaca',preco:120,vel:24,som:'Muuu!',prod:'leite',val:12,voz:[150,110,'sawtooth'],w:34,h:24,
  draw(g,a,m){const c=CO.vaca[a.c];quad(g,m,{rx:13,ry:7,leg:7,lw:3,cor:c.w,casco:'#3a2f33',hx:.98,hy:-6.4,
   tail(g,m){g.rotate(Math.sin(m.t*2.2)*.22);tubo(g,c.w,.7,g=>{g.moveTo(.8,0);g.quadraticCurveTo(-3.2,3,-2.4,9);});el(g,-2.4,10,1.2,1.9,c.k);},
   det(g,by){el(g,-6,by-3,5.2,4.2,c.k,.3,0);el(g,3,by-5.4,4.2,3,c.k,-.2,0);el(g,8,by+3,3.6,3,c.k,0,0);el(g,-1.5,by+5.6,3,1.8,c.k,0,0);},
   pos(g,by){if(m.dorme)return;uni(g,'#f5aebb',[E(-3.4,by+6.7,2.9,2),E(-4.6,by+8.6,.55,.9),E(-2.6,by+8.7,.55,.9)]);},
   head(g,m){
    tubo(g,'#4c7fd0',1.3,g=>{g.moveTo(-5.4,1);g.lineTo(-1,6);});forma(g,'#f6c945',g=>{g.moveTo(-4.6,4.6);g.quadraticCurveTo(-4.8,7,-5.6,7.4);g.lineTo(-2,7.4);g.quadraticCurveTo(-2.8,7,-3,4.6);});el(g,-3.8,7.8,.5,.5,'#a8742c');
    forma(g,'#efe2c2',g=>{g.moveTo(-3.2,-5);g.quadraticCurveTo(-4.6,-8.6,-2.2,-9);g.quadraticCurveTo(-2.8,-6.6,-1.4,-5.4);});
    forma(g,'#efe2c2',g=>{g.moveTo(1.6,-5.4);g.quadraticCurveTo(2.4,-9,4.6,-8.4);g.quadraticCurveTo(3.4,-7,3.4,-4.8);});
    el(g,-4.8,-2.6,2.7,1.35,c.k,.45);el(g,-4.8,-2.5,1.5,.6,'#f2a3b3',.45,0);
    g.beginPath();g.roundRect(-4.2,-5.8,8.8,11,4.2);g.fillStyle=luz(g,c.w,-5.8,5.2,.08);g.fill();
    g.save();g.clip();el(g,-2.6,-3.6,3,3.6,c.k,.2,0);g.restore();g.beginPath();g.roundRect(-4.2,-5.8,8.8,11,4.2);g.stroke();
    el(g,1.2,3.5,4.7,2.9,'#f5bcc8');el(g,-.2,3.4,.5,.8,'#b0647a',.2,0);el(g,2.8,3.4,.5,.8,'#b0647a',-.2,0);
    g.beginPath();g.moveTo(-.4,5.1);g.quadraticCurveTo(1.3,5.9,3,5.1);g.stroke();
    olho(g,2,-1.5,.95,m);
    if(!m.dorme&&!m.pisca&&!m.contente){g.lineWidth=.3;g.beginPath();g.moveTo(2.9,-2.5);g.lineTo(3.6,-3.1);g.moveTo(2.2,-2.8);g.lineTo(2.5,-3.6);g.stroke();pronto(g);}
   }});}}
};
function fazendeira(g,p,t,contente){
  const a=p.mov?Math.sin(p.ph*1.3):0,bob=p.mov?Math.abs(Math.cos(p.ph*1.3))*.7:Math.sin(t*2)*.15,m={pisca:t%3.3<.12,contente},cab='#6b3a1f',pele='#f6cfae';
  for(const s of[-1,1]){const l=Math.max(0,a*s)*1.8,x=s*2;g.beginPath();g.roundRect(x-.95,-8-l,1.9,5,.8);g.fillStyle=pele;g.fill();g.stroke();
    g.beginPath();g.roundRect(x-1.6,-3.4-l,3.5,3.4,[1,1.6,1,1]);g.fillStyle='#7a4a2a';g.fill();g.stroke();}
  g.save();g.translate(0,-bob);
  el(g,0,-19,5.7,6.6,cab);
  for(const s of[-1,1])tubo(g,pele,1.5,g=>{g.moveTo(s*3.6,-15.4);g.quadraticCurveTo(s*(5.4+a*s*.6),-13,s*5.2+a*1.6,-9.8);});
  forma(g,luz(g,'#e0475a',-17,-5,.1),g=>{g.moveTo(-3.7,-16.6);g.lineTo(3.7,-16.6);g.lineTo(5.9,-6.4);g.quadraticCurveTo(0,-4.6,-5.9,-6.4);});
  g.fillStyle='rgba(255,255,255,.55)';[[-3.6,-9],[3.4,-8.6],[-4.3,-7],[4.4,-6.8],[-2.9,-15],[3,-14.6],[-3.9,-12],[3.9,-11.6]].forEach(([x,y])=>{g.beginPath();g.arc(x,y,.42,0,TAU);g.fill();});
  g.beginPath();g.roundRect(-2.7,-14,5.4,7,1.3);g.fillStyle='#fffaf0';g.fill();g.stroke();
  g.lineWidth=.3;g.beginPath();g.roundRect(-1.4,-10.6,2.8,2.2,.5);g.stroke();pronto(g);
  for(const s of[-1,1])el(g,s*3.5,-15.6,1.7,1.5,'#e0475a');
  for(const s of[-1,1]){tubo(g,cab,1.5,g=>{g.moveTo(s*4.6,-19);g.quadraticCurveTo(s*5.6,-16,s*4.9,-13.2);});el(g,s*4.9,-12.8,.9,.7,'#f6c945');}
  el(g,0,-20,4.7,4.5,pele);
  g.beginPath();g.ellipse(0,-21.6,4.75,3.3,0,Math.PI,0);g.quadraticCurveTo(2,-20.4,0,-21.2);g.quadraticCurveTo(-2.4,-20.2,-4.75,-21.6);g.fillStyle=cab;g.fill();g.stroke();
  const d=p.dir*.5;olho(g,-1.7+d,-19.5,.72,m);olho(g,1.7+d,-19.5,.72,m);
  el(g,-2.9+d,-18,1,.6,'rgba(232,80,110,.35)',0,0);el(g,2.9+d,-18,1,.6,'rgba(232,80,110,.35)',0,0);
  g.beginPath();g.moveTo(-1.1+d,-17.6);g.quadraticCurveTo(d,-16.6,1.1+d,-17.6);g.stroke();
  el(g,0,-23.3,7.8,2.1,luz(g,'#f0cf6b',-25.4,-21.2,.12));
  g.beginPath();g.ellipse(0,-23.8,4.5,3.9,0,Math.PI,0);g.closePath();g.fillStyle='#f0cf6b';g.fill();g.stroke();
  g.beginPath();g.rect(-4.4,-25.2,8.8,1.3);g.fillStyle='#e0475a';g.fill();g.stroke();
  g.strokeStyle='rgba(120,80,20,.35)';g.lineWidth=.25;g.beginPath();for(let x=-6;x<=6;x+=2){g.moveTo(x,-23.4);g.lineTo(x*1.12,-21.8);}g.stroke();pronto(g);
  g.restore();
}

/* ---------- objetos ---------- */
const ICO={
 amor(g){forma(g,'#ef4d63',g=>{g.moveTo(0,3.6);g.bezierCurveTo(-6.4,-1,-3.8,-5.4,0,-2.2);g.bezierCurveTo(3.8,-5.4,6.4,-1,0,3.6);});el(g,-1.8,-1.7,.9,.5,'rgba(255,255,255,.7)',-.6,0);},
 ovo(g){el(g,0,0,2.7,3.4,luz(g,'#fbf1dc',-3.4,3.4,.1));el(g,-.9,-1.3,.7,1,'rgba(255,255,255,.8)',-.4,0);},
 leite(g){g.beginPath();g.roundRect(-1.1,-4.2,2.2,2.6,.3);g.fillStyle='#fff';g.fill();g.stroke();g.beginPath();g.roundRect(-2.3,-2.2,4.6,6.2,1.1);g.fillStyle=luz(g,'#fbfbff',-2,4,.06);g.fill();g.stroke();
  g.beginPath();g.rect(-2.3,.1,4.6,1.8);g.fillStyle='#5aa9e6';g.fill();g.stroke();g.beginPath();g.roundRect(-1.5,-5,3,1.2,.4);g.fillStyle='#4c7fd0';g.fill();g.stroke();},
 la(g){uni(g,'#fbf6ea',[E(0,.4,3.2,2.4),E(-2,-.8,1.8,1.7),E(.4,-1.6,2,1.7),E(2.2,-.4,1.7,1.7)]);g.strokeStyle='#cfc5b0';g.lineWidth=.35;[[-1.4,0],[1,-.4],[0,1.2]].forEach(([x,y])=>{g.beginPath();g.arc(x,y,.9,3.6,5.9);g.stroke();});pronto(g);},
 trufa(g){uni(g,'#6b4a33',[E(-.8,.4,2.6,2.2),E(1.4,0,2.2,2.4),E(0,-1,2,1.6)]);g.fillStyle='#3f2a1c';[[-1.4,.4],[.6,-.8],[1.6,.9],[-.2,1.3]].forEach(([x,y])=>{g.beginPath();g.arc(x,y,.3,0,TAU);g.fill();});},
 presente(g){g.beginPath();g.roundRect(-3,-1.2,6,5,.6);g.fillStyle='#e0475a';g.fill();g.stroke();g.beginPath();g.roundRect(-3.5,-2.6,7,1.8,.5);g.fillStyle='#c0392b';g.fill();g.stroke();
  g.beginPath();g.rect(-.7,-2.6,1.4,6.4);g.fillStyle='#f6c945';g.fill();g.stroke();el(g,-1.4,-3.5,1.4,.9,'#f6c945',.4);el(g,1.4,-3.5,1.4,.9,'#f6c945',-.4);},
 comida(g){el(g,0,-.9,3.6,1.9,'#a8742c');g.fillStyle='#7a4a21';[[-1.8,-1.4],[0,-2],[1.6,-1.3],[-.6,-.9],[.9,-.6]].forEach(([x,y])=>{g.beginPath();g.arc(x,y,.42,0,TAU);g.fill();});
  forma(g,luz(g,'#e0475a',-.5,2.8,.12),g=>{g.moveTo(-4.3,-.6);g.lineTo(4.3,-.6);g.lineTo(3.2,2.8);g.lineTo(-3.2,2.8);});},
 agua(g){forma(g,luz(g,'#9fb0c4',-.5,2.8,.12),g=>{g.moveTo(-4.3,-.6);g.lineTo(4.3,-.6);g.lineTo(3.2,2.8);g.lineTo(-3.2,2.8);});el(g,0,-.6,4.3,1.2,'#6ec1f2');el(g,-1.2,-.8,1.2,.3,'rgba(255,255,255,.7)',0,0);},
 gota(g){forma(g,luz(g,'#5aa9e6',-4,3.6,.18),g=>{g.moveTo(0,-4.2);g.bezierCurveTo(3.8,0,3.1,3.7,0,3.7);g.bezierCurveTo(-3.1,3.7,-3.8,0,0,-4.2);});el(g,-1,1,.6,1,'rgba(255,255,255,.7)',.3,0);},
 cenoura(g){g.save();g.rotate(.7);el(g,-.9,-3.4,.7,1.6,'#58b368',-.4);el(g,.9,-3.4,.7,1.6,'#58b368',.4);forma(g,luz(g,'#f29b30',-2.4,4.4,.1),g=>{g.moveTo(-1.9,-2.2);g.quadraticCurveTo(0,-3,1.9,-2.2);g.lineTo(0,4.4);});
  g.lineWidth=.3;g.beginPath();g.moveTo(-.9,-.6);g.lineTo(.2,-.4);g.moveTo(-.2,1.2);g.lineTo(.6,1.3);g.stroke();pronto(g);g.restore();},
 bola(g){el(g,0,0,2.5,2.5,luz(g,'#d6e84a',-2.5,2.5,.18));g.strokeStyle='#fff';g.lineWidth=.4;g.beginPath();g.arc(-2.6,0,2.2,-.8,.8);g.stroke();g.beginPath();g.arc(2.6,0,2.2,2.35,3.95);g.stroke();pronto(g);},
 sino(g){el(g,0,-3.9,.8,.8,'#f6c945');forma(g,luz(g,'#f6c945',-3.8,2.2,.15),g=>{g.moveTo(-3.6,2.2);g.quadraticCurveTo(-2.2,1,-2.4,-1.4);g.quadraticCurveTo(-2.2,-3.9,0,-3.9);g.quadraticCurveTo(2.2,-3.9,2.4,-1.4);g.quadraticCurveTo(2.2,1,3.6,2.2);});el(g,0,3,.95,.85,'#a8742c');}
};
function retrato(w,h,esc,ox,oy,f){const c=document.createElement('canvas');c.width=w;c.height=h;const g=c.getContext('2d');g.translate(ox,oy);g.scale(esc,esc);pronto(g);f(g);return c.toDataURL();}
const MODELO={t:0,sw:0,dorme:false,come:false,contente:false,pisca:false,f:80,triste:false,hop:false,resp:0};

/* ---------- cenário ---------- */
function arvore(g,x,y,r){
  el(g,x,y+1,13,3,'rgba(20,50,20,.25)',0,0);
  forma(g,luz(g,'#8a5a34',y-22,y,.15),g=>{g.moveTo(x-3.4,y);g.quadraticCurveTo(x-1.6,y-10,x-2.4,y-20);g.lineTo(x+2.4,y-20);g.quadraticCurveTo(x+1.6,y-10,x+3.6,y);});
  g.lineWidth=.3;g.beginPath();g.moveTo(x-.6,y-3);g.lineTo(x-.2,y-12);g.moveTo(x+1,y-6);g.lineTo(x+.8,y-15);g.stroke();pronto(g);
  const cy=y-30,b=[[0,0,12],[-9,5,8.5],[9,5,8.5],[-5,-7,8],[6,-7,8],[0,8,9.5],[-12,-1,6],[12,-1,6]];
  uni(g,luz(g,'#3f8f47',cy-15,cy+17,.2),b.map(([dx,dy,rr])=>E(x+dx,cy+dy,rr,rr)));
  [[-5,-9,5,3.4],[5,-10,4.4,3],[-10,1,3.6,2.6],[8,2,4,2.6],[-1,-1,4.6,3]].forEach(([dx,dy,a,c])=>el(g,x+dx,cy+dy,a,c,'rgba(140,215,110,.4)',-.3,0));
  g.strokeStyle='rgba(30,80,40,.5)';g.lineWidth=.4;[[-3,6],[5,9],[-9,9],[10,-3],[-2,-12],[2,2]].forEach(([dx,dy])=>{g.beginPath();g.arc(x+dx,cy+dy,2.4,.4,2.4);g.stroke();});pronto(g);
  for(let i=0;i<6;i++){const ax=x+(r()-.5)*24,ay=cy+(r()-.3)*18;el(g,ax,ay,1.5,1.5,'#e0475a');el(g,ax-.4,ay-.5,.4,.4,'rgba(255,255,255,.7)',0,0);}
}
function celeiro(g){
  const b=TOP-3,parede=g=>{g.moveTo(8,b);g.lineTo(8,b-30);g.lineTo(13.5,b-42);g.lineTo(35,b-54);g.lineTo(56.5,b-42);g.lineTo(62,b-30);g.lineTo(62,b);};
  el(g,36,b+1,34,4,'rgba(20,50,20,.28)',0,0);
  g.beginPath();parede(g);g.closePath();g.fillStyle=luz(g,'#c4453a',b-54,b,.14);g.fill();
  g.save();g.clip();g.strokeStyle='rgba(90,20,20,.3)';g.lineWidth=.35;g.beginPath();for(let x=11.4;x<62;x+=3.4){g.moveTo(x,b-56);g.lineTo(x,b);}g.stroke();
  g.fillStyle='rgba(60,10,20,.2)';g.fillRect(6,b-33,58,4);g.restore();pronto(g);
  g.beginPath();parede(g);g.closePath();g.stroke();
  g.strokeStyle='#fbf0d2';g.lineWidth=1;g.beginPath();g.moveTo(9,b-.6);g.lineTo(9,b-29.6);g.moveTo(61,b-.6);g.lineTo(61,b-29.6);g.moveTo(8.6,b-29.4);g.lineTo(61.4,b-29.4);g.stroke();pronto(g);
  tubo(g,'#6a5560',3.4,g=>{g.moveTo(4.6,b-28.4);g.lineTo(12,b-43.6);g.lineTo(35,b-56.6);g.lineTo(58,b-43.6);g.lineTo(65.4,b-28.4);});
  g.strokeStyle='rgba(255,255,255,.18)';g.lineWidth=.4;g.beginPath();g.moveTo(5.6,b-30.6);g.lineTo(12.6,b-44.6);g.lineTo(35,b-57.4);g.lineTo(57.4,b-44.6);g.lineTo(64.4,b-30.6);g.stroke();pronto(g);
  g.beginPath();g.roundRect(29.5,b-46,11,10.5,[5.5,5.5,0,0]);g.fillStyle='#fbf0d2';g.fill();g.stroke();
  g.beginPath();g.roundRect(31,b-44.6,8,9.1,[4,4,0,0]);g.fillStyle='#3b2a2a';g.fill();g.stroke();
  g.strokeStyle='#f0cf6b';g.lineWidth=.5;g.beginPath();for(let i=0;i<9;i++){g.moveTo(31.6+i*.85,b-35.6);g.lineTo(31.2+i*.95,b-37.6-(i%3));}g.stroke();pronto(g);
  g.beginPath();g.rect(22,b-25,26,25);g.fillStyle='#fbf0d2';g.fill();g.stroke();
  for(const x of[23.4,35.4]){g.beginPath();g.rect(x,b-23.6,11.2,23.6);g.fillStyle=luz(g,'#a8382f',b-24,b,.1);g.fill();g.stroke();
    g.strokeStyle='#fbf0d2';g.lineWidth=.9;g.beginPath();g.moveTo(x+.8,b-22.8);g.lineTo(x+10.4,b-.8);g.moveTo(x+10.4,b-22.8);g.lineTo(x+.8,b-.8);g.stroke();pronto(g);}
  el(g,34.2,b-11,.7,.7,'#f6c945');el(g,35.9,b-11,.7,.7,'#f6c945');
}
function fardo(g,x,y){g.beginPath();g.roundRect(x,y-9,15,9,1.6);g.fillStyle=luz(g,'#e9c46a',y-9,y,.14);g.fill();g.stroke();
  g.strokeStyle='rgba(140,95,20,.45)';g.lineWidth=.3;g.beginPath();for(let i=0;i<12;i++){const yy=y-8.2+i*.68;g.moveTo(x+.8+(i%3)*.6,yy);g.lineTo(x+14.2-(i%2)*.8,yy);}g.stroke();
  g.strokeStyle='#b5503a';g.lineWidth=.5;g.beginPath();g.moveTo(x+4,y-9);g.lineTo(x+4,y);g.moveTo(x+11,y-9);g.lineTo(x+11,y);g.stroke();pronto(g);}
function girassol(g,x,y,h){tubo(g,'#4c9a4a',.9,g=>{g.moveTo(x,y);g.quadraticCurveTo(x+1,y-h/2,x,y-h);});
  el(g,x-2.2,y-h*.45,2.4,1,'#58b368',.5);el(g,x+2.4,y-h*.6,2.4,1,'#58b368',-.5);
  for(let i=0;i<12;i++){const a=i/12*TAU;el(g,x+Math.cos(a)*3,y-h+Math.sin(a)*3,1.7,.85,'#f6c945',a);}el(g,x,y-h,2.2,2.2,'#7a4a21');}
