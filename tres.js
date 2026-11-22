/* ---------- cenário 3D (Three.js) com personagens 2D por cima ---------- */
const F3={ok:false,c3:null};
(function(){
  let rd,sc,cam3,pas,chaoMat,tx=240,tz=180;
  const v=new THREE.Vector3();
  const tex=(w,h,e,f)=>{const c=document.createElement('canvas');c.width=w*e;c.height=h*e;const g=c.getContext('2d');g.scale(e,e);pronto(g);f(g);const t=new THREE.CanvasTexture(c);t.anisotropy=8;return t;};
  const lam=c=>new THREE.MeshLambertMaterial({color:c,flatShading:true});
  function malha(geo,mat,x,y,z,pai){const m=new THREE.Mesh(geo,mat);m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;(pai||sc).add(m);return m;}

  F3.liga=function(){
    try{
      const c3=document.createElement('canvas');c3.id='c3';cv.parentNode.insertBefore(c3,cv);
      rd=new THREE.WebGLRenderer({canvas:c3,antialias:true});rd.setPixelRatio(1);rd.shadowMap.enabled=true;rd.shadowMap.type=THREE.PCFSoftShadowMap;
      sc=new THREE.Scene();sc.background=new THREE.Color('#bfe6ff');sc.fog=new THREE.Fog('#bfe6ff',480,1100);
      cam3=new THREE.PerspectiveCamera(34,1,10,2400);
      sc.add(new THREE.HemisphereLight('#ffffff','#8fcf7a',.78));
      const sol=new THREE.DirectionalLight('#fff1cf',.8);sol.position.set(60,330,400);sol.target.position.set(240,0,150);sol.castShadow=true;
      Object.assign(sol.shadow.camera,{left:-460,right:460,top:460,bottom:-460,near:10,far:1200});sol.shadow.mapSize.set(2048,2048);sol.shadow.bias=-.0006;sc.add(sol,sol.target);
      /* chão */
      const relva=tex(64,64,8,g=>{let q=3;const r=()=>(q=q*16807%2147483647)/2147483647;g.fillStyle='#72c860';g.fillRect(0,0,64,64);
        for(let i=0;i<26;i++){const x=r()*64,y=r()*64,rr=5+r()*9,k=g.createRadialGradient(x,y,0,x,y,rr),c=r()<.5?'40,110,50':'190,240,140';k.addColorStop(0,'rgba('+c+',.14)');k.addColorStop(1,'rgba('+c+',0)');g.fillStyle=k;g.fillRect(x-rr,y-rr,rr*2,rr*2);}
        g.lineWidth=.3;for(const c of['#4f9f45','#6cc45c','#3f8c3d','#8fdc74']){g.strokeStyle=c;g.beginPath();for(let i=0;i<420;i++){const x=r()*64,y=r()*64;g.moveTo(x,y);g.lineTo(x+(r()-.5)*1.2,y-.8-r()*1.8);}g.stroke();}
        for(let i=0;i<14;i++){const x=r()*64,y=r()*64;el(g,x,y,.6,.6,['#fff','#f6c945','#f08ca0','#b58cf0'][i%4],0,0);}});
      relva.wrapS=relva.wrapT=THREE.RepeatWrapping;relva.repeat.set(4000/64,4000/64);
      const base=new THREE.Mesh(new THREE.PlaneGeometry(4000,4000),new THREE.MeshBasicMaterial({map:relva}));base.rotation.x=-Math.PI/2;base.position.set(WW/2,-.3,WH/2);sc.add(base);
      chaoMat=new THREE.MeshBasicMaterial({color:'#6cc45c'});const ch=new THREE.Mesh(new THREE.PlaneGeometry(WW,WH),chaoMat);ch.rotation.x=-Math.PI/2;ch.position.set(WW/2,0,WH/2);sc.add(ch);
      const sm=new THREE.Mesh(new THREE.PlaneGeometry(4000,4000),new THREE.ShadowMaterial({opacity:.26}));sm.rotation.x=-Math.PI/2;sm.position.set(WW/2,.1,WH/2);sm.receiveShadow=true;sc.add(sm);
      const b=TOP-3;
      /* celeiro */
      const perfil=new THREE.Shape();[[8,0],[8,30],[13.5,42],[35,54],[56.5,42],[62,30],[62,0]].forEach(([x,y],i)=>i?perfil.lineTo(x,y):perfil.moveTo(x,y));
      malha(new THREE.ExtrudeGeometry(perfil,{depth:38,bevelEnabled:false}),lam('#c4453a'),0,0,b-38);
      const tel=[[4.6,28.4],[12,43.6],[35,56.6],[58,43.6],[65.4,28.4]],mt=lam('#6a5560');
      for(let i=0;i<4;i++){const[ax,ay]=tel[i],[bx,by]=tel[i+1],m=malha(new THREE.BoxGeometry(Math.hypot(bx-ax,by-ay)+1.4,2.4,43),mt,(ax+bx)/2,(ay+by)/2,b-19);m.rotation.z=Math.atan2(by-ay,bx-ax);}
      const fc=new THREE.Mesh(new THREE.PlaneGeometry(70,60),new THREE.MeshBasicMaterial({map:tex(70,60,10,g=>{g.translate(0,-(b-60));g.beginPath();g.rect(0,b-60,70,60);g.clip();celeiro(g);}),transparent:true}));fc.position.set(35,30,b+.3);sc.add(fc);
      malha(new THREE.CylinderGeometry(10,10,52,14),lam('#b9c4cf'),-16,26,b-22);malha(new THREE.SphereGeometry(10,14,8,0,Math.PI*2,0,Math.PI/2),lam('#8fa0b0'),-16,52,b-22);
      /* casa */
      malha(new THREE.BoxGeometry(68,31,44),lam('#fbefd2'),400,15.5,b-22);
      const tri=new THREE.Shape();tri.moveTo(-27,0);tri.lineTo(0,25);tri.lineTo(27,0);tri.lineTo(-27,0);
      const tl=malha(new THREE.ExtrudeGeometry(tri,{depth:84,bevelEnabled:false}),lam('#c8553d'),358,29,b-22);tl.rotation.y=Math.PI/2;
      malha(new THREE.BoxGeometry(8,20,8),lam('#b5503a'),422,52,b-30);
      const fh=new THREE.Mesh(new THREE.PlaneGeometry(84,34),new THREE.MeshBasicMaterial({map:tex(84,34,10,g=>{g.translate(-358,-(b-31));g.beginPath();g.rect(358,b-31,84,34);g.clip();casaFora(g,b);}),transparent:true}));fh.position.set(400,14,b+.3);sc.add(fh);
      /* moinho */
      malha(new THREE.CylinderGeometry(7,12,70,10),lam('#f3ead8'),160,35,-50);malha(new THREE.ConeGeometry(9.5,14,10),lam('#8a3a2a'),160,77,-50);
      pas=new THREE.Group();pas.position.set(160,66,-37);sc.add(pas);
      for(let i=0;i<4;i++){const p=malha(new THREE.BoxGeometry(5,40,.8),lam('#fffaf0'),0,0,0,pas);p.geometry.translate(0,22,0);p.rotation.z=i*Math.PI/2;}
      malha(new THREE.SphereGeometry(2.6,8,6),lam('#5a3a22'),0,0,0,pas);
      /* colinas e arvoredo à volta */
      let s=5;const r=()=>(s=s*16807%2147483647)/2147483647;
      [[-260,-520,300],[120,-640,380],[520,-560,320],[900,-480,300],[-420,-220,240],[960,-140,260]].forEach(([x,z,q])=>{const m=malha(new THREE.SphereGeometry(q,24,12),lam('#7fcf6a'),x,-q*.74,z);m.castShadow=false;});
      const gt=new THREE.CylinderGeometry(1.8,2.6,12,6),gc=new THREE.IcosahedronGeometry(11,0),gc2=new THREE.IcosahedronGeometry(7.5,0),mtk=lam('#8a5a34'),mc=[lam('#3f8f47'),lam('#4fa357'),lam('#2f7a4a')];
      for(let i=0;i<70;i++){let x,z;const k=r();if(k<.4){x=-40-r()*240;z=-120+r()*(WH+140);}else if(k<.8){x=WW+40+r()*240;z=-120+r()*(WH+140);}else{x=-200+r()*(WW+400);z=-90-r()*220;}
        if(Math.hypot(x-160,z+50)<40||(x>-40&&x<90&&z>-10))continue;const e=.8+r()*.9,m=mc[i%3];
        malha(gt,mtk,x,6*e,z).scale.setScalar(e);malha(gc,m,x,19*e,z).scale.set(e,e*1.15,e);malha(gc2,m,x+2*e,30*e,z-1).scale.setScalar(e);}
      F3.c3=c3;F3.ok=true;
      mundo=(sx,sy)=>{const q=cv.getBoundingClientRect();v.set((sx-q.left)/q.width*2-1,-((sy-q.top)/q.height*2-1),.5).unproject(cam3).sub(cam3.position);const t=-cam3.position.y/v.y;return[cam3.position.x+v.x*t,cam3.position.z+v.z*t];};
      const bate2=bate;bate=(e,w,h,x,y)=>{if(cena==='casa')return bate2(e,w,h,x,y);const q=cv.getBoundingClientRect(),px=(pt.x-q.left)/q.width*cv.width,py=(pt.y-q.top)/q.height*cv.height,p=P3(e.x,e.y);return Math.abs(px-p.sx)<w/2*p.k&&py>p.sy-h*p.k&&py<p.sy+5*p.k;};
    }catch(e){F3.ok=false;const c=document.getElementById('c3');if(c)c.remove();}
  };
  F3.chao=function(G){if(chaoMat.map)chaoMat.map.dispose();const t=new THREE.CanvasTexture(G);t.anisotropy=rd.capabilities.getMaxAnisotropy();chaoMat.map=t;chaoMat.color.set('#ffffff');chaoMat.needsUpdate=true;};
  const pj=(x,y,h)=>{v.set(x,h||0,y).project(cam3);return[(v.x+1)/2*cv.width,(1-v.y)/2*cv.height];};
  function P3(x,y){const a=pj(x,y),b=pj(x+1,y);return{sx:a[0],sy:a[1],k:b[0]-a[0]};}
  function camara(dt){
    const k=Math.min(1,dt*5);tx+=(clamp(P.x,70,WW-70)-tx)*k;tz+=(clamp(P.y,TOP+50,WH-40)-tz)*k;
    const asp=cv.width/cv.height;cam3.aspect=asp;cam3.fov=Math.max(34,2*Math.atan(190/asp/2/311)*180/Math.PI);
    cam3.position.set(tx,230,tz+210);cam3.lookAt(tx,0,tz-14);cam3.updateProjectionMatrix();cam3.updateMatrixWorld();
  }
  let ultimo=0;
  F3.quadro=function(){
    const c3=F3.c3;if(c3.width!==cv.width||c3.height!==cv.height||c3.style.width!==cv.style.width){rd.setSize(cv.width,cv.height,false);c3.style.width=cv.style.width;c3.style.height=cv.style.height;}
    c3.style.left=cv.offsetLeft+'px';c3.style.top=cv.offsetTop+'px';c3.style.visibility='visible';
    camara(Math.min(.05,T-ultimo));ultimo=T;pas.rotation.z=-T*.6;
    const n=escV;sc.background.setRGB(.75-.68*n,.9-.8*n,1-.72*n);sc.fog.color.copy(sc.background);
    rd.render(sc,cam3);
    cx.setTransform(1,0,0,1,0,0);cx.clearRect(0,0,cv.width,cv.height);
    desenho();
  };

  /* ---------- personagens e objetos 2D projetados ---------- */
  function txt(s,x,y,cor,tam){cx.font='600 '+(tam||6.5)+'px Fredoka,"Trebuchet MS",sans-serif';cx.textAlign='center';cx.lineWidth=1.7;cx.strokeStyle=LN;cx.strokeText(s,x,y);cx.fillStyle=cor||'#fff';cx.fillText(s,x,y);pronto(cx);}
  function desenho(){
    const cw=cv.width,chh=cv.height,L=[],b=TOP-3;
    const up=(x,y,f,ex,ey)=>{const p=P3(x,y);if(p.sx<-60*p.k||p.sx>cw+60*p.k||p.sy<-10*p.k||p.sy>chh+70*p.k)return;cx.setTransform(p.k*(ex||1),0,0,p.k*Math.abs(ey||ex||1),p.sx,p.sy);pronto(cx);f();};
    const fl=(x,y,f)=>{const a=pj(x,y),q=pj(x+1,y),c=pj(x,y+1);cx.setTransform(q[0]-a[0],q[1]-a[1],c[0]-a[0],c[1]-a[1],a[0],a[1]);pronto(cx);f();};
    const somb=(x,y,w,k)=>fl(x,y,()=>el(cx,0,0,w*.46*(k||1),w*.24*(k||1),'rgba(20,50,20,.28)',0,0));
    const anel=(x,y,w,cor,fundo)=>fl(x,y,()=>{cx.setLineDash([2.4,1.8]);cx.lineDashOffset=-T*5;cx.strokeStyle=cor;cx.lineWidth=1;el(cx,0,0,w,w*.62,fundo);cx.setLineDash([]);});
    canteiros.forEach(c=>fl(c.x,c.y,()=>canteiro(cx,Object.assign({},c,{x:0,y:0}))));
    [[232,TOP-12,3],[300,TOP-15,7],[462,TOP-13,11]].forEach(([x,y,sd])=>L.push([y,()=>up(x,y,()=>{let s=sd;arvore(cx,0,0,()=>(s=s*16807%2147483647)/2147483647);})]));
    L.push([TOP-12,()=>{up(70,TOP-12,()=>{fardo(cx,0,0);fardo(cx,14,0);fardo(cx,7,-9);});}]);
    for(let x=112;x<212;x+=11)L.push([TOP-8,()=>up(x,TOP-8,()=>girassol(cx,0,0,15+(x*7%5)))]);
    for(let x=72;x<WW+4;x+=16){if(x>350&&x<448)continue;L.push([TOP-1,()=>up(x,TOP-1,()=>{for(const y of[-12.5,-7]){cx.beginPath();cx.roundRect(-8.3,y,16.6,2.2,1);cx.fillStyle='#e8cfa2';cx.fill();cx.stroke();}
      cx.beginPath();cx.roundRect(-1.5,-16,3,16,[1.4,1.4,.3,.3]);cx.fillStyle=luz(cx,'#f0d9ae',-16,0,.16);cx.fill();cx.stroke();})]);}
    canteiros.forEach(c=>{if(c.k)L.push([c.y+7,()=>{const pl=PLANTAS[c.k],f=c.g/pl.t,n=pl.n===1?[[0,1.6]]:pl.n===2?[[-6,1.25],[6,1.25]]:[[-8,1.15],[0,1.15],[8,1.15]];
      n.forEach(([dx,e],i)=>up(c.x+dx,c.y+4+(i%2)*2,()=>planta(cx,c.k,f,c.morta,T+i+c.x),e));}]);});
    L.push([262,()=>up(204,262,()=>poco(cx,0,0))]);
    arvores.forEach(a=>L.push([a.y,()=>up(a.x,a.y,()=>arvoreCorte(cx,Object.assign({},a,{x:0,y:0}),T))]));
    potes.forEach(p=>L.push([p.y-1,()=>{somb(p.x,p.y+1,11);up(p.x,p.y,()=>{cx.translate(0,-2);ICO[p.k](cx);},1.15);}]));
    itens.forEach(i=>L.push([i.y,()=>{somb(i.x,i.y,7);up(i.x,i.y,()=>{cx.translate(0,-5-Math.sin(i.t*4)*1.2);ICO[i.k](cx);
      cx.fillStyle='rgba(255,255,255,'+Math.abs(Math.sin(i.t*3))+')';cx.beginPath();cx.moveTo(4,-6.5);cx.lineTo(4.6,-5.1);cx.lineTo(6,-4.5);cx.lineTo(4.6,-3.9);cx.lineTo(4,-2.5);cx.lineTo(3.4,-3.9);cx.lineTo(2,-4.5);cx.lineTo(3.4,-5.1);cx.fill();});}]));
    animais.forEach(a=>L.push([a.y,()=>{const sp=SP[a.t],pulo=a.hop>0?Math.sin(Math.PI*(1-a.hop/.3))*6:0;
      if(a===sel)anel(a.x,a.y,sp.w*.6,'#f6c945','rgba(255,240,150,.25)');
      somb(a.x,a.y,sp.w,1-pulo*.04);up(a.x,a.y,()=>{cx.translate(0,-pulo/ESC);sp.draw(cx,a,estado(a));},a.dir*ESC,ESC);}]));
    if(!dormindo)GENTE.forEach(f=>{if(f===P||!f.dentro)L.push([f.y,()=>{if(f===P)anel(f.x,f.y,8*f.e,'#fff','rgba(255,255,255,.2)');else somb(f.x,f.y,11*f.e);up(f.x,f.y,()=>pessoa(cx,f,T,opc(f)),f.e);}]);});
    if(bola&&!bola.leva)L.push([bola.y,()=>{somb(bola.x,bola.y,6);up(bola.x,bola.y,()=>{cx.translate(0,-2.5-bola.z);ICO.bola(cx);});}]);
    L.sort((a,q)=>a[0]-q[0]).forEach(l=>l[1]());
    if(bola&&bola.leva){const a=bola.leva,sp=SP[a.t];up(a.x+a.dir*(sp.w/2+2.5),a.y,()=>{cx.translate(0,-sp.h*.5);ICO.bola(cx);});}
    if(escV<.5)for(let i=0;i<5;i++){const x=WW*(.12+i*.19)+Math.sin(T*.5+i*2)*34,y=TOP+50+(i*67%230)+Math.cos(T*.7+i*3)*20,f=Math.abs(Math.sin(T*13+i)),c=['#f08ca0','#8fd0ff','#ffd166'][i%3];
      cx.globalAlpha=1-escV*2;up(x,y,()=>{cx.translate(0,-9);el(cx,-f*1.5,0,1.6*f+.2,1.9,c,-.3);el(cx,f*1.5,0,1.6*f+.2,1.9,c,.3);el(cx,0,0,.35,1.4,LN,0,0);});cx.globalAlpha=1;}
    if(escV>0){cx.setTransform(1,0,0,1,0,0);const k=escV*(1-escV)*4;cx.fillStyle='rgba(255,130,60,'+k*.14+')';cx.fillRect(0,0,cw,chh);cx.fillStyle='rgba(14,20,62,'+escV*.52+')';cx.fillRect(0,0,cw,chh);
      for(const[gx,gh]of[[35,40],[378,17],[422,17]])up(gx,b+1,()=>{const q=cx.createRadialGradient(0,-gh,0,0,-gh,22);q.addColorStop(0,'rgba(255,214,110,'+escV*.6+')');q.addColorStop(1,'rgba(255,214,110,0)');cx.fillStyle=q;cx.fillRect(-22,-gh-22,44,44);});
      for(let i=0;i<22;i++){const x=(i*83+Math.sin(T*.4+i)*18+WW)%WW,y=TOP+14+(i*47+Math.cos(T*.3+i*2)*12)%(WH-TOP-24),a=Math.max(0,Math.sin(T*2+i*1.7))*escV;
        up(x,y,()=>{const f=cx.createRadialGradient(0,-7,0,0,-7,4);f.addColorStop(0,'rgba(255,245,150,'+a+')');f.addColorStop(.25,'rgba(255,240,120,'+a*.5+')');f.addColorStop(1,'rgba(255,240,120,0)');cx.fillStyle=f;cx.fillRect(-4,-11,8,8);});}}
    canteiros.forEach(c=>{if(!c.k||c.morta)return;const p=PLANTAS[c.k];up(c.x,c.y+7,()=>{
      if(c.g<p.t){barra(0,1.4,c.g/p.t,'#58b368');
        if(c.agua>0)barra(0,4.2,c.agua/REGA,'#5aa9e6');
        else{barra(0,4.2,1-c.seco/SECA,'#e0475a');const by=-24+Math.sin(T*5+c.x)*1.2;cx.beginPath();cx.roundRect(-6,by-6,12,11.5,4);cx.fillStyle='#fff';cx.lineWidth=1.2;cx.stroke();cx.fill();pronto(cx);cx.save();cx.translate(0,by-.2);cx.scale(.8,.8);ICO.gota(cx);cx.restore();}}
      else{const r=1-c.pronto/p.janela;barra(0,1.4,r,r<.3?'#e0475a':'#f6c945');cx.save();cx.translate(0,-25-Math.abs(Math.sin(T*4+c.x))*3);cx.scale(.9,.9);ICO[p.racao?'racao':c.k](cx);cx.restore();}});});
    animais.forEach(a=>{const sp=SP[a.t],topo=-sp.h-3;up(a.x,a.y,()=>{
      if(a.st==='sleep'){const k=(T+a.seed)%2/2;cx.globalAlpha=1-k;txt('z',a.dir*sp.w*.4+k*4,topo+8-k*9,'#dfe6ff',4+k*4);cx.globalAlpha=1;return;}
      const m=Math.min(a.comida,a.agua,a.amor);
      if(m<30){const k=a.comida===m?'cenoura':a.agua===m?'gota':'amor',bx=a.dir*sp.w*.42,by=topo-8+Math.sin(T*4+a.seed);
        cx.beginPath();cx.roundRect(bx-7,by-7,14,13,4.5);cx.moveTo(bx-2,by+5.6);cx.lineTo(bx-a.dir*2,by+9.5);cx.lineTo(bx+2,by+5.6);cx.fillStyle='#fff';cx.lineWidth=1.3;cx.stroke();cx.fill();pronto(cx);cx.save();cx.translate(bx,by-.4);cx.scale(.95,.95);ICO[k](cx);cx.restore();}
      else if(a.st==='come')txt('!',0,topo-1,'#f6c945',9);});});
    const alto=(x,y)=>{const p=P3(x,y+24);p.sy-=24*p.k;return p;};
    coracoes.forEach(c=>{if(c.t>0){const p=alto(c.x+Math.sin(c.t*6)*1.5,c.y-c.t*18),e=p.k*(.5+Math.min(1,c.t*5)*.4);cx.setTransform(e,0,0,e,p.sx,p.sy);pronto(cx);cx.globalAlpha=1-c.t*c.t;ICO.amor(cx);cx.globalAlpha=1;}});
    textos.forEach(t=>{const p=alto(t.x,t.y-t.t*10);cx.setTransform(p.k,0,0,p.k,0,0);cx.font='600 6.5px Fredoka,"Trebuchet MS",sans-serif';const w=cx.measureText(t.s).width/2+3;
      cx.setTransform(p.k,0,0,p.k,clamp(p.sx,w*p.k,cw-w*p.k),Math.max(p.sy,9*p.k));cx.globalAlpha=Math.min(1,(1.5-t.t)*3);txt(t.s,0,0);cx.globalAlpha=1;});
  }
})();
