/* ---------- cenário 3D (Three.js) com personagens 2D por cima ---------- */
const F3={ok:false,c3:null,dedos:0,zoom:1};
(function(){
  let rd,sc,scH,cam3,pas,chaoMat,paredeMat,pk='',tx=240,tz=180,hx=180,hzz=80;
  const ZMIN=.55,ZMAX=4.2,v=new THREE.Vector3();
  const tex=(w,h,e,f)=>{const c=document.createElement('canvas');c.width=w*e;c.height=h*e;const g=c.getContext('2d');g.scale(e,e);pronto(g);f(g);const t=new THREE.CanvasTexture(c);t.anisotropy=8;return t;};
  const lam=c=>new THREE.MeshLambertMaterial({color:c,flatShading:true});
  function malha(geo,mat,x,y,z,pai){const m=new THREE.Mesh(geo,mat);m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;(pai||sc).add(m);return m;}
  /* a casa em 2D tem as paredes desenhadas no chão; em 3D esse espaço não existe */
  const hz=y=>y<=110?y:y<156?110+(y-110)/23:y-44,hy=z=>z<=110?z:z<112?110+(z-110)*23:z+44;
  const zoomF=()=>cena==='casa'?clamp(F3.zoom,ZMIN,1.5):F3.zoom;

  F3.liga=function(){
    try{
      const c3=document.createElement('canvas');c3.id='c3';cv.parentNode.insertBefore(c3,cv);
      rd=new THREE.WebGLRenderer({canvas:c3,antialias:true});rd.setPixelRatio(1);rd.shadowMap.enabled=true;rd.shadowMap.type=THREE.PCFSoftShadowMap;
      sc=new THREE.Scene();sc.background=new THREE.Color('#bfe6ff');sc.fog=new THREE.Fog('#bfe6ff',480,1100);
      cam3=new THREE.PerspectiveCamera(34,1,10,9000);
      sc.add(new THREE.HemisphereLight('#ffffff','#8fcf7a',.78));
      const sol=new THREE.DirectionalLight('#fff1cf',.8);sol.position.set(WW/2-180,360,WH/2+260);sol.target.position.set(WW/2,0,WH/2-40);sol.castShadow=true;
      Object.assign(sol.shadow.camera,{left:-700,right:700,top:700,bottom:-700,near:10,far:1600});sol.shadow.mapSize.set(2048,2048);sol.shadow.bias=-.0008;sc.add(sol,sol.target);
      /* chão */
      const relva=tex(64,64,8,g=>{let q=3;const r=()=>(q=q*16807%2147483647)/2147483647;g.fillStyle='#72c860';g.fillRect(0,0,64,64);
        for(let i=0;i<26;i++){const x=r()*64,y=r()*64,rr=5+r()*9,k=g.createRadialGradient(x,y,0,x,y,rr),c=r()<.5?'40,110,50':'190,240,140';k.addColorStop(0,'rgba('+c+',.14)');k.addColorStop(1,'rgba('+c+',0)');g.fillStyle=k;g.fillRect(x-rr,y-rr,rr*2,rr*2);}
        g.lineWidth=.3;for(const c of['#4f9f45','#6cc45c','#3f8c3d','#8fdc74']){g.strokeStyle=c;g.beginPath();for(let i=0;i<420;i++){const x=r()*64,y=r()*64;g.moveTo(x,y);g.lineTo(x+(r()-.5)*1.2,y-.8-r()*1.8);}g.stroke();}
        for(let i=0;i<14;i++){const x=r()*64,y=r()*64;el(g,x,y,.6,.6,['#fff','#f6c945','#f08ca0','#b58cf0'][i%4],0,0);}});
      relva.wrapS=relva.wrapT=THREE.RepeatWrapping;relva.repeat.set(8000/64,8000/64);
      const base=new THREE.Mesh(new THREE.PlaneGeometry(8000,8000),new THREE.MeshBasicMaterial({map:relva}));base.rotation.x=-Math.PI/2;base.position.set(WW/2,-.3,WH/2);sc.add(base);
      chaoMat=new THREE.MeshBasicMaterial({color:'#6cc45c'});const ch=new THREE.Mesh(new THREE.PlaneGeometry(WW,WH),chaoMat);ch.rotation.x=-Math.PI/2;ch.position.set(WW/2,0,WH/2);sc.add(ch);
      const sm=new THREE.Mesh(new THREE.PlaneGeometry(8000,8000),new THREE.ShadowMaterial({opacity:.26}));sm.rotation.x=-Math.PI/2;sm.position.set(WW/2,.1,WH/2);sm.receiveShadow=true;sc.add(sm);
      const b=TOP-3;
      /* celeiro */
      const perfil=new THREE.Shape();[[8,0],[8,30],[13.5,42],[35,54],[56.5,42],[62,30],[62,0]].forEach(([x,y],i)=>i?perfil.lineTo(x,y):perfil.moveTo(x,y));
      malha(new THREE.ExtrudeGeometry(perfil,{depth:38,bevelEnabled:false}),lam('#c4453a'),0,0,b-38);
      const tel=[[4.6,28.4],[12,43.6],[35,56.6],[58,43.6],[65.4,28.4]],mt=lam('#6a5560');
      for(let i=0;i<4;i++){const[ax,ay]=tel[i],[bx,by]=tel[i+1],m=malha(new THREE.BoxGeometry(Math.hypot(bx-ax,by-ay)+1.4,2.4,43),mt,(ax+bx)/2,(ay+by)/2,b-19);m.rotation.z=Math.atan2(by-ay,bx-ax);}
      const fc=new THREE.Mesh(new THREE.PlaneGeometry(70,60),new THREE.MeshBasicMaterial({map:tex(70,60,10,g=>{g.translate(0,-(b-60));g.beginPath();g.rect(0,b-60,70,60);g.clip();celeiro(g);}),transparent:true}));fc.position.set(35,30,b+.3);sc.add(fc);
      malha(new THREE.CylinderGeometry(10,10,52,14),lam('#b9c4cf'),-16,26,b-22);malha(new THREE.SphereGeometry(10,14,8,0,Math.PI*2,0,Math.PI/2),lam('#8fa0b0'),-16,52,b-22);
      /* casa por fora */
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
      [[-360,-620,340],[160,-760,420],[620,-700,380],[1100,-600,360],[-620,-200,300],[1380,-160,320],[-640,420,300],[1420,460,320]].forEach(([x,z,q])=>{const m=malha(new THREE.SphereGeometry(q,24,12),lam('#7fcf6a'),x,-q*.74,z);m.castShadow=false;});
      const gt=new THREE.CylinderGeometry(1.8,2.6,12,6),gc=new THREE.IcosahedronGeometry(11,0),gc2=new THREE.IcosahedronGeometry(7.5,0),mtk=lam('#8a5a34'),mc=[lam('#3f8f47'),lam('#4fa357'),lam('#2f7a4a')];
      for(let i=0;i<150;i++){let x,z;const k=r();if(k<.36){x=-40-r()*300;z=-140+r()*(WH+160);}else if(k<.72){x=WW+40+r()*300;z=-140+r()*(WH+160);}else{x=-260+r()*(WW+520);z=-90-r()*260;}
        if(Math.hypot(x-160,z+50)<40||(x>-40&&x<90&&z>-10))continue;const e=.8+r()*.9,m=mc[i%3];
        malha(gt,mtk,x,6*e,z).scale.setScalar(e);malha(gc,m,x,19*e,z).scale.set(e,e*1.15,e);malha(gc2,m,x+2*e,30*e,z-1).scale.setScalar(e);}
      /* casa por dentro: chão e parede do fundo em 3D */
      scH=new THREE.Scene();scH.background=new THREE.Color('#2a1f24');
      const piso=new THREE.Mesh(new THREE.PlaneGeometry(CW,182),new THREE.MeshBasicMaterial({map:tex(CW,182,8,g=>{g.fillStyle='#2a1f24';g.fillRect(0,0,CW,40);
        pisoSala(g,0,40,150,70,'#f1ead9',1);pisoSala(g,150,40,150,70,'#c9955f');pisoSala(g,0,112,150,70,'#b98a5a');pisoSala(g,150,112,150,70,'#d9ab7e');g.fillStyle='#8a5a34';g.fillRect(0,109.4,CW,2.6);
        pronto(g);el(g,222,94,32,15,'#e9c46a');el(g,222,94,28,12.6,'#4c9a8a');el(g,44,166,24,9,'#7aa5e8');el(g,256,166,20,8,'#f08ca0');g.lineWidth=1.4;g.strokeRect(0,40,CW,142);})}));
      piso.rotation.x=-Math.PI/2;piso.position.set(CW/2,0,91);scH.add(piso);
      paredeMat=new THREE.MeshBasicMaterial({color:'#fff'});const pw=new THREE.Mesh(new THREE.PlaneGeometry(CW,40),paredeMat);pw.position.set(CW/2,20,40);scH.add(pw);
      for(const x of[-2,CW+2]){const m=new THREE.Mesh(new THREE.BoxGeometry(4,40,142),new THREE.MeshBasicMaterial({color:x<0?'#d9ccb0':'#cfc2a6'}));m.position.set(x,20,111);scH.add(m);}
      F3.c3=c3;F3.ok=true;
      mundo=(sx,sy)=>{const q=cv.getBoundingClientRect();v.set((sx-q.left)/q.width*2-1,-((sy-q.top)/q.height*2-1),.5).unproject(cam3).sub(cam3.position);const o=cam3.position;
        if(cena==='casa'){if(v.z<0){const t=(40-o.z)/v.z,h=o.y+v.y*t;if(h>=0&&h<=40)return[o.x+v.x*t,40-h];}const t=-o.y/v.y;return[o.x+v.x*t,hy(o.z+v.z*t)];}
        const t=-o.y/v.y;return[o.x+v.x*t,o.z+v.z*t];};
      const bate2=bate;bate=(e,w,h,x,y)=>{if(cena==='casa')return bate2(e,w,h,x,y);const q=cv.getBoundingClientRect(),px=(pt.x-q.left)/q.width*cv.width,py=(pt.y-q.top)/q.height*cv.height,p=P3(e.x,e.y);return Math.abs(px-p.sx)<w/2*p.k&&py>p.sy-h*p.k&&py<p.sy+5*p.k;};
      /* ampliar: roda do mouse, dois dedos e botões */
      const zm=f=>{F3.zoom=clamp(F3.zoom*f,ZMIN,ZMAX);};
      cv.addEventListener('wheel',e=>{zm(Math.exp(e.deltaY*.0012));e.preventDefault();},{passive:false});
      const dd=new Map();let d0=0;const dist=()=>{const a=[...dd.values()];return Math.hypot(a[0].x-a[1].x,a[0].y-a[1].y);};
      cv.addEventListener('pointerdown',e=>{dd.set(e.pointerId,{x:e.clientX,y:e.clientY});F3.dedos=dd.size;if(dd.size===2){d0=dist();baixo=false;}});
      cv.addEventListener('pointermove',e=>{if(!dd.has(e.pointerId))return;dd.set(e.pointerId,{x:e.clientX,y:e.clientY});if(dd.size===2){const d=dist();if(d0>0&&d>0)zm(d0/d);d0=d;baixo=false;}});
      for(const n of['pointerup','pointercancel','pointerleave'])cv.addEventListener(n,e=>{dd.delete(e.pointerId);F3.dedos=dd.size;});
      const cx2=document.createElement('div');cx2.id='zoom';cx2.innerHTML='<button type="button" aria-label="Aproximar">+</button><button type="button" aria-label="Afastar">−</button><button type="button" aria-label="Ver a fazenda toda">Tudo</button>';cv.parentNode.appendChild(cx2);
      const bs=cx2.querySelectorAll('button');bs[0].onclick=()=>zm(1/1.35);bs[1].onclick=()=>zm(1.35);bs[2].onclick=()=>{F3.zoom=F3.zoom>ZMAX*.8?1:ZMAX;};
    }catch(e){F3.ok=false;const c=document.getElementById('c3');if(c)c.remove();}
  };
  F3.chao=function(G){if(chaoMat.map)chaoMat.map.dispose();const t=new THREE.CanvasTexture(G);t.anisotropy=rd.capabilities.getMaxAnisotropy();chaoMat.map=t;chaoMat.color.set('#ffffff');chaoMat.needsUpdate=true;};
  const pj=(x,y,h)=>{v.set(x,h||0,cena==='casa'?hz(y):y).project(cam3);return[(v.x+1)/2*cv.width,(1-v.y)/2*cv.height];};
  function P3(x,y){const a=pj(x,y),b=pj(x+1,y);return{sx:a[0],sy:a[1],k:b[0]-a[0]};}
  function camara(dt){
    const k=Math.min(1,dt*5),z=zoomF(),asp=cv.width/cv.height;cam3.aspect=asp;
    if(cena==='casa'){hx+=(clamp(P.x,110,CW-110)-hx)*k;hzz+=(clamp(hz(P.y),95,125)-hzz)*k;
      cam3.fov=Math.max(34,2*Math.atan(150/asp/2/200)*180/Math.PI);cam3.position.set(hx,205*z,hzz+180*z);cam3.lookAt(hx,0,hzz-10);}
    else{const t=clamp((z-1.3)/(ZMAX-1.3),0,1),mx=70+(WW/2-70)*t,mz=TOP+50+(WH/2-TOP-50)*t;
      tx+=(clamp(P.x,mx,WW-mx)-tx)*k;tz+=(clamp(P.y,mz,Math.max(mz,WH-40-(WH/2-40)*t))-tz)*k;
      cam3.fov=Math.max(34,2*Math.atan(190/asp/2/311)*180/Math.PI);cam3.position.set(tx,230*z,tz+210*z);cam3.lookAt(tx,0,tz-14);
      sc.fog.near=480*Math.max(1,z);sc.fog.far=1100*Math.max(1,z)+500;}
    cam3.updateProjectionMatrix();cam3.updateMatrixWorld();
  }
  let ultimo=0;
  F3.quadro=function(){
    const c3=F3.c3;if(c3.width!==cv.width||c3.height!==cv.height||c3.style.width!==cv.style.width){rd.setSize(cv.width,cv.height,false);c3.style.width=cv.style.width;c3.style.height=cv.style.height;}
    c3.style.left=cv.offsetLeft+'px';c3.style.top=cv.offsetTop+'px';
    camara(Math.min(.05,T-ultimo));ultimo=T;
    if(cena==='casa'){const key=casa.parede+'|'+(escV>.5);if(key!==pk){pk=key;if(paredeMat.map)paredeMat.map.dispose();
        paredeMat.map=tex(CW,40,8,g=>{g.beginPath();g.rect(0,0,CW,40);g.clip();interior(g,escV>.5?1:0,PAREDES[casa.parede%PAREDES.length]);});paredeMat.needsUpdate=true;}
      rd.shadowMap.enabled=false;rd.render(scH,cam3);}
    else{pas.rotation.z=-T*.6;const n=escV;sc.background.setRGB(.75-.68*n,.9-.8*n,1-.72*n);sc.fog.color.copy(sc.background);rd.shadowMap.enabled=true;rd.render(sc,cam3);}
    cx.setTransform(1,0,0,1,0,0);cx.clearRect(0,0,cv.width,cv.height);
    cena==='casa'?desenhoCasa():desenho();
    const alto=(x,y)=>{const p=P3(x,y+24);p.sy-=24*p.k;return p;},cw=cv.width;
    coracoes.forEach(c=>{if(c.t>0){const p=alto(c.x+Math.sin(c.t*6)*1.5,c.y-c.t*18),e=p.k*(.5+Math.min(1,c.t*5)*.4);cx.setTransform(e,0,0,e,p.sx,p.sy);pronto(cx);cx.globalAlpha=1-c.t*c.t;ICO.amor(cx);cx.globalAlpha=1;}});
    textos.forEach(t=>{const p=alto(t.x,t.y-t.t*10),k=Math.max(p.k,cw/420);cx.setTransform(k,0,0,k,0,0);cx.font='600 6.5px Fredoka,"Trebuchet MS",sans-serif';const w=cx.measureText(t.s).width/2+3;
      cx.setTransform(k,0,0,k,clamp(p.sx,w*k,cw-w*k),Math.max(p.sy,9*k));cx.globalAlpha=Math.min(1,(1.5-t.t)*3);txt(t.s,0,0);cx.globalAlpha=1;});
  };

  /* ---------- personagens e objetos 2D projetados ---------- */
  function txt(s,x,y,cor,tam){cx.font='600 '+(tam||6.5)+'px Fredoka,"Trebuchet MS",sans-serif';cx.textAlign='center';cx.lineWidth=1.7;cx.strokeStyle=LN;cx.strokeText(s,x,y);cx.fillStyle=cor||'#fff';cx.fillText(s,x,y);pronto(cx);}
  const up=(x,y,f,ex,ey)=>{const p=P3(x,y);if(p.sx<-60*p.k||p.sx>cv.width+60*p.k||p.sy<-10*p.k||p.sy>cv.height+70*p.k)return;cx.setTransform(p.k*(ex||1),0,0,p.k*Math.abs(ey||ex||1),p.sx,p.sy);pronto(cx);f();};
  const fl=(x,y,f)=>{const a=pj(x,y),q=pj(x+1,y),c=pj(x,y+1);cx.setTransform(q[0]-a[0],q[1]-a[1],c[0]-a[0],c[1]-a[1],a[0],a[1]);pronto(cx);f();};
  const somb=(x,y,w,k)=>fl(x,y,()=>el(cx,0,0,w*.46*(k||1),w*.24*(k||1),'rgba(20,50,20,.28)',0,0));
  const anel=(x,y,w,cor,fundo)=>fl(x,y,()=>{cx.setLineDash([2.4,1.8]);cx.lineDashOffset=-T*5;cx.strokeStyle=cor;cx.lineWidth=1;el(cx,0,0,w,w*.62,fundo);cx.setLineDash([]);});
  function caixa(x0,y0,x1,y1,h,c){
    cx.setTransform(1,0,0,1,0,0);cx.lineWidth=Math.max(1,cv.width/900);cx.lineJoin='round';cx.strokeStyle=LN;
    const f=(a,cor)=>{cx.beginPath();a.forEach((p,i)=>i?cx.lineTo(p[0],p[1]):cx.moveTo(p[0],p[1]));cx.closePath();cx.fillStyle=cor;cx.fill();cx.stroke();};
    f([pj(x0,y0),pj(x0,y1),pj(x0,y1,h),pj(x0,y0,h)],tom(c,-.28));f([pj(x1,y0),pj(x1,y1),pj(x1,y1,h),pj(x1,y0,h)],tom(c,-.28));
    f([pj(x0,y1),pj(x1,y1),pj(x1,y1,h),pj(x0,y1,h)],tom(c,-.14));f([pj(x0,y0,h),pj(x1,y0,h),pj(x1,y1,h),pj(x0,y1,h)],c);
  }
  function desenho(){
    const cw=cv.width,chh=cv.height,L=[],b=TOP-3;
    canteiros.forEach(c=>fl(c.x,c.y,()=>canteiro(cx,Object.assign({},c,{x:0,y:0}))));
    [[232,TOP-12,3],[300,TOP-15,7],[462,TOP-13,11],[540,TOP-14,13],[640,TOP-12,17],[716,TOP-15,19]].forEach(([x,y,sd])=>L.push([y,()=>up(x,y,()=>{let s=sd;arvore(cx,0,0,()=>(s=s*16807%2147483647)/2147483647);})]));
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
    extrasDesenho(L,{up,fl,somb,P3,txt});
    L.sort((a,q)=>a[0]-q[0]).forEach(l=>l[1]());
    extrasTopo({up,P3,txt});
    if(bola&&bola.leva){const a=bola.leva,sp=SP[a.t];up(a.x+a.dir*(sp.w/2+2.5),a.y,()=>{cx.translate(0,-sp.h*.5);ICO.bola(cx);});}
    if(escV<.5)for(let i=0;i<7;i++){const x=WW*(.08+i*.14)+Math.sin(T*.5+i*2)*34,y=TOP+50+(i*97%(WH-TOP-90))+Math.cos(T*.7+i*3)*20,f=Math.abs(Math.sin(T*13+i)),c=['#f08ca0','#8fd0ff','#ffd166'][i%3];
      cx.globalAlpha=1-escV*2;up(x,y,()=>{cx.translate(0,-9);el(cx,-f*1.5,0,1.6*f+.2,1.9,c,-.3);el(cx,f*1.5,0,1.6*f+.2,1.9,c,.3);el(cx,0,0,.35,1.4,LN,0,0);});cx.globalAlpha=1;}
    if(escV>0){cx.setTransform(1,0,0,1,0,0);const k=escV*(1-escV)*4;cx.fillStyle='rgba(255,130,60,'+k*.14+')';cx.fillRect(0,0,cw,chh);cx.fillStyle='rgba(14,20,62,'+escV*.52+')';cx.fillRect(0,0,cw,chh);
      for(const[gx,gh]of[[35,40],[378,17],[422,17]])up(gx,b+1,()=>{const q=cx.createRadialGradient(0,-gh,0,0,-gh,22);q.addColorStop(0,'rgba(255,214,110,'+escV*.6+')');q.addColorStop(1,'rgba(255,214,110,0)');cx.fillStyle=q;cx.fillRect(-22,-gh-22,44,44);});
      for(let i=0;i<34;i++){const x=(i*83+Math.sin(T*.4+i)*18+WW)%WW,y=TOP+14+(i*47+Math.cos(T*.3+i*2)*12)%(WH-TOP-24),a=Math.max(0,Math.sin(T*2+i*1.7))*escV;
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
  }
  function bancada(g){
    g.beginPath();g.roundRect(-15,-22,30,22,1.5);g.fillStyle=luz(g,'#a9713f',-22,0,.12);g.fill();g.stroke();g.beginPath();g.rect(-16,-24.4,32,3.4);g.fillStyle='#e6eff4';g.fill();g.stroke();
    for(const x of[-12.5,1]){g.beginPath();g.roundRect(x,-18,12,15,1);g.fillStyle='#c98a4b';g.fill();g.stroke();el(g,x+6,-15,.7,.7,'#f6c945');}
    g.beginPath();g.roundRect(-10,-27.6,7,3.4,[0,0,2,2]);g.fillStyle='#9fa8b5';g.fill();g.stroke();
  }
  function desenhoCasa(){
    const L=[],des=(k,x,y,a)=>up(x,y,()=>MV[k](cx,null,T,a)),dentro=GENTE.filter(p=>p!==P&&p.dentro),cw=cv.width,chh=cv.height;
    casa.moveis.forEach(m=>{if(MOVEIS[m.k].chao)fl(m.x,m.y,()=>{cx.scale(1,1.7);MV[m.k](cx,null,T);});});
    casa.moveis.forEach(m=>{if(MOVEIS[m.k].parede)up(m.x,40,()=>{cx.translate(0,m.y-40);MV[m.k](cx,null,T);});});
    casa.moveis.forEach(m=>{const d=MOVEIS[m.k];if(!d.chao&&!d.parede)L.push([m.y,()=>{somb(m.x,m.y,d.w);des(m.k,m.x,m.y);}]);});
    const fg=fogo;if(!noite)fogo=Math.max(fogo,1);
    L.push([48,()=>des('tv',272,48,tvOn)],[52,()=>up(77,52,()=>bancada(cx))],[58,()=>des('geladeira',132,58)],[FOGAO.y,()=>{somb(FOGAO.x,FOGAO.y,38);des('fogao',FOGAO.x,FOGAO.y);}],
      [VOVO.y,()=>{somb(VOVO.x,VOVO.y,11);up(VOVO.x,VOVO.y,()=>pessoa(cx,VOVO,T,VOVO.o),VOVO.e);}],[215,()=>des('brinquedos',196,216)]);
    L.push([96,()=>{somb(222,96,46);des('mesaJantar',222,96,!!refeicao);}]);
    if(refeicao)dentro.forEach((p,i)=>{const s=[[204,88],[240,88],[222,86]][i];L.push([s[1],()=>up(s[0],s[1],()=>pessoa(cx,{mov:false,ph:0,dir:i?-1:1},T,p.o),p.e)]);});
    const naCama=!refeicao&&noite?dentro:[];
    L.push([206,()=>up(44,206,()=>{MV.camaCasal(cx);naCama.filter(p=>p.id!=='filha').forEach((p,i)=>dorminhoco(cx,-11+i*22,-.5,p.o,T,.95));MV.mantaCasal(cx);})]);
    L.push([205,()=>up(258,206,()=>{MV.camaFilha(cx);naCama.filter(p=>p.id==='filha').forEach(p=>dorminhoco(cx,0,-1,p.o,T,.8));MV.mantaFilha(cx);})]);
    [[0,108,60,110],[86,108,214,110],[240,108,CW,110],[148,40,152,78],[148,104,152,110],[148,157,152,190],[148,218,152,226]].forEach(([a,b,c,d])=>L.push([d-.5,()=>caixa(a,b,c,d,9,'#a9713f')]));
    L.push([P.y,()=>{anel(P.x,P.y,8*P.e,'#fff','rgba(255,255,255,.25)');up(P.x,P.y,()=>pessoa(cx,P,T,opc(P)),P.e);}]);
    L.sort((a,b)=>a[0]-b[0]).forEach(l=>l[1]());fogo=fg;
    cx.setTransform(1,0,0,1,0,0);if(escV>0){cx.fillStyle='rgba(14,20,62,'+escV*.3+')';cx.fillRect(0,0,cw,chh);}
    const k=cw/340;cx.setTransform(k,0,0,k,cw/2,chh-8*k);
    if(decor&&decor!=='tirar')txt('Toque onde quer colocar: '+MOVEIS[decor].nome,0,0,'#f6c945',7);
    if(decor==='tirar')txt('Toque num móvel para guardar',0,0,'#f6c945',7);
  }
})();
