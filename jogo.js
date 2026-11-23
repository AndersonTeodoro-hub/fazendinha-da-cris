const cv=$('c'),cx=cv.getContext('2d');
const WW=760,WH=560,TOP=64,DIA=720,ESC=1.25,REGA=110,SECA=260,REBROTA=900;
const PORTA={x:400,y:TOP+9,dir:1};
let W=340,H=200,S=3,G=null,GS=0;const cam={x:0,y:0};
for(const t in SP){SP[t].w*=ESC;SP[t].h*=ESC;}SP.ovelha.som='Bééé!';
Object.entries({cao:'latido',gato:'miau',galinha:'cacarejo',ovelha:'bale',porco:'oinc',vaca:'mugido'}).forEach(([t,s])=>SP[t].sfx=s);

/* ---------- dados ---------- */
const PLANTAS={
 capim:{nome:'Capim',sem:2,t:60,janela:400,racao:3},
 trigo:{nome:'Trigo',sem:3,t:120,janela:360,racao:2},
 salsa:{nome:'Salsa',sem:3,t:70,janela:300,v:7},
 cenoura:{nome:'Cenoura',sem:4,t:90,janela:300,v:9},
 couve:{nome:'Couve',sem:5,t:120,janela:300,v:13,n:2},
 feijao:{nome:'Feijão',sem:6,t:150,janela:330,v:16,n:2},
 arroz:{nome:'Arroz',sem:6,t:180,janela:330,v:18},
 quiabo:{nome:'Quiabo',sem:7,t:190,janela:300,v:19,n:2},
 tomate:{nome:'Tomate',sem:8,t:210,janela:300,v:21,n:2},
 berinjela:{nome:'Berinjela',sem:10,t:260,janela:300,v:28,n:2},
 morango:{nome:'Morango',sem:12,t:300,janela:270,v:34},
 abobora:{nome:'Abóbora',sem:20,t:480,janela:420,v:62,n:1},
 laranja:{nome:'Laranja',sem:25,t:540,janela:480,v:75,n:1},
 abacate:{nome:'Abacate',sem:30,t:600,janela:480,v:90,n:1}
};
const RECEITAS={
 sopa:{nome:'Sopa de cenoura',ing:{cenoura:2},v:26},
 arrozq:{nome:'Arroz com quiabo',ing:{arroz:1,quiabo:1},v:55},
 omelete:{nome:'Omelete',ing:{ovo:2,tomate:1},v:48},
 tropeiro:{nome:'Feijão tropeiro',ing:{feijao:2,couve:1,ovo:1},v:75},
 bolo:{nome:'Bolo de morango',ing:{morango:1,ovo:1,leite:1},v:80},
 torta:{nome:'Torta de abóbora',ing:{abobora:1,leite:1,ovo:1},v:120}
};
const NOME={racao:'Ração',madeira:'Madeira',ovo:'Ovo',leite:'Leite',la:'Lã',trufa:'Trufa',presente:'Presente'};
const VENDA={ovo:6,leite:14,la:11,trufa:17,presente:9,madeira:2};
for(const k in PLANTAS)if(PLANTAS[k].v){NOME[k]=PLANTAS[k].nome;VENDA[k]=PLANTAS[k].v;}
for(const k in RECEITAS){NOME[k]=RECEITAS[k].nome;VENDA[k]=RECEITAS[k].v;}
const DESPENSA=['ovo','leite'].concat(Object.keys(PLANTAS).filter(k=>PLANTAS[k].v)).sort((a,b)=>VENDA[a]-VENDA[b]);
const MOVEIS={
 cama:{nome:'Cama',preco:80,mad:10,w:36,h:31},sofa:{nome:'Sofá',preco:60,mad:8,w:40,h:21},mesa:{nome:'Mesa',preco:40,mad:6,w:30,h:22},cadeira:{nome:'Cadeira',preco:15,mad:3,w:12,h:19},
 tapete:{nome:'Tapete',preco:25,w:48,h:20,chao:1},planta:{nome:'Planta',preco:12,w:12,h:22},estante:{nome:'Estante',preco:45,mad:8,w:24,h:37},abajur:{nome:'Abajur',preco:20,mad:4,w:13,h:32},
 quadro:{nome:'Quadro',preco:18,mad:3,w:19,h:15,parede:1},geladeira:{nome:'Geladeira',preco:90,w:20,h:38},lareira:{nome:'Lareira',preco:120,mad:12,w:40,h:34}
};
const TAREFAS={'':'Descansar',regar:'Regar a horta',lavrar:'Passar a enxada',colher:'Colher o que está maduro',lenha:'Cortar lenha',recolher:'Recolher ovos e produtos',carinho:'Dar carinho aos bichos',alimentar:'Dar ração e água'};
const nomeItem=k=>k[1]==='_'?(k[0]==='s'?'Semente de '+PLANTAS[k.slice(2)].nome.toLowerCase():MOVEIS[k.slice(2)].nome):NOME[k];
const tempo=s=>{s=Math.max(0,Math.ceil(s));return(s/60|0)+':'+String(s%60).padStart(2,'0');};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const IMG={};
function img(k){
  if(IMG[k])return IMG[k];
  if(k[0]==='m'&&k[1]==='_'){const d=MOVEIS[k.slice(2)],e=Math.min(120/d.w,110/d.h,6);return IMG[k]=retrato(136,136,e,68,d.parede||d.chao?68:68+d.h*e/2,g=>MV[k.slice(2)](g,null,0));}
  if(SP[k])return IMG[k]=retrato(240,176,6,112,160,g=>SP[k].draw(g,{c:0},MODELO));
  if(k[0]==='s'&&k[1]==='_'){const c=k.slice(2);return IMG[k]=retrato(136,136,12,68,70,g=>{ICO.saquinho(g);if(ICO[c]){g.save();g.translate(2.4,2.6);g.scale(.55,.55);ICO[c](g);g.restore();}});}
  return IMG[k]=retrato(136,136,12,68,70,ICO[k]);
}

/* ---------- estado ---------- */
const NOMES=['Mel','Thor','Pipoca','Luna','Bolinha','Nina','Pingo','Estrela','Fofa','Paçoca','Amora','Tobias','Mimosa','Biscoito','Flor','Jujuba'];
const STATS=['comida','agua','amor'];
let animais=[],potes=[],itens=[],coracoes=[],textos=[],bola=null,sel=null,ferramenta='amor';
let moedas=40,jogadora='',som=true,T=0,relogio=DIA*.05,chamar=0,noite=false,escV=0,sorriso=0,dormindo=false,dormNoite=false,cena='fazenda',decor=null,fogo=0,refeicao=null,tvOn=false;
let inv={racao:5,s_cenoura:4,s_capim:2},semente='cenoura',casa={parede:0,moveis:[]},familia={ele:'Esposo',filha:'Filha'};
const MAXC=60,novoCant=i=>({x:i<44?58+i%4*32:186+(i-44)%2*32,y:i<44?(i<12?246:270)+(i/4|0)*26:348+((i-44)/2|0)*26,lavrado:i<12,k:null,g:0,agua:0,seco:0,pronto:0,morta:false});
const canteiros=[];for(let i=0;i<12;i++)canteiros.push(novoCant(i));
const arvores=[[330,214],[376,242],[424,210],[454,266],[330,430],[440,424],[448,350],[505,176],[600,230],[730,200],[560,330],[650,392],[716,300],[486,500],[300,480],[262,452],[716,526]].map(([x,y],i)=>({x,y,i,hp:3,t:0,total:REBROTA,treme:0}));
const pessoaNova=(id,x,y,e,o)=>({id,x,y,tx:x,ty:y,dir:1,ph:0,mov:false,meta:null,rota:[],wait:1,pausa:0,e,o,energia:100,tarefa:'',dentro:false,comeu:false});
const GENTE=[pessoaNova('mae',240,170,1.2,{saia:1,avental:1,cor:'#e0475a',cab:'#6b3a1f',tranca:1,chapeu:1,fita:'#e0475a'}),
  pessoaNova('ele',424,TOP+30,1.3,{cor:'#e9a23a',cab:'#4a2f1a',chapeu:1,fita:'#3f6fb5',barba:1,f:1.7}),
  pessoaNova('filha',378,TOP+34,.85,{saia:1,cor:'#b58cf0',cab:'#6b3a1f',laco:1,f:4.1})];
const FOGAO={x:36,y:62},VOVO={x:64,y:68,e:1.1,dir:-1,ph:0,mov:false,o:{saia:1,avental:1,cor:'#8e6bbf',cab:'#dcdce4',coque:1,oculos:1,f:2.2}};
let P=GENTE[0],Q=P;
const nomeDe=p=>p.id==='mae'?jogadora:familia[p.id];
const tem=k=>inv[k]|0;
function soma(k,n){inv[k]=tem(k)+n;if(inv[k]<=0)delete inv[k];mudou();}
const nomeLivre=()=>{const l=NOMES.filter(n=>!animais.some(a=>a.n===n));return (l.length?l:NOMES)[R()*(l.length||NOMES.length)|0];};
function novo(t,n,c,x,y){return{t,n,c:c%CO[t].length,x:x??120+R()*200,y:y??TOP+30+R()*130,dir:1,ph:0,st:'idle',wait:1,th:R()*.5,seed:R()*10,
  comida:80,agua:80,amor:70,hop:0,cd:0,prod:60+R()*90,r:18+R()*18,acordado:0,vem:0,fala:0,mov:false,tx:0,ty:0,tm:0,tg:null};}
const feliz=a=>(a.comida+a.agua+a.amor)/3;
const fase=()=>{const ph=relogio%DIA/DIA;return ph<.8?0:ph<.84?(ph-.8)/.04:ph<.96?1:(1-ph)/.04;};

/* ---------- som ---------- */
let AC=null,ruido=null;
function audio(){
  if(!som)return null;
  try{AC=AC||new(window.AudioContext||window.webkitAudioContext)();if(AC.state==='suspended')AC.resume();
    if(!ruido){ruido=AC.createBuffer(1,AC.sampleRate,AC.sampleRate);const d=ruido.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;}
    carregaSons();return AC;}catch(e){return null;}
}
/* gravações reais (domínio público); enquanto não carregam, ou se falharem, toca o som sintetizado */
const AMOSTRA={},SONS=['latido','latido2','miau','mugido','cacarejo','oinc','bale','galo','regar','beber','pingo','porta','sapo','a_fogo','a_passaros','a_grilos','a_chuva','a_motor'],ALIAS={agua:'pingo'},AMB={};let sapoT=0;
function carregaSons(){if(carregaSons.ok)return;carregaSons.ok=true;SONS.forEach(k=>fetch('sons/'+k+'.mp3').then(r=>r.ok?r.arrayBuffer():Promise.reject()).then(b=>new Promise((ok,no)=>AC.decodeAudioData(b,ok,no))).then(b=>{AMOSTRA[k]=b;}).catch(()=>{}));}
function amostra(k,v){k=ALIAS[k]||k;if(k==='latido'&&Math.random()<.4)k='latido2';const b=AMOSTRA[k],a=b&&audio();if(!a)return false;
  const s=a.createBufferSource(),g=a.createGain();s.buffer=b;s.playbackRate.value=.94+Math.random()*.12;g.gain.value=v;s.connect(g).connect(a.destination);s.start();return true;}
function ambiente(){
  if(!AC)return;const t=AC.currentTime,fora=cena!=='casa',dia=escV<.5,cala=!som||dormindo||!jogadora||document.hidden;
  const q={a_passaros:fora&&dia&&!chuva?.1:0,a_grilos:fora&&!dia?.09:0,a_chuva:chuva?(fora?.22:.07):0,a_fogo:!fora&&fogo>0?.22:0,a_motor:cena==='cidade'&&P.carro&&P.mov?.3:0};
  for(const k in q){const m=AMB[k]||(AMB[k]={prox:0,vivos:[]}),b=AMOSTRA[k],v=cala?0:q[k];
    if(v>0&&b&&t>=m.prox){const s=AC.createBufferSource(),g=AC.createGain(),d=b.duration;s.buffer=b;g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(v,t+.45);g.gain.setValueAtTime(v,t+d-.5);g.gain.linearRampToValueAtTime(.0001,t+d-.03);
      s.connect(g).connect(AC.destination);s.start(t);m.prox=t+d-.5;m.vivos.push(g);s.onended=()=>{const i=m.vivos.indexOf(g);if(i>=0)m.vivos.splice(i,1);};}
    else if(v<=0&&m.vivos.length){m.vivos.forEach(g=>{g.gain.cancelScheduledValues(t);g.gain.setTargetAtTime(.0001,t,.1);});m.vivos=[];m.prox=0;}}
  if(!cala&&noite&&cena==='fazenda'&&t>sapoT){sapoT=t+7+Math.random()*14;tocar('sapo',LAGO.x,LAGO.y);}
}
function osc(f,d,o){
  const a=audio();if(!a)return;o=o||{};const t=a.currentTime+(o.t||0),os=a.createOscillator(),g=a.createGain(),v=o.v??.4;
  os.type=o.tipo||'sine';os.frequency.setValueAtTime(f,t);if(o.f2)os.frequency.exponentialRampToValueAtTime(o.f2,t+d*(o.r||1));if(o.f3)os.frequency.exponentialRampToValueAtTime(o.f3,t+d);
  g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v,t+Math.min(.02,d*.2));g.gain.exponentialRampToValueAtTime(.001,t+d);
  let n=os;if(o.lp){const fl=a.createBiquadFilter();fl.type='lowpass';fl.frequency.value=o.lp;n.connect(fl);n=fl;}
  if(o.trem){const l=a.createOscillator(),lg=a.createGain();l.frequency.value=o.trem;lg.gain.value=v*.6;l.connect(lg).connect(g.gain);l.start(t);l.stop(t+d);}
  n.connect(g).connect(a.destination);os.start(t);os.stop(t+d+.03);
}
function chiado(d,o){
  const a=audio();if(!a)return;o=o||{};const t=a.currentTime+(o.t||0),s=a.createBufferSource(),g=a.createGain(),f=a.createBiquadFilter(),v=o.v??.4;
  s.buffer=ruido;s.loop=true;f.type='bandpass';f.frequency.value=o.bp||1000;f.Q.value=o.q||1;g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.001,t+d);
  s.connect(f).connect(g).connect(a.destination);s.start(t,Math.random()*.5);s.stop(t+d+.03);
}
const SOM={
 latido(v){for(const t of[0,.17]){osc(400,.1,{tipo:'sawtooth',f2:230,lp:1500,v,t});chiado(.08,{bp:900,v:v*.6,t});}},
 miau(v){osc(520,.55,{tipo:'triangle',f2:900,r:.35,f3:470,lp:2600,v});osc(1040,.55,{f2:1800,r:.35,f3:940,v:v*.25});},
 mugido(v){osc(105,1.1,{tipo:'sawtooth',f2:152,r:.3,f3:96,lp:520,v:v*1.2});},
 cacarejo(v){for(let i=0;i<4;i++)osc(720+i*90,.07,{tipo:'square',f2:1100,lp:2600,v:v*.45,t:i*.1});osc(950,.2,{tipo:'square',f2:600,lp:2400,v:v*.45,t:.42});},
 bale(v){osc(370,.75,{tipo:'sawtooth',f2:335,lp:1500,trem:11,v});},
 oinc(v){for(const t of[0,.2]){osc(175,.15,{tipo:'sawtooth',f2:110,lp:700,v,t});chiado(.13,{bp:500,v:v*.7,t});}},
 comer(v){for(let i=0;i<4;i++){const t=i*.17+Math.random()*.03;chiado(.045,{bp:2600+Math.random()*1800,q:3,v:v*.9,t});chiado(.09,{bp:650,q:1.2,v:v*.55,t:t+.02});}},
 beber(v){for(let i=0;i<3;i++)osc(520-i*40,.1,{f2:260,v:v*.6,t:i*.18});},
 enxada(v){osc(130,.15,{f2:50,v});chiado(.13,{bp:700,v:v*.7});},
 regar(v){chiado(.6,{bp:3200,q:.8,v:v*.5});for(let i=0;i<4;i++)osc(900+i*130,.06,{f2:500,v:v*.2,t:i*.12});},
 machado(v){chiado(.05,{bp:2500,v});osc(190,.17,{tipo:'triangle',f2:60,v});},
 cair(v){chiado(.6,{bp:400,v});osc(90,.45,{f2:40,v,t:.15});},
 plantar(v){osc(520,.1,{f2:300,v:v*.7});},
 colher(v){osc(500,.11,{tipo:'triangle',f2:900,v:v*.7});},
 moeda(v){osc(1320,.09,{v:v*.6});osc(1760,.2,{v:v*.6,t:.08});},
 porta(v){osc(140,.12,{tipo:'square',lp:500,f2:90,v:v*.6});chiado(.06,{bp:300,v:v*.5,t:.1});},
 sino(v){for(const t of[0,.55]){osc(880,1.1,{v:v*.6,t});osc(1320,.9,{v:v*.3,t});}},
 carinho(v){osc(660,.12,{tipo:'triangle',f2:990,v:v*.5});},
 fogo(v){chiado(.5,{bp:600,v:v*.6});osc(200,.3,{tipo:'sawtooth',f2:400,lp:800,v:v*.4});},
 clique(v){osc(600,.04,{tipo:'triangle',v:v*.5});},
 pop(v){osc(520,.05,{v:v*.5});}
};
function tocar(n,x,y){let v=.42;if(x!==undefined){if(cena!=='fazenda')return;v*=clamp(1.15-Math.hypot(x-P.x,y-P.y)/240,0,1);if(v<.03)return;}if(!amostra(n,v*1.5)&&SOM[n])SOM[n](v);}
const voz=a=>tocar(SP[a.t].sfx,a.x,a.y);

/* ---------- gravar ---------- */
function gravar(){if(!jogadora)return;try{localStorage.setItem('fazendinhaHD',JSON.stringify({v:4,mv:2,fe:feitos,cid:cidadeSalva(),melh,px:cena==='cidade'?WW-28:Math.round(P.x),py:cena==='cidade'?PORTAO.y:Math.round(P.y),it:itens.map(i=>[i.k,Math.round(i.x),Math.round(i.y)]),visita,ninho,peixes,xp,pedidos,diaPed,jogadora,moedas,som,t:Date.now(),relogio,dormindo,dormNoite,inv,semente,casa,familia,fogo,tvOn,
  ativo:GENTE.indexOf(P),gente:GENTE.map(p=>[Math.round(p.energia),p.tarefa]),
  h:canteiros.map(c=>({lavrado:c.lavrado,k:c.k,g:c.g,agua:c.agua,seco:c.seco,pronto:c.pronto,morta:c.morta})),arv:arvores.map(a=>[a.hp,a.t]),
  a:animais.map(a=>({t:a.t,n:a.n,c:a.c,x:Math.round(a.x),y:Math.round(a.y),comida:a.comida,agua:a.agua,amor:a.amor}))}));}catch(e){}}
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
  const q=g.createLinearGradient(0,0,0,WH);q.addColorStop(0,'#7acd66');q.addColorStop(1,'#6cc45c');g.fillStyle=q;g.fillRect(0,0,WW,WH);
  for(let i=0;i<150;i++){const x=r()*WW,y=r()*WH,rr=14+r()*26,k=g.createRadialGradient(x,y,0,x,y,rr),c=r()<.5?'40,110,50':'190,240,140';
    k.addColorStop(0,'rgba('+c+',.13)');k.addColorStop(1,'rgba('+c+',0)');g.fillStyle=k;g.fillRect(x-rr,y-rr,rr*2,rr*2);}
  g.lineWidth=.28;for(const c of['#4f9f45','#6cc45c','#3f8c3d','#8fdc74','#59ad4c']){g.strokeStyle=c;g.beginPath();for(let i=0,n=WW*WH/12;i<n;i++){const x=r()*WW,y=r()*WH;g.moveTo(x,y);g.lineTo(x+(r()-.5)*1.2,y-.8-r()*1.8);}g.stroke();}
  const cam1=[],cam2=[];for(let i=0;i<=30;i++){const t=i/30;cam1.push([35+t*150+Math.sin(t*3.2)*16,TOP-2+t*150,8.5-t*3]);cam2.push([400-t*120+Math.sin(t*3)*12,TOP+2+t*150,7.5-t*2.5]);}
  const cm=cam1.concat(cam2);
  cm.forEach(([x,y,w])=>el(g,x,y,w+1.6,w*.55+1.2,'#b99763',0,0));cm.forEach(([x,y,w])=>el(g,x,y,w,w*.55,'#dcbf8f',0,0));
  for(let i=0;i<200;i++){const c=cm[r()*cm.length|0];el(g,c[0]+(r()-.5)*c[2]*1.6,c[1]+(r()-.5)*c[2]*.8,.3+r()*.5,.25+r()*.3,r()<.5?'#c4a371':'#ecd5aa',0,0);}
  const fora=(x,y)=>cm.some(c=>Math.abs(x-c[0])<c[2]&&Math.abs(y-c[1])<c[2]*.55)||(x>34&&x<178&&y>226&&y<318);
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
  extrasChao(g,r);
  if(F3.ok){F3.chao(G);return;}
  arvore(g,232,TOP-12,r);arvore(g,300,TOP-15,r);arvore(g,462,TOP-13,r);
  fardo(g,70,TOP-12);fardo(g,84,TOP-12);fardo(g,77,TOP-21);
  for(let x=112;x<212;x+=11)girassol(g,x,TOP-8,15+(x*7%5));
  g.fillStyle='rgba(20,50,20,.2)';g.fillRect(68,TOP-1.4,WW,1.8);
  for(const y of[TOP-12.5,TOP-7]){g.beginPath();g.roundRect(68,y,WW,2.2,1);g.fillStyle=luz(g,'#e8cfa2',y,y+2.2,.14);g.fill();g.stroke();}
  for(let x=72;x<WW+4;x+=16){g.beginPath();g.roundRect(x-1.5,TOP-16,3,16,[1.4,1.4,.3,.3]);g.fillStyle=luz(g,'#f0d9ae',TOP-16,TOP,.16);g.fill();g.stroke();
    el(g,x,TOP-12.4,.4,.4,'#7a5a3a',0,0);el(g,x,TOP-5.9,.4,.4,'#7a5a3a',0,0);}
  celeiro(g);casaFora(g,TOP-3);
}

/* ---------- casa: divisões e caminhos ---------- */
const SALAS={K:[6,46,146,108],S:[154,46,294,108],C:[6,162,146,222],F:[154,162,294,222]};
const PASS={KS:[[143,91],[157,91]],CF:[[143,204],[157,204]],KC:[[73,104],[73,166]],SF:[[227,104],[227,166]]};
const VIZ={K:['S','C'],S:['K','F'],C:['K','F'],F:['S','C']};
const salaDe=(x,y)=>y<135?(x<150?'K':'S'):(x<150?'C':'F');
const passagem=(a,b)=>PASS[a+b]||PASS[b+a].slice().reverse();
function rotaCasa(p,x,y){
  const b=salaDe(x,y),r=SALAS[b],a=salaDe(p.x,p.y),ra=SALAS[a];p.tx=clamp(x,r[0],r[2]);p.ty=clamp(y,r[1],r[3]);p.rota=[];
  if(a===b)return;const c=VIZ[a].includes(b)?[a,b]:[a,VIZ[a][0],b];
  for(let i=0;i<c.length-1;i++)p.rota.push(...passagem(c[i],c[i+1]));
  if(p.x<ra[0]-1||p.x>ra[2]+1||p.y<ra[1]-1||p.y>ra[3]+1)p.rota.shift();
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
function aviso(s){const e=$('aviso');e.textContent=s;e.hidden=false;clearTimeout(aviso.t);aviso.t=setTimeout(()=>e.hidden=true,5200);}
const naHorta=(x,y)=>x>30&&x<182&&((y>222&&y<322)||(canteiros.length>12&&y>328&&y<426));
function gasta(p,c){c*=1-.075*melh.ferr;if(p.energia<c){if(p===P)aviso(nomeDe(p)+' está sem energia. Coma à mesa, coma um prato da mochila, durma à noite ou troque de pessoa.');return false;}p.energia-=c;return true;}

function crescer(dt){
  let m=0;
  canteiros.forEach(c=>{if(!c.k||c.morta)return;const p=PLANTAS[c.k];
    if(c.g<p.t){if(chuva)c.agua=REGA;if(c.agua>0){c.agua-=dt*secaMul;c.g+=dt*crescMul*(1+.06*melh.adubo);c.seco=0;}else if((c.seco+=dt)>SECA){c.morta=true;m++;}}
    else if((c.pronto+=dt)>p.janela){c.morta=true;m++;}});
  arvores.forEach(a=>{if(a.hp<=0&&(a.t-=dt)<=0)a.hp=3;});
  fogo=Math.max(0,fogo-dt);
  return m;
}
/* ações que qualquer pessoa da família pode fazer */
function regarC(c,p){if(!(c.k&&!c.morta&&c.g<PLANTAS[c.k].t&&c.agua<REGA*.9)||!gasta(p,1.5))return false;c.agua=REGA*(1+.15*melh.regador);c.seco=0;tocar('regar',c.x,c.y);return true;}
function lavrarC(c,p){if((c.k&&!c.morta)||(c.lavrado&&!c.k)||!gasta(p,2))return false;c.lavrado=true;c.k=null;c.morta=false;tocar('enxada',c.x,c.y);return true;}
function colherC(c,p){if(!c.k||c.morta||c.g<PLANTAS[c.k].t||!gasta(p,1))return false;const pl=PLANTAS[c.k],y=c.y-12;
  if(pl.racao){dizer(c.x,y,'+'+pl.racao+' Ração');soma('racao',pl.racao);}else{dizer(c.x,y,'+1 '+pl.nome);soma(c.k,1);}c.k=null;c.lavrado=false;conta('colher',1);tocar('colher',c.x,c.y);ganha(2+(pl.sem/3|0));return true;}
function cortar(a,p){if(a.hp<=0||!gasta(p,5))return false;a.hp--;a.treme=1;tocar('machado',a.x,a.y);dizer(a.x,a.y-30,'+1 Madeira');soma('madeira',1);ganha(1);conta('madeira',1);p.dir=a.x>p.x?1:-1;
  if(a.hp<=0){a.t=a.total;tocar('cair',a.x,a.y);dizer(a.x,a.y-40,'Caiu!');}return true;}
function acordar(a){if(a.st==='sleep'){a.st='idle';a.wait=2;}a.acordado=10;}
function carinho(a,p){
  if(a.cd>0)return false;a.cd=.45;a.amor=Math.min(100,a.amor+14);a.hop=.3;a.dir=p.x>a.x?1:-1;mimoA(a);voz(a);tocar('carinho',a.x,a.y);
  dizer(a.x,a.y-SP[a.t].h-7,SP[a.t].som);acordar(a);return true;
}
function dar(a,k,p){
  if(a.cd>0)return false;a.cd=.45;const y=a.y-SP[a.t].h-7;
  if(a[k]>85){if(p===P)dizer(a.x,y,k==='comida'?'Estou cheio!':'Sem sede!');return false;}
  if(k==='comida'&&!tem('racao')){if(p===P)aviso('Acabou a ração. Compre na loja ou plante capim ou trigo.');return false;}
  if(!gasta(p,1))return false;if(k==='comida')soma('racao',-1);
  a[k]=100;a.hop=.3;dizer(a.x,y,k==='comida'?'Nham!':'Glup!');tocar(k==='comida'?'comer':'beber',a.x,a.y);acordar(a);ganha(1);return true;
}
function apanhar(i){const it=itens[i];if(!it)return;dizer(it.x,it.y-9,'+1 '+NOME[it.k]);tocar('pop',it.x,it.y);itens.splice(i,1);soma(it.k,1);ganha(2);conta('bicho',1);}

function pensar(a){
  const sp=SP[a.t];
  if(a.st==='fetch'||a.st==='ret'||a.st==='eat')return;
  if(chamar>0||a.vem>0){a.st='come';return;}
  const ordem=a.comida<=a.agua?['comida','agua']:['agua','comida'];
  for(const k of ordem)if(a[k]<60){let m=null,md=1e9;potes.forEach(p=>{const d=Math.hypot(p.x-a.x,p.y-a.y);if(p.k===k&&d<md){m=p;md=d;}});
    if(m){a.st='seek';a.tg=m;return;}}
  if(noite&&a.acordado<=0){if(a.st!=='sleep')a.st='lar';return;}
  if(a.st!=='idle'&&a.st!=='walk'){a.st='idle';a.wait=.5;}
  if(a.st==='idle'&&(a.wait-=.5)<=0){
    const perto=false;let x,y,n=0;
    do{x=clamp(perto?Q.x+(R()-.5)*90:14+R()*(WW-28),12,WW-12);y=clamp(perto?Q.y+(R()-.5)*60:TOP+14+R()*(WH-TOP-24),TOP+12,WH-8);}while((naHorta(x,y)||noLago(x,y,1.1))&&++n<6);
    a.tx=x;a.ty=y;a.st='walk';
  }
}
function atualizar(a,dt){
  const sp=SP[a.t],f=feliz(a);
  a.comida=Math.max(0,a.comida-dt*70/900);a.agua=Math.max(0,a.agua-dt*70/800);a.amor=Math.max(0,a.amor-dt*70/600);
  a.hop=Math.max(0,a.hop-dt);a.cd=Math.max(0,a.cd-dt);a.acordado=Math.max(0,a.acordado-dt);a.vem=Math.max(0,a.vem-dt);a.fala=Math.max(0,a.fala-dt);a.mov=false;
  if(f>=55&&(a.prod-=dt)<=0){a.prod=(150+R()*100)*(1-.06*(a.t==='galinha'?melh.galinheiro:melh.ordenha));if(a.t==='galinha'&&ninho<12+4*melh.galinheiro)ninho++;else if(itens.length<14){itens.push({k:sp.prod,x:clamp(a.x-a.dir*(sp.w/2+2),10,WW-10),y:a.y+2,t:0});tocar('pop',a.x,a.y);}}
  if(a.st!=='sleep'&&a.st!=='eat'&&R()<dt/45)voz(a);
  if((a.th-=dt)<=0){a.th=.5;pensar(a);}
  switch(a.st){
    case 'eat': if((a.tm-=dt)<=0)a.st='idle';break;
    case 'walk': if(ir(a,a.tx,a.ty,sp.vel*(f<35?.5:1),dt,1)){a.st='idle';a.wait=1+R()*4;}break;
    case 'seek': {const p=a.tg;if(!potes.includes(p)){a.st='idle';break;}
      if(ir(a,p.x-a.dir*(sp.w/2+1),p.y+1,sp.vel*1.3,dt,2)){a.dir=p.x>a.x?1:-1;p.n--;a[p.k]=100;a.st='eat';a.tm=1.4;
        dizer(a.x,a.y-sp.h-4,p.k==='comida'?'Nham!':'Glup!');tocar(p.k==='comida'?'comer':'beber',a.x,a.y);if(p.n<=0)potes.splice(potes.indexOf(p),1);}break;}
    case 'come': case 'beg': if(ir(a,Q.x,Q.y,sp.vel*(a.st==='come'?1.8:1),dt,a.r))a.dir=Q.x>a.x?1:-1;break;
    case 'fetch': if(!bola||bola.de!==a){a.st='idle';break;}
      if(ir(a,bola.tx,bola.ty,sp.vel*2,dt,6)&&bola.chao){
        if(sp.traz){bola.leva=a;a.st='ret';}else{bola=null;a.amor=Math.min(100,a.amor+12);mimoA(a);a.hop=.3;voz(a);a.st='idle';a.wait=1;}}break;
    case 'ret': if(!bola){a.st='idle';break;}
      if(ir(a,Q.x,Q.y,sp.vel*1.8,dt,18)){bola=null;a.amor=Math.min(100,a.amor+18);mimoA(a);a.hop=.3;voz(a);dizer(Q.x,Q.y-36,'Boa, '+a.n+'!');a.st='idle';a.wait=1;}break;
    case 'lar': {const l=lar(a);if(ir(a,l.x,l.y,sp.vel*1.2,dt,2)){a.st='sleep';a.dir=1;}break;}
    case 'sleep': break;
    default: if(Math.hypot(Q.x-a.x,Q.y-a.y)<50)a.dir=Q.x>a.x?1:-1; if(f>75&&R()<dt*.2)a.hop=.3;
  }
}
/* tarefas da família */
function alvoTarefa(f){switch(f.tarefa){
  case 'regar':return canteiros.find(c=>c.k&&!c.morta&&c.agua<=0&&c.g<PLANTAS[c.k].t);
  case 'lavrar':return canteiros.find(c=>!c.lavrado||c.morta);
  case 'colher':return canteiros.find(c=>c.k&&!c.morta&&c.g>=PLANTAS[c.k].t);
  case 'lenha':return arvores.find(a=>a.hp>0);
  case 'recolher':return itens[0]||(ninho>0?GALINHEIRO:null);
  case 'pescar':return peixes>0?MARGEM:null;
  case 'carinho':return animais.filter(a=>a.amor<70).sort((a,b)=>a.amor-b.amor)[0];
  case 'alimentar':return animais.find(a=>(a.comida<50&&tem('racao'))||a.agua<50);}}
function fazTarefa(f,t){switch(f.tarefa){
  case 'regar':return regarC(t,f);case 'lavrar':return lavrarC(t,f);case 'colher':return colherC(t,f);case 'lenha':return cortar(t,f);
  case 'recolher':return t===GALINHEIRO?recolheNinho():apanhar(itens.indexOf(t));case 'pescar':return pescaAuto(f);case 'carinho':return carinho(t,f);
  case 'alimentar':return t.comida<50&&tem('racao')?dar(t,'comida',f):dar(t,'agua',f);}}
function familiaPasso(f,dt){
  f.mov=false;
  if(f.dentro){if(!refeicao&&!noite){f.dentro=false;f.x=PORTA.x+(R()-.5)*14;f.y=PORTA.y+4;f.wait=0;}return;}
  if(refeicao||noite){if(ir(f,PORTA.x,PORTA.y,62,dt,3)){f.dentro=true;if(refeicao&&!f.comeu){f.comeu=true;f.energia=Math.max(f.energia,refeicao.q);}}return;}
  if(f.tarefa&&f.energia>0){
    if((f.pausa-=dt)>0)return;const t=alvoTarefa(f);
    if(t){const pl=f.tarefa==='regar'||f.tarefa==='lavrar'||f.tarefa==='colher',ar=f.tarefa==='lenha';
      if(ir(f,t.x+(ar?(f.x<t.x?-9:9):pl?0:(f.x<t.x?-12:12)),t.y+(pl?13:2),64*(1+.06*melh.botas),dt,2)){f.dir=t.x>f.x?1:-1;f.pausa=.9;fazTarefa(f,t);if(f.energia<5)dizer(f.x,f.y-30*f.e,'Estou sem energia...');}
      return;}
  }
  if((f.wait-=dt)<=0){f.wait=3+R()*6;const h=f.tarefa&&f.energia>0;f.tx=h?186+R()*60:330+R()*130;f.ty=h?236+R()*70:TOP+14+R()*56;}
  if(ir(f,f.tx,f.ty,34,dt,1)&&Math.hypot(Q.x-f.x,Q.y-f.y)<46)f.dir=Q.x>f.x?1:-1;
}
function refeicoes(){
  const ph=relogio%DIA/DIA,m=ph>=.36&&ph<.44?'almoço':ph>=.70&&ph<.78?'janta':null;
  if(m&&!refeicao){let n=0;for(const k of DESPENSA)while(n<3&&tem(k)){inv[k]--;if(!inv[k])delete inv[k];n++;}
    refeicao={tipo:m,q:[40,60,80,100][n]};mudou();tocar('sino');
    aviso('A vovó chamou para '+(m==='almoço'?'o almoço':'a janta')+'! '+(n===3?'Mesa farta: energia cheia para quem comer.':n?'Só havia '+n+' ingrediente'+(n>1?'s':'')+' na despensa, a refeição dá menos energia.':'A despensa estava vazia, só saiu uma sopa rala. Guarde ovos, leite e colheitas na mochila.'));}
  else if(!m&&refeicao){refeicao=null;GENTE.forEach(p=>p.comeu=false);}
  if(refeicao&&cena==='casa'&&!P.comeu&&P.x>154&&P.y<112){P.comeu=true;P.energia=Math.max(P.energia,refeicao.q);mimo(P.x,P.y-36);dizer(P.x,P.y-40,'Que delícia, vovó!');tocar('comer');}
}
let baixo=false,segue=false,travado=false,pt={x:0,y:0,sx:0,sy:0,t:0};const pintados=new Set();
function passo(dt){
  T+=dt;sorriso=Math.max(0,sorriso-dt);escV+=((dormindo?1:fase())-escV)*Math.min(1,dt*3);
  coracoes=coracoes.filter(c=>(c.t+=dt)<1);textos=textos.filter(t=>(t.t+=dt)<1.5);
  if(dormindo)return;
  relogio+=dt;noite=fase()>.6;chamar=Math.max(0,chamar-dt);
  if(baixo&&!travado&&(segue||T-pt.t>.25)){segue=true;const[x,y]=mundo(pt.x,pt.y);alvoAndar(x,y);if(cena==='fazenda')pintar(x,y);}
  P.mov=false;
  if(P.rota.length){if(ir(P,P.rota[0][0],P.rota[0][1],velP(),dt,1.5))P.rota.shift();}
  else if(ir(P,P.tx,P.ty,velP(),dt,1)&&P.meta){const m=P.meta;P.meta=null;if(!cidadeChega(m))(m==='casa'?entrar():m==='pescar'?pescar():sair());}
  if(cena==='fazenda'&&P.mov&&Math.abs(P.x-400)<7&&P.y<TOP+9){P.meta=null;entrar();}
  Q=cena==='fazenda'?P:PORTA;
  crescer(dt);refeicoes();diaNovo();extrasPasso(dt);vidaPasso(dt);cidadePasso(dt);
  if(bola){
    if(!bola.chao){bola.t+=dt/.6;const k=Math.min(1,bola.t);bola.x=bola.sx+(bola.tx-bola.sx)*k;bola.y=bola.sy+(bola.ty-bola.sy)*k;bola.z=Math.sin(Math.PI*k)*26;if(k>=1)bola.chao=true;}
    else if(!bola.de&&(bola.vida-=dt)<=0)bola=null;
  }
  animais.forEach(a=>atualizar(a,dt));GENTE.forEach(f=>{if(f!==P)familiaPasso(f,dt);});arvores.forEach(a=>a.treme=Math.max(0,a.treme-dt*3));
  for(let i=itens.length-1;i>=0;i--){itens[i].t+=dt;if(cena==='fazenda'&&Math.hypot(itens[i].x-P.x,itens[i].y-P.y)<10)apanhar(i);}
  const k=Math.min(1,dt*5),mw=cena==='casa'?CW:cena==='cidade'?CIW:WW,mh=cena==='casa'?CH:cena==='cidade'?CIH:WH;
  cam.x+=((mw<=W?(mw-W)/2:clamp(P.x-W/2,0,mw-W))-cam.x)*k;cam.y+=((mh<=H?(mh-H)/2:clamp(P.y-H*.58,0,mh-H))-cam.y)*k;
}

/* ---------- ações da pessoa ativa ---------- */
function chamarBicho(a){
  if(cena!=='fazenda'){aviso('Saia de casa para chamar os bichos.');return;}
  dizer(P.x,P.y-38,a.n+'!');osc(800,.16,{f2:1150,v:.4});a.vem=8;a.th=0;acordar(a);
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
  bola={sx:P.x,sy:P.y-12,x:P.x,y:P.y,tx:x,ty:y,t:0,z:0,chao:false,de:null,leva:null,vida:6};P.dir=x>P.x?1:-1;osc(500,.14,{tipo:'triangle',f2:900,v:.35});
  let m=null,md=1e9;animais.forEach(a=>{const d=Math.hypot(a.x-x,a.y-y);if(SP[a.t].bola&&a.st!=='eat'&&d<md){m=a;md=d;}});
  if(m){bola.de=m;m.st='fetch';m.acordado=10;}else aviso('Só cachorros e gatos correm atrás da bola.');
}
function proximaSemente(){const l=Object.keys(PLANTAS),i=l.indexOf(semente);for(let k=1;k<=l.length;k++){const s=l[(i+k)%l.length];if(tem('s_'+s)){semente=s;break;}}rotulos();}
function acaoCanteiro(c,quieto){
  const f=ferramenta,y=c.y-12;
  if(f==='enxada'){if(c.k&&!c.morta){if(!quieto)aviso('Aqui ainda tem uma planta viva.');return;}lavrarC(c,P);return;}
  if(f==='semente'){if(c.k)return;if(!c.lavrado){if(!quieto)aviso('Passe a enxada antes de plantar.');return;}
    if(!tem('s_'+semente)){proximaSemente();if(!tem('s_'+semente)){if(!quieto)aviso('Acabaram as sementes. Compre na loja.');return;}}
    if(!gasta(P,1))return;soma('s_'+semente,-1);Object.assign(c,{k:semente,g:0,agua:0,seco:0,pronto:0,morta:false});tocar('plantar');ganha(1);return;}
  if(f==='agua'){regarC(c,P);return;}
  if(f!=='amor')return;
  if(!c.k){if(!quieto)aviso(c.lavrado?'Canteiro pronto. Escolha Semente para plantar.':'Passe a enxada para preparar a terra.');return;}
  if(c.morta){if(!quieto)aviso('Esta planta murchou. Passe a enxada para limpar.');return;}
  const p=PLANTAS[c.k];
  if(c.g>=p.t)colherC(c,P);else if(!quieto)dizer(c.x,y,p.nome+': '+(c.agua<=0?'precisa de água! ':'')+'falta '+tempo(p.t-c.g));
}
const noCanteiro=(x,y)=>canteiros.find(c=>Math.abs(x-c.x)<14&&Math.abs(y-c.y)<10);
function pintar(x,y){const c=noCanteiro(x,y);if(c&&!pintados.has(c)){pintados.add(c);acaoCanteiro(c,true);}}
function alvoAndar(x,y){P.meta=null;if(cena==='casa')rotaCasa(P,x,y);else if(cena==='cidade'){P.rota=[];P.tx=clamp(x,10,CIW-10);P.ty=P.carro?clamp(y,RUA-14,RUA+14):clamp(y,CERCA+2,CIH-8);}else{P.rota=[];P.tx=clamp(x,8,WW-8);P.ty=clamp(y,TOP+6,WH-5);}}
function toque(x,y){
  if(!jogadora||dormindo)return;
  if(cena==='casa')return toqueCasa(x,y);
  if(cena==='cidade')return cidadeToque(x,y);
  for(let i=itens.length-1;i>=0;i--)if(bate(itens[i],22,14,x,y)){apanhar(i);return;}
  if(bate({x:400,y:TOP+1},22,28,x,y)){P.tx=400;P.ty=TOP+7;P.meta='casa';return;}
  if(extrasToque(x,y)||vidaToque(x,y)||cidadeToqueFaz(x,y))return;
  const gx=clamp(x,8,WW-8),gy=clamp(y,TOP+6,WH-5);
  if(ferramenta==='bola'){atirar(gx,gy);return;}
  let alvo=null;animais.forEach(a=>{const s=SP[a.t];if(bate(a,s.w+6,s.h+3,x,y)&&(!alvo||a.y>alvo.y))alvo=a;});
  if(alvo&&(ferramenta==='amor'||ferramenta==='comida'||ferramenta==='agua')){sel=alvo;P.tx=clamp(alvo.x+(alvo.x>P.x?-1:1)*(SP[alvo.t].w/2+9),8,WW-8);P.ty=alvo.y+1;
    ferramenta==='amor'?carinho(alvo,P):dar(alvo,ferramenta,P);return;}
  sel=null;
  const fm=GENTE.find(f=>f!==P&&!f.dentro&&bate(f,16*f.e,28*f.e,x,y));
  if(fm&&ferramenta==='amor'){fm.dir=P.x>fm.x?1:-1;mimo(fm.x,fm.y-30*fm.e);tocar('carinho');familiaM();return;}
  const av=arvores.find(a=>bate(a,a.hp>0?26:12,a.hp>0?40:8,x,y));
  if(av){if(ferramenta==='machado'){P.tx=av.x+(P.x<av.x?-9:9);P.ty=av.y+2;if(av.hp<=0)aviso('Esta árvore está crescendo de novo. Falta '+tempo(av.t)+'.');else cortar(av,P);}
    else if(ferramenta==='amor')aviso(av.hp>0?'Use o Machado para cortar a árvore e ganhar madeira.':'Esta árvore volta a crescer em '+tempo(av.t)+'.');else{P.tx=gx;P.ty=gy;}return;}
  const c=noCanteiro(x,y);
  if(c&&ferramenta!=='comida'){pintados.add(c);P.tx=c.x;P.ty=c.y+13;acaoCanteiro(c);return;}
  P.tx=gx;P.ty=gy;P.meta=null;
  if(ferramenta==='comida'){if(!tem('racao')){aviso('Acabou a ração. Compre na loja ou plante capim ou trigo.');return;}soma('racao',-1);if(potes.length>=8)potes.shift();potes.push({k:'comida',x:gx,y:gy,n:1});tocar('pop');}
  else if(ferramenta==='agua'&&!naHorta(gx,gy)){if(potes.length>=8)potes.shift();potes.push({k:'agua',x:gx,y:gy,n:3});tocar('regar');}
}
function movelEm(x,y){let m=null;casa.moveis.forEach(o=>{const d=MOVEIS[o.k],c=d.parede||d.chao;if(Math.abs(x-o.x)<d.w/2&&(c?Math.abs(y-o.y)<d.h/2:y>o.y-d.h&&y<o.y+2)&&(!m||!d.chao))m=o;});return m;}
const noChao=(x,y)=>Object.values(SALAS).some(r=>x>r[0]-2&&x<r[2]+2&&y>r[1]-4&&y<r[3]+3);
function toqueCasa(x,y){
  if(decor==='tirar'){const m=movelEm(x,y);if(m){casa.moveis.splice(casa.moveis.indexOf(m),1);soma('m_'+m.k,1);tocar('pop');}else{decor=null;aviso('Móveis guardados na mochila.');}return;}
  if(decor){const d=MOVEIS[decor];
    if(d.parede?!(y>6&&y<32):!noChao(x,y)){aviso(d.parede?'Este vai na parede.':'Este vai no chão de uma das divisões.');return;}
    casa.moveis.push({k:decor,x:Math.round(x),y:Math.round(y)});soma('m_'+decor,-1);tocar('pop');if(!tem('m_'+decor))decor=null;return;}
  if(x>166&&x<194&&y<49){rotaCasa(P,180,48);P.meta='sair';return;}
  if(Math.abs(x-VOVO.x)<8&&y>36&&y<71){const ph=relogio%DIA/DIA,f=ph<.36?.36-ph:ph<.70?.70-ph:1.36-ph;mimo(VOVO.x,32);tocar('carinho');
    aviso(refeicao?'Vovó: "Está na mesa! Vão para a sala comer."':'Vovó: "'+(ph<.36||ph>=.78?'O almoço':'A janta')+' sai daqui a '+tempo(f*DIA)+'. Tragam ovos, leite e colheitas, que eu uso três de cada vez."');return;}
  if(Math.abs(x-FOGAO.x)<21&&y>6&&y<FOGAO.y+2){rotaCasa(P,FOGAO.x+4,FOGAO.y+8);cozinha();return;}
  if(Math.abs(x-272)<15&&y>16&&y<50){tvOn=!tvOn;tocar('clique');rotaCasa(P,266,76);return;}
  if(Math.abs(x-44)<25&&y>170&&y<208){if(noite)dormir();else aviso('A cama é para a noite. À noite, dormir aqui recupera a energia de todos e passa para a manhã.');return;}
  alvoAndar(x,y);
}
function entrar(){cena='casa';baixo=false;P.rota=[];P.x=P.tx=180;P.y=P.ty=52;sel=null;cam.x=clamp(P.x-W/2,0,Math.max(0,CW-W));cam.y=0;cinto();tocar('porta');}
function sair(){cena='fazenda';decor=null;P.rota=[];P.x=P.tx=400;P.y=P.ty=TOP+20;cam.x=clamp(P.x-W/2,0,WW-W);cam.y=0;baixo=false;cinto();tocar('porta');}
function dormir(){dormindo=true;dormNoite=noite;bola=null;sel=null;animais.forEach(a=>a.st='sleep');
  $('sonoTxt').innerHTML=dormNoite?'Boa noite! A família toda está dormindo.<br>Ao acordar é manhã e todos têm a energia cheia.':'A fazenda está em pausa.<br>Nada cresce, murcha ou passa fome até acordar.';
  $('sono').hidden=false;gravar();osc(500,.5,{f2:250,v:.35});}
function despertar(){dormindo=false;animais.forEach(a=>{a.st='idle';a.wait=1;a.acordado=8;});$('sono').hidden=true;
  if(dormNoite){relogio=(Math.floor(relogio/DIA)+1)*DIA+DIA*.02;GENTE.forEach(p=>{p.energia=100;p.dentro=false;});dormNoite=false;}
  gravar();osc(400,.4,{f2:800,v:.35});aviso('Bom dia, '+jogadora+'!');}
function controlar(i){
  const n=GENTE[i];if(n===P)return;const era=P,antes=cena;
  era.meta=null;era.rota=[];era.tx=era.x;era.ty=era.y;era.pausa=0;if(antes==='casa')era.dentro=true;if(antes==='cidade'){era.carro=false;era.x=era.tx=WW-40;era.y=era.ty=PORTAO.y;}
  P=n;P.rota=[];P.meta=null;P.pausa=0;
  if(n.dentro){n.dentro=false;cena='casa';P.x=222;P.y=102;}else cena='fazenda';
  P.tx=P.x;P.ty=P.y;sel=null;decor=null;if(cena!==antes)cinto();
  const mw=cena==='casa'?CW:WW,mh=cena==='casa'?CH:WH;cam.x=clamp(P.x-W/2,0,Math.max(0,mw-W));cam.y=clamp(P.y-H*.58,0,Math.max(0,mh-H));
  if(F3.salta)F3.salta();mudou();tocar('clique');aviso('Agora quem está nas suas mãos é '+nomeDe(P)+'.');
}

/* ---------- entrada ---------- */
let bate=(e,w,h,x,y)=>Math.abs(x-e.x)<w/2&&y>e.y-h&&y<e.y+4;
let mundo=(sx,sy)=>{const r=cv.getBoundingClientRect();return[(sx-r.left)/r.width*W+cam.x,(sy-r.top)/r.height*H+cam.y];};
cv.addEventListener('pointerdown',e=>{if(F3.dedos>0){baixo=false;return;}baixo=true;segue=false;travado=false;pintados.clear();pt={x:e.clientX,y:e.clientY,sx:e.clientX,sy:e.clientY,t:T};try{cv.setPointerCapture(e.pointerId);}catch(_){}
  audio();const[x,y]=mundo(e.clientX,e.clientY);toque(x,y);travado=!!P.meta;e.preventDefault();});
cv.addEventListener('pointermove',e=>{if(!baixo)return;pt.x=e.clientX;pt.y=e.clientY;if(Math.hypot(pt.x-pt.sx,pt.y-pt.sy)>8)segue=true;});
for(const n of['pointerup','pointercancel'])cv.addEventListener(n,()=>{baixo=false;});

/* ---------- desenho ---------- */
const sombra=(x,y,w,k)=>el(cx,x,y,w*.46*(k||1),w*.13*(k||1),'rgba(20,50,20,.26)',0,0);
function escrever(s,x,y,cor,tam){cx.font='600 '+(tam||6.5)+'px Fredoka,"Trebuchet MS",sans-serif';cx.textAlign='center';cx.lineWidth=1.7;cx.strokeStyle=LN;
  const w=cx.measureText(s).width/2+3;x=clamp(x,cam.x+w,cam.x+W-w);y=Math.max(y,cam.y+8);cx.strokeText(s,x,y);cx.fillStyle=cor||'#fff';cx.fillText(s,x,y);pronto(cx);}
function estado(a){const f=feliz(a);return{t:T+a.seed,sw:a.mov?Math.sin(a.ph*1.3)*.55:0,dorme:a.st==='sleep',come:a.st==='eat',contente:a.hop>0||a.cd>0,
  pisca:(T+a.seed*3)%3.7<.13,f,triste:Math.min(a.comida,a.agua,a.amor)<30,hop:a.hop>0,resp:Math.sin((T+a.seed)*2.2)*.18};}
function objeto(k,x,y,e){cx.save();cx.translate(x,y);cx.scale(e||1,e||1);ICO[k](cx);cx.restore();pronto(cx);}
function barra(x,y,v,cor){cx.fillStyle='rgba(40,25,25,.8)';cx.beginPath();cx.roundRect(x-11,y,22,2.4,1.2);cx.fill();cx.fillStyle=cor;cx.beginPath();cx.roundRect(x-10.6,y+.4,21.2*clamp(v,.04,1),1.6,.8);cx.fill();}
const opc=p=>p===P?Object.assign({contente:sorriso>0},p.o):p.o;
function gente(p,chao){
  if(p===P){cx.save();cx.setLineDash([2.4,1.8]);cx.lineDashOffset=-T*5;cx.strokeStyle='#fff';cx.lineWidth=.9;el(cx,p.x,p.y,8*p.e,2.6*p.e,'rgba(255,255,255,.18)');cx.restore();pronto(cx);}
  else if(chao)sombra(p.x,p.y,11*p.e);else el(cx,p.x,p.y,5*p.e,1.6*p.e,'rgba(60,30,10,.25)',0,0);
  cx.save();cx.translate(p.x,p.y);cx.scale(p.e,p.e);pessoa(cx,p,T,opc(p));cx.restore();pronto(cx);
}
function desFazenda(){
  cx.drawImage(G,0,0,WW,WH);const b=TOP-3;
  for(let i=0;i<3;i++){const k=(T*.5+i)%3/3;el(cx,422+Math.sin(T+i)*2+k*8,b-68-k*22,2+k*3.4,1.8+k*3,'rgba(255,255,255,'+(.5-k*.5)+')',0,0);}
  if(escV<1)for(let i=0;i<4;i++){const x=(T*3.5+i*190)%(WW+160)-80;el(cx,x,TOP+30+i*70,58,20,'rgba(20,60,40,'+.07*(1-escV)+')',0,0);}
  canteiros.forEach(c=>canteiro(cx,c));
  const L=[];
  canteiros.forEach(c=>{if(c.k)L.push([c.y+7,()=>{const pl=PLANTAS[c.k],f=c.g/pl.t,n=pl.n===1?[[0,1.6]]:pl.n===2?[[-6,1.25],[6,1.25]]:[[-8,1.15],[0,1.15],[8,1.15]];
    n.forEach(([dx,e],i)=>{cx.save();cx.translate(c.x+dx,c.y+5+(i%2));cx.scale(e,e);planta(cx,c.k,f,c.morta,T+i+c.x);cx.restore();});pronto(cx);}]);});
  L.push([262,()=>poco(cx,204,262)]);
  arvores.forEach(a=>L.push([a.y,()=>arvoreCorte(cx,a,T)]));
  potes.forEach(p=>L.push([p.y-1,()=>{sombra(p.x,p.y+3,11);objeto(p.k,p.x,p.y,1.15);}]));
  itens.forEach(i=>L.push([i.y,()=>{sombra(i.x,i.y,7);objeto(i.k,i.x,i.y-4.5-Math.sin(i.t*4)*1.2);
    cx.fillStyle='rgba(255,255,255,'+Math.abs(Math.sin(i.t*3))+')';cx.beginPath();cx.moveTo(i.x+4,i.y-11);cx.lineTo(i.x+4.6,i.y-9.6);cx.lineTo(i.x+6,i.y-9);cx.lineTo(i.x+4.6,i.y-8.4);cx.lineTo(i.x+4,i.y-7);cx.lineTo(i.x+3.4,i.y-8.4);cx.lineTo(i.x+2,i.y-9);cx.lineTo(i.x+3.4,i.y-9.6);cx.fill();}]));
  animais.forEach(a=>L.push([a.y,()=>{const sp=SP[a.t],pulo=a.hop>0?Math.sin(Math.PI*(1-a.hop/.3))*6:0;
    if(a===sel){cx.save();cx.setLineDash([2.4,1.8]);cx.lineDashOffset=-T*5;cx.strokeStyle='#f6c945';cx.lineWidth=1;el(cx,a.x,a.y,sp.w*.6,sp.w*.2,'rgba(255,240,150,.22)');cx.restore();pronto(cx);}
    sombra(a.x,a.y,sp.w,1-pulo*.04);cx.save();cx.translate(a.x,a.y-pulo);cx.scale(a.dir*ESC,ESC);sp.draw(cx,a,estado(a));cx.restore();}]));
  if(!dormindo)GENTE.forEach(f=>{if(f===P?cena==='fazenda':!f.dentro)L.push([f.y,()=>gente(f,1)]);});
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
    else{const r=1-c.pronto/p.janela;barra(c.x,c.y+11.4,r,r<.3?'#e0475a':'#f6c945');objeto(p.racao?'racao':c.k,c.x,c.y-22-Math.abs(Math.sin(T*4+c.x))*3,.9);}});
  animais.forEach(a=>{const sp=SP[a.t],topo=a.y-sp.h-3;
    if(a.st==='sleep'){const k=(T+a.seed)%2/2;cx.globalAlpha=1-k;escrever('z',a.x+a.dir*sp.w*.4+k*4,topo+8-k*9,'#dfe6ff',4+k*4);cx.globalAlpha=1;return;}
    const m=Math.min(a.comida,a.agua,a.amor);
    if(m<30){const k=a.comida===m?'cenoura':a.agua===m?'gota':'amor',bx=a.x+a.dir*sp.w*.42,by=topo-8+Math.sin(T*4+a.seed);
      cx.beginPath();cx.roundRect(bx-7,by-7,14,13,4.5);cx.moveTo(bx-2,by+5.6);cx.lineTo(bx-a.dir*2,by+9.5);cx.lineTo(bx+2,by+5.6);cx.fillStyle='#fff';cx.lineWidth=1.3;cx.stroke();cx.fill();pronto(cx);objeto(k,bx,by-.4,.95);}
    else if(a.st==='come')escrever('!',a.x,topo-1,'#f6c945',9);
  });
}
function desCasa(){
  interior(cx,escV,PAREDES[casa.parede%PAREDES.length]);
  const L=[],des=(k,x,y,a)=>{cx.save();cx.translate(x,y);MV[k](cx,null,T,a);cx.restore();pronto(cx);},dentro=GENTE.filter(p=>p!==P&&p.dentro);
  casa.moveis.forEach(m=>{if(MOVEIS[m.k].chao)des(m.k,m.x,m.y);});casa.moveis.forEach(m=>{if(MOVEIS[m.k].parede)des(m.k,m.x,m.y);});
  casa.moveis.forEach(m=>{const d=MOVEIS[m.k];if(!d.chao&&!d.parede)L.push([m.y,()=>{el(cx,m.x,m.y,d.w*.5,3,'rgba(60,30,10,.2)',0,0);des(m.k,m.x,m.y);}]);});
  const fg=fogo;if(!noite)fogo=Math.max(fogo,1);
  L.push([48,()=>des('tv',272,48,tvOn)],[58,()=>des('geladeira',132,58)],[FOGAO.y,()=>{el(cx,FOGAO.x,FOGAO.y,20,3,'rgba(60,30,10,.2)',0,0);des('fogao',FOGAO.x,FOGAO.y);}],[VOVO.y,()=>gente(VOVO)],[215,()=>des('brinquedos',196,216)]);
  L.push([96,()=>{el(cx,222,96,24,3,'rgba(60,30,10,.2)',0,0);des('mesaJantar',222,96,!!refeicao);}]);
  if(refeicao)dentro.forEach((p,i)=>{const s=[[204,88],[240,88],[222,86]][i];L.push([s[1],()=>{cx.save();cx.translate(s[0],s[1]);cx.scale(p.e,p.e);pessoa(cx,{mov:false,ph:0,dir:i?-1:1},T,p.o);cx.restore();pronto(cx);}]);});
  const naCama=!refeicao&&noite?dentro:[];
  L.push([206,()=>{des('camaCasal',44,206);naCama.filter(p=>p.id!=='filha').forEach((p,i)=>dorminhoco(cx,33+i*22,186.5+20*.95,p.o,T,.95));des('mantaCasal',44,206);}]);
  L.push([205,()=>{des('camaFilha',258,206);naCama.filter(p=>p.id==='filha').forEach(p=>dorminhoco(cx,258,189+20*.8,p.o,T,.8));des('mantaFilha',258,206);}]);
  L.push([P.y,()=>gente(P)]);
  L.sort((a,b)=>a[0]-b[0]).forEach(l=>l[1]());fogo=fg;
  if(escV>0){cx.fillStyle='rgba(14,20,62,'+escV*.3+')';cx.fillRect(0,0,CW,CH);}
  if(decor&&decor!=='tirar')escrever('Toque onde quer colocar: '+MOVEIS[decor].nome,cam.x+W/2,cam.y+H-6,'#f6c945',6);
  if(decor==='tirar')escrever('Toque num móvel para guardar',cam.x+W/2,cam.y+H-6,'#f6c945',6);
}
function desenhar(){
  if(F3.ok){F3.quadro();return hud();}
  cx.setTransform(1,0,0,1,0,0);cx.fillStyle='#2a1f24';cx.fillRect(0,0,cv.width,cv.height);
  cx.setTransform(S,0,0,S,-Math.round(cam.x*S),-Math.round(cam.y*S));pronto(cx);
  cena==='casa'?desCasa():cena==='cidade'?cidade2D():desFazenda();
  coracoes.forEach(c=>{if(c.t>0){cx.globalAlpha=1-c.t*c.t;objeto('amor',c.x+Math.sin(c.t*6)*1.5,c.y-c.t*18,.5+Math.min(1,c.t*5)*.4);cx.globalAlpha=1;}});
  textos.forEach(t=>{cx.globalAlpha=Math.min(1,(1.5-t.t)*3);escrever(t.s,t.x,t.y-t.t*10);cx.globalAlpha=1;});
  hud();
}
function hud(){
  if(sel){$('fNome').textContent=sel.n;$('fTipo').textContent=SP[sel.t].nome;$('bChamar').textContent='Chamar '+sel.n;
    [['bComida','comida'],['bAgua','agua'],['bAmor','amor']].forEach(([id,k])=>{const e=$(id);e.style.width=sel[k]+'%';e.className=sel[k]<30?'baixo':'';});}
  $('ficha').hidden=!sel||cena!=='fazenda';
  const h=rotuloClima()+' · '+(noite?'Noite':refeicao?(refeicao.tipo==='almoço'?'Almoço':'Janta'):'Dia')+(fogo>0&&cena==='casa'?' · fogo '+tempo(fogo):'');if($('hora').textContent!==h)$('hora').textContent=h;
  const q=nomeDe(P)+' · '+Math.round(P.energia)+'%';if($('quem').textContent!==q){$('quem').textContent=q;$('quem').className=P.energia<15?'baixo':'';}
}

/* ---------- interface ---------- */
const BARRA={
 fazenda:[['amor','Mão','mao'],['enxada','Enxada','enxada'],['semente','Semente','saquinho'],['agua','Regador','regador'],['machado','Machado','machado'],['comida','Ração','racao'],['bola','Bola','bola'],['mochila','Mochila','mochila'],['dormir','Dormir','lua']],
 cidade:[['voltar','Fazenda','porta'],['picape','Picape','picape'],['mochila','Mochila','mochila'],['dormir','Dormir','lua']],
 casa:[['sair','Sair','porta'],['decorar','Decorar','m_sofa'],['mochila','Mochila','mochila'],['dormir','Dormir','lua']]
};
const FERR=['amor','enxada','semente','agua','machado','comida','bola'];
function cinto(){
  const n=$('cinto');n.innerHTML='';
  BARRA[cena].forEach(([k,rot,ico])=>{const b=document.createElement('button');b.type='button';b.id='f-'+k;b.innerHTML='<img alt="" src="'+img(ico)+'"><span>'+rot+'</span>';
    b.onclick=()=>{tocar('clique');
      if(k==='voltar')return vai(MEU,CERCA+3,'lar');if(k==='picape')return picapeBotao();
      if(k==='mochila')return mochila('coisas');if(k==='dormir')return dormir();if(k==='sair'){rotaCasa(P,180,48);P.meta='sair';return;}if(k==='decorar')return decorar();
      if(k==='semente'&&(ferramenta==='semente'||!tem('s_'+semente))){ferramenta=k;rotulos();return sementes();}
      ferramenta=k;rotulos();};
    n.appendChild(b);});
  rotulos();
}
function rotulos(){
  FERR.forEach(k=>{const b=$('f-'+k);if(b)b.setAttribute('aria-pressed',k===ferramenta);});
  const s=$('f-semente'),r=$('f-comida');
  if(s){s.lastChild.textContent=PLANTAS[semente].nome+' ×'+tem('s_'+semente);s.firstChild.src=img('s_'+semente);}
  if(r)r.lastChild.textContent='Ração ×'+tem('racao');
}
function mudou(){$('moedas').textContent=moedas;rotulos();rotNivel();gravar();}
function abrir(html){$('caixa').innerHTML=html;$('fundo').hidden=false;}
const fechar=()=>{$('fundo').hidden=true;};
const abas=(l,at)=>'<div class="abas">'+l.map(([k,n])=>'<button type="button" data-aba="'+k+'" aria-pressed="'+(k===at)+'">'+n+'</button>').join('')+'</div>';
const linha=(k,nome,desc,bot)=>'<li><img alt="" src="'+img(k)+'"><span><b>'+nome+'</b>'+(desc?'<small>'+desc+'</small>':'')+'</span><span class="bots">'+bot+'</span></li>';
function ligar(f){$('caixa').querySelectorAll('[data-aba]').forEach(b=>b.onclick=()=>{tocar('clique');f(b.dataset.aba);});const s=$('sairM');if(s)s.onclick=fechar;}
const em=(sel,f)=>$('caixa').querySelectorAll(sel).forEach(b=>b.onclick=()=>f(b.dataset));
const vendaveis=()=>Object.keys(inv).filter(k=>VENDA[k]);
function vender(k,n){moedas+=VENDA[k]*n;soma(k,-n);tocar('moeda');}
const rende=p=>p.racao?'Rende '+p.racao+' rações para os bichos.':'Vende por '+p.v+'.';
let abaLoja='bichos',abaMochila='coisas';
function sementes(){
  const ks=Object.keys(PLANTAS).filter(k=>tem('s_'+k));let h='<h2>Que semente plantar?</h2><ul>';
  if(!ks.length)h+='<li class="vazio">Não há sementes na mochila.</li>';
  ks.forEach(k=>{const p=PLANTAS[k];h+=linha('s_'+k,p.nome+' ×'+inv['s_'+k],'Cresce em '+tempo(p.t)+'. '+rende(p),'<button type="button" data-sem="'+k+'">'+(k===semente?'Escolhida':'Escolher')+'</button>');});
  abrir(h+'</ul><button type="button" id="irLoja">Comprar sementes</button><button type="button" id="sairM">Fechar</button>');ligar(sementes);
  em('[data-sem]',d=>{semente=d.sem;rotulos();fechar();});$('irLoja').onclick=()=>loja('horta');
}
function loja(aba){
  abaLoja=aba||abaLoja;let h='<h2>Loja</h2><p>Moedas: <b>'+moedas+'</b> · Madeira: <b>'+tem('madeira')+'</b></p>'+abas([['bichos','Bichos'],['horta','Horta'],['casa','Casa'],['melhorias','Melhorias'],['vender','Vender']],abaLoja);
  if(abaLoja==='bichos'){h+='<label for="nomeBicho">Nome do novo bicho</label><input id="nomeBicho" maxlength="12" autocomplete="off"><ul>';
    for(const t in SP){const s=SP[t];h+=linha(t,s.nome,'Dá '+NOME[s.prod].toLowerCase(),(nivel()<NV_BICHO[t]?'<button type="button" disabled>Nível '+NV_BICHO[t]+'</button>':'<button type="button" data-bicho="'+t+'"'+(moedas<s.preco||animais.length>=16?' disabled':'')+'>'+s.preco+' moedas</button>'));}}
  else if(abaLoja==='horta'){h+='<ul>'+linha('racao','Ração','Uma por bicho por dia. Tem: '+tem('racao'),'<button type="button" data-item="racao" data-p="4"'+(moedas<4?' disabled':'')+'>4 moedas</button>');
    if(canteiros.length<MAXC)h+=linha('enxada','Novo canteiro','Mais terra para plantar. Tem '+canteiros.length+' de '+MAXC+'.',nivel()<2?'<button type="button" disabled>Nível 2</button>':'<button type="button" id="maisCant"'+(moedas<precoCant()?' disabled':'')+'>'+precoCant()+' moedas</button>');
    for(const k in PLANTAS){const p=PLANTAS[k];h+=linha('s_'+k,'Semente de '+p.nome.toLowerCase(),'Cresce em '+tempo(p.t)+'. '+rende(p)+' Tem: '+tem('s_'+k),
      (nivel()<NV_PLANTA[k]?'<button type="button" disabled>Nível '+NV_PLANTA[k]+'</button>':'<button type="button" data-item="s_'+k+'" data-p="'+p.sem+'"'+(moedas<p.sem?' disabled':'')+'>'+p.sem+' moedas</button>'));}}
  else if(abaLoja==='casa'){h+='<ul>';for(const k in MOVEIS){const d=MOVEIS[k];h+=linha('m_'+k,d.nome,'Na mochila: '+tem('m_'+k),(nivel()<(NV_MOVEL[k]||1)?'<button type="button" disabled>Nível '+NV_MOVEL[k]+'</button>':'<button type="button" data-item="m_'+k+'" data-p="'+d.preco+'"'+(moedas<d.preco?' disabled':'')+'>'+d.preco+' moedas</button>'+
      (d.mad?'<button type="button" data-fazer="'+k+'"'+(tem('madeira')<d.mad?' disabled':'')+'>Fazer: '+d.mad+' madeira</button>':'')));}}
  else if(abaLoja==='melhorias'){h+='<p><small>Cada melhoria tem dez graus e fica para sempre.</small></p><ul>';for(const k in MELHORIAS){const m=MELHORIAS[k],t=melh[k];
    h+=linha(m.ico,m.nome+' · grau '+t+' de '+GRAUS,t<GRAUS?'Próximo grau: '+m.desc(t+1):'No máximo: '+m.desc(GRAUS),t>=GRAUS?'':nivel()<nvMelh(t)?'<button type="button" disabled>Nível '+nvMelh(t)+'</button>':'<button type="button" data-melh="'+k+'"'+(moedas<precoMelh(t)?' disabled':'')+'>'+precoMelh(t)+' moedas</button>');}}
  else{const ks=vendaveis(),tot=ks.reduce((s,k)=>s+(k!=='madeira'?VENDA[k]*inv[k]:0),0);
    h+=(tot?'<button type="button" id="tudo">Vender tudo menos a madeira: +'+tot+' moedas</button>':'')+'<p><small>A vovó usa ovos, leite e colheitas nas refeições. Vender tudo deixa a despensa vazia.</small></p><ul>';
    if(!ks.length)h+='<li class="vazio">Nada para vender. Colha, recolha ovos e leite, ou cozinhe.</li>';
    ks.forEach(k=>{h+=linha(k,NOME[k]+' ×'+inv[k],'Paga '+VENDA[k]+' cada','<button type="button" data-v1="'+k+'">Vender 1</button>'+(inv[k]>1?'<button type="button" data-vt="'+k+'">Vender '+inv[k]+': +'+VENDA[k]*inv[k]+'</button>':''));});}
  abrir(h+'</ul><button type="button" id="sairM">Fechar</button>');ligar(loja);
  if($('nomeBicho'))$('nomeBicho').value=nomeLivre();
  if($('maisCant'))$('maisCant').onclick=()=>{moedas-=precoCant();canteiros.push(novoCant(canteiros.length));tocar('moeda');mudou();loja();};
  em('[data-bicho]',d=>{const t=d.bicho,n=$('nomeBicho').value.trim()||nomeLivre();moedas-=SP[t].preco;const a=novo(t,n,R()*9|0,40,TOP+14);animais.push(a);tocar('moeda');voz(a);mudou();fechar();aviso(n+' chegou à fazenda!');});
  em('[data-item]',d=>{moedas-=+d.p;soma(d.item,1);tocar('moeda');loja();});
  em('[data-fazer]',d=>{soma('madeira',-MOVEIS[d.fazer].mad);soma('m_'+d.fazer,1);tocar('machado');loja();});
  em('[data-melh]',d=>{moedas-=precoMelh(melh[d.melh]);melh[d.melh]++;tocar('sino');mudou();loja();});
  em('[data-v1]',d=>{vender(d.v1,1);loja();});em('[data-vt]',d=>{vender(d.vt,inv[d.vt]);loja();});
  if($('tudo'))$('tudo').onclick=()=>{vendaveis().forEach(k=>{if(k!=='madeira')vender(k,inv[k]);});loja();};
}
function mochila(aba){
  abaMochila=aba||abaMochila;let h='<h2>Mochila</h2>'+abas([['coisas','Coisas'],['bichos','Bichos'],['ajuda','Como jogar']],abaMochila);
  if(abaMochila==='coisas'){const ks=Object.keys(inv);h+='<p>Moedas: <b>'+moedas+'</b>. Para vender, abra a Loja, aba Vender.</p><ul>';
    if(!ks.length)h+='<li class="vazio">A mochila está vazia.</li>';
    ks.forEach(k=>{h+=linha(k,nomeItem(k)+' ×'+inv[k],k==='presente'?'Um mimo que o cachorro ou o gato trouxe. Abra para ver o que tem dentro.':RECEITAS[k]?'Comer dá 50% de energia':VENDA[k]?'Vale '+VENDA[k]+' cada':'',k==='presente'?'<button type="button" id="abreP">Abrir</button>':RECEITAS[k]?'<button type="button" data-comer="'+k+'">'+esc(nomeDe(P))+' come</button>':'');});
    h+='</ul>';}
  else if(abaMochila==='bichos'){h+='<button type="button" id="todos">Chamar todos</button><ul>';
    animais.forEach((a,i)=>{h+='<li><img alt="" src="'+img(a.t)+'"><span><b>'+esc(a.n)+'</b><small>'+STATS.map(k=>'<i class="mini'+(a[k]<30?' baixo':'')+'" title="'+k+'"><i style="width:'+a[k]+'%"></i></i>').join('')+'</small></span><span class="bots"><button type="button" data-chamar="'+i+'">Chamar</button></span></li>';});
    h+='</ul>';}
  else h+='<ul class="ajuda"><li><b>Andar:</b> toque ou arraste o dedo (ou o mouse) e a pessoa segue.</li><li><b>Ver mais longe:</b> use os botões + e −, a roda do mouse ou dois dedos. O botão Tudo mostra a fazenda inteira.</li><li><b>Família:</b> toque no nome lá em cima para trocar de pessoa ou dar tarefas ao pai, à filha e à mãe. Cada um tem energia, que se gasta a trabalhar.</li>'+
    '<li><b>Refeições:</b> a vovó chama para o almoço e para a janta. Quem estiver em tarefas vai sozinho; quem está nas suas mãos tem de ir até a sala. A vovó usa três coisas da mochila (ovos, leite, colheitas): com a despensa cheia, a energia volta toda.</li>'+
    '<li><b>Horta:</b> Enxada prepara a terra, Semente planta (toque de novo em Semente para escolher outra), Regador rega. Sem água a planta para de crescer e murcha. Depois de madura, colha com a Mão antes de a barra acabar.</li>'+
    '<li><b>Bichos:</b> uma ração e água por dia chegam. Capim e trigo viram ração. Bichos felizes deixam ovos, leite e lã.</li><li><b>Casas dos bichos:</b> à noite a vaca vai para o curral, as galinhas para o galinheiro e os cachorros para as casinhas. Os ovos ficam no galinheiro: toque nele para recolher.</li><li><b>Lago:</b> toque no lago com a Mão para pescar. Peixe vende-se ou vai para a panela. Com a Ração selecionada, o toque alimenta os peixes e nascem mais.</li><li><b>Louro:</b> o papagaio do viveiro vê tudo. Toque nele para saber as novidades; ele também avisa sozinho quando há algo urgente.</li><li><b>Estações e chuva:</b> a cada três dias muda a estação. Na primavera tudo cresce mais depressa, no verão a terra seca mais depressa, no inverno as plantas crescem devagar. Quando chove, a horta fica regada sozinha.</li><li><b>Mascate:</b> dia sim, dia não, Seu Chico chega de manhã com a carroça e para perto da casa. Toque nele para trocar coisas; ele traz sementes que a loja ainda não vende.</li><li><b>Mais canteiros:</b> compre na Loja, aba Horta, a partir do nível 2.</li><li><b>Machado:</b> corte árvores para ter madeira. Elas voltam a crescer.</li>'+
    '<li><b>Pedidos e nível:</b> toque em Nível, lá em cima. Todas as manhãs os vizinhos fazem três pedidos que pagam mais do que a loja. Cada ação dá pontos; ao subir de nível a loja ganha sementes, bichos e móveis novos.</li><li><b>Cidade:</b> a placa "Cidade", do lado direito da fazenda, leva à rua das fazendas: visite os vizinhos, faça negócios, churrasco na praça e compras no mercado. A picape traz 6 caixas de uma vez.</li><li><b>Loja:</b> compre bichos, sementes e móveis, e venda na aba Vender o que a fazenda produz. Na aba Melhorias, evolua o regador, as ferramentas, o galinheiro e as botas.</li><li><b>Casa:</b> cozinha, sala, quarto do casal e quarto da filha. Toque no fogão a lenha para cozinhar, na TV para ligar, e use Decorar para pôr móveis.</li>'+
    '<li><b>Dormir:</b> de dia, pausa o jogo. À noite, todos dormem, acordam de manhã e com a energia cheia. O jogo guarda sozinho e fica parado enquanto estiver fechado: ao voltar, continua de onde parou.</li></ul>';
  abrir(h+'<button type="button" id="sairM">Fechar</button>');ligar(mochila);
  if($('todos'))$('todos').onclick=()=>{fechar();if(cena!=='fazenda')return aviso('Saia de casa para chamar os bichos.');chamar=5;animais.forEach(a=>{acordar(a);a.th=0;});osc(900,.3,{f2:1500,v:.4});};
  if($('abreP'))$('abreP').onclick=()=>{const t=abrePresente();mochila();if(t)aviso('Dentro do presente havia: '+t+'!');};
  em('[data-comer]',d=>{soma(d.comer,-1);P.energia=Math.min(100,P.energia+50);tocar('comer');mochila();});em('[data-chamar]',d=>{fechar();chamarBicho(animais[+d.chamar]);});
}
function familiaM(){
  let h='<h2>Família</h2><p>Quem está nas suas mãos faz o que você tocar. Os outros fazem a tarefa escolhida enquanto tiverem energia.</p><ul>';
  GENTE.forEach((p,i)=>{const at=p===P,onde=at?'Nas suas mãos':p.dentro?(refeicao?'À mesa':'Na cama'):p.energia<=0&&p.tarefa?'Sem energia':'';
    h+='<li class="pessoa"><span><b>'+esc(nomeDe(p))+'</b><small>Energia '+Math.round(p.energia)+'% <i class="mini'+(p.energia<15?' baixo':'')+'"><i style="width:'+p.energia+'%"></i></i>'+(onde?' · '+onde:'')+'</small>'+
      (at?'':'<label for="t'+i+'">Tarefa</label><select id="t'+i+'" data-t="'+i+'">'+Object.keys(TAREFAS).filter(k=>!(p.id==='filha'&&k==='lenha')).map(k=>'<option value="'+k+'"'+(p.tarefa===k?' selected':'')+'>'+TAREFAS[k]+'</option>').join('')+'</select>')+
      '</span><span class="bots">'+(at?'':'<button type="button" data-ctl="'+i+'">Controlar</button>')+'</span></li>';});
  abrir(h+'</ul><label for="nEle">Nome do pai</label><input id="nEle" maxlength="12" autocomplete="off"><label for="nFilha">Nome da filha</label><input id="nFilha" maxlength="12" autocomplete="off"><button type="button" id="sairM">Fechar</button>');ligar(familiaM);
  $('caixa').querySelectorAll('select').forEach(s=>s.onchange=()=>{const p=GENTE[+s.dataset.t];p.tarefa=s.value;p.pausa=0;p.wait=0;tocar('clique');gravar();});
  em('[data-ctl]',d=>{fechar();controlar(+d.ctl);});
  for(const[id,k]of[['nEle','ele'],['nFilha','filha']]){$(id).value=familia[k];$(id).onchange=()=>{familia[k]=$(id).value.trim()||familia[k];gravar();};}
}
function decorar(){
  const ks=Object.keys(inv).filter(k=>k[0]==='m'&&k[1]==='_');let h='<h2>Decorar a casa</h2><ul>';
  if(!ks.length)h+='<li class="vazio">Sem móveis na mochila. Compre ou faça na Loja, aba Casa.</li>';
  ks.forEach(k=>{h+=linha(k,nomeItem(k)+' ×'+inv[k],MOVEIS[k.slice(2)].parede?'Vai na parede':'Vai no chão','<button type="button" data-por="'+k.slice(2)+'">Colocar</button>');});
  abrir(h+'</ul><button type="button" id="tirar"'+(casa.moveis.length?'':' disabled')+'>Guardar móveis</button><button type="button" id="pintar"'+(moedas<15?' disabled':'')+'>Pintar a parede da sala: 15 moedas</button><button type="button" id="sairM">Fechar</button>');ligar(decorar);
  em('[data-por]',d=>{decor=d.por;fechar();});$('tirar').onclick=()=>{decor='tirar';fechar();};$('pintar').onclick=()=>{moedas-=15;casa.parede=(casa.parede+1)%PAREDES.length;tocar('moeda');mudou();decorar();};
}
function cozinha(){
  let h='<h2>Fogão a lenha</h2><p>A vovó cuida das refeições da família. Aqui você cozinha pratos para vender ou comer. '+(fogo>0?'A sua lenha dura mais <b>'+tempo(fogo)+'</b>.':'Ponha lenha para cozinhar.')+' Madeira: <b>'+tem('madeira')+'</b></p><button type="button" id="acender"'+(tem('madeira')?'':' disabled')+'>Pôr lenha: 1 madeira</button><ul>';
  for(const k in RECEITAS){const r=RECEITAS[k],ok=fogo>0&&Object.keys(r.ing).every(i=>tem(i)>=r.ing[i]);
    h+=linha(k,r.nome,Object.keys(r.ing).map(i=>r.ing[i]+' '+NOME[i].toLowerCase()+' ('+tem(i)+')').join(', ')+'. Vale '+VENDA[k]+'.','<button type="button" data-coz="'+k+'"'+(ok?'':' disabled')+'>Cozinhar</button>');}
  abrir(h+'</ul><button type="button" id="sairM">Fechar</button>');ligar(cozinha);
  $('acender').onclick=()=>{soma('madeira',-1);fogo=Math.min(fogo+300,900);tocar('fogo');cozinha();};
  em('[data-coz]',d=>{const r=RECEITAS[d.coz];for(const i in r.ing)soma(i,-r.ing[i]);soma(d.coz,1);tocar('colher');ganha(6);conta('prato',1);cozinha();});
}
function boasVindas(){
  abrir('<h2>Fazendinha dos Bichos</h2><p>Os bichos estão à espera de alguém que cuide deles.</p><label for="nomeDela">Qual é o seu nome?</label>'+
    '<input id="nomeDela" maxlength="14" autocomplete="off"><button type="button" id="ir">Começar</button>');
  $('ir').onclick=()=>{jogadora=$('nomeDela').value.trim()||'amiga';audio();
    animais=[novo('cao','Thor',0),novo('cao','Mel',1),novo('galinha','Pipoca',0),novo('vaca','Mimosa',0)];fechar();gravar();tocar('moeda');mochila('ajuda');};
}
$('loja').onclick=()=>{tocar('clique');loja();};
$('quem').onclick=()=>{tocar('clique');familiaM();};
$('nv').onclick=()=>{tocar('clique');pedidosM();};
$('som').onclick=()=>{som=!som;$('som').textContent=som?'Som':'Mudo';gravar();};
$('acordar').onclick=despertar;
$('bChamar').onclick=()=>{if(sel)chamarBicho(sel);};
$('bFalar').onclick=()=>{if(sel)conversar(sel);};
addEventListener('resize',ajustar);
document.addEventListener('visibilitychange',()=>{if(document.hidden)gravar();});
addEventListener('pagehide',gravar);addEventListener('beforeunload',gravar);
setInterval(gravar,10000);

/* ---------- arranque ---------- */
let antes=0;
function quadro(ts){const dt=Math.min(.05,(ts-antes)/1000||0);antes=ts;passo(dt);ambiente();desenhar();requestAnimationFrame(quadro);}
(function(){
  extrasInicio();F3.liga();cinto();ajustar();
  let novidades=false,px0=240,py0=170;const s=ler();
  if(s&&s.jogadora&&Array.isArray(s.a)&&s.a.length){
    jogadora=s.jogadora;moedas=s.moedas|0;if(s.melh)for(const k in melh)melh[k]=clamp((s.melh[k]|0)*(s.mv?1:2),0,GRAUS);if(s.fe)for(const k in feitos)feitos[k]=Math.max(0,s.fe[k]|0);if(s.px>0&&cena==='fazenda'){px0=s.px;py0=Math.max(s.py,TOP+20);}
    visita=s.visita&&Array.isArray(s.visita.trocas)?s.visita:null;ninho=s.ninho|0;peixes=s.peixes===undefined?6:s.peixes|0;if(s.peixes===undefined)novidades=true;
    xp=s.xp===undefined?120:+s.xp||0;diaPed=s.diaPed===undefined?-1:s.diaPed|0;
    pedidos=Array.isArray(s.pedidos)?s.pedidos.filter(p=>p&&p.q&&Object.keys(p.q).every(k=>NOME[k])):[];if(s.xp===undefined)novidades=true;
    som=s.som!==false;$('som').textContent=som?'Som':'Mudo';
    s.a.forEach(o=>{if(!SP[o.t])return;const a=novo(o.t,String(o.n).slice(0,14),o.c|0,o.x>0?o.x:undefined,o.y>0?o.y:undefined);STATS.forEach(k=>a[k]=clamp(+o[k]||50,s.v?0:60,100));animais.push(a);});
    if(s.v>=2){
      relogio=+s.relogio||0;dormindo=!!s.dormindo;dormNoite=!!s.dormNoite;fogo=+s.fogo||0;tvOn=!!s.tvOn;
      const bruto=s.inv||{};
      if(s.v<4){novidades=true;moedas+=70*(bruto.m_fogao|0);((s.casa||{}).moveis||[]).forEach(m=>{if(m.k==='fogao')moedas+=70;else bruto['m_'+m.k]=(bruto['m_'+m.k]|0)+1;});if(s.casa)s.casa.moveis=[];}
      inv=Object.fromEntries(Object.entries(bruto).filter(([k,v])=>v>0&&(NOME[k]||(k[0]==='s'&&PLANTAS[k.slice(2)])||(k[0]==='m'&&MOVEIS[k.slice(2)]))));
      if(PLANTAS[s.semente])semente=s.semente;if(s.familia)familia=Object.assign(familia,s.familia);
      if(s.casa&&Array.isArray(s.casa.moveis))casa={parede:s.casa.parede|0,moveis:s.casa.moveis.filter(m=>{if(!MOVEIS[m.k])return false;if(MOVEIS[m.k].parede&&m.y>40){inv['m_'+m.k]=(inv['m_'+m.k]|0)+1;return false;}return true;})};
      while(canteiros.length<Math.min(MAXC,(s.h||[]).length))canteiros.push(novoCant(canteiros.length));
      (s.h||[]).forEach((o,i)=>{if(canteiros[i]&&(!o.k||PLANTAS[o.k]))Object.assign(canteiros[i],o);});
      (s.arv||[]).forEach((o,i)=>{if(arvores[i]){arvores[i].hp=o[0];arvores[i].t=o[1];}});
      (s.gente||[]).forEach((o,i)=>{if(GENTE[i]){GENTE[i].energia=clamp(+o[0]||0,0,100);GENTE[i].tarefa=TAREFAS[o[1]]?o[1]:'';}});
      if(GENTE[s.ativo])P=GENTE[s.ativo];cidadeLe(s.cid);
      itens=(s.it||[]).filter(i=>NOME[i[0]]).map(i=>({k:i[0],x:i[1],y:i[2],t:0}));
      if(dormindo){animais.forEach(a=>a.st='sleep');$('sono').hidden=false;$('sonoTxt').textContent='A fazenda está dormindo.';}
      else aviso('Jogo carregado, '+jogadora+': nível '+nivel()+', dia '+(Math.floor(relogio/DIA)+1)+', '+moedas+' moedas. Continua de onde parou.'+(viuCidade?'':' Novidade: a placa "Cidade", do lado direito da fazenda, leva à cidade das fazendas.'));
    }else novidades=true;
    if(novidades)mochila('ajuda');
  }else boasVindas();
  P.x=P.tx=px0;P.y=P.ty=py0;cam.x=clamp(P.x-W/2,0,WW-W);cam.y=clamp(P.y-H*.58,0,WH-H);
  mudou();
  try{localStorage.setItem('fz_teste','1');if(localStorage.getItem('fz_teste')!=='1')throw 0;localStorage.removeItem('fz_teste');}catch(e){setTimeout(()=>abrir('<h2>Atenção</h2><p>Este navegador não está guardando o jogo. Isso acontece em janela anónima ou privada, ou quando o link abre dentro de outra aplicação.</p><p>Abra o link no Chrome ou no Safari normal, fora do modo privado, para o progresso ficar guardado.</p><button type="button" onclick="fechar()">Entendi</button>'),600);}
  if(document.fonts&&document.fonts.load)document.fonts.load('600 8px Fredoka').catch(()=>{});
  requestAnimationFrame(quadro);
})();
