/* ---------- estações, chuva, mascate e canteiros novos ---------- */
const ESTACOES=['Primavera','Verão','Outono','Inverno'],MASC_O={cor:'#7a9a5a',cab:'#9a9aa4',chapeu:1,fita:'#8a5a34',barba:1,f:5.2};
let chuva=false,secaMul=1,crescMul=1,visita=null,pingo=0;
const hashDia=d=>{let h=Math.imul(d+1,2654435761)>>>0;h^=h>>>15;h=Math.imul(h,2246822519)>>>0;h^=h>>>13;return h>>>0;};
const estacaoDe=d=>Math.floor(d/3)%4;
function chuvaDe(d){const h=hashDia(d),p=[.38,.16,.32,.2][estacaoDe(d)];if(h%1000/1000>=p)return null;const a=.12+(h>>>10)%45/100;return[a,a+.22];}
const rotuloClima=()=>ESTACOES[estacaoDe(Math.floor(relogio/DIA))]+(chuva?' · Chuva':'');
function qtd(q,k){let n=nomeItem(k).toLowerCase();if(q>1){if(n.startsWith('semente '))n='sementes '+n.slice(8);else if(n.endsWith('ão'))n=n.slice(0,-2)+'ões';else if(/[aeiou]$/.test(n))n+='s';}return q+' '+n;}
const precoCant=()=>40+15*(canteiros.length-12);
function geraTroca(){
  const n=nivel(),dar=['ovo','leite','peixe','madeira'];for(const k in PLANTAS)if(PLANTAS[k].v&&NV_PLANTA[k]<=n)dar.push(k);
  const kd=dar[R()*dar.length|0],vd=VENDA[kd],qd=clamp(Math.round((12+R()*30)/vd),1,8),tot=vd*qd,t=R();let kr,qr;
  if(t<.38){const ks=Object.keys(PLANTAS).filter(k=>NV_PLANTA[k]<=n+2&&k!==kd),k=ks[R()*ks.length|0];kr='s_'+k;qr=Math.max(1,Math.round(tot*1.3/PLANTAS[k].sem));}
  else if(t<.62){kr='racao';qr=Math.max(2,Math.round(tot*1.3/4));}
  else if(t<.82||kd==='madeira'){kr='moedas';qr=Math.round(tot*1.5)+2;}
  else{kr='madeira';qr=Math.max(2,Math.round(tot*1.3/3));}
  return{dar:[kd,qd],rec:[kr,qr]};
}
function vidaDia(d){
  let t='';const j=chuvaDe(d);
  if(d>0&&d%3===0)t+=' Começou '+['a primavera: tudo cresce mais depressa','o verão: a terra seca mais depressa','o outono','o inverno: as plantas crescem devagar'][estacaoDe(d)]+'.';
  if(j)t+=' Hoje deve chover.';
  if(d%2===1){visita={dia:d,x:790,y:200,dir:-1,ph:0,mov:false,trocas:[geraTroca(),geraTroca(),geraTroca()]};t+=' Seu Chico, o mascate, vem aí com a carroça para fazer trocas.';}
  return t;
}
function vidaPasso(dt){
  const d=Math.floor(relogio/DIA),ph=relogio%DIA/DIA,j=chuvaDe(d),e=estacaoDe(d),antes=chuva;
  chuva=!!j&&ph>=j[0]&&ph<j[1];crescMul=[1.15,1,1,.75][e];secaMul=[1,1.35,1,.85][e];
  if(chuva&&!antes)aviso('Começou a chover! A chuva rega a horta toda e mata a sede dos bichos.');
  if(chuva){animais.forEach(a=>a.agua=Math.max(a.agua,70));if((pingo-=dt)<=0){pingo=.42;if(som)chiado(.5,{bp:5200,q:.5,v:cena==='casa'?.03:.06});}}
  if(visita){const v=visita;v.mov=false;
    if(d===v.dia&&ph>=.08&&ph<.62){if(ir(v,336,172,46,dt,1))v.dir=-1;}else if(ir(v,790,200,46,dt,2))visita=null;}
}
function mascateM(){
  if(!visita)return fechar();
  let h='<h2>Seu Chico, o mascate</h2><p>"Bom dia! Trago coisas de longe. Vamos trocar?" Ele vai embora depois do almoço.</p><ul>';
  const nome=([k,q])=>k==='moedas'?q+' moedas':qtd(q,k);
  if(!visita.trocas.length)h+='<li class="vazio">Já trocou tudo o que ele trazia hoje.</li>';
  visita.trocas.forEach((t,i)=>{h+='<li class="pessoa"><span><b>Dá '+nome(t.dar)+'</b><small>Tem '+tem(t.dar[0])+'</small><small>Recebe '+nome(t.rec)+'</small></span><span class="bots"><button type="button" data-tr="'+i+'"'+(tem(t.dar[0])>=t.dar[1]?'':' disabled')+'>Trocar</button></span></li>';});
  abrir(h+'</ul><button type="button" id="sairM">Fechar</button>');ligar(mascateM);
  em('[data-tr]',d=>{const t=visita.trocas[+d.tr];if(!t||tem(t.dar[0])<t.dar[1])return;soma(t.dar[0],-t.dar[1]);if(t.rec[0]==='moedas')moedas+=t.rec[1];else soma(t.rec[0],t.rec[1]);visita.trocas.splice(+d.tr,1);tocar('moeda');ganha(4);mudou();mascateM();});
}
function vidaToque(x,y){
  if(visita&&!visita.mov&&bate(visita,40,36,x,y)){P.tx=visita.x-18;P.ty=visita.y+3;P.meta=null;tocar('carinho');mascateM();return true;}
  return false;
}
function carroca(g){
  for(const x of[-9,9]){el(g,x,-4,4,4,'#8a5a34');el(g,x,-4,1,1,'#3b2a2a');g.lineWidth=.35;g.beginPath();for(let i=0;i<4;i++){const a=i/4*Math.PI;g.moveTo(x-Math.cos(a)*3.6,-4-Math.sin(a)*3.6);g.lineTo(x+Math.cos(a)*3.6,-4+Math.sin(a)*3.6);}g.stroke();pronto(g);}
  g.beginPath();g.roundRect(-14,-14,28,9,1.2);g.fillStyle=luz(g,'#c98a4b',-14,-5,.12);g.fill();g.stroke();
  uni(g,'#d9b382',[E(-8,-16,3.4,3),E(-2,-16.6,3,3.4)]);el(g,5,-16,3,2.4,'#e0475a');el(g,9.6,-15.4,2,1.8,'#f6c945');
  for(const x of[-13,13])tubo(g,'#8a5a34',.7,g=>{g.moveTo(x,-14);g.lineTo(x,-28);});
  g.save();g.beginPath();g.moveTo(-16,-27);g.quadraticCurveTo(0,-34,16,-27);g.lineTo(16,-24);g.quadraticCurveTo(0,-30,-16,-24);g.closePath();g.fillStyle='#fffaf0';g.fill();g.clip();
  g.fillStyle='#e0475a';for(let x=-16;x<16;x+=8)g.fillRect(x,-36,4,14);g.restore();g.beginPath();g.moveTo(-16,-27);g.quadraticCurveTo(0,-34,16,-27);g.lineTo(16,-24);g.quadraticCurveTo(0,-30,-16,-24);g.closePath();g.stroke();
  tubo(g,'#8a5a34',.8,g=>{g.moveTo(-14,-9);g.lineTo(-22,-7);});
}
function vidaDesenho(L,H){
  const{up,somb}=H;
  if(visita){const v=visita;L.push([v.y-1,()=>{somb(v.x+18,v.y-1,30);up(v.x+18,v.y-1,()=>carroca(cx));}],[v.y,()=>{somb(v.x,v.y,13);up(v.x,v.y,()=>pessoa(cx,v,T,MASC_O),1.25);
    if(!v.mov&&visita.trocas.length)up(v.x,v.y,()=>{cx.translate(0,-44-Math.abs(Math.sin(T*3))*2);cx.beginPath();cx.roundRect(-7,-6,14,11.5,4);cx.fillStyle='#fff';cx.lineWidth=1.1;cx.stroke();cx.fill();pronto(cx);cx.scale(.8,.8);ICO.presente(cx);});}]);}
}
function climaDesenho(){
  if(cena==='casa')return;const cw=cv.width,ch=cv.height,u=cw/1280,e=estacaoDe(Math.floor(relogio/DIA));
  cx.setTransform(1,0,0,1,0,0);
  const tinta=[null,'rgba(255,225,110,.06)','rgba(255,140,40,.09)','rgba(150,190,255,.11)'][e];if(tinta){cx.fillStyle=tinta;cx.fillRect(0,0,cw,ch);}
  if(e===0||e===2)for(let i=0;i<16;i++){const x=((i*211+T*(18+i%4*7))%(cw/u+80)-40)*u,y=((i*137+T*(26+i%5*6))%(ch/u+40)-20)*u,a=T*(1+i%3*.5)+i;
    cx.save();cx.translate(x+Math.sin(a)*14*u,y);cx.rotate(a);cx.fillStyle=e?['#e07a1f','#c8553d','#e9a23a'][i%3]:['#f8b8c8','#fff','#f08ca0'][i%3];cx.beginPath();cx.ellipse(0,0,4.5*u,2.4*u,0,0,TAU);cx.fill();cx.restore();}
  if(chuva){cx.fillStyle='rgba(40,60,100,.2)';cx.fillRect(0,0,cw,ch);cx.strokeStyle='rgba(215,235,255,.6)';cx.lineWidth=1.5*u;cx.lineCap='round';cx.beginPath();
    for(let i=0;i<170;i++){const x=((i*97.3+T*260)%(cw/u+160)-80)*u,y=((i*61.7+T*(900+i%7*60))%(ch/u+60)-30)*u;cx.moveTo(x,y);cx.lineTo(x-7*u,y+22*u);}cx.stroke();}
}
