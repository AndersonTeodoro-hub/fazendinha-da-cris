const cv=$('c'),cx=cv.getContext('2d');
const WW=480,WH=360,TOP=64,DIA=720,ESC=1.25,RW=200,RH=150,WALLH=56,REGA=110,SECA=260,REBROTA=900;
const PORTA={x:400,y:TOP+9,dir:1};
let W=340,H=200,S=3,G=null,GS=0;const cam={x:0,y:0};
for(const t in SP){SP[t].w*=ESC;SP[t].h*=ESC;}SP.ovelha.som='Bééé!';

/* ---------- dados ---------- */
const PLANTAS={
 cenoura:{nome:'Cenoura',sem:4,t:90,janela:300},
 trigo:{nome:'Trigo',sem:3,t:120,janela:360,racao:2},
 tomate:{nome:'Tomate',sem:8,t:210,janela:300},
 morango:{nome:'Morango',sem:12,t:300,janela:270},
 abobora:{nome:'Abóbora',sem:20,t:480,janela:420}
};
const RECEITAS={
 sopa:{nome:'Sopa de cenoura',ing:{cenoura:2}},
 omelete:{nome:'Omelete',ing:{ovo:2,tomate:1}},
 bolo:{nome:'Bolo de morango',ing:{morango:1,ovo:1,leite:1}},
 torta:{nome:'Torta de abóbora',ing:{abobora:1,leite:1,ovo:1}}
};
const NOME={racao:'Ração',madeira:'Madeira',ovo:'Ovo',leite:'Leite',la:'Lã',trufa:'Trufa',presente:'Presente',cenoura:'Cenoura',tomate:'Tomate',morango:'Morango',abobora:'Abóbora',
  sopa:'Sopa de cenoura',omelete:'Omelete',bolo:'Bolo de morango',torta:'Torta de abóbora'};
const VENDA={ovo:6,leite:14,la:11,trufa:17,presente:9,cenoura:9,tomate:21,morango:34,abobora:62,sopa:26,omelete:48,bolo:80,torta:120,madeira:2};
const MOVEIS={
 cama:{nome:'Cama',preco:80,mad:10,w:36,h:31},sofa:{nome:'Sofá',preco:60,mad:8,w:40,h:21},mesa:{nome:'Mesa',preco:40,mad:6,w:30,h:22},cadeira:{nome:'Cadeira',preco:15,mad:3,w:12,h:19},
 tapete:{nome:'Tapete',preco:25,w:48,h:20,chao:1},planta:{nome:'Planta',preco:12,w:12,h:22},estante:{nome:'Estante',preco:45,mad:8,w:24,h:37},abajur:{nome:'Abajur',preco:20,mad:4,w:13,h:32},
 quadro:{nome:'Quadro',preco:18,mad:3,w:19,h:15,parede:1},fogao:{nome:'Fogão a lenha',preco:70,w:26,h:32},geladeira:{nome:'Geladeira',preco:90,w:20,h:38},lareira:{nome:'Lareira',preco:120,mad:12,w:40,h:34}
};
const nomeItem=k=>k[1]==='_'?(k[0]==='s'?'Semente de '+PLANTAS[k.slice(2)].nome.toLowerCase():MOVEIS[k.slice(2)].nome):NOME[k];
const tempo=s=>{s=Math.max(0,Math.ceil(s));return(s/60|0)+':'+String(s%60).padStart(2,'0');};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const IMG={};
function img(k){
  if(IMG[k])return IMG[k];
  if(k[0]==='m'&&k[1]==='_'){const d=MOVEIS[k.slice(2)],e=Math.min(120/d.w,110/d.h,6);return IMG[k]=retrato(136,136,e,68,d.parede||d.chao?68:68+d.h*e/2,g=>MV[k.slice(2)](g,null,0));}
  if(SP[k])return IMG[k]=retrato(240,176,6,112,160,g=>SP[k].draw(g,{c:0},MODELO));
  return IMG[k]=retrato(136,136,12,68,70,ICO[k[0]==='s'&&k[1]==='_'?'saquinho':k]);
}

/* ---------- estado ---------- */
const NOMES=['Mel','Thor','Pipoca','Luna','Bolinha','Nina','Pingo','Estrela','Fofa','Paçoca','Amora','Tobias','Mimosa','Biscoito','Flor','Jujuba'];
const STATS=['comida','agua','amor'];
let animais=[],potes=[],itens=[],coracoes=[],textos=[],bola=null,sel=null,ferramenta='amor';
let moedas=40,jogadora='',som=true,T=0,relogio=DIA*.05,chamar=0,noite=false,escV=0,sorriso=0,dormindo=false,cena='fazenda',decor=null,fogo=0,ajuda=0;
let inv={racao:5,s_cenoura:4,s_trigo:2},semente='cenoura',casa={parede:0,moveis:[]},familia={ele:'Esposo',filha:'Filha'};
const canteiros=[];for(let r=0;r<3;r++)for(let c=0;c<4;c++)canteiros.push({x:58+c*32,y:246+r*26,lavrado:true,k:null,g:0,agua:0,seco:0,pronto:0,morta:false});
const arvores=[[330,214],[376,242],[424,210],[454,266],[344,292],[404,304],[448,330]].map(([x,y],i)=>({x,y,i,hp:3,t:0,total:REBROTA,treme:0}));
const P={x:240,y:180,tx:240,ty:180,dir:1,ph:0,mov:false,meta:null};let Q=P;
const FAM=[{id:'ele',x:424,y:TOP+30,tx:424,ty:TOP+30,dir:-1,ph:0,mov:false,wait:2,alvo:null,e:1.3,o:{cor:'#e9a23a',cab:'#4a2f1a',chapeu:1,fita:'#3f6fb5',barba:1,f:1.7}},
           {id:'filha',x:378,y:TOP+34,tx:378,ty:TOP+34,dir:1,ph:0,mov:false,wait:1,alvo:null,e:.85,o:{saia:1,cor:'#b58cf0',cab:'#6b3a1f',laco:1,f:4.1}}];
const tem=k=>inv[k]|0;
function soma(k,n){inv[k]=tem(k)+n;if(inv[k]<=0)delete inv[k];mudou();}
const nomeLivre=()=>{const l=NOMES.filter(n=>!animais.some(a=>a.n===n));return (l.length?l:NOMES)[R()*(l.length||NOMES.length)|0];};
function novo(t,n,c,x,y){return{t,n,c:c%CO[t].length,x:x??120+R()*200,y:y??TOP+30+R()*130,dir:1,ph:0,st:'idle',wait:1,th:R()*.5,seed:R()*10,
  comida:80,agua:80,amor:70,hop:0,cd:0,prod:60+R()*90,r:18+R()*18,acordado:0,vem:0,fala:0,mov:false,tx:0,ty:0,tm:0,tg:null};}
const feliz=a=>(a.comida+a.agua+a.amor)/3;
const fase=()=>{const ph=relogio%DIA/DIA;return ph<.8?0:ph<.84?(ph-.8)/.04:ph<.96?1:(1-ph)/.04;};

/* ---------- som ---------- */
let AC=null;
function bip(f,d=.08,tipo='square',f2){
  if(!som)return;
  try{AC=AC||new(window.AudioContext||window.webkitAudioContext)();const o=AC.createOscillator(),g=AC.createGain(),t=AC.currentTime;
    o.type=tipo;o.frequency.setValueAtTime(f,t);if(f2)o.frequency.exponentialRampToValueAtTime(f2,t+d);
    g.gain.setValueAtTime(tipo==='sine'||tipo==='triangle'?.5:.28,t);g.gain.exponentialRampToValueAtTime(.001,t+d);o.connect(g).connect(AC.destination);o.start();o.stop(t+d);}catch(e){}
}
const voz=a=>{const v=SP[a.t].voz;bip(v[0],.18,v[2],v[1]);};

/* ---------- gravar ---------- */
function gravar(){if(!jogadora)return;try{localStorage.setItem('fazendinhaHD',JSON.stringify({v:3,jogadora,moedas,som,t:Date.now(),relogio,dormindo,inv,semente,casa,familia,fogo,ajuda,
  h:canteiros.map(c=>({lavrado:c.lavrado,k:c.k,g:c.g,agua:c.agua,seco:c.seco,pronto:c.pronto,morta:c.morta})),arv:arvores.map(a=>[a.hp,a.t]),
  a:animais.map(a=>({t:a.t,n:a.n,c:a.c,comida:a.comida,agua:a.agua,amor:a.amor}))}));}catch(e){}}
function ler(){try{return JSON.parse(localStorage.getItem('fazendinhaHD'));}catch(e){return null;}}

/* ---------- chão ---------- */
function ajustar(){
  const p=$('palco'),aw=p.clientWidth,ah=p.clientHeight,a=clamp(aw/ah,.6,2.5);
  if(a>=1){H=190;W=Math.round(190*a);}else{W=200;H=Math.round(200/a);}
  const css=Math.min(aw/W,ah/H);S=Math.min(css*Math.max(window.devicePixelRatio||1,2),3840/W);
  cv.width=Math.round(W*S);cv.height=Math.round(H*S);cv.style.width=W*css+'px';cv.style.height=H*css+'px';
  const gs=Math.min(S,Math.sqrt(16e6/(WW*WH)));if(Math.abs(gs-GS)>.01){GS=gs;chao();}
}
function chao(){
  G=document.createElement('canvas');G.width=Math.round(WW*GS);G.height=Math.round(WH*GS);const g=G.getContext('2d');g.scale(GS,GS);pronto(g);
  let s=11;const r=()=>(s=s*16807%2147483647)/2147483647;
  const q=g.createLinearGradient(0,0,0,WH);q.addColorStop(0,'#86d36b');q.addColorStop(1,'#5db650');g.fillStyle=q;g.fillRect(0,0,WW,WH);
  for(let i=0;i<150;i++){const x=r()*WW,y=r()*WH,rr=14+r()*26,k=g.createRadialGradient(x,y,0,x,y,rr),c=r()<.5?'40,110,50':'190,240,140';
    k.addColorStop(0,'rgba('+c+',.13)');k.addColorStop(1,'rgba('+c+',0)');g.fillStyle=k;g.fillRect(x-rr,y-rr,rr*2,rr*2);}
  g.lineWidth=.28;for(const c of['#4f9f45','#6cc45c','#3f8c3d','#8fdc74','#59ad4c']){g.strokeStyle=c;g.beginPath();for(let i=0,n=WW*WH/12;i<n;i++){const x=r()*WW,y=r()*WH;g.moveTo(x,y);g.lineTo(x+(r()-.5)*1.2,y-.8-r()*1.8);}g.stroke();}
  const cam1=[],cam2=[];for(let i=0;i<=30;i++){const t=i/30;cam1.push([35+t*150+Math.sin(t*3.2)*16,TOP-2+t*150,8.5-t*3]);cam2.push([400-t*120+Math.sin(t*3)*12,TOP+2+t*150,7.5-t*2.5]);}
  const cam=cam1.concat(cam2);
  cam.forEach(([x,y,w])=>el(g,x,y,w+1.6,w*.55+1.2,'#b99763',0,0));cam.forEach(([x,y,w])=>el(g,x,y,w,w*.55,'#dcbf8f',0,0));
  for(let i=0;i<200;i++){const c=cam[r()*cam.length|0];el(g,c[0]+(r()-.5)*c[2]*1.6,c[1]+(r()-.5)*c[2]*.8,.3+r()*.5,.25+r()*.3,r()<.5?'#c4a371':'#ecd5aa',0,0);}
  const fora=(x,y)=>cam.some(c=>Math.abs(x-c[0])<c[2]&&Math.abs(y-c[1])<c[2]*.55)||(x>34&&x<178&&y>226&&y<318);
  g.lineWidth=.4;for(let i=0;i<WW*WH/260;i++){const x=r()*WW,y=TOP+4+r()*(WH-TOP-4);if(fora(x,y))continue;g.strokeStyle=r()<.5?'#3a8438':'#4a9a42';
    for(let k=-1;k<=1;k++){g.beginPath();g.moveTo(x+k*.7,y);g.quadraticCurveTo(x+k*1.2,y-2,x+k*2.2,y-2.8-r()*1.6);g.stroke();}}
  for(let i=0;i<WW*WH/4200;i++){const x=r()*WW,y=TOP+6+r()*(WH-TOP-10);if(fora(x,y))continue;el(g,x+.6,y+.6,1.9+r()*1.4,1.1+r()*.6,'rgba(20,50,20,.25)',0,0);
    pronto(g);const a=1.6+r()*1.5;el(g,x,y,a,a*.62,luz(g,'#a9adb8',y-1.2,y+1.2,.2));el(g,x-.5,y-.4,a*.35,a*.18,'rgba(255,255,255,.5)',0,0);}
  const cores=['#ffffff','#f6c945','#f08ca0','#b58cf0','#ff8a5c'];
  for(let i=0;i<WW*WH/620;i++){const x=r()*WW,y=TOP+5+r()*(WH-TOP-8);if(fora(x,y))continue;const c=cores[r()*5|0],t=.5+r()*.35;
    g.strokeStyle='#3f8c3d';g.lineWidth=.3;g.beginPath();g.moveTo(x,y+2.2);g.lineTo(x,y);g.stroke();
    for(let k=0;k<5;k++){const a=k/5*TAU+i;el(g,x+Math.cos(a)*t,y+Math.sin(a)*t,t*.72,t*.72,c,0,0);}el(g,x,y,t*.5,t*.5,c==='#f6c945'?'#e07a1f':'#f6c945',0,0);}
  pronto(g);
  g.beginPath();g.roundRect(36,228,140,88,7);g.fillStyle='#b9945f';g.fill();g.lineWidth=1.6;g.strokeStyle='#8a5a34';g.stroke();pronto(g);
  arvore(g,232,TOP-12,r);arvore(g,300,TOP-15,r);arvore(g,462,TOP-13,r);
  fardo(g,70,TOP-12);fardo(g,84,TOP-12);fardo(g,77,TOP-21);
  for(let x=112;x<212;x+=11)girassol(g,x,TOP-8,15+(x*7%5));
  g.fillStyle='rgba(20,50,20,.2)';g.fillRect(68,TOP-1.4,WW,1.8);
  for(const y of[TOP-12.5,TOP-7]){g.beginPath();g.roundRect(68,y,WW,2.2,1);g.fillStyle=luz(g,'#e8cfa2',y,y+2.2,.14);g.fill();g.stroke();}
  for(let x=72;x<WW+4;x+=16){g.beginPath();g.roundRect(x-1.5,TOP-16,3,16,[1.4,1.4,.3,.3]);g.fillStyle=luz(g,'#f0d9ae',TOP-16,TOP,.16);g.fill();g.stroke();
    el(g,x,TOP-12.4,.4,.4,'#7a5a3a',0,0);el(g,x,TOP-5.9,.4,.4,'#7a5a3a',0,0);}
  celeiro(g);casaFora(g,TOP-3);
}

/* ---------- lógica ---------- */
function ir(e,x,y,v,dt,parar){
  const dx=x-e.x,dy=y-e.y,d=Math.hypot(dx,dy);
  if(d<=parar)return true;
  const p=Math.min(d-parar+.01,v*dt);e.x+=dx/d*p;e.y+=dy/d*p;
  if(Math.abs(dx)>1)e.dir=dx>0?1:-1;e.mov=true;e.ph+=dt*8;return false;
}
const dizer=(x,y,s)=>textos.push({x,y,s,t:0});
const mimo=(x,y)=>{for(let i=0;i<3;i++)coracoes.push({x:x-6+i*6,y:y-(i%2)*3,t:-i*.12});sorriso=1;};
const mimoA=a=>mimo(a.x,a.y-SP[a.t].h-2);
function aviso(s){const e=$('aviso');e.textContent=s;e.hidden=false;clearTimeout(aviso.t);aviso.t=setTimeout(()=>e.hidden=true,4600);}
const naHorta=(x,y)=>x>30&&x<182&&y>222&&y<322;

function crescer(dt){
  let m=0;
  canteiros.forEach(c=>{if(!c.k||c.morta)return;const p=PLANTAS[c.k];
    if(c.g<p.t){if(c.agua<=0&&ajuda>0){c.agua=REGA;c.seco=0;}if(c.agua>0){c.agua-=dt;c.g+=dt;c.seco=0;}else if((c.seco+=dt)>SECA){c.morta=true;m++;}}
    else if((c.pronto+=dt)>p.janela){c.morta=true;m++;}});
  arvores.forEach(a=>{if(a.hp<=0&&(a.t-=dt)<=0)a.hp=3;});
  fogo=Math.max(0,fogo-dt);ajuda=Math.max(0,ajuda-dt);
  return m;
}
function pensar(a){
  const sp=SP[a.t];
  if(a.st==='fetch'||a.st==='ret'||a.st==='eat')return;
  if(chamar>0||a.vem>0){a.st='come';return;}
  const ordem=a.comida<=a.agua?['comida','agua']:['agua','comida'];
  for(const k of ordem)if(a[k]<60){let m=null,md=1e9;potes.forEach(p=>{const d=Math.hypot(p.x-a.x,p.y-a.y);if(p.k===k&&d<md){m=p;md=d;}});
    if(m){a.st='seek';a.tg=m;return;}}
  if(Math.min(a.comida,a.agua,a.amor)<30){a.st='beg';return;}
  if(noite&&a.acordado<=0){a.st='sleep';return;}
  if(a.st!=='idle'&&a.st!=='walk'){a.st='idle';a.wait=.5;}
  if(a.st==='idle'&&(a.wait-=.5)<=0){
    const perto=sp.segue&&a.amor>55&&R()<.6;let x,y,n=0;
    do{x=clamp(perto?Q.x+(R()-.5)*90:14+R()*(WW-28),12,WW-12);y=clamp(perto?Q.y+(R()-.5)*60:TOP+14+R()*(WH-TOP-24),TOP+12,WH-8);}while(naHorta(x,y)&&++n<6);
    a.tx=x;a.ty=y;a.st='walk';
  }
}
function atualizar(a,dt){
  const sp=SP[a.t],f=feliz(a);
  a.comida=Math.max(0,a.comida-dt*70/900);a.agua=Math.max(0,a.agua-dt*70/800);a.amor=Math.max(0,a.amor-dt*70/600);
  a.hop=Math.max(0,a.hop-dt);a.cd=Math.max(0,a.cd-dt);a.acordado=Math.max(0,a.acordado-dt);a.vem=Math.max(0,a.vem-dt);a.fala=Math.max(0,a.fala-dt);a.mov=false;
  if(f>=55&&(a.prod-=dt)<=0){a.prod=150+R()*100;if(itens.length<14){itens.push({k:sp.prod,x:clamp(a.x-a.dir*(sp.w/2+2),10,WW-10),y:a.y+2,t:0});bip(880,.06,'triangle');}}
  if((a.th-=dt)<=0){a.th=.5;pensar(a);}
  switch(a.st){
    case 'eat': if((a.tm-=dt)<=0)a.st='idle';break;
    case 'walk': if(ir(a,a.tx,a.ty,sp.vel*(f<35?.5:1),dt,1)){a.st='idle';a.wait=1+R()*4;}break;
    case 'seek': {const p=a.tg;if(!potes.includes(p)){a.st='idle';break;}
      if(ir(a,p.x-a.dir*(sp.w/2+1),p.y+1,sp.vel*1.3,dt,2)){a.dir=p.x>a.x?1:-1;p.n--;a[p.k]=100;a.st='eat';a.tm=1.4;
        dizer(a.x,a.y-sp.h-4,p.k==='comida'?'Nham!':'Glup!');bip(260,.07);if(p.n<=0)potes.splice(potes.indexOf(p),1);}break;}
    case 'come': case 'beg': if(ir(a,Q.x,Q.y,sp.vel*(a.st==='come'?1.8:1),dt,a.r))a.dir=Q.x>a.x?1:-1;break;
    case 'fetch': if(!bola||bola.de!==a){a.st='idle';break;}
      if(ir(a,bola.tx,bola.ty,sp.vel*2,dt,6)&&bola.chao){
        if(sp.traz){bola.leva=a;a.st='ret';}else{bola=null;a.amor=Math.min(100,a.amor+12);mimoA(a);a.hop=.3;voz(a);a.st='idle';a.wait=1;}}break;
    case 'ret': if(!bola){a.st='idle';break;}
      if(ir(a,Q.x,Q.y,sp.vel*1.8,dt,18)){bola=null;a.amor=Math.min(100,a.amor+18);mimoA(a);a.hop=.3;voz(a);dizer(Q.x,Q.y-36,'Boa, '+a.n+'!');a.st='idle';a.wait=1;}break;
    case 'sleep': break;
    default: if(Math.hypot(Q.x-a.x,Q.y-a.y)<50)a.dir=Q.x>a.x?1:-1; if(f>75&&R()<dt*.2)a.hop=.3;
  }
}
function familiaPasso(f,dt){
  f.mov=false;
  if(ajuda>0){
    if(f.id==='ele'){const seco=c=>c&&c.k&&!c.morta&&c.agua<=0&&c.g<PLANTAS[c.k].t;if(!seco(f.alvo))f.alvo=canteiros.find(seco)||null;
      if(f.alvo){if(ir(f,f.alvo.x,f.alvo.y+13,62,dt,2)){f.alvo.agua=REGA;f.alvo.seco=0;dizer(f.alvo.x,f.alvo.y-12,'Regado!');bip(700,.06,'sine',500);f.alvo=null;}return;}}
    else{if(!itens.includes(f.alvo))f.alvo=itens[0]||null;if(f.alvo){if(ir(f,f.alvo.x,f.alvo.y,68,dt,4)){apanhar(itens.indexOf(f.alvo));f.alvo=null;}return;}}
  }
  if((f.wait-=dt)<=0){f.wait=3+R()*6;const h=ajuda>0&&f.id==='ele';f.tx=h?186+R()*40:330+R()*130;f.ty=h?236+R()*70:TOP+14+R()*56;}
  if(ir(f,f.tx,f.ty,34,dt,1)&&Math.hypot(Q.x-f.x,Q.y-f.y)<46)f.dir=Q.x>f.x?1:-1;
}
function apanhar(i){const it=itens[i];if(!it)return;dizer(it.x,it.y-9,'+1 '+NOME[it.k]);bip(990,.1,'triangle',1480);itens.splice(i,1);soma(it.k,1);}
let baixo=false,segue=false,pt={x:0,y:0,sx:0,sy:0,t:0};const pintados=new Set();
function passo(dt){
  T+=dt;sorriso=Math.max(0,sorriso-dt);escV+=((dormindo?1:fase())-escV)*Math.min(1,dt*3);
  coracoes=coracoes.filter(c=>(c.t+=dt)<1);textos=textos.filter(t=>(t.t+=dt)<1.5);
  if(dormindo)return;
  relogio+=dt;noite=fase()>.6;chamar=Math.max(0,chamar-dt);
  if(baixo&&(segue||T-pt.t>.25)){segue=true;const[x,y]=mundo(pt.x,pt.y);alvoAndar(x,y);if(cena==='fazenda')pintar(x,y);}
  P.mov=false;if(ir(P,P.tx,P.ty,80,dt,1)&&P.meta){const m=P.meta;P.meta=null;m==='casa'?entrar():sair();}
  Q=cena==='fazenda'?P:PORTA;
  crescer(dt);
  if(bola){
    if(!bola.chao){bola.t+=dt/.6;const k=Math.min(1,bola.t);bola.x=bola.sx+(bola.tx-bola.sx)*k;bola.y=bola.sy+(bola.ty-bola.sy)*k;bola.z=Math.sin(Math.PI*k)*26;if(k>=1)bola.chao=true;}
    else if(!bola.de&&(bola.vida-=dt)<=0)bola=null;
  }
  animais.forEach(a=>atualizar(a,dt));FAM.forEach(f=>familiaPasso(f,dt));arvores.forEach(a=>a.treme=Math.max(0,a.treme-dt*3));
  for(let i=itens.length-1;i>=0;i--){itens[i].t+=dt;if(cena==='fazenda'&&Math.hypot(itens[i].x-P.x,itens[i].y-P.y)<10)apanhar(i);}
  if(cena==='casa'){cam.x=(RW-W)/2;cam.y=(RH-H)/2;}
  else{const k=Math.min(1,dt*5);cam.x+=(clamp(P.x-W/2,0,WW-W)-cam.x)*k;cam.y+=(clamp(P.y-H*.58,0,WH-H)-cam.y)*k;}
}

/* ---------- ações ---------- */
function acordar(a){if(a.st==='sleep'){a.st='idle';a.wait=2;}a.acordado=10;}
function carinho(a){
  if(a.cd>0)return;a.cd=.45;a.amor=Math.min(100,a.amor+14);a.hop=.3;a.dir=P.x>a.x?1:-1;mimoA(a);voz(a);
  dizer(a.x,a.y-SP[a.t].h-7,SP[a.t].som);acordar(a);
}
function dar(a,k){
  if(a.cd>0)return;a.cd=.45;const y=a.y-SP[a.t].h-7;
  if(a[k]>85){dizer(a.x,y,k==='comida'?'Estou cheio!':'Sem sede!');return;}
  if(k==='comida'){if(!tem('racao')){aviso('Acabou a ração. Compre na loja ou plante trigo.');return;}soma('racao',-1);}
  a[k]=100;a.hop=.3;dizer(a.x,y,k==='comida'?'Nham!':'Glup!');bip(260,.07);acordar(a);
}
function chamarBicho(a){
  if(cena!=='fazenda'){aviso('Saia de casa para chamar os bichos.');return;}
  dizer(P.x,P.y-38,a.n+'!');bip(800,.14,'sine',1150);a.vem=8;a.th=0;acordar(a);
  setTimeout(()=>{if(animais.includes(a)){dizer(a.x,a.y-SP[a.t].h-7,SP[a.t].som);voz(a);a.hop=.3;}},500);
}
function conversar(a){
  if(a.fala>0)return;a.fala=2.5;const f=['Oi, '+a.n+'!','Tudo bem, '+a.n+'?','Quem é o bicho mais lindo?','Bom te ver, '+a.n+'!'];
  dizer(P.x,P.y-38,f[R()*f.length|0]);acordar(a);a.dir=P.x>a.x?1:-1;
  setTimeout(()=>{if(!animais.includes(a))return;const s=SP[a.t].som,m=Math.min(a.comida,a.agua,a.amor);
    const r=m<30?(a.comida===m?'(Estou com fome!)':a.agua===m?'(Quero água!)':'(Quero carinho!)'):noite?'(Que sono...)':feliz(a)>75?'(Estou tão feliz!)':'(Tudo bem por aqui!)';
    dizer(a.x,a.y-SP[a.t].h-7,s+' '+r);voz(a);a.hop=.3;a.amor=Math.min(100,a.amor+5);},650);
}
function atirar(x,y){
  if(bola&&bola.leva)return;
  bola={sx:P.x,sy:P.y-12,x:P.x,y:P.y,tx:x,ty:y,t:0,z:0,chao:false,de:null,leva:null,vida:6};P.dir=x>P.x?1:-1;bip(500,.12,'triangle',900);
  let m=null,md=1e9;animais.forEach(a=>{const d=Math.hypot(a.x-x,a.y-y);if(SP[a.t].bola&&a.st!=='eat'&&d<md){m=a;md=d;}});
  if(m){bola.de=m;m.st='fetch';m.acordado=10;}else aviso('Só cachorros e gatos correm atrás da bola.');
}
function proximaSemente(){const l=Object.keys(PLANTAS),i=l.indexOf(semente);for(let k=1;k<=l.length;k++){const s=l[(i+k)%l.length];if(tem('s_'+s)){semente=s;break;}}rotulos();}
function acaoCanteiro(c,quieto){
  const f=ferramenta,y=c.y-12;
  if(f==='enxada'){if(c.k&&!c.morta){if(!quieto)aviso('Aqui ainda tem uma planta viva.');return;}if(c.lavrado&&!c.k)return;c.lavrado=true;c.k=null;c.morta=false;bip(180,.07,'sawtooth',120);return;}
  if(f==='semente'){if(c.k)return;if(!c.lavrado){if(!quieto)aviso('Passe a enxada antes de plantar.');return;}
    if(!tem('s_'+semente)){proximaSemente();if(!tem('s_'+semente)){if(!quieto)aviso('Acabaram as sementes. Compre na loja.');return;}}
    soma('s_'+semente,-1);Object.assign(c,{k:semente,g:0,agua:0,seco:0,pronto:0,morta:false});bip(440,.05);return;}
  if(f==='agua'){if(c.k&&!c.morta&&c.g<PLANTAS[c.k].t&&c.agua<REGA*.9){c.agua=REGA;c.seco=0;bip(700,.06,'sine',500);}return;}
  if(f!=='amor')return;
  if(!c.k){if(!quieto)aviso(c.lavrado?'Canteiro pronto. Escolha Semente para plantar.':'Passe a enxada para preparar a terra.');return;}
  if(c.morta){if(!quieto)aviso('Esta planta murchou. Passe a enxada para limpar.');return;}
  const p=PLANTAS[c.k];
  if(c.g>=p.t){if(p.racao){dizer(c.x,y,'+'+p.racao+' Ração');soma('racao',p.racao);}else{dizer(c.x,y,'+1 '+p.nome);soma(c.k,1);}c.k=null;c.lavrado=false;bip(660,.08,'triangle',990);}
  else if(!quieto)dizer(c.x,y,(c.agua<=0?'Precisa de água! ':'')+'Falta '+tempo(p.t-c.g));
}
const noCanteiro=(x,y)=>canteiros.find(c=>Math.abs(x-c.x)<14&&Math.abs(y-c.y)<10);
function pintar(x,y){const c=noCanteiro(x,y);if(c&&!pintados.has(c)){pintados.add(c);acaoCanteiro(c,true);}}
function alvoAndar(x,y){P.meta=null;if(cena==='casa'){P.tx=clamp(x,8,RW-8);P.ty=clamp(y,WALLH+5,RH-4);}else{P.tx=clamp(x,8,WW-8);P.ty=clamp(y,TOP+6,WH-5);}}
function cortar(a){
  if(a.hp<=0){aviso('Esta árvore está crescendo de novo. Falta '+tempo(a.t)+'.');return;}
  a.hp--;a.treme=1;bip(140,.09,'square',90);dizer(a.x,a.y-30,'+1 Madeira');soma('madeira',1);P.dir=a.x>P.x?1:-1;
  if(a.hp<=0){a.t=a.total;bip(90,.3,'sawtooth',50);dizer(a.x,a.y-40,'Caiu!');}
}
function toque(x,y){
  if(!jogadora||dormindo)return;
  if(cena==='casa')return toqueCasa(x,y);
  for(let i=itens.length-1;i>=0;i--)if(Math.hypot(itens[i].x-x,itens[i].y-4-y)<11){apanhar(i);return;}
  if(x>389&&x<411&&y>TOP-28&&y<TOP+5){P.tx=400;P.ty=TOP+7;P.meta='casa';return;}
  const gx=clamp(x,8,WW-8),gy=clamp(y,TOP+6,WH-5);
  if(ferramenta==='bola'){atirar(gx,gy);return;}
  let alvo=null;animais.forEach(a=>{const s=SP[a.t];if(x>a.x-s.w/2-3&&x<a.x+s.w/2+3&&y>a.y-s.h-3&&y<a.y+4&&(!alvo||a.y>alvo.y))alvo=a;});
  if(alvo&&ferramenta!=='machado'&&ferramenta!=='enxada'&&ferramenta!=='semente'){sel=alvo;P.tx=clamp(alvo.x+(alvo.x>P.x?-1:1)*(SP[alvo.t].w/2+9),8,WW-8);P.ty=alvo.y+1;
    ferramenta==='amor'?carinho(alvo):dar(alvo,ferramenta);return;}
  sel=null;
  const fm=FAM.find(f=>Math.abs(x-f.x)<8*f.e&&y>f.y-28*f.e&&y<f.y+3);
  if(fm&&ferramenta==='amor'){P.tx=fm.x+(fm.x>P.x?-14:14);P.ty=fm.y+1;fm.dir=P.x>fm.x?1:-1;mimo(fm.x,fm.y-30*fm.e);bip(660,.1,'triangle',880);
    dizer(fm.x,fm.y-30*fm.e-4,fm.id==='ele'?'Oi, meu amor!':'Mamãe!');if(ajuda<=0)aviso('Sirva uma refeição feita no fogão (Mochila) e a família ajuda na fazenda por um dia.');return;}
  const av=arvores.find(a=>Math.abs(x-a.x)<(a.hp>0?13:6)&&y>a.y-(a.hp>0?46:8)&&y<a.y+3);
  if(av){if(ferramenta==='machado'){P.tx=av.x+(P.x<av.x?-9:9);P.ty=av.y+2;cortar(av);}else if(ferramenta==='amor')aviso(av.hp>0?'Use o Machado para cortar a árvore e ganhar madeira.':'Esta árvore volta a crescer em '+tempo(av.t)+'.');else{P.tx=gx;P.ty=gy;}return;}
  const c=noCanteiro(x,y);
  if(c&&ferramenta!=='comida'){pintados.add(c);P.tx=c.x;P.ty=c.y+13;acaoCanteiro(c);return;}
  P.tx=gx;P.ty=gy;P.meta=null;
  if(ferramenta==='comida'){if(!tem('racao')){aviso('Acabou a ração. Compre na loja ou plante trigo.');return;}soma('racao',-1);if(potes.length>=8)potes.shift();potes.push({k:'comida',x:gx,y:gy,n:1});bip(520,.05);}
  else if(ferramenta==='agua'&&!naHorta(gx,gy)){if(potes.length>=8)potes.shift();potes.push({k:'agua',x:gx,y:gy,n:3});bip(520,.05);}
}
function movelEm(x,y){let m=null;casa.moveis.forEach(o=>{const d=MOVEIS[o.k],c=d.parede||d.chao;if(Math.abs(x-o.x)<d.w/2&&(c?Math.abs(y-o.y)<d.h/2:y>o.y-d.h&&y<o.y+2)&&(!m||!d.chao))m=o;});return m;}
function toqueCasa(x,y){
  if(decor==='tirar'){const m=movelEm(x,y);if(m){casa.moveis.splice(casa.moveis.indexOf(m),1);soma('m_'+m.k,1);bip(400,.06);}else{decor=null;aviso('Móveis guardados na mochila.');}return;}
  if(decor){const d=MOVEIS[decor];
    if(x<4||x>RW-4||y>RH-2||(d.parede?(y<9||y>WALLH-10):y<WALLH+1)){aviso(d.parede?'Este vai na parede.':'Este vai no chão.');return;}
    casa.moveis.push({k:decor,x:Math.round(x),y:Math.round(y)});soma('m_'+decor,-1);bip(520,.06);if(!tem('m_'+decor))decor=null;return;}
  if(x>18&&x<46&&y<WALLH+9){P.tx=32;P.ty=WALLH+6;P.meta='sair';return;}
  const m=movelEm(x,y);
  if(m&&m.k==='fogao'){P.tx=clamp(m.x,8,RW-8);P.ty=clamp(m.y+6,WALLH+5,RH-4);cozinha();return;}
  alvoAndar(x,y);
}
function entrar(){cena='casa';P.x=P.tx=32;P.y=P.ty=WALLH+10;sel=null;cinto();bip(500,.1,'triangle',700);if(!casa.moveis.length)aviso('Bem-vinda a casa! Compre móveis na Loja (aba Casa) e use Decorar para arrumar.');}
function sair(){cena='fazenda';decor=null;P.x=P.tx=400;P.y=P.ty=TOP+10;cam.x=clamp(P.x-W/2,0,WW-W);cam.y=0;cinto();bip(700,.1,'triangle',500);}
function dormir(){dormindo=true;bola=null;sel=null;animais.forEach(a=>a.st='sleep');$('sono').hidden=false;gravar();bip(500,.4,'sine',250);}
function despertar(){dormindo=false;animais.forEach(a=>{a.st='idle';a.wait=1;a.acordado=8;});$('sono').hidden=true;gravar();bip(400,.3,'sine',800);aviso('Bom dia, '+jogadora+'!');}

/* ---------- entrada ---------- */
const mundo=(sx,sy)=>{const r=cv.getBoundingClientRect();return[(sx-r.left)/r.width*W+cam.x,(sy-r.top)/r.height*H+cam.y];};
cv.addEventListener('pointerdown',e=>{baixo=true;segue=false;pintados.clear();pt={x:e.clientX,y:e.clientY,sx:e.clientX,sy:e.clientY,t:T};try{cv.setPointerCapture(e.pointerId);}catch(_){}
  const[x,y]=mundo(e.clientX,e.clientY);toque(x,y);e.preventDefault();});
cv.addEventListener('pointermove',e=>{if(!baixo)return;pt.x=e.clientX;pt.y=e.clientY;if(Math.hypot(pt.x-pt.sx,pt.y-pt.sy)>8)segue=true;});
for(const n of['pointerup','pointercancel'])cv.addEventListener(n,()=>{baixo=false;});

/* ---------- desenho ---------- */
const sombra=(x,y,w,k)=>el(cx,x,y,w*.46*(k||1),w*.13*(k||1),'rgba(20,50,20,.26)',0,0);
function escrever(s,x,y,cor,tam){cx.font='600 '+(tam||6.5)+'px Fredoka,"Trebuchet MS",sans-serif';cx.textAlign='center';cx.lineWidth=1.7;cx.strokeStyle=LN;
  const w=cx.measureText(s).width/2+3;x=clamp(x,cam.x+w,cam.x+W-w);y=Math.max(y,cam.y+8);cx.strokeText(s,x,y);cx.fillStyle=cor||'#fff';cx.fillText(s,x,y);pronto(cx);}
function estado(a){const f=feliz(a);return{t:T+a.seed,sw:a.mov?Math.sin(a.ph*1.3)*.55:0,dorme:a.st==='sleep',come:a.st==='eat',contente:a.hop>0||a.cd>0,
  pisca:(T+a.seed*3)%3.7<.13,f,triste:Math.min(a.comida,a.agua,a.amor)<30,hop:a.hop>0,resp:Math.sin((T+a.seed)*2.2)*.18};}
function objeto(k,x,y,e){cx.save();cx.translate(x,y);cx.scale(e||1,e||1);ICO[k](cx);cx.restore();}
function barra(x,y,v,cor){cx.fillStyle='rgba(40,25,25,.8)';cx.beginPath();cx.roundRect(x-11,y,22,2.4,1.2);cx.fill();cx.fillStyle=cor;cx.beginPath();cx.roundRect(x-10.6,y+.4,21.2*clamp(v,.04,1),1.6,.8);cx.fill();}
const EU=()=>({saia:1,avental:1,cor:'#e0475a',cab:'#6b3a1f',tranca:1,chapeu:1,fita:'#e0475a',contente:sorriso>0});
function gente(p,e,o){sombra(p.x,p.y,11*e);cx.save();cx.translate(p.x,p.y);cx.scale(e,e);pessoa(cx,p,T,o);cx.restore();}
function desFazenda(){
  cx.drawImage(G,0,0,WW,WH);const b=TOP-3;
  for(let i=0;i<3;i++){const k=(T*.5+i)%3/3;el(cx,422+Math.sin(T+i)*2+k*8,b-68-k*22,2+k*3.4,1.8+k*3,'rgba(255,255,255,'+(.5-k*.5)+')',0,0);}
  if(escV<1)for(let i=0;i<4;i++){const x=(T*3.5+i*190)%(WW+160)-80;el(cx,x,TOP+30+i*70,58,20,'rgba(20,60,40,'+.07*(1-escV)+')',0,0);}
  canteiros.forEach(c=>canteiro(cx,c));
  const L=[];
  canteiros.forEach(c=>{if(c.k)L.push([c.y+7,()=>{const f=c.g/PLANTAS[c.k].t,n=c.k==='abobora'?[[0,1.5]]:c.k==='tomate'?[[-6,1.25],[6,1.25]]:[[-8,1.15],[0,1.15],[8,1.15]];
    n.forEach(([dx,e],i)=>{cx.save();cx.translate(c.x+dx,c.y+5+(i%2));cx.scale(e,e);planta(cx,c.k,f,c.morta,T+i+c.x);cx.restore();});}]);});
  L.push([262,()=>poco(cx,204,262)]);
  arvores.forEach(a=>L.push([a.y,()=>arvoreCorte(cx,a,T)]));
  potes.forEach(p=>L.push([p.y-1,()=>{sombra(p.x,p.y+3,11);objeto(p.k,p.x,p.y,1.15);}]));
  itens.forEach(i=>L.push([i.y,()=>{sombra(i.x,i.y,7);objeto(i.k,i.x,i.y-4.5-Math.sin(i.t*4)*1.2);
    cx.fillStyle='rgba(255,255,255,'+Math.abs(Math.sin(i.t*3))+')';cx.beginPath();cx.moveTo(i.x+4,i.y-11);cx.lineTo(i.x+4.6,i.y-9.6);cx.lineTo(i.x+6,i.y-9);cx.lineTo(i.x+4.6,i.y-8.4);cx.lineTo(i.x+4,i.y-7);cx.lineTo(i.x+3.4,i.y-8.4);cx.lineTo(i.x+2,i.y-9);cx.lineTo(i.x+3.4,i.y-9.6);cx.fill();}]));
  animais.forEach(a=>L.push([a.y,()=>{const sp=SP[a.t],pulo=a.hop>0?Math.sin(Math.PI*(1-a.hop/.3))*6:0;
    if(a===sel){cx.save();cx.setLineDash([2.4,1.8]);cx.lineDashOffset=-T*5;cx.strokeStyle='#f6c945';cx.lineWidth=1;el(cx,a.x,a.y,sp.w*.6,sp.w*.2,'rgba(255,240,150,.22)');cx.restore();pronto(cx);}
    sombra(a.x,a.y,sp.w,1-pulo*.04);cx.save();cx.translate(a.x,a.y-pulo);cx.scale(a.dir*ESC,ESC);sp.draw(cx,a,estado(a));cx.restore();}]));
  if(!dormindo){FAM.forEach(f=>L.push([f.y,()=>gente(f,f.e,f.o)]));if(cena==='fazenda')L.push([P.y,()=>gente(P,1.2,EU())]);}
  if(bola&&!bola.leva)L.push([bola.y,()=>{sombra(bola.x,bola.y,6);objeto('bola',bola.x,bola.y-2.5-bola.z);}]);
  L.sort((a,b)=>a[0]-b[0]).forEach(l=>l[1]());
  if(bola&&bola.leva){const a=bola.leva,sp=SP[a.t];objeto('bola',a.x+a.dir*(sp.w/2+2.5),a.y-sp.h*.5);}
  if(escV<.5)for(let i=0;i<5;i++){const x=WW*(.12+i*.19)+Math.sin(T*.5+i*2)*34,y=TOP+50+(i*67%230)+Math.cos(T*.7+i*3)*20,f=Math.abs(Math.sin(T*13+i)),c=['#f08ca0','#8fd0ff','#ffd166'][i%3];
    cx.globalAlpha=1-escV*2;el(cx,x-f*1.5,y,1.6*f+.2,1.9,c,-.3);el(cx,x+f*1.5,y,1.6*f+.2,1.9,c,.3);el(cx,x,y,.35,1.4,LN,0,0);cx.globalAlpha=1;}
  if(escV>0){const k=escV*(1-escV)*4;cx.fillStyle='rgba(255,130,60,'+k*.14+')';cx.fillRect(cam.x,cam.y,W,H);cx.fillStyle='rgba(14,20,62,'+escV*.52+')';cx.fillRect(cam.x,cam.y,W,H);
    for(const[gx,gy]of[[35,b-40],[378,b-17],[422,b-17]]){const q=cx.createRadialGradient(gx,gy,0,gx,gy,24);q.addColorStop(0,'rgba(255,214,110,'+escV*.5+')');q.addColorStop(1,'rgba(255,214,110,0)');cx.fillStyle=q;cx.fillRect(gx-24,gy-24,48,48);}
    cx.fillStyle='rgba(255,224,130,'+escV*.9+')';cx.beginPath();cx.roundRect(31,b-44.6,8,9.1,[4,4,0,0]);cx.rect(371,b-24,14,13);cx.rect(415,b-24,14,13);cx.fill();
    for(let i=0;i<22;i++){const x=(i*83+Math.sin(T*.4+i)*18+WW)%WW,y=TOP+14+(i*47+Math.cos(T*.3+i*2)*12)%(WH-TOP-24),v=Math.max(0,Math.sin(T*2+i*1.7))*escV;
      const f=cx.createRadialGradient(x,y,0,x,y,4);f.addColorStop(0,'rgba(255,245,150,'+v+')');f.addColorStop(.25,'rgba(255,240,120,'+v*.5+')');f.addColorStop(1,'rgba(255,240,120,0)');cx.fillStyle=f;cx.fillRect(x-4,y-4,8,8);}}
  canteiros.forEach(c=>{if(!c.k||c.morta)return;const p=PLANTAS[c.k];
    if(c.g<p.t){barra(c.x,c.y+11.4,c.g/p.t,'#58b368');
      if(c.agua>0)barra(c.x,c.y+14.2,c.agua/REGA,'#5aa9e6');
      else{barra(c.x,c.y+14.2,1-c.seco/SECA,'#e0475a');const by=c.y-20+Math.sin(T*5+c.x)*1.2;cx.beginPath();cx.roundRect(c.x-6,by-6,12,11.5,4);cx.fillStyle='#fff';cx.lineWidth=1.2;cx.stroke();cx.fill();pronto(cx);objeto('gota',c.x,by-.2,.8);}}
    else{const r=1-c.pronto/p.janela;barra(c.x,c.y+11.4,r,r<.3?'#e0475a':'#f6c945');objeto(c.k,c.x,c.y-21-Math.abs(Math.sin(T*4+c.x))*3,.9);}});
  animais.forEach(a=>{const sp=SP[a.t],topo=a.y-sp.h-3;
    if(a.st==='sleep'){const k=(T+a.seed)%2/2;cx.globalAlpha=1-k;escrever('z',a.x+a.dir*sp.w*.4+k*4,topo+8-k*9,'#dfe6ff',4+k*4);cx.globalAlpha=1;return;}
    const m=Math.min(a.comida,a.agua,a.amor);
    if(m<30){const k=a.comida===m?'cenoura':a.agua===m?'gota':'amor',bx=a.x+a.dir*sp.w*.42,by=topo-8+Math.sin(T*4+a.seed);
      cx.beginPath();cx.roundRect(bx-7,by-7,14,13,4.5);cx.moveTo(bx-2,by+5.6);cx.lineTo(bx-a.dir*2,by+9.5);cx.lineTo(bx+2,by+5.6);cx.fillStyle='#fff';cx.lineWidth=1.3;cx.stroke();cx.fill();pronto(cx);objeto(k,bx,by-.4,.95);}
    else if(a.st==='come')escrever('!',a.x,topo-1,'#f6c945',9);
  });
}
function desCasa(){
  sala(cx,RW,RH,WALLH,casa.parede,escV);
  const L=[],des=m=>{cx.save();cx.translate(m.x,m.y);MV[m.k](cx,m,T);cx.restore();pronto(cx);};
  casa.moveis.forEach(m=>{if(MOVEIS[m.k].chao)des(m);});casa.moveis.forEach(m=>{if(MOVEIS[m.k].parede)des(m);});
  casa.moveis.forEach(m=>{const d=MOVEIS[m.k];if(!d.chao&&!d.parede)L.push([m.y,()=>{el(cx,m.x,m.y,d.w*.5,3,'rgba(60,30,10,.2)',0,0);des(m);}]);});
  L.push([P.y,()=>{el(cx,P.x,P.y,6,1.8,'rgba(60,30,10,.25)',0,0);cx.save();cx.translate(P.x,P.y);cx.scale(1.2,1.2);pessoa(cx,P,T,EU());cx.restore();}]);
  L.sort((a,b)=>a[0]-b[0]).forEach(l=>l[1]());
  if(escV>0){cx.fillStyle='rgba(14,20,62,'+escV*.3+')';cx.fillRect(0,0,RW,RH);}
  if(decor&&decor!=='tirar')escrever('Toque onde quer colocar: '+MOVEIS[decor].nome,RW/2,RH-6,'#f6c945',6);
  if(decor==='tirar')escrever('Toque num móvel para guardar',RW/2,RH-6,'#f6c945',6);
}
function desenhar(){
  cx.setTransform(1,0,0,1,0,0);cx.fillStyle='#2a1f24';cx.fillRect(0,0,cv.width,cv.height);
  cx.setTransform(S,0,0,S,-Math.round(cam.x*S),-Math.round(cam.y*S));pronto(cx);
  cena==='casa'?desCasa():desFazenda();
  coracoes.forEach(c=>{if(c.t>0){cx.globalAlpha=1-c.t*c.t;objeto('amor',c.x+Math.sin(c.t*6)*1.5,c.y-c.t*18,.5+Math.min(1,c.t*5)*.4);cx.globalAlpha=1;}});
  textos.forEach(t=>{cx.globalAlpha=Math.min(1,(1.5-t.t)*3);escrever(t.s,t.x,t.y-t.t*10);cx.globalAlpha=1;});
  if(sel){$('fNome').textContent=sel.n;$('fTipo').textContent=SP[sel.t].nome;$('bChamar').textContent='Chamar '+sel.n;
    [['bComida','comida'],['bAgua','agua'],['bAmor','amor']].forEach(([id,k])=>{const e=$(id);e.style.width=sel[k]+'%';e.className=sel[k]<30?'baixo':'';});}
  $('ficha').hidden=!sel||cena!=='fazenda';
  const h=(noite?'Noite':'Dia')+(ajuda>0?' · família ajuda '+tempo(ajuda):'')+(fogo>0&&cena==='casa'?' · fogo '+tempo(fogo):'');if($('hora').textContent!==h)$('hora').textContent=h;
}

/* ---------- interface ---------- */
const BARRA={
 fazenda:[['amor','Mão','mao'],['enxada','Enxada','enxada'],['semente','Semente','saquinho'],['agua','Regador','regador'],['machado','Machado','machado'],['comida','Ração','racao'],['bola','Bola','bola'],['mochila','Mochila','mochila'],['dormir','Dormir','lua']],
 casa:[['sair','Sair','porta'],['decorar','Decorar','m_sofa'],['mochila','Mochila','mochila'],['dormir','Dormir','lua']]
};
const FERR=['amor','enxada','semente','agua','machado','comida','bola'];
function cinto(){
  const n=$('cinto');n.innerHTML='';
  BARRA[cena].forEach(([k,rot,ico])=>{const b=document.createElement('button');b.type='button';b.id='f-'+k;b.innerHTML='<img alt="" src="'+img(ico)+'"><span>'+rot+'</span>';
    b.onclick=()=>{bip(600,.04);
      if(k==='mochila')return mochila('coisas');if(k==='dormir')return dormir();if(k==='sair'){P.tx=32;P.ty=WALLH+6;P.meta='sair';return;}if(k==='decorar')return decorar();
      if(k==='semente'&&ferramenta==='semente')proximaSemente();
      if(k==='semente'&&!tem('s_'+semente)){proximaSemente();if(!tem('s_'+semente))aviso('Sem sementes. Compre na Loja, aba Horta.');}
      ferramenta=k;rotulos();
      if(k==='semente'&&tem('s_'+semente))aviso('Plantando '+PLANTAS[semente].nome.toLowerCase()+'. Toque em Semente de novo para trocar.');};
    n.appendChild(b);});
  rotulos();
}
function rotulos(){
  FERR.forEach(k=>{const b=$('f-'+k);if(b)b.setAttribute('aria-pressed',k===ferramenta);});
  const s=$('f-semente'),r=$('f-comida');
  if(s)s.lastChild.textContent=PLANTAS[semente].nome+' ×'+tem('s_'+semente);
  if(r)r.lastChild.textContent='Ração ×'+tem('racao');
}
function mudou(){$('moedas').textContent=moedas;rotulos();gravar();}
function abrir(html){$('caixa').innerHTML=html;$('fundo').hidden=false;}
const fechar=()=>{$('fundo').hidden=true;};
const abas=(l,at)=>'<div class="abas">'+l.map(([k,n])=>'<button type="button" data-aba="'+k+'" aria-pressed="'+(k===at)+'">'+n+'</button>').join('')+'</div>';
const linha=(k,nome,desc,bot)=>'<li><img alt="" src="'+img(k)+'"><span><b>'+nome+'</b>'+(desc?'<small>'+desc+'</small>':'')+'</span><span class="bots">'+bot+'</span></li>';
function ligar(f){$('caixa').querySelectorAll('[data-aba]').forEach(b=>b.onclick=()=>f(b.dataset.aba));const s=$('sairM');if(s)s.onclick=fechar;}
const em=(sel,f)=>$('caixa').querySelectorAll(sel).forEach(b=>b.onclick=()=>f(b.dataset));
let abaLoja='bichos',abaMochila='coisas';
function loja(aba){
  abaLoja=aba||abaLoja;let h='<h2>Loja</h2><p>Moedas: <b>'+moedas+'</b> · Madeira: <b>'+tem('madeira')+'</b></p>'+abas([['bichos','Bichos'],['horta','Horta'],['casa','Casa']],abaLoja)+'<ul>';
  if(abaLoja==='bichos'){h='<h2>Loja</h2><p>Moedas: <b>'+moedas+'</b></p>'+abas([['bichos','Bichos'],['horta','Horta'],['casa','Casa']],abaLoja)+'<label for="nomeBicho">Nome do novo bicho</label><input id="nomeBicho" maxlength="12" autocomplete="off"><ul>';
    for(const t in SP){const s=SP[t];h+=linha(t,s.nome,'Dá '+NOME[s.prod].toLowerCase(),'<button type="button" data-bicho="'+t+'"'+(moedas<s.preco||animais.length>=16?' disabled':'')+'>'+s.preco+' moedas</button>');}}
  else if(abaLoja==='horta'){h+=linha('racao','Ração','Uma por bicho por dia. Tem: '+tem('racao'),'<button type="button" data-item="racao" data-p="4"'+(moedas<4?' disabled':'')+'>4 moedas</button>');
    for(const k in PLANTAS){const p=PLANTAS[k];h+=linha(k,'Semente de '+p.nome.toLowerCase(),'Cresce em '+tempo(p.t)+'. '+(p.racao?'Rende '+p.racao+' rações.':'Vende por '+VENDA[k]+'.')+' Tem: '+tem('s_'+k),
      '<button type="button" data-item="s_'+k+'" data-p="'+p.sem+'"'+(moedas<p.sem?' disabled':'')+'>'+p.sem+' moedas</button>');}}
  else for(const k in MOVEIS){const d=MOVEIS[k];h+=linha('m_'+k,d.nome,'Na mochila: '+tem('m_'+k),'<button type="button" data-item="m_'+k+'" data-p="'+d.preco+'"'+(moedas<d.preco?' disabled':'')+'>'+d.preco+' moedas</button>'+
      (d.mad?'<button type="button" data-fazer="'+k+'"'+(tem('madeira')<d.mad?' disabled':'')+'>Fazer: '+d.mad+' madeira</button>':''));}
  abrir(h+'</ul><button type="button" id="sairM">Fechar</button>');ligar(loja);
  if($('nomeBicho'))$('nomeBicho').value=nomeLivre();
  em('[data-bicho]',d=>{const t=d.bicho,n=$('nomeBicho').value.trim()||nomeLivre();moedas-=SP[t].preco;const a=novo(t,n,R()*9|0,40,TOP+14);animais.push(a);voz(a);mudou();fechar();aviso(n+' chegou à fazenda!');});
  em('[data-item]',d=>{moedas-=+d.p;soma(d.item,1);bip(880,.06,'triangle');loja();});
  em('[data-fazer]',d=>{soma('madeira',-MOVEIS[d.fazer].mad);soma('m_'+d.fazer,1);bip(300,.1,'square',500);loja();});
}
function vender(k,n){moedas+=VENDA[k]*n;soma(k,-n);bip(990,.1,'triangle',1480);}
function servir(k){soma(k,-1);ajuda=Math.min(ajuda+DIA,DIA*2);bip(660,.2,'triangle',990);fechar();aviso('Que delícia! '+familia.ele+' vai regar a horta e '+familia.filha+' vai recolher os produtos durante '+tempo(ajuda)+'.');gravar();}
function mochila(aba){
  abaMochila=aba||abaMochila;let h='<h2>Mochila</h2>'+abas([['coisas','Coisas'],['bichos','Bichos'],['ajuda','Como jogar']],abaMochila);
  if(abaMochila==='coisas'){const ks=Object.keys(inv),tot=ks.reduce((s,k)=>s+(VENDA[k]&&k!=='madeira'?VENDA[k]*inv[k]:0),0);
    h+='<p>Moedas: <b>'+moedas+'</b></p>'+(tot?'<button type="button" id="tudo">Vender colheitas, produtos e pratos: +'+tot+' moedas</button>':'')+'<ul>';
    if(!ks.length)h+='<li class="vazio">A mochila está vazia.</li>';
    ks.forEach(k=>{h+=linha(k,nomeItem(k)+' ×'+inv[k],VENDA[k]?'Vale '+VENDA[k]+' cada':'',(RECEITAS[k]?'<button type="button" data-servir="'+k+'">Servir à família</button>':'')+(VENDA[k]?'<button type="button" data-vender="'+k+'">Vender 1</button>':''));});
    h+='</ul>';}
  else if(abaMochila==='bichos'){h+='<button type="button" id="todos">Chamar todos</button><ul>';
    animais.forEach((a,i)=>{h+='<li><img alt="" src="'+img(a.t)+'"><span><b>'+esc(a.n)+'</b><small>'+STATS.map(k=>'<i class="mini'+(a[k]<30?' baixo':'')+'" title="'+k+'"><i style="width:'+a[k]+'%"></i></i>').join('')+'</small></span><span class="bots"><button type="button" data-chamar="'+i+'">Chamar</button></span></li>';});
    h+='</ul><label for="nEle">Nome do esposo</label><input id="nEle" maxlength="12" autocomplete="off"><label for="nFilha">Nome da filha</label><input id="nFilha" maxlength="12" autocomplete="off">';}
  else h+='<ul class="ajuda"><li><b>Andar:</b> toque ou arraste o dedo (ou o mouse) e ela segue por toda a fazenda.</li><li><b>Horta:</b> Enxada prepara a terra, Semente planta, Regador rega. Sem água a planta para de crescer e murcha. Depois de madura, colha com a Mão antes de a barra acabar.</li>'+
    '<li><b>Bichos:</b> uma ração e água por dia chegam. Trigo vira ração. Bichos felizes deixam ovos, leite e lã.</li><li><b>Machado:</b> corte árvores para ter madeira. Elas voltam a crescer.</li>'+
    '<li><b>Casa:</b> entre pela porta. Compre ou faça móveis na Loja e use Decorar.</li><li><b>Fogão a lenha:</b> toque nele dentro de casa, acenda com madeira e cozinhe. Pratos valem mais, e servir um à família faz o esposo regar e a filha recolher produtos por um dia.</li>'+
    '<li><b>Dormir:</b> pausa tudo. Use antes de sair do jogo. Se sair sem dormir, o tempo continua e a horta pode murchar.</li></ul>';
  abrir(h+'<button type="button" id="sairM">Fechar</button>');ligar(mochila);
  if($('tudo'))$('tudo').onclick=()=>{Object.keys(inv).forEach(k=>{if(VENDA[k]&&k!=='madeira')vender(k,inv[k]);});mochila();};
  if($('todos'))$('todos').onclick=()=>{fechar();if(cena!=='fazenda')return aviso('Saia de casa para chamar os bichos.');chamar=5;animais.forEach(a=>{acordar(a);a.th=0;});bip(900,.25,'sine',1500);};
  em('[data-vender]',d=>{vender(d.vender,1);mochila();});em('[data-servir]',d=>servir(d.servir));em('[data-chamar]',d=>{fechar();chamarBicho(animais[+d.chamar]);});
  for(const[id,k]of[['nEle','ele'],['nFilha','filha']])if($(id)){$(id).value=familia[k];$(id).onchange=()=>{familia[k]=$(id).value.trim()||familia[k];gravar();};}
}
function decorar(){
  const ks=Object.keys(inv).filter(k=>k[0]==='m'&&k[1]==='_');let h='<h2>Decorar a casa</h2><ul>';
  if(!ks.length)h+='<li class="vazio">Sem móveis na mochila. Compre ou faça na Loja, aba Casa.</li>';
  ks.forEach(k=>{h+=linha(k,nomeItem(k)+' ×'+inv[k],MOVEIS[k.slice(2)].parede?'Vai na parede':'Vai no chão','<button type="button" data-por="'+k.slice(2)+'">Colocar</button>');});
  abrir(h+'</ul><button type="button" id="tirar"'+(casa.moveis.length?'':' disabled')+'>Guardar móveis da sala</button><button type="button" id="pintar"'+(moedas<15?' disabled':'')+'>Pintar a parede: 15 moedas</button><button type="button" id="sairM">Fechar</button>');ligar(decorar);
  em('[data-por]',d=>{decor=d.por;fechar();});$('tirar').onclick=()=>{decor='tirar';fechar();};$('pintar').onclick=()=>{moedas-=15;casa.parede=(casa.parede+1)%PAREDES.length;mudou();decorar();};
}
function cozinha(){
  let h='<h2>Fogão a lenha</h2><p>'+(fogo>0?'Fogo aceso por mais <b>'+tempo(fogo)+'</b>.':'O fogo está apagado.')+' Madeira: <b>'+tem('madeira')+'</b></p><button type="button" id="acender"'+(tem('madeira')?'':' disabled')+'>'+(fogo>0?'Pôr mais lenha':'Acender')+': 1 madeira</button><ul>';
  for(const k in RECEITAS){const r=RECEITAS[k],ok=fogo>0&&Object.keys(r.ing).every(i=>tem(i)>=r.ing[i]);
    h+=linha(k,r.nome,Object.keys(r.ing).map(i=>r.ing[i]+' '+NOME[i].toLowerCase()+' ('+tem(i)+')').join(', ')+'. Vale '+VENDA[k]+'.','<button type="button" data-coz="'+k+'"'+(ok?'':' disabled')+'>Cozinhar</button>');}
  abrir(h+'</ul><button type="button" id="sairM">Fechar</button>');ligar(cozinha);
  $('acender').onclick=()=>{soma('madeira',-1);fogo=Math.min(fogo+300,900);bip(200,.3,'sawtooth',400);cozinha();};
  em('[data-coz]',d=>{const r=RECEITAS[d.coz];for(const i in r.ing)soma(i,-r.ing[i]);soma(d.coz,1);bip(700,.15,'triangle',1000);cozinha();});
}
function boasVindas(){
  abrir('<h2>Fazendinha dos Bichos</h2><p>Os bichos estão à espera de alguém que cuide deles.</p><label for="nomeDela">Qual é o seu nome?</label>'+
    '<input id="nomeDela" maxlength="14" autocomplete="off"><button type="button" id="ir">Começar</button>');
  $('ir').onclick=()=>{jogadora=$('nomeDela').value.trim()||'amiga';
    animais=[novo('cao','Thor',0),novo('cao','Mel',1),novo('galinha','Pipoca',0),novo('vaca','Mimosa',0)];chamar=4;fechar();gravar();bip(660,.15,'triangle',990);mochila('ajuda');};
}
$('loja').onclick=()=>loja();
$('som').onclick=()=>{som=!som;$('som').textContent='Som: '+(som?'sim':'não');gravar();};
$('acordar').onclick=despertar;
$('bChamar').onclick=()=>{if(sel)chamarBicho(sel);};
$('bFalar').onclick=()=>{if(sel)conversar(sel);};
addEventListener('resize',ajustar);
document.addEventListener('visibilitychange',()=>{if(document.hidden)gravar();});
setInterval(gravar,10000);

/* ---------- arranque ---------- */
let antes=0;
function quadro(ts){const dt=Math.min(.05,(ts-antes)/1000||0);antes=ts;passo(dt);desenhar();requestAnimationFrame(quadro);}
(function(){
  cinto();ajustar();
  const s=ler();
  if(s&&s.jogadora&&Array.isArray(s.a)&&s.a.length){
    jogadora=s.jogadora;moedas=s.moedas|0;som=s.som!==false;$('som').textContent='Som: '+(som?'sim':'não');
    s.a.forEach(o=>{if(!SP[o.t])return;const a=novo(o.t,String(o.n).slice(0,14),o.c|0);STATS.forEach(k=>a[k]=clamp(+o[k]||50,s.v?0:60,100));animais.push(a);});
    if(s.v>=2){
      relogio=+s.relogio||0;dormindo=!!s.dormindo;fogo=+s.fogo||0;ajuda=+s.ajuda||0;
      if(s.inv)inv=Object.fromEntries(Object.entries(s.inv).filter(([k,v])=>v>0&&(NOME[k]||(k[0]==='s'&&PLANTAS[k.slice(2)])||(k[0]==='m'&&MOVEIS[k.slice(2)]))));
      if(PLANTAS[s.semente])semente=s.semente;if(s.familia)familia=Object.assign(familia,s.familia);
      if(s.casa&&Array.isArray(s.casa.moveis))casa={parede:s.casa.parede|0,moveis:s.casa.moveis.filter(m=>MOVEIS[m.k])};
      (s.h||[]).forEach((o,i)=>{if(canteiros[i]&&(!o.k||PLANTAS[o.k]))Object.assign(canteiros[i],o);});
      (s.arv||[]).forEach((o,i)=>{if(arvores[i]){arvores[i].hp=o[0];arvores[i].t=o[1];}});
      if(dormindo){animais.forEach(a=>a.st='sleep');$('sono').hidden=false;}
      else{const fora=clamp((Date.now()-s.t)/1000,0,DIA*4);let m=0;for(let x=0;x<fora;x+=5)m+=crescer(5);relogio+=fora;
        animais.forEach(a=>{a.comida=Math.max(15,a.comida-fora*70/900);a.agua=Math.max(15,a.agua-fora*70/800);a.amor=Math.max(15,a.amor-fora*70/600);});
        chamar=4;aviso(fora>600?'Bem-vinda de volta, '+jogadora+'! O tempo passou enquanto esteve fora'+(m?' e '+m+' plantas murcharam. Da próxima vez, toque em Dormir antes de sair.':'.'):'Olá de novo, '+jogadora+'!');}
    }else{chamar=4;mochila('ajuda');}
  }else boasVindas();
  P.x=P.tx=240;P.y=P.ty=170;cam.x=clamp(P.x-W/2,0,WW-W);cam.y=clamp(P.y-H*.58,0,WH-H);
  mudou();
  if(document.fonts&&document.fonts.load)document.fonts.load('600 8px Fredoka').catch(()=>{});
  requestAnimationFrame(quadro);
})();
