/* ---------- casa com quatro divisões ---------- */
const CW=300,CH=226;
function paredeSala(g,x,y,w,cor,azulejo){
  g.beginPath();g.rect(x,y,w,40);g.fillStyle=luz(g,cor,y,y+40,.06);g.fill();
  if(azulejo){g.strokeStyle='rgba(255,255,255,.55)';g.lineWidth=.4;g.beginPath();for(let i=x;i<x+w;i+=7.5){g.moveTo(i,y+14);g.lineTo(i,y+36);}for(let j=y+14;j<y+37;j+=7.3){g.moveTo(x,j);g.lineTo(x+w,j);}g.stroke();pronto(g);}
  else{g.fillStyle='rgba(255,255,255,.22)';for(let i=x+4;i<x+w;i+=10)g.fillRect(i,y,4,40);}
  g.beginPath();g.rect(x,y+36,w,4);g.fillStyle='#8a5a34';g.fill();g.stroke();g.beginPath();g.rect(x,y,w,3);g.fillStyle='#8a5a34';g.fill();g.stroke();
}
function pisoSala(g,x,y,w,h,cor,xadrez){
  g.beginPath();g.rect(x,y,w,h);g.fillStyle=luz(g,cor,y,y+h,.08);g.fill();
  if(xadrez){g.fillStyle='rgba(120,150,170,.3)';for(let j=0;j*10<h;j++)for(let i=j%2;i*10<w;i+=2)g.fillRect(x+i*10,y+j*10,Math.min(10,w-i*10),Math.min(10,h-j*10));}
  else{g.strokeStyle='rgba(90,55,25,.42)';g.lineWidth=.4;g.beginPath();for(let j=y+9,i=0;j<y+h;j+=9,i++){g.moveTo(x,j);g.lineTo(x+w,j);for(let k=x+(i%2)*17+8;k<x+w;k+=34){g.moveTo(k,j-9);g.lineTo(k,j);}}g.stroke();pronto(g);}
}
function janela(g,wx,wy,esc,cort){
  g.beginPath();g.rect(wx,wy,26,20);g.fillStyle=esc>.5?'#1f2a5c':'#9fd8ff';g.fill();
  g.save();g.clip();if(esc>.5){el(g,wx+18,wy+7,3,3,'#f6e7a0',0,0);g.fillStyle='#fff';[[5,5],[10,12],[15,4],[21,15]].forEach(([a,b])=>g.fillRect(wx+a,wy+b,.7,.7));}
  else{el(g,wx+8,wy+7,4.6,2.2,'#fff',0,0);el(g,wx+13,wy+23,20,8,'#6cc45c',0,0);}g.restore();
  g.beginPath();g.rect(wx,wy,26,20);g.moveTo(wx+13,wy);g.lineTo(wx+13,wy+20);g.moveTo(wx,wy+10);g.lineTo(wx+26,wy+10);g.lineWidth=1;g.strokeStyle='#fffaf0';g.stroke();pronto(g);g.beginPath();g.rect(wx-.7,wy-.7,27.4,21.4);g.stroke();
  for(const s of[0,1])forma(g,cort,g=>{const x=wx+(s?26:0),d=s?-1:1;g.moveTo(x-d*2,wy-2);g.lineTo(x+d*7,wy-2);g.quadraticCurveTo(x+d*6,wy+10,x+d*2,wy+23);g.lineTo(x-d*2,wy+23);});
  tubo(g,'#8a5a34',.8,g=>{g.moveTo(wx-3.5,wy-2.3);g.lineTo(wx+29.5,wy-2.3);});
}
function interior(g,esc,corSala){
  pisoSala(g,0,40,150,70,'#f1ead9',1);pisoSala(g,150,40,150,70,'#c9955f');pisoSala(g,0,156,150,70,'#b98a5a');pisoSala(g,150,156,150,70,'#d9ab7e');
  pisoSala(g,60,108,26,50,'#b98a5a');pisoSala(g,214,108,26,50,'#d9ab7e');
  paredeSala(g,0,0,150,'#f6e3a1',1);paredeSala(g,150,0,150,corSala);
  g.fillStyle='#5a3a22';g.fillRect(0,110,60,6);g.fillRect(86,110,128,6);g.fillRect(240,110,60,6);
  paredeSala(g,0,116,60,'#cbd8ee');paredeSala(g,86,116,64,'#cbd8ee');paredeSala(g,150,116,64,'#f2c7cf');paredeSala(g,240,116,60,'#f2c7cf');
  for(const x of[60,214]){g.beginPath();g.rect(x-1.6,110,1.6,46);g.rect(x+26,110,1.6,46);g.fillStyle='#fffaf0';g.fill();g.stroke();}
  g.fillStyle='#5a3a22';g.fillRect(148,0,4,78);g.fillRect(148,104,4,12);g.fillRect(148,116,4,74);g.fillRect(148,218,4,8);
  g.beginPath();g.rect(147.4,77,5.2,1.4);g.rect(147.4,103.4,5.2,1.4);g.rect(147.4,189,5.2,1.4);g.rect(147.4,217.4,5.2,1.4);g.fillStyle='#fffaf0';g.fill();g.stroke();
  /* porta da rua */
  g.beginPath();g.rect(168.6,7.6,22.8,32.4);g.fillStyle='#fffaf0';g.fill();g.stroke();g.beginPath();g.rect(170,9,20,31);g.fillStyle=luz(g,'#3f8f8a',9,40,.14);g.fill();g.stroke();
  g.beginPath();g.roundRect(174,13,12,10,[6,6,1,1]);g.fillStyle=esc>.5?'#2a3566':'#bfe6ff';g.fill();g.stroke();el(g,187,28,.9,.9,'#f6c945');
  g.beginPath();g.roundRect(168,41,24,6,2);g.fillStyle='#b5503a';g.fill();g.stroke();
  janela(g,98,8,esc,'#f6c945');janela(g,208,8,esc,'#e0475a');janela(g,96,124,esc,'#4c7fd0');janela(g,160,124,esc,'#b58cf0');
  /* bancada da cozinha */
  g.beginPath();g.roundRect(62,30,30,22,1.5);g.fillStyle=luz(g,'#a9713f',30,52,.12);g.fill();g.stroke();g.beginPath();g.rect(61,28,32,3.4);g.fillStyle='#e6eff4';g.fill();g.stroke();
  for(const x of[64.5,78]){g.beginPath();g.roundRect(x,34,12,15,1);g.fillStyle='#c98a4b';g.fill();g.stroke();el(g,x+6,37,.7,.7,'#f6c945');}
  g.beginPath();g.roundRect(67,24.6,7,3.6,[0,0,2,2]);g.fillStyle='#9fa8b5';g.fill();g.stroke();tubo(g,'#9fa8b5',.6,g=>{g.moveTo(76,27.6);g.lineTo(76,23.6);g.lineTo(73,23.6);});
  g.beginPath();g.rect(8,9,22,2);g.fillStyle='#8a5a34';g.fill();g.stroke();for(let i=0;i<4;i++){g.beginPath();g.roundRect(9.5+i*5,4.2,3.6,4.8,.8);g.fillStyle=['#e0475a','#f6c945','#58b368','#f29b30'][i];g.fill();g.stroke();}
  /* tapetes fixos */
  el(g,222,92,30,11,'#e9c46a');el(g,222,92,26,9,'#4c9a8a');el(g,44,212,22,6,'#7aa5e8');el(g,256,212,18,5,'#f08ca0');
  g.beginPath();g.rect(0,0,CW,CH);g.lineWidth=1.2;g.stroke();pronto(g);
}
Object.assign(MV,{
 mesaJantar(g,m,t,comida){for(const x of[-19,17]){g.beginPath();g.rect(x,-10,2,10);g.fillStyle='#8a5a34';g.fill();g.stroke();}
  g.beginPath();g.roundRect(-23,-12,46,5,2);g.fillStyle='#8a5a34';g.fill();g.stroke();g.beginPath();g.roundRect(-23,-17,46,8,2.4);g.fillStyle=luz(g,'#c98a4b',-17,-9,.12);g.fill();g.stroke();
  g.beginPath();g.roundRect(-18,-16.4,36,6.4,1.6);g.fillStyle='#fffaf0';g.fill();g.stroke();
  for(const x of[-13,-4.4,4.4,13]){el(g,x,-13.2,3,1.3,'#fff');if(comida){el(g,x,-13.6,2,.9,x%2?'#f29b30':'#e5483f',0,0);}}
  if(comida){g.strokeStyle='rgba(255,255,255,.75)';g.lineWidth=.4;g.beginPath();for(const x of[-13,-4.4,4.4,13]){const o=Math.sin(t*3+x)*.7;g.moveTo(x,-15);g.quadraticCurveTo(x-1.2+o,-17.4,x+o,-19.6);}g.stroke();pronto(g);}},
 tv(g,m,t,on){g.beginPath();g.roundRect(-13,-8,26,8,1.4);g.fillStyle=luz(g,'#8a5a34',-8,0,.12);g.fill();g.stroke();g.beginPath();g.rect(-1.5,-11,3,3.4);g.fillStyle='#2f2a33';g.fill();g.stroke();
  g.beginPath();g.roundRect(-14,-30,28,19.4,2);g.fillStyle='#2f2a33';g.fill();g.stroke();g.beginPath();g.roundRect(-12.4,-28.4,24.8,16.2,1);g.fillStyle=on?'#8fd0ff':'#15131a';g.fill();
  if(on){g.save();g.clip();el(g,0,-10,20,6,'#6cc45c',0,0);el(g,-6+Math.sin(t*.8)*5,-23,3.4,1.6,'#fff',0,0);el(g,7,-24,2.2,2.2,'#f6c945',0,0);
   const bx=Math.sin(t*2)*8;el(g,bx,-15.4-Math.abs(Math.sin(t*5))*4,1.5,1.5,'#e0475a',0,0);g.restore();el(g,0,-20,22,16,'rgba(150,210,255,.12)',0,0);}
  g.beginPath();g.roundRect(-12.4,-28.4,24.8,16.2,1);g.stroke();},
 camaCasal(g){g.beginPath();g.roundRect(-24,-34,48,14,3.5);g.fillStyle=luz(g,'#8a5a34',-34,-20,.14);g.fill();g.stroke();g.beginPath();g.roundRect(-24,-25,48,25,3);g.fillStyle='#a9713f';g.fill();g.stroke();
  g.beginPath();g.roundRect(-22.4,-24,44.8,21,3);g.fillStyle='#fffaf0';g.fill();g.stroke();for(const x of[-11,11]){g.beginPath();g.roundRect(x-9,-23,18,7,3);g.fillStyle='#fff';g.fill();g.stroke();}},
 mantaCasal(g){g.beginPath();g.roundRect(-22.4,-14.6,44.8,11.6,[1,1,3,3]);g.fillStyle=luz(g,'#4c7fd0',-14.6,-3,.12);g.fill();g.stroke();g.beginPath();g.rect(-22.4,-14.6,44.8,2.6);g.fillStyle='#cfe0f7';g.fill();g.stroke();},
 camaFilha(g){g.beginPath();g.roundRect(-14,-30,28,12,3);g.fillStyle=luz(g,'#fffaf0',-30,-18,.06);g.fill();g.stroke();el(g,0,-27,1.6,1.4,'#f08ca0');g.beginPath();g.roundRect(-14,-22,28,22,3);g.fillStyle='#f3d9e0';g.fill();g.stroke();
  g.beginPath();g.roundRect(-12.6,-21,25.2,18,2.6);g.fillStyle='#fffaf0';g.fill();g.stroke();g.beginPath();g.roundRect(-8,-20,16,6,2.6);g.fillStyle='#fff';g.fill();g.stroke();},
 mantaFilha(g){g.beginPath();g.roundRect(-12.6,-12.6,25.2,9.6,[1,1,2.6,2.6]);g.fillStyle=luz(g,'#b58cf0',-12.6,-3,.12);g.fill();g.stroke();g.fillStyle='rgba(255,255,255,.6)';for(let i=0;i<5;i++){g.beginPath();g.arc(-9+i*4.5,-7+(i%2)*2,.6,0,TAU);g.fill();}},
 brinquedos(g){g.beginPath();g.roundRect(-8,-8,16,8,1.4);g.fillStyle=luz(g,'#f29b30',-8,0,.12);g.fill();g.stroke();el(g,-3,-10.6,2.6,2.6,'#c98a4b');el(g,-4.8,-12.8,1,1,'#c98a4b');el(g,-1.2,-12.8,1,1,'#c98a4b');el(g,-3.6,-10.8,.3,.3,LN,0,0);el(g,-2.2,-10.8,.3,.3,LN,0,0);el(g,3.6,-9.6,2,2,'#e0475a');el(g,13,-2.2,2.2,2.2,'#4c7fd0');}
});
function dorminhoco(g,x,y,o,t,e){g.save();g.translate(x,y);g.scale(e,e);g.beginPath();g.rect(-9,-31,18,14.4);g.clip();pessoa(g,{mov:false,ph:0,dir:1},t,Object.assign({},o,{dorme:1}));g.restore();pronto(g);}
