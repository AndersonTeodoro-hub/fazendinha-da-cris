/* ---------- níveis e pedidos dos vizinhos ---------- */
let xp=0,pedidos=[],diaPed=-1;
const NV_PLANTA={capim:1,cenoura:1,salsa:1,trigo:2,couve:2,feijao:3,arroz:3,quiabo:4,tomate:4,berinjela:5,morango:6,abobora:7,laranja:8,abacate:9};
const NV_BICHO={galinha:1,cao:1,gato:2,ovelha:3,vaca:4,porco:5};
const NV_MOVEL={estante:3,geladeira:4,lareira:5};
const VIZINHOS=['Dona Zefa','Seu Chico','Tia Nena','Seu Tonho','Dona Lurdes','Padre Bento','A venda do Zé','A escola'];
const nivelDe=x=>Math.max(1,Math.floor((1+Math.sqrt(1+x/5))/2));
const xpDe=n=>20*n*(n-1);
const nivel=()=>nivelDe(xp);
function abreNo(n){
  const l=[];for(const k in NV_PLANTA)if(NV_PLANTA[k]===n)l.push('semente de '+PLANTAS[k].nome.toLowerCase());
  for(const k in NV_BICHO)if(NV_BICHO[k]===n)l.push(SP[k].nome.toLowerCase());for(const k in NV_MOVEL)if(NV_MOVEL[k]===n)l.push(MOVEIS[k].nome.toLowerCase());
  if(n===3)l.push('pedidos de pratos cozinhados');return l;
}
function proximo(n){for(let i=n+1;i<=9;i++){const l=abreNo(i);if(l.length)return 'No nível '+i+' a loja passa a ter: '+l.join(', ')+'.';}return 'Já tem tudo desbloqueado.';}
function temPedido(p){return Object.keys(p.q).every(k=>tem(k)>=p.q[k]);}
function rotNivel(){const e=$('nv');if(!e)return;const t='Nível '+nivel();if(e.textContent!==t)e.textContent=t;e.className=pedidos.some(temPedido)?'pronto':'';}
function ganha(n){
  const a=nivel();xp+=n;const b=nivel();
  if(b>a){const pr=10*b,l=abreNo(b);moedas+=pr;tocar('sino');aviso('Subiu para o nível '+b+'! Recompensa: '+pr+' moedas.'+(l.length?' Novo: '+l.join(', ')+'.':''));mudou();}
}
function geraPedido(){
  const n=nivel(),op=[];
  for(const k in PLANTAS)if(PLANTAS[k].v&&NV_PLANTA[k]<=n)op.push(k);
  animais.forEach(a=>{const p=SP[a.t].prod;if(!op.includes(p))op.push(p);});
  if(n>=2)op.push('peixe');
  if(n>=3)for(const k in RECEITAS)if(Object.keys(RECEITAS[k].ing).every(i=>op.includes(i)))op.push(k);
  const q={},m=R()<.5&&op.length>1?2:1;let val=0;
  for(let i=0;i<m;i++){const k=op[R()*op.length|0];if(q[k])continue;const c=RECEITAS[k]?1:1+(R()*Math.min(3,1+n/2)|0);q[k]=c;val+=VENDA[k]*c;}
  return{quem:VIZINHOS[R()*VIZINHOS.length|0],q,moedas:Math.round(val*1.6)+5,xp:Math.max(4,Math.round(val/4))};
}
function diaNovo(){
  const d=Math.floor(relogio/DIA);if(d===diaPed||!jogadora)return;
  const primeiro=diaPed<0;diaPed=d;pedidos=[geraPedido(),geraPedido(),geraPedido()];rotNivel();gravar();
  if(!primeiro)aviso('Chegaram três pedidos novos dos vizinhos. Toque em Nível para ver.');
}
function pedidosM(){
  const n=nivel(),a=xpDe(n),b=xpDe(n+1);
  let h='<h2>Pedidos e nível</h2><p><b>Nível '+n+'</b> · '+Math.floor(xp-a)+' de '+(b-a)+' pontos <i class="mini larga"><i style="width:'+(xp-a)/(b-a)*100+'%"></i></i></p><p><small>Ganha pontos a plantar, colher, tratar dos bichos, cozinhar e entregar pedidos. '+proximo(n)+'</small></p><ul>';
  if(!pedidos.length)h+='<li class="vazio">Os pedidos de hoje estão todos entregues. Amanhã de manhã chegam novos.</li>';
  pedidos.forEach((p,i)=>{h+='<li class="pessoa"><span><b>'+p.quem+' pede</b><small>'+Object.keys(p.q).map(k=>p.q[k]+' '+NOME[k].toLowerCase()+' (tem '+tem(k)+')').join(', ')+'</small><small>Paga '+p.moedas+' moedas e '+p.xp+' pontos</small></span><span class="bots"><button type="button" data-ent="'+i+'"'+(temPedido(p)?'':' disabled')+'>Entregar</button></span></li>';});
  abrir(h+'</ul><p><small>Os pedidos mudam todas as manhãs. O que não for entregue perde-se.</small></p><button type="button" id="sairM">Fechar</button>');ligar(pedidosM);
  em('[data-ent]',d=>{const p=pedidos[+d.ent];if(!p||!temPedido(p))return;for(const k in p.q)soma(k,-p.q[k]);moedas+=p.moedas;pedidos.splice(+d.ent,1);tocar('moeda');ganha(p.xp);mudou();pedidosM();});
}
