/* ---------- níveis e pedidos dos vizinhos ---------- */
let xp=0,pedidos=[],diaPed=-1,rotNv='';
const melh={regador:0,ferr:0,galinheiro:0,botas:0};
const MELHORIAS={regador:{nome:'Regador maior',ico:'regador',desc:t=>'a rega dura '+25*t+'% mais tempo.'},ferr:{nome:'Ferramentas melhores',ico:'enxada',desc:t=>'trabalhar gasta '+[0,20,35,50][t]+'% menos energia.'},
  galinheiro:{nome:'Galinheiro maior',ico:'ovo',desc:t=>'guarda '+(12+6*t)+' ovos e as galinhas põem mais depressa.'},botas:{nome:'Botas de couro',ico:'mochila',desc:t=>'a família anda '+12*t+'% mais depressa.'}};
const precoMelh=t=>[60,150,300][t],nvMelh=t=>[2,4,6][t];
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
function rotNivel(){const e=$('nv');if(!e)return;const n=nivel(),a=xpDe(n),b=xpDe(n+1),t='Nível '+n+' <small>'+Math.floor(xp-a)+'/'+(b-a)+' XP</small><i class="mini"><i style="width:'+Math.round((xp-a)/(b-a)*100)+'%"></i></i>';
  if(t!==rotNv){rotNv=t;e.innerHTML=t;}e.classList.toggle('pronto',pedidos.some(temPedido));}
function ganha(n){
  const a=nivel();xp+=n;const b=nivel();
  if(b>a){const pr=10*b,l=abreNo(b);moedas+=pr;tocar('sino');aviso('Subiu para o nível '+b+'! Recompensa: '+pr+' moedas.'+(l.length?' Novo: '+l.join(', ')+'.':''));if(typeof P!=='undefined'&&cena==='fazenda'){mimo(P.x,P.y-40);dizer(P.x,P.y-50,'Nível '+b+'!');}mudou();}
  else{rotNivel();const e=$('nv');if(e){e.classList.remove('ganhou');void e.offsetWidth;e.classList.add('ganhou');}}
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
  const primeiro=diaPed<0;diaPed=d;pedidos=[geraPedido(),geraPedido(),geraPedido()];const extra=vidaDia(d);rotNivel();gravar();if(!primeiro)tocar('galo');
  if(!primeiro||extra)aviso((primeiro?'':'Bom dia! Chegaram três pedidos novos dos vizinhos.')+extra);
}
function pedidosM(){
  const n=nivel(),a=xpDe(n),b=xpDe(n+1);
  let h='<h2>Pedidos e nível</h2><p><b>Nível '+n+'</b> · '+Math.floor(xp-a)+' de '+(b-a)+' pontos de XP <i class="mini larga"><i style="width:'+(xp-a)/(b-a)*100+'%"></i></i></p><p><small>Ganha pontos a plantar, colher, tratar dos bichos, cozinhar e entregar pedidos. '+proximo(n)+'</small></p><ul>';
  if(!pedidos.length)h+='<li class="vazio">Os pedidos de hoje estão todos entregues. Amanhã de manhã chegam novos.</li>';
  pedidos.forEach((p,i)=>{h+='<li class="pessoa"><span><b>'+p.quem+' pede</b><small>'+Object.keys(p.q).map(k=>qtd(p.q[k],k)+' (tem '+tem(k)+')').join(', ')+'</small><small>Paga '+p.moedas+' moedas e '+p.xp+' pontos</small></span><span class="bots"><button type="button" data-ent="'+i+'"'+(temPedido(p)?'':' disabled')+'>Entregar</button></span></li>';});
  abrir(h+'</ul><p><small>Os pedidos mudam todas as manhãs. O que não for entregue perde-se.</small></p><button type="button" id="copia">Cópia de segurança do jogo</button><button type="button" id="sairM">Fechar</button>');ligar(pedidosM);$('copia').onclick=copiaM;
  em('[data-ent]',d=>{const p=pedidos[+d.ent];if(!p||!temPedido(p))return;for(const k in p.q)soma(k,-p.q[k]);moedas+=p.moedas;pedidos.splice(+d.ent,1);tocar('moeda');ganha(p.xp);mudou();pedidosM();});
}

/* cópia de segurança: o jogo inteiro num código que se copia e se cola */
function copiaM(){
  gravar();let cod='';try{cod=btoa(unescape(encodeURIComponent(localStorage.getItem('fazendinhaHD')||'')));}catch(e){}
  abrir('<h2>Cópia de segurança</h2><p>Este código guarda o jogo inteiro. Copie e guarde, por exemplo numa mensagem para si mesma. Serve para recuperar o jogo ou passar para outro aparelho.</p><label for="codOut">Código deste jogo</label><textarea id="codOut" rows="3" readonly></textarea><button type="button" id="copiar">Copiar código</button>'+
    '<label for="codIn">Recuperar um jogo: cole aqui o código</label><textarea id="codIn" rows="3"></textarea><button type="button" id="repor">Recuperar este jogo</button><p id="codMsg"><small>Recuperar substitui o jogo atual.</small></p><button type="button" id="sairM">Fechar</button>');ligar(copiaM);
  $('codOut').value=cod;
  $('copiar').onclick=()=>{$('codOut').select();const ok=()=>{$('codMsg').textContent='Código copiado.';};try{navigator.clipboard.writeText(cod).then(ok,()=>{$('codMsg').textContent='Selecione o código acima e copie à mão.';});}catch(e){$('codMsg').textContent='Selecione o código acima e copie à mão.';}};
  $('repor').onclick=()=>{try{const t=decodeURIComponent(escape(atob($('codIn').value.trim()))),o=JSON.parse(t);if(!o.jogadora||!Array.isArray(o.a))throw 0;jogadora='';localStorage.setItem('fazendinhaHD',t);location.reload();}catch(e){$('codMsg').textContent='Este código não é válido. Confirme se foi colado inteiro.';}};
}
