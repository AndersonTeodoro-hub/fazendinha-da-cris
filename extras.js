/* ---------- curral, galinheiro, casinhas, lago, papagaio e pássaros ---------- */
const LAGO={x:600,y:470,rx:85,ry:45},CURRAL={x:556,y:84,w:150,h:78},GALINHEIRO={x:255,y:124},CASINHAS=[{x:462,y:108},{x:492,y:108}],VIVEIRO={x:380,y:310};
const MARGEM={x:LAGO.x-LAGO.rx-9,y:LAGO.y};
let ninho=0,peixes=6,pesca=null,cria=0,passaros=[];const louro={fala:0,prox:40};
const noLago=(x,y,m)=>Math.hypot((x-LAGO.x)/LAGO.rx,(y-LAGO.y)/LAGO.ry)<(m||1);
function foraLago(e,tx,ty){
  const dx=(e.x-LAGO.x)/LAGO.rx,dy=(e.y-LAGO.y)/LAGO.ry,d=Math.hypot(dx,dy)||.01;if(d>=1.06)return;
  const s=((tx-e.x)*-dy*LAGO.rx+(ty-e.y)*dx*LAGO.ry)>=0?1:-1;
  e.x=LAGO.x+dx/d*1.06*LAGO.rx-dy/d*s*1.2;e.y=LAGO.y+dy/d*1.06*LAGO.ry+dx/d*s*.7;
}
function lar(a){
  const i=animais.filter(b=>b.t===a.t).indexOf(a);
  if(a.t==='cao'){const c=CASINHAS[i%CASINHAS.length];return{x:c.x+(i>=CASINHAS.length?16:1),y:c.y+7};}
  if(a.t==='galinha')return{x:GALINHEIRO.x-8+(i%4)*7,y:GALINHEIRO.y+7+(i>>2)*5};
  if(a.t==='gato')return{x:414+i*9,y:TOP+13};
  const j=animais.filter(b=>b.t!=='cao'&&b.t!=='galinha'&&b.t!=='gato').indexOf(a);return{x:CURRAL.x+26+(j%4)*33,y:CURRAL.y+38+(j>>2)%2*24};
}
function extrasInicio(){
  Object.assign(SOM,{
    pio(v){for(const t of[0,.09])osc(2500,.06,{f2:3400,v:v*.35,t});},
    louro(v){for(const t of[0,.22]){osc(950,.18,{tipo:'sawtooth',f2:1500,r:.4,f3:800,lp:3200,trem:28,v:v*.8,t});}},
    agua(v){chiado(.3,{bp:1300,q:.7,v:v*.7});osc(500,.2,{f2:180,v:v*.5});}
  });
  NOME.peixe='Peixe';VENDA.peixe=16;RECEITAS.frito={nome:'Peixe frito',ing:{peixe:2},v:48};NOME.frito='Peixe frito';VENDA.frito=48;DESPENSA.push('peixe');
  TAREFAS.pescar='Pescar no lago';
  for(let i=0;i<8;i++)passaros.push({x:R()*WW,y:TOP+R()*(WH-TOP),h:0,cor:i,st:'pousa',t:R()*6,dir:1,sx:0,sy:0,sh:0,u:0,dur:1,alvo:null,ref:null});
}
function extrasChao(g,r){
  g.beginPath();g.roundRect(CURRAL.x,CURRAL.y,CURRAL.w,CURRAL.h,7);g.fillStyle='#cdb07c';g.fill();
  for(let i=0;i<160;i++)el(g,CURRAL.x+4+r()*(CURRAL.w-8),CURRAL.y+4+r()*(CURRAL.h-8),.4+r()*.8,.3+r()*.4,r()<.5?'#b99763':'#e3cf9f',0,0);
  g.strokeStyle='#e9c46a';g.lineWidth=.4;g.beginPath();for(let i=0;i<60;i++){const x=CURRAL.x+8+r()*60,y=CURRAL.y+8+r()*22;g.moveTo(x,y);g.lineTo(x+r()*3-1.5,y-1-r()*1.5);}g.stroke();
  el(g,GALINHEIRO.x,GALINHEIRO.y+5,24,11,'#cdb07c',0,0);el(g,477,113,32,9,'#cdb07c',0,0);
  el(g,VIVEIRO.x,VIVEIRO.y+1,30,18,'#b9ad98',0,0);el(g,VIVEIRO.x,VIVEIRO.y+1,27,16,'#dcd2bf',0,0);
  g.strokeStyle='rgba(120,105,85,.5)';g.lineWidth=.4;for(const k of[.45,.75]){g.beginPath();g.ellipse(VIVEIRO.x,VIVEIRO.y+1,27*k,16*k,0,0,TAU);g.stroke();}
  g.beginPath();for(let i=0;i<12;i++){const a=i/12*TAU;g.moveTo(VIVEIRO.x+Math.cos(a)*12,VIVEIRO.y+1+Math.sin(a)*7);g.lineTo(VIVEIRO.x+Math.cos(a)*27,VIVEIRO.y+1+Math.sin(a)*16);}g.stroke();
  rioChao(g);el(g,LAGO.x,LAGO.y,LAGO.rx+8,LAGO.ry+6,'#b9a57a',0,0);el(g,LAGO.x,LAGO.y,LAGO.rx+6,LAGO.ry+4.4,'#e6d3a3',0,0);
  const q=g.createRadialGradient(LAGO.x,LAGO.y,4,LAGO.x,LAGO.y,LAGO.rx);q.addColorStop(0,'#2f86cf');q.addColorStop(.75,'#49a9e4');q.addColorStop(1,'#8fd2f2');
  g.save();g.translate(LAGO.x,LAGO.y);g.scale(1,LAGO.ry/LAGO.rx);g.translate(-LAGO.x,-LAGO.y);g.beginPath();g.arc(LAGO.x,LAGO.y,LAGO.rx,0,TAU);g.fillStyle=q;g.fill();g.restore();
  for(let i=0;i<14;i++){const a=r()*TAU,d=1.06+r()*.05;el(g,LAGO.x+Math.cos(a)*LAGO.rx*d,LAGO.y+Math.sin(a)*LAGO.ry*d,1.6+r()*1.6,1+r(),r()<.5?'#a9adb8':'#8f949f',0,0);}
  pronto(g);
}
function poleiro(){
  const k=R();
  if(k<.55){const v=arvores.filter(a=>a.hp>0);if(v.length){const a=v[R()*v.length|0];return{x:a.x+(R()-.5)*14,y:a.y+.6,h:26+R()*7,ref:a};}}
  if(k<.7){const t=[[232,TOP-12],[300,TOP-15],[462,TOP-13],[540,TOP-14],[640,TOP-12],[716,TOP-15]][R()*6|0];return{x:t[0]+(R()-.5)*16,y:t[1]+.6,h:32+R()*9};}
  if(k<.8)return{x:72+16*(R()*40|0),y:TOP-.5,h:16};
  if(k<.86)return{x:GALINHEIRO.x+(R()-.5)*20,y:GALINHEIRO.y+.6,h:30};
  if(k<.9)return{x:VIVEIRO.x+(R()-.5)*8,y:VIVEIRO.y+.6,h:52};
  let x,y,n=0;do{x=20+R()*(WW-40);y=TOP+20+R()*(WH-TOP-40);}while((noLago(x,y,1.1)||naHorta(x,y))&&++n<8);return{x,y,h:0};
}
function recolheNinho(){if(!ninho)return false;const n=ninho;ninho=0;dizer(GALINHEIRO.x,GALINHEIRO.y-38,'+'+n+' Ovo'+(n>1?'s':''));tocar('pop',GALINHEIRO.x,GALINHEIRO.y);soma('ovo',n);ganha(2*n);conta('bicho',n);return true;}
function pescaAuto(f){f.pausa=4.5;if(!gasta(f,3))return false;tocar('agua',f.x,f.y);if(R()<peixes/(peixes+5)){peixes--;dizer(f.x,f.y-34*f.e,'+1 Peixe');soma('peixe',1);ganha(3);conta('peixe',1);}return true;}
function irPescar(){const a=Math.atan2((P.y-LAGO.y)/LAGO.ry,(P.x-LAGO.x)/LAGO.rx);P.rota=[];P.tx=clamp(LAGO.x+Math.cos(a)*LAGO.rx*1.14,8,WW-8);P.ty=clamp(LAGO.y+Math.sin(a)*LAGO.ry*1.14,TOP+6,WH-5);P.meta='pescar';}
function pescar(){
  if(pesca)return;if(!gasta(P,3))return;P.dir=LAGO.x>P.x?1:-1;const k=.3+R()*.3;
  pesca={t:(2.5+R()*3)*(1-.06*melh.anzol),bx:P.x+(LAGO.x-P.x)*k,by:P.y+(LAGO.y-P.y)*k};tocar('agua');
}
function fofoca(soUrgente){
  const u=[],ph=relogio%DIA/DIA;
  const f=animais.find(a=>a.comida<30);if(f)u.push(f.n+' está com fome!');
  const s=animais.find(a=>a.agua<30);if(s)u.push(s.n+' está com sede!');
  const c=canteiros.find(c=>c.k&&!c.morta&&c.agua<=0&&c.g<PLANTAS[c.k].t);if(c)u.push('Tem '+PLANTAS[c.k].nome.toLowerCase()+' secando na horta!');
  const m=canteiros.find(c=>c.k&&!c.morta&&c.g>=PLANTAS[c.k].t&&c.pronto>PLANTAS[c.k].janela*.5);if(m)u.push('Corre! Tem '+PLANTAS[m.k].nome.toLowerCase()+' passando do ponto!');
  if(ninho>=6)u.push('O galinheiro está com '+ninho+' ovos esperando!');
  const g=GENTE.find(p=>p!==P&&p.tarefa&&p.energia<5);if(g)u.push(nomeDe(g)+' ficou sem energia nenhuma!');
  if(ph>.31&&ph<.36)u.push('A vovó já está pondo a mesa do almoço!');if(ph>.65&&ph<.70)u.push('Daqui a pouco é a janta da vovó!');
  const pd=pedidos.find(temPedido);if(pd)u.push(pd.quem+' está esperando a encomenda. Já dá para entregar!');
  if(u.length)return u[R()*u.length|0];if(soUrgente)return null;
  const um=t=>{const l=animais.filter(a=>a.t===t);return l.length?l[R()*l.length|0].n:null;},o=[];
  let n;if(n=um('cao'))o.push('Vi '+n+' enterrando um osso atrás do celeiro!');if(n=um('galinha'))o.push(n+' anda de olho no galo do vizinho!');
  if(n=um('vaca'))o.push(n+' acha que é a rainha do curral!');if(n=um('gato'))o.push(n+' dormiu o dia inteiro em cima da cerca!');if(n=um('porco'))o.push(n+' achou uma trufa e não contou para ninguém!');
  o.push('A vovó pôs mais alho no feijão hoje, eu vi!',familia.ele+' cochilou encostado na enxada!',familia.filha+' deu nome para todas as borboletas!','O lago tem '+peixes+' peixes. Eu contei!','Louro quer biscoito! Currupaco!',
    'Hoje é o dia '+(Math.floor(relogio/DIA)+1)+' da fazenda. Eu vejo tudo!');
  return o[R()*o.length|0];
}
function louroFala(txt){louro.fala=3;dizer(VIVEIRO.x,VIVEIRO.y-58,'Currupaco!');tocar('louro',VIVEIRO.x,VIVEIRO.y);aviso('Louro: "'+txt+'"');}
function extrasPasso(dt){
  if((cria+=dt)>120){cria=0;if(peixes>=2&&peixes<12)peixes++;}
  louro.fala=Math.max(0,louro.fala-dt);
  if((louro.prox-=dt)<=0){louro.prox=55+R()*30;const t=fofoca(true);if(t&&$('fundo').hidden)louroFala(t);}
  if(pesca){if(P.mov||cena!=='fazenda')pesca=null;else if((pesca.t-=dt)<=0){
    if(R()<peixes/(peixes+5)){peixes--;dizer(P.x,P.y-38,'+1 Peixe');tocar('colher');soma('peixe',1);ganha(3);conta('peixe',1);}else dizer(P.x,P.y-38,peixes?'Escapou!':'O lago está sem peixe.');pesca=null;}}
  if(cena==='fazenda')foraLago(P,P.tx,P.ty);
  animais.forEach(a=>foraLago(a,a.st==='walk'?a.tx:Q.x,a.st==='walk'?a.ty:Q.y));GENTE.forEach(f=>{if(f!==P&&!f.dentro){foraLago(f,f.tx,f.ty);foraRio(f);}});if(cena==='fazenda')foraRio(P);animais.forEach(foraRio);
  passaros.forEach(b=>{
    if(b.st==='voa'){b.u+=dt/b.dur;const u=Math.min(1,b.u),e=u*u*(3-2*u);b.x=b.sx+(b.alvo.x-b.sx)*e;b.y=b.sy+(b.alvo.y-b.sy)*e;b.h=b.sh+(b.alvo.h-b.sh)*e+Math.sin(Math.PI*u)*(14+b.dur*5);
      if(u>=1){b.st='pousa';b.t=noite?30+R()*30:3+R()*13;b.ref=b.alvo.ref||null;b.h=b.alvo.h;}return;}
    b.t-=dt;if(b.h<1&&R()<dt*1.5){b.x+=(R()-.5)*3;b.dir=R()<.5?1:-1;}
    if(R()<dt/22)tocar('pio',b.x,b.y);
    const susto=b.h<4&&Math.hypot(P.x-b.x,P.y-b.y)<20&&cena==='fazenda';
    if(b.t<=0||susto||(b.ref&&b.ref.hp<=0)){const a=poleiro();b.alvo=a;b.sx=b.x;b.sy=b.y;b.sh=b.h;b.u=0;b.dur=Math.max(.8,Math.hypot(a.x-b.x,a.y-b.y)/75);b.dir=a.x>b.x?1:-1;b.st='voa';b.ref=null;}
  });
}
function extrasToque(x,y){
  if(bate(VIVEIRO,36,56,x,y)){P.tx=VIVEIRO.x+(P.x<VIVEIRO.x?-26:26);P.ty=VIVEIRO.y+4;P.meta=null;louroFala(fofoca(false));louro.prox=60;return true;}
  if(bate(GALINHEIRO,40,38,x,y)&&ferramenta==='amor'){P.tx=GALINHEIRO.x+16;P.ty=GALINHEIRO.y+8;P.meta=null;if(!recolheNinho())aviso('O galinheiro está vazio. As galinhas felizes põem ovos aqui.');return true;}
  if(noLago(x,y)&&ferramenta!=='bola'){
    if(ferramenta==='comida'){if(!tem('racao'))aviso('Sem ração para dar aos peixes.');else if(peixes>=30)aviso('O lago já está cheio de peixe.');else{soma('racao',-1);peixes=Math.min(30,peixes+2);tocar('agua',x,y);dizer(x,y,'+2 peixes no lago');}return true;}
    if(ferramenta==='amor'){if(noLago(P.x,P.y,1.25)){P.tx=P.x;P.ty=P.y;P.rota=[];pescar();}else irPescar();return true;}
    aviso('No lago: com a Mão pesca, com a Ração alimenta os peixes para terem mais filhotes.');return true;
  }
  return false;
}
function extrasDesenho(L,H){
  const{up,fl,somb,P3,txt}=H;
  fl(LAGO.x,LAGO.y,()=>{
    for(let i=0;i<7;i++){const x=((T*9+i*31)%130)-65,y=(i*17%50)-25+x*.12;if(Math.hypot(x/LAGO.rx,y/LAGO.ry)<.8)el(cx,x,y,4,.6,'rgba(255,255,255,.45)',-.2,0);}
    for(let i=0;i<3;i++){const k=(T*.25+i/3)%1;cx.strokeStyle='rgba(255,255,255,'+(.45-k*.45)+')';cx.lineWidth=.6;cx.beginPath();cx.ellipse(-30+i*32,-10+i*9,4+k*14,(4+k*14)*.5,0,0,TAU);cx.stroke();}
    for(let i=0;i<Math.min(peixes,12);i++){const a=T*(.22+i%3*.06)*(i%2?1:-1)+i*2.1,d=.25+(i*37%50)/100,x=Math.cos(a)*LAGO.rx*d,y=Math.sin(a)*LAGO.ry*d,dx=-Math.sin(a)*(i%2?1:-1)>0?1:-1;
      cx.fillStyle='rgba(20,50,90,.38)';cx.beginPath();cx.ellipse(x,y,3.2,1.5,0,0,TAU);cx.fill();cx.beginPath();cx.moveTo(x-dx*2.6,y);cx.lineTo(x-dx*5,y-1.6);cx.lineTo(x-dx*5,y+1.6);cx.fill();}
    for(const[x,y]of[[-52,-14],[44,-22],[58,12],[-30,24]]){cx.beginPath();cx.ellipse(x,y,5,3,0,.5,TAU);cx.lineTo(x,y);cx.fillStyle='#58b368';cx.fill();cx.strokeStyle='#3f8c3d';cx.lineWidth=.4;cx.stroke();el(cx,x+1.4,y-1,1.3,1,'#f08ca0',0,0);}
    pronto(cx);});
  [[-.96,-.2],[-.7,-.78],[.2,-1.02],[.86,-.56],[1.02,.2],[.5,.92],[-.6,.86]].forEach(([a,b],i)=>{const x=LAGO.x+a*LAGO.rx*1.04,y=LAGO.y+b*LAGO.ry*1.04;L.push([y,()=>up(x,y,()=>juncos(cx,T+i))]);});
  /* curral */
  const c=CURRAL,seg=()=>{for(const y of[-12.5,-7]){cx.beginPath();cx.roundRect(-8.3,y,16.6,2.2,1);cx.fillStyle='#e8cfa2';cx.fill();cx.stroke();}cx.beginPath();cx.roundRect(-1.5,-16,3,16,[1.4,1.4,.3,.3]);cx.fillStyle=luz(cx,'#f0d9ae',-16,0,.16);cx.fill();cx.stroke();},
    poste=()=>{cx.beginPath();cx.roundRect(-1.5,-16,3,16,[1.4,1.4,.3,.3]);cx.fillStyle=luz(cx,'#f0d9ae',-16,0,.16);cx.fill();cx.stroke();};
  for(let x=c.x+8;x<c.x+c.w;x+=16){L.push([c.y,()=>up(x,c.y,seg)]);if(Math.abs(x-(c.x+c.w/2))>20)L.push([c.y+c.h,()=>up(x,c.y+c.h,seg)]);}
  for(const x of[c.x,c.x+c.w])for(let y=c.y;y<=c.y+c.h;y+=13){L.push([y,()=>{
    if(y>c.y){const p=P3(x,y-13),q=P3(x,y);cx.setTransform(1,0,0,1,0,0);for(const h of[6,11.5]){cx.beginPath();cx.moveTo(p.sx,p.sy-h*p.k);cx.lineTo(q.sx,q.sy-h*q.k);cx.lineCap='round';cx.strokeStyle=LN;cx.lineWidth=2.9*q.k;cx.stroke();cx.strokeStyle='#e8cfa2';cx.lineWidth=1.9*q.k;cx.stroke();}}
    up(x,y,poste);}]);}
  L.push([c.y+15,()=>{somb(c.x+42,c.y+15,60);up(c.x+42,c.y+15,()=>abrigo(cx));}],[c.y+24,()=>up(c.x+118,c.y+24,()=>cocho(cx))]);
  /* galinheiro, casinhas, viveiro */
  L.push([GALINHEIRO.y,()=>{somb(GALINHEIRO.x,GALINHEIRO.y,32);up(GALINHEIRO.x,GALINHEIRO.y,()=>galinheiro(cx,ninho));}]);
  const caes=animais.filter(a=>a.t==='cao');CASINHAS.forEach((k,i)=>L.push([k.y,()=>{somb(k.x,k.y,20);up(k.x,k.y,()=>casinha(cx,caes[i]?caes[i].n:''));}]));
  L.push([VIVEIRO.y,()=>up(VIVEIRO.x,VIVEIRO.y,()=>viveiro(cx,T,louro.fala>0))]);
  passaros.forEach(b=>L.push([b.st==='voa'?b.y+40:b.y+.2,()=>{if(b.h>1)fl(b.x,b.y,()=>el(cx,0,0,1.6,.9,'rgba(20,50,20,.2)',0,0));up(b.x,b.y,()=>{cx.translate(0,-b.h);passaro(cx,b.cor,b.st==='voa',T+b.cor);},b.dir,1);}]));
}
function extrasTopo(H){
  const{up,P3,txt}=H;
  if(ninho>0)up(GALINHEIRO.x,GALINHEIRO.y,()=>{cx.translate(0,-42-Math.abs(Math.sin(T*3))*2);cx.beginPath();cx.roundRect(-9,-6,18,11,4);cx.fillStyle='#fff';cx.lineWidth=1.1;cx.stroke();cx.fill();pronto(cx);cx.save();cx.translate(-4,-.6);cx.scale(.8,.8);ICO.ovo(cx);cx.restore();cx.font='600 5px Fredoka,sans-serif';cx.textAlign='center';cx.fillStyle=LN;cx.fillText('×'+ninho,3.8,1.8);});
  if(pesca){const p=P3(P.x,P.y),q=P3(pesca.bx,pesca.by),e=p.k*P.e,x0=p.sx+P.dir*5*e,y0=p.sy-13*e,x1=p.sx+P.dir*15*e,y1=p.sy-32*e,by=q.sy+Math.sin(T*5)*q.k*.6;
    cx.setTransform(1,0,0,1,0,0);cx.lineCap='round';cx.strokeStyle=LN;cx.lineWidth=1.5*e;cx.beginPath();cx.moveTo(x0,y0);cx.lineTo(x1,y1);cx.stroke();cx.strokeStyle='#a9713f';cx.lineWidth=.9*e;cx.stroke();
    cx.strokeStyle='rgba(255,255,255,.9)';cx.lineWidth=Math.max(1,.25*e);cx.beginPath();cx.moveTo(x1,y1);cx.quadraticCurveTo((x1+q.sx)/2,Math.min(y1,by)-8*e,q.sx,by);cx.stroke();
    cx.setTransform(q.k,0,0,q.k,q.sx,by);pronto(cx);el(cx,0,0,1.3,1.3,'#fff');cx.beginPath();cx.arc(0,0,1.3,Math.PI,0);cx.fillStyle='#e0475a';cx.fill();cx.stroke();}
}
