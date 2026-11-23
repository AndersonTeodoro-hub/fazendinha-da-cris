/* ---------- a cidade: rua de terra, fazendas vizinhas, mercado, praça e picape ---------- */
const CIW=1180,CIH=330,RUA=176,CERCA=146,PORTAO={x:752,y:250},MEU=110,MERC={x:1040,y:CERCA},PRACA={x:560,y:262};
const VZS=[
 {id:'zefa',nome:'Dona Zefa',ela:1,gx:290,k:'couve',casa:'#f6d9a8',teto:'#2f7a74',o:{saia:1,avental:1,cor:'#3f9a8a',cab:'#2a1a12',coque:1,f:.7}},
 {id:'tonho',nome:'Seu Tonho',gx:470,k:'laranja',casa:'#e9eef5',teto:'#3f68a8',o:{cor:'#4f7fc8',cab:'#3a2a1a',chapeu:1,fita:'#8a5a34',barba:1,f:2.9}},
 {id:'lurdes',nome:'Dona Lurdes',ela:1,gx:650,k:'morango',casa:'#fbe3ec',teto:'#a8486e',o:{saia:1,cor:'#e07aa8',cab:'#8a4a22',tranca:1,laco:1,f:5.3}},
 {id:'bento',nome:'Seu Bento',gx:830,k:'abobora',casa:'#f1ead9',teto:'#5f7f2c',o:{cor:'#7a9a3a',cab:'#dcdce4',chapeu:1,fita:'#c4453a',oculos:1,f:3.6}}
];
VZS.forEach(v=>Object.assign(v,{x:v.gx-30,y:118,dir:1,ph:0,mov:false,wait:2,tx:v.gx-30,ty:118,am:0,pres:0,falou:false,trocas:[],quer:null,chama:false}));
const FALAS=['Esse ano a chuva veio na hora certa, graças a Deus.','O papagaio da sua fazenda já contou a novidade para a rua inteira.','Quem planta com carinho colhe em dobro.','Passe lá em casa para um café qualquer dia.','No mercado a caixa de sementes sai bem mais em conta.','Churrasco na praça junta a vizinhança toda.','Bicho bem tratado dá produto melhor, pode reparar.','Seu Chico, o mascate, só aparece dia sim, dia não.'];
let picape={x:160,y:RUA-9,dir:1},carga=[],hospede=null,churras=null,churDia=-1,cidDia=-1,viuCidade=false,motor=0;
const velP=()=>P.carro?230:84*(1+.06*melh.botas);
const pMerc=k=>Math.ceil(VENDA[k]*(1.25+.02*melh.balanca));
const campainha=()=>{osc(1050,.5,{v:.4});osc(830,.8,{v:.4,t:.28});};

function cidadeSalva(){return{d:cidDia,cd:churDia,viu:viuCidade,carga,pk:[Math.round(picape.x),Math.round(picape.y)],h:hospede,v:VZS.map(v=>({am:v.am,pres:v.pres,falou:v.falou,trocas:v.trocas,quer:v.quer}))};}
function cidadeLe(o){
  if(!o)return;cidDia=o.d|0;churDia=o.cd|0;viuCidade=!!o.viu;
  carga=(o.carga||[]).filter(c=>c&&nomeItem(c[0])&&c[1]>0);if(o.pk&&o.pk[0]>0){picape.x=o.pk[0];picape.y=o.pk[1];}
  hospede=o.h&&VZS[o.h.i]?o.h:null;
  (o.v||[]).forEach((s,i)=>{const v=VZS[i];if(!v||!s)return;v.am=clamp(s.am|0,0,100);v.pres=s.pres|0;v.falou=!!s.falou;
    v.trocas=(s.trocas||[]).filter(t=>t&&t.dar&&t.rec&&VENDA[t.dar[0]]);v.quer=s.quer&&VENDA[s.quer.k]?s.quer:null;});
}
function cidadeDia(d){
  VZS.forEach(v=>{v.falou=false;v.trocas=[geraTroca(),geraTroca()];const ks=DESPENSA.filter(k=>k!==v.k&&(!PLANTAS[k]||NV_PLANTA[k]<=nivel()+1)),k=ks[R()*ks.length|0];v.quer={k,q:2+(R()*4|0),p:Math.ceil(VENDA[k]*1.6)};});
  hospede=d>0&&R()<.65?{i:R()*VZS.length|0,ph:.16+R()*.3,st:0}:null;
}
function amizade(v,n){
  v.am=Math.min(100,v.am+n);
  if(v.pres<3&&v.am>=[30,60,100][v.pres]){v.pres++;const q=5*v.pres;soma('s_'+v.k,q);ganha(10*v.pres);tocar('sino');
    aviso(v.nome+' ficou mais '+(v.ela?'amiga':'amigo')+' e deu de presente '+qtd(q,'s_'+v.k)+' da própria fazenda.');}
}
function vai(x,y,m){P.rota=[];P.tx=x;P.ty=P.carro?clamp(y,RUA-14,RUA+14):y;P.meta=m;}
function irCidade(){
  cena='cidade';P.rota=[];P.x=P.tx=MEU;P.y=P.ty=CERCA+16;P.meta=null;P.carro=false;sel=null;baixo=false;cinto();tocar('porta');if(F3.salta)F3.salta();
  if(!viuCidade){viuCidade=true;aviso('Esta é a rua das fazendas. Toque no portão de um vizinho para chamar, vá ao mercado no fim da rua e use a picape para trazer as compras.');}gravar();
}
const cargaTxt=()=>{const o={};carga.forEach(([k,q])=>o[k]=(o[k]|0)+q);return Object.keys(o).map(k=>qtd(o[k],k)).join(', ');};
function descarrega(){const t=cargaTxt();carga.forEach(([k,q])=>soma(k,q));carga=[];tocar('colher');return t;}
function irFazenda(){
  const perto=P.carro||Math.hypot(picape.x-MEU,picape.y-RUA)<80;
  if(P.carro){P.carro=false;picape.x=MEU+48;picape.y=RUA-9;picape.dir=-1;}
  if(carga.length){if(carga.length<=1||perto)aviso('Descarregou na fazenda: '+descarrega()+'.');else aviso('As '+carga.length+' caixas ficaram na picape. Traga a picape até o portão para descarregar.');}
  cena='fazenda';P.rota=[];P.x=P.tx=WW-28;P.y=P.ty=PORTAO.y;P.meta=null;baixo=false;cinto();tocar('porta');if(F3.salta)F3.salta();gravar();
}
function picapeBotao(){
  if(P.carro){P.carro=false;P.rota=[];P.x=P.tx=picape.x;P.y=P.ty=Math.min(CIH-8,picape.y+12);P.meta=null;tocar('porta');return;}
  if(Math.hypot(picape.x-P.x,picape.y-P.y)<26)return sobe();
  vai(picape.x,picape.y+6,'picape');
}
function sobe(){P.carro=true;P.rota=[];P.x=P.tx=picape.x;P.y=P.ty=clamp(picape.y,RUA-14,RUA+14);P.meta=null;tocar('porta');osc(70,.5,{tipo:'sawtooth',f2:110,lp:400,v:.25});dizer(P.x,P.y-30,'Vrum!');}
function cidadeChega(m){
  if(m==='rua')irCidade();else if(m==='lar')irFazenda();else if(m==='picape')sobe();else if(m==='mercado')mercadoM();else if(m==='churras')churrasM();
  else if(m==='hosp'){if(hospede)vizM(hospede.i);}
  else if(typeof m==='string'&&m.startsWith('viz')){const v=VZS[+m.slice(3)];campainha();dizer(v.gx,CERCA-34,'Ó de casa!');v.chama=true;}
  else return false;
  return true;
}
function cidadePasso(dt){
  const d=Math.floor(relogio/DIA),ph=relogio%DIA/DIA;
  if(d!==cidDia&&jogadora){cidDia=d;cidadeDia(d);}
  if(hospede){const v=VZS[hospede.i];
    if(hospede.st===0&&ph>=hospede.ph){hospede.st=1;campainha();aviso('Tem visita! '+v.nome+' está no portão da fazenda e quer falar com você.');}
    else if(hospede.st===1&&ph>=hospede.ph+.24){hospede=null;if($('fundo').hidden)aviso(v.nome+' esperou no portão e foi embora.');}}
  if(cena==='fazenda'&&P.mov&&P.x>WW-11&&Math.abs(P.y-PORTAO.y)<10)return irCidade();
  if(churras&&(churras.t-=dt)<=0)churras=null;
  if(cena!=='cidade')return;
  if(P.carro){picape.x=P.x;picape.y=P.y;picape.dir=P.dir;if(P.mov&&!AMOSTRA.a_motor&&(motor-=dt)<=0){motor=.2;osc(60+R()*10,.22,{tipo:'sawtooth',lp:320,v:.13});}}
  else if(P.mov&&Math.abs(P.x-MEU)<9&&P.y<CERCA+5)return irFazenda();
  VZS.forEach((v,i)=>{v.mov=false;
    if(churras){if(ir(v,PRACA.x-44+i*30,PRACA.y+16+(i%2)*9,40,dt,1)){v.dir=PRACA.x>v.x?1:-1;if(R()<dt*.12)dizer(v.x,v.y-40,['Que churrasco bom!','Passa a farofa!','Viva a vizinhança!','Tá no ponto!'][R()*4|0]);}}
    else if(hospede&&hospede.i===i&&hospede.st===1){v.x=v.gx;v.y=CERCA-12;}
    else if(v.chama){if(ir(v,v.gx,CERCA-7,46,dt,1)){v.dir=P.x>v.x?1:-1;if(Math.hypot(P.x-v.gx,P.y-CERCA)<34){v.chama=false;tocar('carinho');vizM(i);}}}
    else{if(v.y>CERCA-2){ir(v,v.gx,CERCA-10,46,dt,1);return;}if((v.wait-=dt)<=0){v.wait=3+R()*6;v.tx=v.gx-64+R()*56;v.ty=104+R()*32;}ir(v,v.tx,v.ty,26,dt,1);}});
}
function cidadeToque(x,y){
  if(!P.carro&&bate(picape,52,28,x,y))return picapeBotao();
  if(bate({x:MEU,y:CERCA},36,42,x,y))return vai(MEU,CERCA+(P.carro?20:3),'lar');
  for(let i=0;i<VZS.length;i++){const v=VZS[i];if(bate({x:v.gx,y:CERCA},36,42,x,y)||bate(v,18,32,x,y)){
    if(hospede&&hospede.i===i&&hospede.st===1)return aviso(v.nome+' não está: foi fazer uma visita à sua fazenda.');return vai(v.gx,CERCA+9,'viz'+i);}}
  if(bate(MERC,190,66,x,y))return vai(MERC.x,CERCA+9,'mercado');
  if(bate(PRACA,60,40,x,y))return vai(PRACA.x-26,PRACA.y+6,'churras');
  alvoAndar(x,y);
}
function cidadeToqueFaz(x,y){
  if(hospede&&hospede.st===1&&bate({x:PORTAO.x-18,y:PORTAO.y+5},24,36,x,y)){P.rota=[];P.tx=PORTAO.x-36;P.ty=PORTAO.y+7;P.meta='hosp';return true;}
  if(bate(PORTAO,34,44,x,y)){P.rota=[];P.tx=WW-8;P.ty=PORTAO.y;P.meta='rua';return true;}
  return false;
}

/* ---------- conversas e negócios ---------- */
function vizM(i,fala){
  const v=VZS[i],nome=([k,q])=>k==='moedas'?q+' moedas':qtd(q,k);
  let h='<h2>'+v.nome+'</h2><p>Amizade: <b>'+v.am+'</b> de 100 <i class="mini larga"><i style="width:'+v.am+'%"></i></i></p><p>"'+(fala||'Que bom ver você, '+jogadora+'! Vamos prosear e fazer negócio?')+'"</p>';
  h+='<button type="button" id="prosa"'+(v.falou?' disabled':'')+'>'+(v.falou?'Já conversaram hoje':'Conversar um pouco')+'</button><ul>';
  if(v.quer){const q=v.quer,n=Math.min(tem(q.k),q.q);h+=linha(q.k,'Quer comprar '+qtd(q.q,q.k),'Paga '+q.p+' moedas cada. Você tem '+tem(q.k)+'.','<button type="button" id="vq"'+(n?'':' disabled')+'>Vender '+(n||q.q)+': +'+q.p*(n||q.q)+'</button>');}
  v.trocas.forEach((t,j)=>{h+=linha(t.rec[0]==='moedas'?'presente':t.rec[0],'Troca: você dá '+nome(t.dar),'Recebe '+nome(t.rec)+'. Você tem '+tem(t.dar[0])+'.','<button type="button" data-tr="'+j+'"'+(tem(t.dar[0])>=t.dar[1]?'':' disabled')+'>Trocar</button>');});
  if(!v.quer&&!v.trocas.length)h+='<li class="vazio">Por hoje já fizeram todos os negócios.</li>';
  abrir(h+'</ul><p><small>Conversar e negociar aumenta a amizade. Com 30, 60 e 100 de amizade vêm presentes da fazenda '+(v.ela?'dela':'dele')+'.</small></p><button type="button" id="sairM">Fechar</button>');ligar(()=>vizM(i));
  $('prosa').onclick=()=>{v.falou=true;amizade(v,5);tocar('carinho');gravar();vizM(i,FALAS[R()*FALAS.length|0]);};
  if($('vq'))$('vq').onclick=()=>{const q=v.quer,n=Math.min(tem(q.k),q.q);if(!n)return;moedas+=q.p*n;soma(q.k,-n);q.q-=n;if(!q.q)v.quer=null;tocar('moeda');ganha(3);conta('negocio',1);amizade(v,4);mudou();vizM(i,'Negócio fechado! Muito obrigad'+(v.ela?'a':'o')+'.');};
  em('[data-tr]',d=>{const t=v.trocas[+d.tr];if(!t||tem(t.dar[0])<t.dar[1])return;soma(t.dar[0],-t.dar[1]);if(t.rec[0]==='moedas')moedas+=t.rec[1];else soma(t.rec[0],t.rec[1]);v.trocas.splice(+d.tr,1);tocar('moeda');ganha(4);conta('negocio',1);amizade(v,4);mudou();vizM(i,'Boa troca para os dois!');});
}
let abaMerc='atacado';
function mercadoM(aba){
  abaMerc=aba||abaMerc;const perto=P.carro||Math.hypot(picape.x-MERC.x,picape.y-RUA)<170,cap=perto?6+melh.cacamba:1,cheio=carga.length>=cap;
  let h='<h2>Mercado dos Fazendeiros</h2><p>Moedas: <b>'+moedas+'</b> · Carga: <b>'+carga.length+' de '+cap+'</b> '+(perto?'caixas na picape':'caixa. A pé só dá para levar 1: venha de picape para levar '+(6+melh.cacamba))+'.</p>'+abas([['atacado','Comprar caixas'],['feira','Vender na feira']],abaMerc)+'<ul>';
  if(abaMerc==='atacado'){
    const cx1=(k,ico,nome,p,desc)=>linha(ico,nome,desc+' Tem: '+tem(k),'<button type="button" data-cx="'+k+'" data-p="'+p+'"'+(moedas<p||cheio?' disabled':'')+'>'+p+' moedas</button>');
    h+=cx1('racao','racao','Caixa com 10 rações',32,'Na loja sairia por 40.')+cx1('madeira','madeira','Caixa com 10 madeiras',24,'Para móveis e para o fogão.');
    for(const k in PLANTAS){const p=PLANTAS[k];if(nivel()>=NV_PLANTA[k])h+=cx1('s_'+k,'s_'+k,'Caixa com 10 sementes de '+p.nome.toLowerCase(),p.sem*8,'Na loja sairia por '+p.sem*10+'.');}
    if(carga.length)h+='<li class="vazio">Na carga: '+cargaTxt()+'. As caixas são descarregadas ao chegar ao portão da sua fazenda.</li>';
  }else{const ks=vendaveis();h+='<li class="vazio">A feira paga '+(25+2*melh.balanca)+'% a mais do que a loja.</li>';
    if(!ks.length)h+='<li class="vazio">Nada para vender. Traga colheitas, ovos, leite ou peixe.</li>';
    ks.forEach(k=>{h+=linha(k,NOME[k]+' ×'+inv[k],'Paga '+pMerc(k)+' cada','<button type="button" data-f1="'+k+'">Vender 1</button>'+(inv[k]>1?'<button type="button" data-ft="'+k+'">Vender '+inv[k]+': +'+pMerc(k)*inv[k]+'</button>':''));});}
  abrir(h+'</ul><button type="button" id="sairM">Fechar</button>');ligar(mercadoM);
  em('[data-cx]',d=>{const p=+d.p;if(moedas<p||carga.length>=cap)return;moedas-=p;carga.push([d.cx,10]);tocar('moeda');mudou();mercadoM();});
  const vf=(k,n)=>{moedas+=pMerc(k)*n;soma(k,-n);tocar('moeda');mercadoM();};em('[data-f1]',d=>vf(d.f1,1));em('[data-ft]',d=>vf(d.ft,inv[d.ft]));
}
function churrasM(){
  const d=Math.floor(relogio/DIA),ks=DESPENSA.filter(k=>tem(k)).sort((a,b)=>(b==='peixe')-(a==='peixe')||VENDA[a]-VENDA[b]),tot=ks.reduce((s,k)=>s+inv[k],0),feito=churDia===d;
  abrir('<h2>Churrasco na praça</h2><p>Chame a vizinhança para um churrasco entre amigos. Você leva 3 comidas da mochila (peixe primeiro, depois ovos, leite e colheitas).</p><p>Todos os vizinhos ganham 8 de amizade, quem está nas suas mãos fica com a energia cheia e você ganha 15 de XP.</p>'+
    '<button type="button" id="acende"'+(feito||tot<3||churras?' disabled':'')+'>'+(feito?'Já houve churrasco hoje':tot<3?'Faltam comidas: tem '+tot+' de 3':'Acender a churrasqueira')+'</button><button type="button" id="sairM">Fechar</button>');ligar(churrasM);
  $('acende').onclick=()=>{let n=3;for(const k of ks)while(n&&tem(k)){inv[k]--;if(!inv[k])delete inv[k];n--;}
    churDia=d;churras={t:40};P.energia=100;tocar('fogo');VZS.forEach(v=>{v.chama=false;amizade(v,8);});ganha(15);conta('churras',1);mimo(P.x,P.y-36);mudou();fechar();aviso('A churrasqueira está acesa e a vizinhança vem chegando!');};
}

/* ---------- desenhos ---------- */
ICO.picape=g=>{g.save();g.translate(0,3.6);g.scale(.36,.36);picapeD(g,0,false);g.restore();};
function picapeD(g,n,gente){
  const cor='#d9463e';
  g.beginPath();g.roundRect(-23,-13,25,8.5,1.2);g.fillStyle=tom(cor,-.12);g.fill();g.stroke();
  for(let i=0;i<Math.min(n,6);i++){const x=-21+(i%3)*7.4,y=-13-((i/3|0)+1)*5.6;g.beginPath();g.rect(x,y,6.6,5.4);g.fillStyle='#d9ab7e';g.fill();g.stroke();g.beginPath();g.moveTo(x,y+2.7);g.lineTo(x+6.6,y+2.7);g.stroke();}
  forma(g,luz(g,cor,-22,-4,.16),g=>{g.moveTo(2,-4.5);g.lineTo(2,-21);g.quadraticCurveTo(2,-22.5,3.6,-22.5);g.lineTo(11,-22.5);g.quadraticCurveTo(13,-22.5,14.4,-20);g.lineTo(16.6,-14.4);g.lineTo(23,-13.2);g.quadraticCurveTo(25,-12.6,25,-10.4);g.lineTo(25,-4.5);});
  g.beginPath();g.roundRect(4.4,-20.4,9.6,6.4,[1,2.6,.6,.6]);g.fillStyle='#bfe6ff';g.fill();g.stroke();
  if(gente){el(g,8.4,-16,2.5,2.7,'#f2c79c');g.beginPath();g.ellipse(8.4,-18.2,3.2,1.5,0,Math.PI,TAU);g.fillStyle='#e9c46a';g.fill();g.stroke();}
  g.beginPath();g.roundRect(-24,-6.4,50,2.4,1);g.fillStyle='#6a5560';g.fill();g.stroke();el(g,24.6,-9.4,1,1.5,'#fff3b0');
  for(const x of[-14,15]){el(g,x,-4.4,4.6,4.6,'#3b2a2a');el(g,x,-4.4,2,2,'#cfd6dd');}
}
function fachada(g,w,h,parede,teto){
  if(parede){g.beginPath();g.rect(-w/2,-h,w,h);g.fillStyle=parede;g.fill();g.stroke();forma(g,teto,g=>{g.moveTo(-w/2-4,-h);g.lineTo(0,-h-16);g.lineTo(w/2+4,-h);});}
  g.beginPath();g.roundRect(-5,-17,10,17,[2,2,0,0]);g.fillStyle=luz(g,'#8a5a34',-17,0,.14);g.fill();g.stroke();el(g,2.6,-8,.8,.8,'#f6c945');
  for(const x of[-w*.3,w*.3]){g.beginPath();g.roundRect(x-5.5,-19,11,9,1);g.fillStyle='#bfe6ff';g.fill();g.stroke();g.beginPath();g.moveTo(x,-19);g.lineTo(x,-10);g.moveTo(x-5.5,-14.5);g.lineTo(x+5.5,-14.5);g.stroke();
    g.beginPath();g.roundRect(x-6.5,-10,13,2.2,.8);g.fillStyle='#c4453a';g.fill();g.stroke();for(let i=-1;i<2;i++)el(g,x+i*3.6,-11,1.5,1.3,['#f08ca0','#ffd166','#fff'][i+1]);}
}
function fachadaMerc(g,parede){
  if(parede){g.beginPath();g.rect(-100,-42,200,42);g.fillStyle='#f3ead8';g.fill();g.stroke();}
  for(let i=0;i<20;i++){g.beginPath();g.moveTo(-100+i*10,-34);g.lineTo(-90+i*10,-34);g.lineTo(-90+i*10,-27);g.quadraticCurveTo(-95+i*10,-24,-100+i*10,-27);g.closePath();g.fillStyle=i%2?'#fffaf0':'#d9463e';g.fill();g.stroke();}
  g.beginPath();g.roundRect(-58,-49,116,14,3);g.fillStyle='#3f6fb5';g.fill();g.stroke();
  g.font='700 9px Fredoka,"Trebuchet MS",sans-serif';g.textAlign='center';g.fillStyle='#fff';g.fillText('MERCADO DOS FAZENDEIROS',0,-39,108);
  g.beginPath();g.roundRect(-11,-22,22,22,[2,2,0,0]);g.fillStyle='#8fd0ff';g.fill();g.stroke();g.beginPath();g.moveTo(0,-22);g.lineTo(0,0);g.stroke();
  for(const s of[-1,1]){g.beginPath();g.roundRect(s*56-26,-22,52,14,1.5);g.fillStyle='#bfe6ff';g.fill();g.stroke();
    for(let i=0;i<4;i++){const x=s*56-19+i*12.6;g.beginPath();g.rect(x-5,-7,10,7);g.fillStyle='#d9ab7e';g.fill();g.stroke();for(let j=-1;j<2;j++)el(g,x+j*3,-8,1.8,1.7,['#e0475a','#f6a23a','#58b368','#f6c945'][(i+j+4)%4]);}}
}
function portal(g,meu){
  for(const x of[-14,14]){g.beginPath();g.roundRect(x-1.8,-30,3.6,30,[1.4,1.4,.3,.3]);g.fillStyle=luz(g,'#a8744a',-30,0,.16);g.fill();g.stroke();}
  g.beginPath();g.roundRect(-18,-32,36,4,1.4);g.fillStyle='#8a5a34';g.fill();g.stroke();
  g.beginPath();g.roundRect(-15,-27,30,8,1.6);g.fillStyle=meu?'#f6c945':'#fbefd2';g.fill();g.stroke();
}
function churrasqueira(g,aceso,t){
  g.beginPath();g.rect(-9,-12,18,12);g.fillStyle='#b5503a';g.fill();g.stroke();for(let y=-9;y<0;y+=3){g.beginPath();g.moveTo(-9,y);g.lineTo(9,y);g.stroke();}
  g.beginPath();g.roundRect(-11,-15,22,3.4,1);g.fillStyle='#6a5560';g.fill();g.stroke();
  if(aceso){for(let i=0;i<4;i++){g.beginPath();g.roundRect(-8.5+i*4.6,-17.6,3.4,1.8,.8);g.fillStyle='#a8563a';g.fill();g.stroke();}
    for(let i=0;i<3;i++){const k=(t*.5+i/3)%1;el(g,Math.sin(t*2+i*2)*3*k,-19-k*22,2+k*4,2+k*3,'rgba(235,235,235,'+(.5-k*.5)+')',0,0);}
    el(g,0,-12.6,7,1.2,'rgba(255,150,40,'+(.6+Math.sin(t*9)*.3)+')',0,0);}
  g.beginPath();g.roundRect(16,-9,26,3,1);g.fillStyle='#e8cfa2';g.fill();g.stroke();for(const x of[19,39]){g.beginPath();g.rect(x-1,-6,2,6);g.fillStyle='#8a5a34';g.fill();g.stroke();}
}
const placa=(s,y,t,l)=>{cx.font='600 '+t+'px Fredoka,"Trebuchet MS",sans-serif';cx.textAlign='center';cx.fillStyle='#3b2a2a';cx.fillText(s,0,y,l||27);};
const sorte=s=>()=>(s=s*16807%2147483647)/2147483647;
function cidadeDesenho(L,H){
  const{up,fl,somb,txt,anel}=H,vaos=[MEU].concat(VZS.map(v=>v.gx));
  fl(PRACA.x,PRACA.y+4,()=>{el(cx,0,0,62,30,'#e3d2b0');el(cx,0,0,54,25,'#efe2c6',0,0);});
  fl(MERC.x,CERCA-6,()=>{cx.beginPath();cx.rect(-100,-8,200,22);cx.fillStyle='#d8cbb2';cx.fill();cx.stroke();});
  if(!F3.ok){L.push([104,()=>up(MEU+38,104,()=>fachada(cx,60,28,'#fbefd2','#c8553d'))]);VZS.forEach(v=>L.push([104,()=>up(v.gx+38,104,()=>fachada(cx,60,28,v.casa,v.teto))]));L.push([132,()=>up(MERC.x,132,()=>fachadaMerc(cx,1))]);}
  for(let x=8;x<CIW;x+=16){if(vaos.some(g=>Math.abs(x-g)<17)||Math.abs(x-MERC.x)<104)continue;L.push([CERCA,()=>up(x,CERCA,()=>{for(const y of[-12.5,-7]){cx.beginPath();cx.roundRect(-8.3,y,16.6,2.2,1);cx.fillStyle='#e8cfa2';cx.fill();cx.stroke();}
    cx.beginPath();cx.roundRect(-1.5,-16,3,16,[1.4,1.4,.3,.3]);cx.fillStyle=luz(cx,'#f0d9ae',-16,0,.16);cx.fill();cx.stroke();})]);}
  L.push([CERCA+.5,()=>{up(MEU,CERCA,()=>{portal(cx,1);placa('Fazenda da '+jogadora,-21.4,4.4);});}]);
  VZS.forEach((v,i)=>{
    L.push([CERCA+.5,()=>up(v.gx,CERCA,()=>{portal(cx);placa(v.nome,-21.2,5);})]);
    for(let j=0;j<8;j++){const x=v.gx-70+(j%4)*13,y=58+(j/4|0)*22;L.push([y,()=>up(x,y,()=>planta(cx,v.k,1,false,T+j),1.2)]);}
    L.push([40,()=>up(v.gx+84,40,()=>arvore(cx,0,0,sorte(3+i*5)))]);
    if(!(hospede&&hospede.i===i&&hospede.st===1))L.push([v.y,()=>{somb(v.x,v.y,13);up(v.x,v.y,()=>pessoa(cx,v,T,v.o),1.2);if(!churras&&(v.quer||v.trocas.length))up(v.x,v.y,()=>{cx.translate(0,-41-Math.abs(Math.sin(T*3+i))*1.5);cx.scale(.7,.7);ICO.presente(cx);});}]);
  });
  for(let i=0;i<15;i++){const x=36+i*80,y=236+i*53%70;if(Math.abs(x-PRACA.x)<86)continue;L.push([y,()=>up(x,y,()=>arvore(cx,0,0,sorte(5+i*3)))]);}
  L.push([PRACA.y,()=>{somb(PRACA.x,PRACA.y,26);up(PRACA.x,PRACA.y,()=>churrasqueira(cx,!!churras,T),1.3);if(!churras)up(PRACA.x,PRACA.y,()=>txt('Praça do churrasco',6,-30,'#fff',4.6));}]);
  L.push([CERCA+1,()=>up(MERC.x,CERCA,()=>txt('Entrada do mercado',0,-3,'#fff',4.6))]);
  L.push([picape.y,()=>{somb(picape.x,picape.y,46);up(picape.x,picape.y,()=>picapeD(cx,carga.length,P.carro),picape.dir*1.3,1.3);}]);
  if(!P.carro&&!dormindo)L.push([P.y,()=>{anel(P.x,P.y,8*P.e,'#fff','rgba(255,255,255,.2)');up(P.x,P.y,()=>pessoa(cx,P,T,opc(P)),P.e);}]);
}
/* o portão e a visita, vistos de dentro da fazenda */
function cidadeFazenda(L,H){
  const{up,fl,somb,txt}=H;
  fl(PORTAO.x-22,PORTAO.y,()=>{cx.beginPath();cx.roundRect(-34,-9,70,18,7);cx.fillStyle='#d9b98a';cx.fill();});
  L.push([PORTAO.y-15,()=>up(PORTAO.x,PORTAO.y-15,()=>{cx.beginPath();cx.roundRect(-1.8,-30,3.6,30,1.4);cx.fillStyle='#a8744a';cx.fill();cx.stroke();})]);
  L.push([PORTAO.y+15,()=>up(PORTAO.x,PORTAO.y+15,()=>{cx.beginPath();cx.roundRect(-1.8,-30,3.6,30,1.4);cx.fillStyle='#a8744a';cx.fill();cx.stroke();cx.beginPath();cx.roundRect(-16,-40,32,9,1.6);cx.fillStyle='#f6c945';cx.fill();cx.stroke();placa('Rua',-33.4,6);})]);
  if(hospede&&hospede.st===1){const v=VZS[hospede.i],x=PORTAO.x-18,y=PORTAO.y+5;L.push([y,()=>{somb(x,y,13);up(x,y,()=>pessoa(cx,{dir:-1,ph:0,mov:false},T,v.o),1.2);
    up(x,y,()=>{cx.translate(0,-46-Math.abs(Math.sin(T*3))*2);cx.beginPath();cx.roundRect(-16,-6,32,10,4);cx.fillStyle='#fff';cx.fill();cx.stroke();placa('Tem visita!',1.2,4.6,29);});}]);}
}
/* cenário 3D da rua */
function cidade3D(S,k){
  const{malha,lam,tex,relva}=k,plano=(w,h,mat,x,y,z)=>{const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),mat);m.rotation.x=-Math.PI/2;m.position.set(x,y,z);S.add(m);return m;};
  S.background=new THREE.Color('#bfe6ff');S.fog=new THREE.Fog('#bfe6ff',480,1100);S.add(new THREE.HemisphereLight('#ffffff','#8fcf7a',.78));
  const sol=new THREE.DirectionalLight('#fff1cf',.8);sol.position.set(CIW/2-180,360,CIH/2+260);sol.target.position.set(CIW/2,0,CIH/2-40);sol.castShadow=true;
  Object.assign(sol.shadow.camera,{left:-800,right:800,top:700,bottom:-700,near:10,far:1600});sol.shadow.mapSize.set(2048,2048);sol.shadow.bias=-.0008;S.add(sol,sol.target);
  plano(8000,8000,new THREE.MeshBasicMaterial({map:relva}),CIW/2,-.3,CIH/2);
  const terra=tex(64,48,8,g=>{let q=9;const r=()=>(q=q*16807%2147483647)/2147483647;g.fillStyle='#cfa877';g.fillRect(0,0,64,48);g.fillStyle='#b98f5f';g.fillRect(0,0,64,2.4);g.fillRect(0,45.6,64,2.4);
    for(let i=0;i<70;i++)el(g,r()*64,3+r()*42,.4+r()*1.3,.3+r()*.7,r()<.5?'rgba(120,80,40,.22)':'rgba(255,235,200,.3)',0,0);g.fillStyle='rgba(120,80,40,.16)';g.fillRect(0,14,64,3);g.fillRect(0,31,64,3);});
  terra.wrapS=THREE.RepeatWrapping;terra.repeat.set(60,1);plano(3840,48,new THREE.MeshBasicMaterial({map:terra}),CIW/2,.05,RUA);
  plano(8000,8000,new THREE.ShadowMaterial({opacity:.26}),CIW/2,.1,CIH/2).receiveShadow=true;
  const casa=(x,parede,teto)=>{malha(new THREE.BoxGeometry(60,28,40),lam(parede),x,14,84,S);
    const tri=new THREE.Shape();tri.moveTo(-25,0);tri.lineTo(0,20);tri.lineTo(25,0);tri.lineTo(-25,0);const t=malha(new THREE.ExtrudeGeometry(tri,{depth:72,bevelEnabled:false}),lam(teto),x-36,27,84,S);t.rotation.y=Math.PI/2;
    const f=new THREE.Mesh(new THREE.PlaneGeometry(60,28),new THREE.MeshBasicMaterial({map:tex(60,28,10,g=>{g.translate(30,28);fachada(g,60,28);}),transparent:true}));f.position.set(x,14,104.3);S.add(f);};
  casa(MEU+38,'#fbefd2','#c8553d');VZS.forEach(v=>casa(v.gx+38,v.casa,v.teto));
  malha(new THREE.BoxGeometry(200,42,84),lam('#f3ead8'),MERC.x,21,90,S);malha(new THREE.BoxGeometry(210,4,92),lam('#6a5560'),MERC.x,44,90,S);malha(new THREE.BoxGeometry(60,10,30),lam('#8fa0b0'),MERC.x+40,51,80,S);
  const fm=new THREE.Mesh(new THREE.PlaneGeometry(200,52),new THREE.MeshBasicMaterial({map:tex(200,52,8,g=>{g.translate(100,52);fachadaMerc(g);}),transparent:true}));fm.position.set(MERC.x,26,136.6);S.add(fm);
  let s=7;const r=()=>(s=s*16807%2147483647)/2147483647,gt=new THREE.CylinderGeometry(1.8,2.6,12,6),gc=new THREE.IcosahedronGeometry(11,0),mtk=lam('#8a5a34'),mc=[lam('#3f8f47'),lam('#4fa357'),lam('#2f7a4a')];
  for(let i=0;i<110;i++){const x=-300+r()*(CIW+600),z=r()<.6?-40-r()*260:CIH+10+r()*90,e=.8+r()*.9;malha(gt,mtk,x,6*e,z,S).scale.setScalar(e);malha(gc,mc[i%3],x,19*e,z,S).scale.set(e,e*1.15,e);}
  [[-200,-640,360],[400,-760,420],[1000,-700,380],[1500,-600,360]].forEach(([x,z,q])=>{malha(new THREE.SphereGeometry(q,24,12),lam('#7fcf6a'),x,-q*.74,z,S).castShadow=false;});
}
function cidade2D(){
  cx.fillStyle='#72c860';cx.fillRect(0,0,CIW,CIH);cx.fillStyle='#cfa877';cx.fillRect(0,RUA-24,CIW,48);
  const up=(x,y,f,ex,ey)=>{cx.save();cx.translate(x,y);cx.scale(ex||1,Math.abs(ey||ex||1));pronto(cx);f();cx.restore();},L=[];
  cidadeDesenho(L,{up,fl:up,somb:(x,y,w)=>el(cx,x,y,w*.46,w*.24,'rgba(20,50,20,.28)',0,0),anel:()=>{},txt:(s,x,y,c,t)=>escrever(s,x,y,c,t)});L.sort((a,b)=>a[0]-b[0]).forEach(l=>l[1]());
}
