import { useState, useEffect, useRef } from "react";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Mono:wght@400;700&family=DM+Sans:ital,wght@0,400;0,700;1,400&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#060505;--amber:#f97316;--amber-l:#fde68a;--amber-d:#7c3010;
  --violet:#7c3aed;--text:#fff4df;
  --title:'Bebas Neue',sans-serif;--mono:'Space Mono',monospace;--body:'DM Sans',sans-serif;
}
body{background:var(--bg);color:var(--text);font-family:var(--body);overflow-x:hidden;}
::selection{background:var(--amber);color:#000;}
::-webkit-scrollbar{width:3px;}::-webkit-scrollbar-track{background:var(--bg);}::-webkit-scrollbar-thumb{background:var(--amber-d);border-radius:2px;}

@keyframes floatA{0%,100%{transform:translate(0,0)}50%{transform:translate(14px,-22px)}}
@keyframes floatB{0%,100%{transform:translate(0,0)}50%{transform:translate(-14px,20px)}}
@keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
@keyframes ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
@keyframes lineGrow{from{transform:scaleX(0)}to{transform:scaleX(1)}}
@keyframes statIn{from{opacity:0;transform:translateX(-14px)}to{opacity:1;transform:translateX(0)}}
@keyframes gridPan{0%{background-position:0 0}100%{background-position:60px 60px}}
@keyframes drift1{0%,100%{transform:translate(0,0)}33%{transform:translate(30px,-40px)}66%{transform:translate(-20px,25px)}}
@keyframes drift2{0%,100%{transform:translate(0,0)}33%{transform:translate(-40px,20px)}66%{transform:translate(25px,-30px)}}
@keyframes drift3{0%,100%{transform:translate(0,0)}50%{transform:translate(20px,35px)}}
@keyframes pulseGlow{0%,100%{opacity:.55;transform:scale(1)}50%{opacity:1;transform:scale(1.07)}}
@keyframes graphDraw{from{stroke-dashoffset:900}to{stroke-dashoffset:0}}
@keyframes graphFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
@keyframes bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
@keyframes bobSoft{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}
@keyframes sway{0%,100%{transform:rotate(-1deg)}50%{transform:rotate(1.5deg)}}
@keyframes orbitPulse{0%,100%{opacity:.35;transform:scale(1)}50%{opacity:.9;transform:scale(1.12)}}
@keyframes scan{0%{transform:translateX(-120%)}100%{transform:translateX(220%)}}
@keyframes shimmer{0%{opacity:.15}50%{opacity:.65}100%{opacity:.15}}
@keyframes riseBars{from{transform:scaleY(.18)}to{transform:scaleY(1)}}
@keyframes dashMove{to{stroke-dashoffset:-18}}
@keyframes nodePop{0%,100%{transform:scale(1)}50%{transform:scale(1.08)}}
@keyframes slideGlow{0%{transform:translateX(-140%)}100%{transform:translateX(240%)}}
@keyframes gradientShift{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
@keyframes floatRotate{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-8px) rotate(1.2deg)}}
@keyframes pulseBorder{0%,100%{border-color:rgba(255,255,255,.08)}50%{border-color:rgba(249,115,22,.28)}}
@keyframes scrollNudge{0%,100%{transform:translateY(0)}50%{transform:translateY(8px)}}
@keyframes glowBreath{0%,100%{opacity:.35;transform:scale(1)}50%{opacity:.7;transform:scale(1.08)}}

.ttl{font-family:var(--title);letter-spacing:.02em;line-height:.94;}
.mn{font-family:var(--mono);}
.rv{opacity:0;transform:translateY(34px) scale(.985);filter:blur(8px);transition:opacity .8s cubic-bezier(.2,.8,.2,1),transform .8s cubic-bezier(.2,.8,.2,1),filter .8s cubic-bezier(.2,.8,.2,1);}
.rv.in{opacity:1;transform:none;filter:blur(0);}

.btn{display:inline-block;background:#fff4df;border:2px solid #fff4df;border-radius:50px;padding:13px 28px;font-family:var(--body);font-weight:700;font-size:13px;letter-spacing:.14em;text-transform:uppercase;color:#000;text-decoration:none;transition:all .2s;box-shadow:0 0 36px rgba(255,244,223,.18);}
.btn:hover{background:var(--amber);border-color:var(--amber);box-shadow:0 0 55px rgba(249,115,22,.55);transform:translateY(-2px);}
.btn-o{display:inline-block;background:transparent;border:2px solid rgba(255,255,255,.2);border-radius:50px;padding:13px 28px;font-family:var(--body);font-weight:700;font-size:13px;letter-spacing:.14em;text-transform:uppercase;color:var(--text);text-decoration:none;transition:all .2s;}
.btn-o:hover{background:var(--amber);border-color:var(--amber);color:#000;box-shadow:0 0 45px rgba(249,115,22,.45);transform:translateY(-2px);}
.reg-btn{background:#fff4df;border:2px solid #fff4df;border-radius:50px;padding:12px 24px;font-family:var(--body);font-weight:700;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#000;transition:all .2s;white-space:nowrap;}
.reg-btn:hover{background:var(--amber);border-color:var(--amber);box-shadow:0 0 50px rgba(249,115,22,.5);transform:translateY(-2px);}
.nbtn{background:none;border:none;padding:10px 14px;color:rgba(255,244,223,.72);font-family:var(--mono);font-size:10px;letter-spacing:.2em;text-transform:uppercase;display:flex;align-items:center;gap:8px;transition:all .2s;cursor:pointer;}
.nbtn:hover{color:var(--amber-l);}
.nav-wrap{display:flex;align-items:center;gap:0;border:1px solid rgba(255,255,255,.08);border-radius:50px;background:rgba(255,255,255,.03);padding:4px 8px;backdrop-filter:blur(12px);}
.nav-link{background:none;border:none;padding:10px 14px;color:rgba(255,244,223,.72);font-family:var(--mono);font-size:10px;letter-spacing:.2em;text-transform:uppercase;transition:all .2s;cursor:pointer;white-space:nowrap;}
.nav-link:hover{color:var(--amber-l);}
.nav-divider{color:rgba(255,244,223,.18);font-family:var(--mono);font-size:10px;user-select:none;}
.nav-cta{color:#fff4df;}
.nav-cta:hover{color:var(--amber-l);}

.card{position:relative;overflow:hidden;border:1px solid rgba(255,255,255,.08);border-radius:20px;background:rgba(255,255,255,.03);padding:24px;transition:all .28s cubic-bezier(.2,.8,.2,1);}
.card::before{content:'';position:absolute;inset:-40%;background:linear-gradient(115deg,transparent 35%,rgba(255,244,223,.11) 50%,transparent 65%);transform:translateX(-120%);transition:transform .7s ease;pointer-events:none;}
.card:hover{border-color:rgba(249,115,22,.28);transform:translateY(-7px) scale(1.01);box-shadow:0 24px 65px rgba(0,0,0,.46),0 0 40px rgba(249,115,22,.08);}
.card:hover::before{transform:translateX(120%);}
.clink{font-family:var(--mono);font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:var(--amber);text-decoration:none;transition:color .18s;}
.clink:hover{color:var(--amber-l);}

.faq{border:1px solid rgba(255,255,255,.08);border-radius:16px;padding:18px 22px;background:rgba(255,255,255,.02);margin-bottom:10px;}
.faq[open]{border-color:rgba(249,115,22,.3);}
details>summary{list-style:none;cursor:pointer;}
details>summary::-webkit-details-marker{display:none;}
details[open] summary::after{content:' ↑';color:var(--amber);}
summary::after{content:' ↓';color:var(--amber);}

.marquee-wrap{overflow:hidden;border-top:1px solid rgba(255,255,255,.06);border-bottom:1px solid rgba(255,255,255,.06);background:rgba(0,0,0,.3);padding:12px 0;}
.marquee-track{display:flex;width:max-content;animation:ticker 26s linear infinite;}
.marquee-track:hover{animation-play-state:paused;}

.hero-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(249,115,22,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(249,115,22,.04) 1px,transparent 1px);background-size:60px 60px;animation:gridPan 8s linear infinite;pointer-events:none;}

.tilt{transition:transform .35s,box-shadow .35s;border-radius:22px;overflow:hidden;}
.animated-panel{transition:transform .35s ease,box-shadow .35s ease,filter .35s ease;animation:pulseBorder 5.2s ease-in-out infinite;}
.animated-panel:hover{transform:translateY(-6px) scale(1.01);box-shadow:0 22px 70px rgba(249,115,22,.18);filter:brightness(1.08);}
.graph-line-anim{stroke-dasharray:900;stroke-dashoffset:900;animation:graphDraw 2.1s cubic-bezier(.2,.8,.2,1) .15s forwards;}
.graph-point-anim{animation:pulseGlow 2.4s ease-in-out infinite;transform-origin:center;transform-box:fill-box;}
.float-anim{animation:bob 4.6s ease-in-out infinite;transform-origin:center;transform-box:fill-box;}
.float-soft-anim{animation:bobSoft 5.8s ease-in-out infinite;transform-origin:center;transform-box:fill-box;}
.sway-anim{animation:sway 5.2s ease-in-out infinite;transform-origin:center;transform-box:fill-box;}
.orbit-anim{animation:orbitPulse 3.2s ease-in-out infinite;transform-origin:center;transform-box:fill-box;}
.dash-anim{animation:dashMove 1.1s linear infinite;}
.node-pop-anim{animation:nodePop 2.8s ease-in-out infinite;transform-origin:center;transform-box:fill-box;}
.bar-rise-anim{animation:riseBars 1.2s cubic-bezier(.2,.8,.2,1) both;transform-origin:bottom;transform-box:fill-box;}
.scan-shell{position:relative;overflow:hidden;}
.scan-shell::after{content:'';position:absolute;inset:-20%;background:linear-gradient(110deg,transparent 35%,rgba(255,244,223,.12) 50%,transparent 65%);animation:scan 4.6s linear infinite;pointer-events:none;}
.shimmer-anim{animation:shimmer 2.7s ease-in-out infinite;}
@media (prefers-reduced-motion: reduce){
  .graph-line-anim,.graph-point-anim,.float-anim,.float-soft-anim,.sway-anim,.orbit-anim,.dash-anim,.node-pop-anim,.bar-rise-anim,.shimmer-anim,.animated-panel,.scroll-hint{animation:none !important;}
  .scan-shell::after{animation:none !important;display:none;}
}
.cursor-glow{position:fixed;width:420px;height:420px;border-radius:50%;background:radial-gradient(circle,rgba(249,115,22,.13),rgba(124,58,237,.07) 36%,transparent 68%);pointer-events:none;z-index:4;transform:translate(-50%,-50%);mix-blend-mode:screen;filter:blur(10px);transition:opacity .25s ease;}
.scroll-hint{position:absolute;left:50%;bottom:20px;transform:translateX(-50%);font-family:var(--mono);font-size:8px;letter-spacing:.35em;text-transform:uppercase;color:rgba(255,244,223,.38);animation:scrollNudge 2.2s ease-in-out infinite;}
.ambient-glow{animation:glowBreath 7s ease-in-out infinite;}
.parallax-layer{will-change:transform;}
`;

function useReveal() {
  useEffect(() => {
    const run = () => document.querySelectorAll(".rv:not(.in)").forEach((el,i) => {
      if (el.getBoundingClientRect().top < window.innerHeight - 30) {
        el.style.transitionDelay = `${Math.min(i * 35, 180)}ms`;
        el.classList.add("in");
      }
    });
    run();
    window.addEventListener("scroll", run, { passive: true });
    return () => window.removeEventListener("scroll", run);
  });
}

function CursorGlow() {
  const [pos, setPos] = useState({ x: -500, y: -500 });
  useEffect(() => {
    const move = e => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return <div className="cursor-glow" style={{ left: pos.x, top: pos.y }} />;
}

function useParallax() {
  useEffect(() => {
    const update = () => {
      const y = window.scrollY;
      document.querySelectorAll("[data-parallax]").forEach(el => {
        const speed = Number(el.getAttribute("data-parallax")) || 0;
        el.style.transform = `translate3d(0, ${y * speed}px, 0)`;
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
}

function Clock() {
  const [t, setT] = useState("");
  useEffect(() => {
    const tick = () => { const d = new Date(); setT(`${String(d.getHours()).padStart(2,"0")}:${String(d.getMinutes()).padStart(2,"0")}:${String(d.getSeconds()).padStart(2,"0")}`); };
    tick(); const id = setInterval(tick, 1000); return () => clearInterval(id);
  }, []);
  return <span>{t}</span>;
}

function Particles() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d");
    let w = c.width = c.offsetWidth, h = c.height = c.offsetHeight;
    const pts = Array.from({ length: 45 }, () => ({ x: Math.random()*w, y: Math.random()*h, vx:(Math.random()-.5)*.3, vy:(Math.random()-.5)*.3, r:Math.random()*1.3+.4, a:Math.random()*.45+.1 }));
    let raf;
    const draw = () => {
      ctx.clearRect(0,0,w,h);
      pts.forEach(p => { p.x+=p.vx; p.y+=p.vy; if(p.x<0||p.x>w)p.vx*=-1; if(p.y<0||p.y>h)p.vy*=-1; ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fillStyle=`rgba(249,115,22,${p.a})`; ctx.fill(); });
      for(let i=0;i<pts.length;i++) for(let j=i+1;j<pts.length;j++){const dx=pts[i].x-pts[j].x,dy=pts[i].y-pts[j].y,d=Math.sqrt(dx*dx+dy*dy);if(d<100){ctx.beginPath();ctx.moveTo(pts[i].x,pts[i].y);ctx.lineTo(pts[j].x,pts[j].y);ctx.strokeStyle=`rgba(249,115,22,${.06*(1-d/100)})`;ctx.lineWidth=.5;ctx.stroke();}}
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);
  return <canvas ref={ref} style={{ position:"absolute", inset:0, width:"100%", height:"100%", zIndex:1, pointerEvents:"none", opacity:.8 }}/>;
}

function Marquee() {
  const items = ["AI-Native Production","Vertical Content Series","Creator-Led Mini-Movies","Micro-Dramas","Brand Story Engine","Cinematic Quality","Global Distribution","Story-First Strategy","Southeast Asia Based","Built to Travel"];
  const all = [...items,...items];
  return (
    <div className="marquee-wrap">
      <div className="marquee-track">
        {all.map((item,i) => <span key={i} style={{ display:"inline-flex", alignItems:"center", gap:14, paddingRight:36, fontFamily:"var(--mono)", fontSize:10, letterSpacing:".28em", textTransform:"uppercase", color:"rgba(255,244,223,.42)", whiteSpace:"nowrap" }}><span style={{ color:"var(--amber)", fontSize:7 }}>◆</span>{item}</span>)}
      </div>
    </div>
  );
}

function TiltCard({ children, style={} }) {
  const ref = useRef(null);
  const mv = e => { const el=ref.current; if(!el)return; const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5; el.style.transform=`perspective(800px) rotateY(${x*9}deg) rotateX(${-y*7}deg) scale(1.02)`; el.style.boxShadow=`${-x*18}px ${-y*12}px 55px rgba(249,115,22,.16)`; };
  const lv = () => { const el=ref.current; if(!el)return; el.style.transform="perspective(800px) rotateY(0) rotateX(0) scale(1)"; el.style.boxShadow="0 0 70px rgba(249,115,22,.1)"; };
  return <div ref={ref} className="tilt" onMouseMove={mv} onMouseLeave={lv} style={{ boxShadow:"0 0 70px rgba(249,115,22,.1)", ...style }}>{children}</div>;
}

function StatPill({ num, label, delay=0 }) {
  return (
    <div style={{ display:"inline-flex", flexDirection:"column", gap:2, background:"rgba(0,0,0,.65)", border:"1px solid rgba(249,115,22,.24)", borderRadius:12, padding:"11px 18px", backdropFilter:"blur(10px)", animation:`statIn .6s ease ${delay}s both` }}>
      <span className="ttl" style={{ fontSize:26, color:"#fff4df", lineHeight:1 }}>{num}</span>
      <span style={{ fontFamily:"var(--mono)", fontSize:8, letterSpacing:".2em", textTransform:"uppercase", color:"rgba(253,186,116,.68)" }}>{label}</span>
    </div>
  );
}

function RollingNumber({ value, prefix="", suffix="", decimals=0, duration=1400 }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !startedRef.current) {
        startedRef.current = true;
        const start = performance.now();
        const step = now => {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setDisplay(value * eased);
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    }, { threshold: .35 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [value, duration]);

  return <span ref={ref}>{prefix}{display.toFixed(decimals)}{suffix}</span>;
}

function HeroSVG() {
  return (
    <div style={{position:"relative",width:"min(100%,680px)",margin:"0 auto",aspectRatio:"4 / 3",borderRadius:18,overflow:"hidden",border:"1px solid rgba(255,255,255,.06)",boxShadow:"0 0 24px rgba(249,115,22,.06)",background:"#060505",padding:0}}>
      <img
        src="https://i.ibb.co/TMX7VkNH/Chat-GPT-Image-May-12-2026-12-38-07-AM.png"
        alt="AI story engine hero visual"
        style={{width:"100%",height:"100%",display:"block",objectFit:"contain",objectPosition:"center",filter:"none",imageRendering:"-webkit-optimize-contrast",background:"#060505"}}
      />
      <div style={{position:"absolute",top:0,left:0,right:0,height:46,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 22px",background:"rgba(0,0,0,.38)",borderBottom:"1px solid rgba(255,255,255,.1)",backdropFilter:"blur(8px)"}}>
        <span style={{fontFamily:"var(--mono)",fontSize:10,letterSpacing:".3em",textTransform:"uppercase",color:"rgba(255,244,223,.75)"}}>AI // STORY ENGINE</span>
        <span style={{fontFamily:"var(--mono)",fontSize:9,letterSpacing:".22em",textTransform:"uppercase",color:"rgba(255,244,223,.55)"}}>REC <span style={{color:"#ef4444"}}>●</span></span>
      </div>
    </div>
  );
}

function TravelSVG() {
  const travelImages = [
    "https://i.ibb.co/LdpZPkYH/Whats-App-Image-2026-05-11-at-00-54-37.jpg",
    "https://i.ibb.co/sJt2jFcw/Whats-App-Image-2026-05-11-at-00-55-16.jpg",
    "https://i.ibb.co/fYpTmFs4/Whats-App-Image-2026-05-11-at-00-55-27.jpg",
    "https://i.ibb.co/fGkfDqKq/Whats-App-Image-2026-05-11-at-00-55-50.jpg",
  ];

  return (
    <div style={{position:"relative",height:380,display:"grid",gridTemplateColumns:"1fr 1fr",gridTemplateRows:"54px 1fr 1fr",gap:10,padding:12,background:"linear-gradient(135deg,#101719 0%,#071012 100%)",borderRadius:"18px 18px 0 0",overflow:"hidden"}}>
      <div style={{position:"absolute",inset:0,background:"radial-gradient(circle at 18% 20%,rgba(253,186,116,.16),transparent 34%),radial-gradient(circle at 82% 72%,rgba(52,211,153,.12),transparent 32%)",pointerEvents:"none",zIndex:1}}/>
      <div style={{gridColumn:"1 / -1",gridRow:"1",display:"flex",alignItems:"center",padding:"0 16px",background:"rgba(0,0,0,.56)",borderBottom:"1px solid rgba(253,186,116,.26)",borderRadius:"14px 14px 0 0",zIndex:3}}>
        <div style={{fontFamily:"var(--title)",fontSize:24,letterSpacing:".16em",color:"#fde68a",textTransform:"uppercase",textShadow:"0 0 12px rgba(249,115,22,.35)"}}>Travel & Tourism</div>
      </div>
      {travelImages.map((src, i) => (
        <div key={src} style={{position:"relative",zIndex:2,overflow:"hidden",borderRadius:14,minHeight:0}}>
          <img
            src={src}
            alt={"Travel destination visual " + (i + 1)}
            style={{width:"100%",height:"100%",objectFit:"cover",display:"block",filter:"saturate(1.05) contrast(1.04)"}}
          />
        </div>
      ))}
      <div style={{position:"absolute",left:24,bottom:18,zIndex:4,background:"rgba(0,0,0,.62)",border:"1px solid rgba(253,186,116,.28)",borderRadius:999,padding:"8px 14px",fontFamily:"var(--mono)",fontSize:8.5,letterSpacing:".22em",textTransform:"uppercase",color:"#fde68a",backdropFilter:"blur(10px)"}}>Destination Story</div>
    </div>
  );
}

function EntSVG() {
  const entertainmentImages = [
    "https://i.ibb.co/vCg1YZ7V/Chat-GPT-Image-May-11-2026-07-15-24-AM-4.png",
    "https://i.ibb.co/pj8nfcck/Chat-GPT-Image-May-11-2026-07-15-23-AM-3.png",
    "https://i.ibb.co/TBnyzjQv/Chat-GPT-Image-May-11-2026-07-15-22-AM-2.png",
    "https://i.ibb.co/jvbsty2W/Chat-GPT-Image-May-11-2026-07-15-22-AM-1.png",
  ];

  return (
    <div style={{position:"relative",height:380,display:"grid",gridTemplateColumns:"1fr 1fr",gridTemplateRows:"54px 1fr 1fr",gap:10,padding:12,background:"linear-gradient(135deg,#170c16 0%,#100a1f 100%)",borderRadius:"18px 18px 0 0",overflow:"hidden"}}>
      <div style={{position:"absolute",inset:0,background:"radial-gradient(circle at 20% 22%,rgba(249,115,22,.16),transparent 34%),radial-gradient(circle at 82% 72%,rgba(124,58,237,.2),transparent 36%)",pointerEvents:"none",zIndex:1}}/>
      <div style={{gridColumn:"1 / -1",gridRow:"1",display:"flex",alignItems:"center",padding:"0 16px",background:"rgba(0,0,0,.56)",borderBottom:"1px solid rgba(253,186,116,.26)",borderRadius:"14px 14px 0 0",zIndex:3}}>
        <div style={{fontFamily:"var(--title)",fontSize:24,letterSpacing:".16em",color:"#fde68a",textTransform:"uppercase",textShadow:"0 0 12px rgba(249,115,22,.35)"}}>Entertainment & Media</div>
      </div>
      {entertainmentImages.map((src, i) => (
        <div key={src} style={{position:"relative",zIndex:2,overflow:"hidden",borderRadius:14,minHeight:0}}>
          <img
            src={src}
            alt={"Entertainment and media visual " + (i + 1)}
            style={{width:"100%",height:"100%",objectFit:"cover",display:"block",filter:"saturate(1.05) contrast(1.04)"}}
          />
        </div>
      ))}
      <div style={{position:"absolute",left:24,bottom:18,zIndex:4,background:"rgba(0,0,0,.62)",border:"1px solid rgba(253,186,116,.28)",borderRadius:999,padding:"8px 14px",fontFamily:"var(--mono)",fontSize:8.5,letterSpacing:".22em",textTransform:"uppercase",color:"#fde68a",backdropFilter:"blur(10px)"}}>Episode Slate</div>
    </div>
  );
}

function FitSVG() {
  const fitnessImages = [
    "https://i.ibb.co/DHcwV5qH/Chat-GPT-Image-May-11-2026-07-53-42-AM-4.png",
    "https://i.ibb.co/Q38hh4Wj/Chat-GPT-Image-May-11-2026-07-53-41-AM-3.png",
    "https://i.ibb.co/r23bYKL0/Chat-GPT-Image-May-11-2026-07-53-41-AM-2.png",
    "https://i.ibb.co/DHTdb3KD/Chat-GPT-Image-May-11-2026-07-53-38-AM-1.png",
  ];

  return (
    <div style={{position:"relative",height:380,display:"grid",gridTemplateColumns:"1fr 1fr",gridTemplateRows:"54px 1fr 1fr",gap:10,padding:12,background:"linear-gradient(135deg,#1f1008 0%,#0d120f 100%)",borderRadius:"18px 18px 0 0",overflow:"hidden"}}>
      <div style={{position:"absolute",inset:0,background:"radial-gradient(circle at 20% 22%,rgba(249,115,22,.18),transparent 34%),radial-gradient(circle at 82% 72%,rgba(52,211,153,.12),transparent 36%)",pointerEvents:"none",zIndex:1}}/>
      <div style={{gridColumn:"1 / -1",gridRow:"1",display:"flex",alignItems:"center",padding:"0 16px",background:"rgba(0,0,0,.56)",borderBottom:"1px solid rgba(253,186,116,.26)",borderRadius:"14px 14px 0 0",zIndex:3}}>
        <div style={{fontFamily:"var(--title)",fontSize:24,letterSpacing:".16em",color:"#fde68a",textTransform:"uppercase",textShadow:"0 0 12px rgba(249,115,22,.35)"}}>Fitness & Lifestyle</div>
      </div>
      {fitnessImages.map((src, i) => (
        <div key={src} style={{position:"relative",zIndex:2,overflow:"hidden",borderRadius:14,minHeight:0}}>
          <img
            src={src}
            alt={"Fitness and lifestyle visual " + (i + 1)}
            style={{width:"100%",height:"100%",objectFit:"cover",display:"block",filter:"saturate(1.05) contrast(1.04)"}}
          />
        </div>
      ))}
      <div style={{position:"absolute",left:24,bottom:18,zIndex:4,background:"rgba(0,0,0,.62)",border:"1px solid rgba(253,186,116,.28)",borderRadius:999,padding:"8px 14px",fontFamily:"var(--mono)",fontSize:8.5,letterSpacing:".22em",textTransform:"uppercase",color:"#fde68a",backdropFilter:"blur(10px)"}}>Comeback Arc</div>
    </div>
  );
}

function ProcessSVG({ type }) {
  if (type === "fmtVertical") return (
    <div style={{position:"relative",width:"100%",height:"100%",overflow:"hidden",background:"#060505"}}>
      <img
        src="https://i.ibb.co/Jjs7tLKM/Chat-GPT-Image-May-12-2026-05-08-16-PM.png"
        alt="Vertical content series visual"
        style={{width:"100%",height:"100%",objectFit:"contain",objectPosition:"center",display:"block",filter:"saturate(1.04) contrast(1.04)",background:"#060505"}}
      />
    </div>
  );
  if (type === "fmtMini") return (
    <div style={{position:"relative",width:"100%",height:"100%",overflow:"hidden",background:"#060505"}}>
      <img
        src="https://i.ibb.co/HfqkwSgB/Chat-GPT-Image-May-12-2026-05-20-20-PM.png"
        alt="Creator-led mini-movies visual"
        style={{width:"100%",height:"100%",objectFit:"contain",objectPosition:"center",display:"block",filter:"saturate(1.04) contrast(1.04)",background:"#060505"}}
      />
    </div>
  );

  if (type === "fmtMicro") return (
    <div style={{position:"relative",width:"100%",height:"100%",overflow:"hidden",background:"#060505"}}>
      <img
        src="https://i.ibb.co/v2CVHJV/Chat-GPT-Image-May-12-2026-05-24-51-PM.png"
        alt="Micro-dramas visual"
        style={{width:"100%",height:"100%",objectFit:"contain",objectPosition:"center",display:"block",filter:"saturate(1.04) contrast(1.04)",background:"#060505"}}
      />
    </div>
  );
  if (type === "vertical") return (
    <div style={{position:"relative",width:"100%",height:190,overflow:"hidden",background:"#060505"}}>
      <img
        src="https://i.ibb.co/vCg1YZ7V/Chat-GPT-Image-May-11-2026-07-15-24-AM-4.png"
        alt="Vertical content series visual"
        style={{width:"100%",height:"190px",objectFit:"cover",objectPosition:"center",display:"block",filter:"saturate(1.04) contrast(1.04)"}}
      />
      <div style={{position:"absolute",inset:0,background:"linear-gradient(to bottom,rgba(0,0,0,.04),rgba(0,0,0,.22))",pointerEvents:"none"}}/>
    </div>
  );
  if (type === "mini") {
    const miniMovieImages = [
      "https://i.ibb.co/jvbsty2W/Chat-GPT-Image-May-11-2026-07-15-22-AM-1.png",
      "https://i.ibb.co/TBnyzjQv/Chat-GPT-Image-May-11-2026-07-15-22-AM-2.png",
      "https://i.ibb.co/pj8nfcck/Chat-GPT-Image-May-11-2026-07-15-23-AM-3.png",
      "https://i.ibb.co/vCg1YZ7V/Chat-GPT-Image-May-11-2026-07-15-24-AM-4.png",
    ];

    return (
      <div style={{position:"relative",width:"100%",height:250,display:"grid",gridTemplateColumns:"1fr 1fr",gridTemplateRows:"1fr 1fr",gap:8,padding:10,overflow:"hidden",background:"linear-gradient(135deg,#160b15,#070507)"}}>
        <div style={{position:"absolute",inset:0,background:"radial-gradient(circle at 24% 22%,rgba(249,115,22,.14),transparent 38%),radial-gradient(circle at 80% 74%,rgba(124,58,237,.14),transparent 42%)",zIndex:1,pointerEvents:"none"}}/>
        {miniMovieImages.map((src, i) => (
          <div key={src} style={{position:"relative",zIndex:2,overflow:"hidden",borderRadius:10,minWidth:0,minHeight:0,background:"rgba(0,0,0,.28)"}}>
            <img
              src={src}
              alt={"Creator-led mini-movie visual " + (i + 1)}
              style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center",display:"block",filter:"brightness(1.12) saturate(1.1) contrast(1.08)"}}
            />
          </div>
        ))}
        <div style={{position:"absolute",left:14,bottom:14,zIndex:4,background:"rgba(0,0,0,.68)",border:"1px solid rgba(253,186,116,.28)",borderRadius:999,padding:"6px 11px",fontFamily:"var(--mono)",fontSize:7.2,letterSpacing:".2em",textTransform:"uppercase",color:"#fde68a",backdropFilter:"blur(8px)"}}>Creator Mini-Movies</div>
      </div>
    );
  }
  if (type === "micro") return (
    <div style={{position:"relative",width:"100%",height:190,overflow:"hidden",background:"#060505"}}>
      <img
        src="https://i.ibb.co/pj8nfcck/Chat-GPT-Image-May-11-2026-07-15-23-AM-3.png"
        alt="Micro-dramas visual"
        style={{width:"100%",height:"190px",objectFit:"cover",objectPosition:"center",display:"block",filter:"saturate(1.04) contrast(1.04)"}}
      />
      <div style={{position:"absolute",inset:0,background:"linear-gradient(to bottom,rgba(0,0,0,.04),rgba(0,0,0,.22))",pointerEvents:"none"}}/>
    </div>
  );
  if (type === "brand") return (
    <div style={{position:"relative",width:"100%",height:"100%",overflow:"hidden",background:"#060505"}}>
      <img
        src="https://i.ibb.co/gZnmZkzv/Chat-GPT-Image-May-12-2026-05-38-31-PM.png"
        alt="Brand strategy visual"
        style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center",display:"block",filter:"saturate(1.04) contrast(1.04)"}}
      />
      <div style={{position:"absolute",inset:0,background:"linear-gradient(to bottom,rgba(0,0,0,.08),rgba(0,0,0,.2))",pointerEvents:"none"}}/>
    </div>
  );
  if (type === "ai") return (
    <div style={{position:"relative",width:"100%",height:"100%",overflow:"hidden",background:"#060505"}}>
      <img
        src="https://i.ibb.co/rRWrHW33/Chat-GPT-Image-May-12-2026-09-19-46-AM.png"
        alt="AI-assisted production visual"
        style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center",display:"block",filter:"saturate(1.04) contrast(1.04)"}}
      />
      <div style={{position:"absolute",inset:0,background:"linear-gradient(to bottom,rgba(0,0,0,.08),rgba(0,0,0,.2))",pointerEvents:"none"}}/>
    </div>
  );
  if (type === "creator") return (
    <div style={{position:"relative",width:"100%",height:"100%",overflow:"hidden",background:"#060505"}}>
      <img
        src="https://i.ibb.co/zTbLdT2K/Chat-GPT-Image-May-12-2026-09-28-09-AM.png"
        alt="Creator distribution visual"
        style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center",display:"block",filter:"saturate(1.04) contrast(1.04)"}}
      />
      <div style={{position:"absolute",inset:0,background:"linear-gradient(to bottom,rgba(0,0,0,.08),rgba(0,0,0,.2))",pointerEvents:"none"}}/>
    </div>
  );
  return (
    <div style={{position:"relative",width:"100%",height:"100%",overflow:"hidden",background:"#060505"}}>
      <img
        src="https://i.ibb.co/4g5pP9Zt/Chat-GPT-Image-May-12-2026-09-33-21-AM.png"
        alt="Reusable asset visual"
        style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center",display:"block",filter:"saturate(1.04) contrast(1.04)"}}
      />
      <div style={{position:"absolute",inset:0,background:"linear-gradient(to bottom,rgba(0,0,0,.08),rgba(0,0,0,.2))",pointerEvents:"none"}}/>
    </div>
  );
}

function StudioSVG() {
  return (
    <svg viewBox="0 0 560 320" xmlns="http://www.w3.org/2000/svg" className="animated-panel" style={{ width:"100%", height:"auto", display:"block", borderRadius:18, border:"1px solid rgba(255,255,255,.08)", overflow:"hidden" }}>
      <defs>
        <linearGradient id="stBg2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1a1028"/>
          <stop offset="1" stopColor="#060505"/>
        </linearGradient>
        <filter id="stBl"><feGaussianBlur stdDeviation="22"/></filter>
      </defs>

      <rect width="560" height="320" fill="url(#stBg2)"/>
      <ellipse cx="150" cy="126" rx="118" ry="118" fill="rgba(249,115,22,.18)" filter="url(#stBl)" className="orbit-anim"/>
      <ellipse cx="410" cy="126" rx="118" ry="118" fill="rgba(124,58,237,.18)" filter="url(#stBl)" className="orbit-anim"/>
      <ellipse cx="280" cy="214" rx="118" ry="118" fill="rgba(52,211,153,.14)" filter="url(#stBl)" className="orbit-anim"/>

      <circle cx="190" cy="126" r="86" fill="rgba(249,115,22,.08)" stroke="rgba(249,115,22,.46)" strokeWidth="1.5"/>
      <circle cx="370" cy="126" r="86" fill="rgba(124,58,237,.08)" stroke="rgba(124,58,237,.46)" strokeWidth="1.5"/>
      <circle cx="280" cy="210" r="86" fill="rgba(52,211,153,.07)" stroke="rgba(52,211,153,.42)" strokeWidth="1.5"/>

      <circle cx="280" cy="160" r="38" fill="rgba(255,244,223,.07)" stroke="rgba(255,244,223,.22)" strokeWidth="1.5" className="node-pop-anim"/>

      <text x="20" y="22" fill="rgba(255,244,223,.3)" fontFamily="Space Mono" fontSize="7.5" letterSpacing="3">THE INTERSECTION</text>

      <text x="190" y="118" fill="rgba(249,115,22,.92)" fontFamily="Bebas Neue" fontSize="15" textAnchor="middle" letterSpacing="2">AI-ASSISTED</text>
      <text x="190" y="137" fill="rgba(249,115,22,.92)" fontFamily="Bebas Neue" fontSize="15" textAnchor="middle" letterSpacing="2">PRODUCTION</text>

      <text x="370" y="118" fill="rgba(167,139,250,.96)" fontFamily="Bebas Neue" fontSize="15" textAnchor="middle" letterSpacing="2">CREATOR</text>
      <text x="370" y="137" fill="rgba(167,139,250,.96)" fontFamily="Bebas Neue" fontSize="15" textAnchor="middle" letterSpacing="2">DISTRIBUTION</text>

      <text x="280" y="218" fill="rgba(52,211,153,.94)" fontFamily="Bebas Neue" fontSize="15" textAnchor="middle" letterSpacing="2">STORY-FIRST</text>
      <text x="280" y="237" fill="rgba(52,211,153,.94)" fontFamily="Bebas Neue" fontSize="15" textAnchor="middle" letterSpacing="2">STRATEGY</text>

      <text x="280" y="154" fill="#fff4df" fontFamily="Bebas Neue" fontSize="12" textAnchor="middle" letterSpacing="2">BANGZUU</text>
      <text x="280" y="170" fill="rgba(253,186,116,.88)" fontFamily="Bebas Neue" fontSize="12" textAnchor="middle" letterSpacing="2">STUDIOS</text>
    </svg>
  );
}

function MarketSVG() {
  const ref = useRef(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setAnimate(true);
        observer.disconnect();
      }
    }, { threshold: 0.35 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const path = "M 58 320 C 125 292, 160 276, 214 290 S 304 246, 360 230 S 455 184, 520 172 S 635 132, 710 108 S 770 102, 820 78";
  const area = `${path} L 820 356 L 58 356 Z`;

  return (
    <svg ref={ref} viewBox="0 0 920 420" xmlns="http://www.w3.org/2000/svg" className="animated-panel" style={{ width:"100%", height:"auto", display:"block", borderRadius:22, border:"1px solid rgba(249,115,22,.18)", overflow:"hidden", background:"#060505" }}>
      <defs>
        <linearGradient id="mkCleanBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0b0914"/>
          <stop offset=".52" stopColor="#09070d"/>
          <stop offset="1" stopColor="#050404"/>
        </linearGradient>
        <linearGradient id="mkCleanLine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#7c3aed"/>
          <stop offset=".45" stopColor="#f97316"/>
          <stop offset="1" stopColor="#fde68a"/>
        </linearGradient>
        <linearGradient id="mkCleanArea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="rgba(249,115,22,.24)"/>
          <stop offset="1" stopColor="rgba(249,115,22,0)"/>
        </linearGradient>
        <filter id="mkCleanGlow"><feGaussianBlur stdDeviation="8"/></filter>
      </defs>

      <rect width="920" height="420" fill="url(#mkCleanBg)"/>
      <ellipse cx="530" cy="250" rx="260" ry="125" fill="rgba(249,115,22,.08)" filter="url(#mkCleanGlow)"/>
      <ellipse cx="205" cy="110" rx="230" ry="110" fill="rgba(124,58,237,.08)" filter="url(#mkCleanGlow)"/>

      <text x="44" y="44" fill="rgba(255,244,223,.32)" fontFamily="Space Mono" fontSize="12" letterSpacing="9">MARKET GROWTH</text>

      {[96,160,224,288,352].map((y, i) => (
        <line key={y} x1="58" y1={y} x2="864" y2={y} stroke="rgba(255,255,255,.055)" strokeWidth="1"/>
      ))}
      {[["$0",356],["$5B",292],["$10B",224],["$15B",160]].map(([label,y]) => (
        <text key={label} x="42" y={y + 5} fill="rgba(255,244,223,.34)" fontFamily="Space Mono" fontSize="11" textAnchor="end">{label}</text>
      ))}
      {[["2020",58],["2022",310],["2024",562],["2026",864]].map(([label,x]) => (
        <text key={label} x={x} y="386" fill="rgba(255,244,223,.34)" fontFamily="Space Mono" fontSize="12" textAnchor="middle">{label}</text>
      ))}

      <path d={area} fill="url(#mkCleanArea)" opacity=".9"/>
      <path d={path} fill="none" stroke="rgba(249,115,22,.28)" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" filter="url(#mkCleanGlow)" className={animate ? "graph-line-anim" : ""}/>
      <path d={path} fill="none" stroke="url(#mkCleanLine)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" className={animate ? "graph-line-anim" : ""}/>

      {[
        {x:214,y:290,label:"$5B"},
        {x:420,y:218,label:"$10B"},
        {x:680,y:148,label:"$13B"},
        {x:820,y:78,label:"$19B"}
      ].map((p, i) => (
        <g key={p.label} className="graph-point-anim">
          <circle cx={p.x} cy={p.y} r="10" fill="#f97316" stroke="rgba(255,244,223,.55)" strokeWidth="3"/>
          <circle cx={p.x} cy={p.y} r="17" fill="none" stroke="rgba(249,115,22,.28)" strokeWidth="2"/>
          <rect x={p.x - 36} y={p.y - 52} width="72" height="30" rx="10" fill="rgba(0,0,0,.78)" stroke="rgba(249,115,22,.34)" strokeWidth="1.5"/>
          <text x={p.x} y={p.y - 32} fill="#fde68a" fontFamily="Space Mono" fontSize="13" textAnchor="middle">{p.label.replace("$","")}</text>
        </g>
      ))}

      <line x1="562" y1="92" x2="562" y2="356" stroke="rgba(249,115,22,.34)" strokeWidth="1.5" strokeDasharray="8 8"/>
      <rect x="492" y="102" width="78" height="32" rx="11" fill="rgba(249,115,22,.16)" stroke="rgba(249,115,22,.38)"/>
      <text x="531" y="123" fill="#fde68a" fontFamily="Space Mono" fontSize="12" textAnchor="middle">NOW</text>

      <rect x="586" y="170" width="224" height="100" rx="22" fill="rgba(0,0,0,.66)" stroke="rgba(249,115,22,.24)" strokeWidth="1.5"/>
      <text x="698" y="202" fill="rgba(253,186,116,.64)" fontFamily="Space Mono" fontSize="13" textAnchor="middle" letterSpacing="5">2025 VALUE</text>
      <text x="698" y="246" fill="#fff4df" fontFamily="Bebas Neue" fontSize="54" textAnchor="middle" letterSpacing="2">$11B</text>
    </svg>
  );
}

function StoryWorldsBanner() {
  return (
    <div className="animated-panel" style={{position:"relative",width:"min(100%,980px)",margin:"0 auto",borderRadius:18,border:"1px solid rgba(255,255,255,.08)",overflow:"hidden",background:"#060505",boxShadow:"0 0 34px rgba(249,115,22,.08)"}}>
      <img
        src="https://i.ibb.co/YF1C0S4N/Chat-GPT-Image-May-12-2026-04-47-20-AM.png"
        alt="Story Worlds visual hero"
        style={{width:"100%",height:"auto",display:"block",objectFit:"contain",objectPosition:"center",filter:"none",imageRendering:"auto",background:"#060505"}}
      />
      <div style={{position:"absolute",left:20,bottom:18,background:"rgba(0,0,0,.58)",border:"1px solid rgba(253,186,116,.22)",borderRadius:999,padding:"8px 16px",fontFamily:"var(--mono)",fontSize:8.5,letterSpacing:".28em",textTransform:"uppercase",color:"#fde68a",backdropFilter:"blur(10px)"}}>Story Worlds</div>
    </div>
  );
}

function WhySVG() {
  return (
    <div className="animated-panel" style={{position:"relative",width:"100%",borderRadius:18,border:"1px solid rgba(255,255,255,.08)",overflow:"hidden",background:"#060505"}}>
      <img
        src="https://i.ibb.co/HLbN7MtF/Chat-GPT-Image-May-12-2026-04-44-26-PM.png"
        alt="AI-assisted production visual"
        style={{width:"100%",height:"auto",display:"block",objectFit:"cover",objectPosition:"center",filter:"saturate(1.04) contrast(1.04)"}}
      />
    </div>
  );
}

function CreatorNetworkSVG() {
  return (
    <div className="animated-panel" style={{position:"relative",width:"100%",borderRadius:18,border:"1px solid rgba(255,255,255,.08)",overflow:"hidden",background:"#060505"}}>
      <img
        src="https://i.ibb.co/yBMPMHYN/Chat-GPT-Image-May-12-2026-04-51-35-PM.png"
        alt="Creator distribution visual"
        style={{width:"100%",height:"auto",display:"block",objectFit:"cover",objectPosition:"center",filter:"saturate(1.04) contrast(1.04)"}}
      />
    </div>
  );
}

function BrandInStorySVG() {
  return (
    <svg viewBox="0 0 560 280" xmlns="http://www.w3.org/2000/svg" className="animated-panel" style={{ width:"100%", height:"auto", display:"block", borderRadius:18, border:"1px solid rgba(255,255,255,.08)", overflow:"hidden" }}>
      <defs>
        <linearGradient id="bsBgNew" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#18090f"/><stop offset=".55" stopColor="#100d18"/><stop offset="1" stopColor="#060505"/></linearGradient>
        <filter id="bsBlurNew"><feGaussianBlur stdDeviation="18"/></filter>
      </defs>
      <rect width="560" height="280" fill="url(#bsBgNew)"/>
      <ellipse cx="128" cy="120" rx="130" ry="120" fill="rgba(249,115,22,.18)" filter="url(#bsBlurNew)"/>
      <ellipse cx="450" cy="160" rx="120" ry="120" fill="rgba(52,211,153,.1)" filter="url(#bsBlurNew)"/>
      <text x="22" y="24" fill="rgba(255,244,223,.32)" fontFamily="Space Mono" fontSize="7.5" letterSpacing="3">BRAND AS THE PLOT</text>
      <rect x="24" y="42" width="344" height="196" rx="18" fill="rgba(0,0,0,.48)" stroke="rgba(255,255,255,.08)"/>
      <rect x="42" y="60" width="308" height="160" rx="14" fill="rgba(255,244,223,.04)"/>
      <rect x="42" y="60" width="308" height="78" rx="14" fill="rgba(28,11,41,.72)"/>
      <rect x="42" y="138" width="308" height="82" fill="rgba(10,24,16,.7)"/>
      <circle cx="150" cy="105" r="24" fill="rgba(0,0,0,.64)"/>
      <circle cx="150" cy="94" r="11" fill="rgba(0,0,0,.82)"/>
      <ellipse cx="150" cy="121" rx="14" ry="10" fill="rgba(0,0,0,.72)"/>
      <rect x="205" y="84" width="56" height="72" rx="10" fill="rgba(249,115,22,.2)" stroke="rgba(249,115,22,.42)" strokeWidth="1.5"/>
      <text x="233" y="114" fill="#fde68a" fontFamily="Bebas Neue" fontSize="12" textAnchor="middle" letterSpacing="1.5">BRAND</text>
      <text x="233" y="129" fill="rgba(253,186,116,.66)" fontFamily="Space Mono" fontSize="6" textAnchor="middle">IN STORY</text>
      <rect x="56" y="181" width="110" height="22" rx="11" fill="rgba(239,68,68,.1)" stroke="rgba(239,68,68,.22)"/>
      <text x="111" y="196" fill="rgba(239,68,68,.65)" fontFamily="Space Mono" fontSize="7" textAnchor="middle">NOT PRODUCT PLACEMENT</text>
      <rect x="182" y="181" width="138" height="22" rx="11" fill="rgba(52,211,153,.1)" stroke="rgba(52,211,153,.24)"/>
      <text x="251" y="196" fill="rgba(52,211,153,.75)" fontFamily="Space Mono" fontSize="7" textAnchor="middle">STORY TURNING POINT</text>
      <rect x="390" y="42" width="146" height="196" rx="18" fill="rgba(0,0,0,.48)" stroke="rgba(255,255,255,.08)"/>
      <text x="463" y="68" fill="rgba(253,186,116,.72)" fontFamily="Space Mono" fontSize="7.5" textAnchor="middle" letterSpacing="2">ASSET OUTPUT</text>
      {[["HERO FILM","03:10"],["VERTICAL CUT","09:16"],["SOCIAL EDIT","00:30"],["PAID AD","01:01"]].map(([a,b],i)=>(<g key={a}><rect x="406" y={84+i*32} width="114" height="22" rx="8" fill={i===1?"rgba(249,115,22,.16)":"rgba(255,255,255,.045)"} stroke={i===1?"rgba(249,115,22,.28)":"rgba(255,255,255,.08)"}/><text x="416" y={99+i*32} fill={i===1?"#fde68a":"rgba(255,244,223,.55)"} fontFamily="Space Mono" fontSize="6.5">{a}</text><text x="510" y={99+i*32} fill="rgba(253,186,116,.7)" fontFamily="Space Mono" fontSize="6.5" textAnchor="end">{b}</text></g>))}
    </svg>
  );
}

function FitnessOfferSVG() {
  return (
    <div className="animated-panel" style={{position:"relative",width:"100%",borderRadius:18,border:"1px solid rgba(255,255,255,.08)",overflow:"hidden",background:"#060505"}}>
      <img
        src="https://i.ibb.co/WNdzwstX/Chat-GPT-Image-May-14-2026-07-02-03-PM.png"
        alt="Fitness series system visual"
        style={{width:"100%",height:"auto",display:"block",objectFit:"cover",objectPosition:"center",filter:"saturate(1.04) contrast(1.04)"}}
      />
    </div>
  );
}

function EntHeroSVG() {
  return (
    <img
      src="https://i.ibb.co/ymNBjNJc/Chat-GPT-Image-May-14-2026-06-13-06-PM.png"
      alt="Entertainment hero"
      style={{width:"100%",height:"auto",display:"block",borderRadius:20,border:"1px solid rgba(255,255,255,.11)",boxShadow:"0 0 70px rgba(249,115,22,.18)"}}
    />
  );
}

function FitHeroSVG() {
  return (
    <img
      src="https://i.ibb.co/RprVQ1ww/Chat-GPT-Image-May-14-2026-06-49-30-PM.png"
      alt="Fitness hero"
      style={{width:"100%",height:"auto",display:"block",borderRadius:20,border:"1px solid rgba(255,255,255,.11)",boxShadow:"0 0 70px rgba(249,115,22,.18)"}}
    />
  );
}

function GenreGridSVG() {
  return (
    <div className="animated-panel" style={{position:"relative",width:"100%",borderRadius:18,border:"1px solid rgba(255,255,255,.08)",overflow:"hidden",background:"#060505"}}>
      <img
        src="https://i.ibb.co/ynPCcdCv/Chat-GPT-Image-May-14-2026-06-22-21-PM.png"
        alt="Vertical content pipeline visual"
        style={{width:"100%",height:"auto",display:"block",objectFit:"cover",objectPosition:"center",filter:"saturate(1.04) contrast(1.04)"}}
      />
    </div>
  );
}

function AthleteJourneySVG() {
  return (
    <svg viewBox="0 0 560 240" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"auto",display:"block",borderRadius:18,border:"1px solid rgba(255,255,255,.08)",overflow:"hidden"}}>
      <defs>
        <linearGradient id="ajBgNew" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#1a0d05"/><stop offset="1" stopColor="#060505"/></linearGradient>
        <linearGradient id="ajArcNew" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stopColor="#7c3aed"/><stop offset=".5" stopColor="#f97316"/><stop offset="1" stopColor="#fde68a"/></linearGradient>
        <filter id="ajBlurNew"><feGaussianBlur stdDeviation="11"/></filter>
      </defs>
      <rect width="560" height="240" fill="url(#ajBgNew)"/>
      <ellipse cx="280" cy="214" rx="280" ry="68" fill="rgba(249,115,22,.07)" filter="url(#ajBlurNew)"/>
      <path d="M 38,166 Q 136,54 276,48 Q 416,42 518,92" fill="none" stroke="rgba(249,115,22,.28)" strokeWidth="7" strokeLinecap="round" filter="url(#ajBlurNew)"/>
      <path d="M 38,166 Q 136,54 276,48 Q 416,42 518,92" fill="none" stroke="url(#ajArcNew)" strokeWidth="2.5" strokeLinecap="round"/>
      {[{x:38,y:166,label:"DAY 1",sub:"Start",col:"rgba(124,58,237,.78)"},{x:136,y:104,label:"WEEK 2",sub:"Protocol",col:"rgba(167,139,250,.78)"},{x:276,y:48,label:"WEEK 5",sub:"Breakthrough",col:"#f97316"},{x:416,y:52,label:"WEEK 7",sub:"Identity",col:"#fbbf24"},{x:518,y:92,label:"FINALE",sub:"Comeback",col:"#fde68a"}].map((m,i)=>(
        <g key={m.label}>
          <circle cx={m.x} cy={m.y} r={i===2?13:9} fill="rgba(0,0,0,.78)" stroke={m.col} strokeWidth={i===2?2:1.5}/>
          {i===2&&<circle cx={m.x} cy={m.y} r="21" fill="none" stroke="rgba(249,115,22,.27)" strokeWidth="1" strokeDasharray="3,3"/>}
          <text x={m.x} y={m.y+(i===2?5:4)} fill={m.col} fontFamily="Space Mono" fontSize={i===2?6.5:5.5} textAnchor="middle">{i===2?"★":"●"}</text>
          <text x={m.x} y={m.y+30} fill="rgba(255,244,223,.72)" fontFamily="Space Mono" fontSize="7" textAnchor="middle">{m.label}</text>
          <text x={m.x} y={m.y+45} fill="rgba(255,244,223,.42)" fontFamily="Space Mono" fontSize="6" textAnchor="middle">{m.sub}</text>
          {i===2&&(<g><rect x={m.x+20} y={m.y-28} width="48" height="28" rx="7" fill="rgba(249,115,22,.18)" stroke="rgba(249,115,22,.38)" strokeWidth="1"/><text x={m.x+44} y={m.y-9} fill="#fde68a" fontFamily="Space Mono" fontSize="6.5" textAnchor="middle">BRAND</text></g>)}
        </g>
      ))}
      <text x="20" y="20" fill="rgba(255,244,223,.28)" fontFamily="Space Mono" fontSize="7" letterSpacing="3">ATHLETE JOURNEY ARC</text>
    </svg>
  );
}

/* ── SHARED ── */
const Lbl = ({c}) => <p style={{fontFamily:"var(--mn)",fontSize:10,letterSpacing:".3em",textTransform:"uppercase",color:"var(--amber)",marginBottom:12}}>{c}</p>;
const BigT = ({c,sz=56}) => <h2 className="ttl" style={{fontSize:`clamp(28px,4.5vw,${sz}px)`,color:"#fff4df"}}>{c}</h2>;
const HR = () => <div style={{width:"100%",height:1,background:"rgba(255,255,255,.06)",margin:"64px 0"}}/>;
const Rv = ({children,style={}}) => <div className="rv" style={style}>{children}</div>;

function RegForm() {
  return (
    <form style={{display:"flex",flexWrap:"wrap",gap:10,justifyContent:"center",marginTop:28}} onSubmit={e=>e.preventDefault()}>
      <input type="email" placeholder="Work email" style={{flex:"1 1 200px",background:"rgba(0,0,0,.5)",border:"1px solid rgba(255,255,255,.24)",borderRadius:50,padding:"12px 20px",color:"#fff4df",fontFamily:"var(--body)",fontSize:14,outline:"none"}}/>
      <input type="url" placeholder="Company website" style={{flex:"1 1 200px",background:"rgba(0,0,0,.5)",border:"1px solid rgba(255,255,255,.24)",borderRadius:50,padding:"12px 20px",color:"#fff4df",fontFamily:"var(--body)",fontSize:14,outline:"none"}}/>
      <button type="submit" className="reg-btn">Register Interest</button>
    </form>
  );
}

function Header({page,setPage}) {
  const [drop,setDrop]=useState(false);
  const [subDrop,setSubDrop]=useState(false);
  const go=(p,id)=>{setPage(p||"home");setDrop(false);window.scrollTo({top:0,behavior:"smooth"});if(id)setTimeout(()=>document.getElementById(id)?.scrollIntoView({behavior:"smooth"}),80);};
  const goHomeSection=(id)=>{
    setPage("home");
    setDrop(false);
    setTimeout(()=>document.getElementById(id)?.scrollIntoView({behavior:"smooth"}),80);
  };
  return (
    <header style={{position:"fixed",top:0,left:0,right:0,zIndex:200,borderBottom:"1px solid rgba(255,255,255,.07)",background:"rgba(6,5,5,.92)",backdropFilter:"blur(20px)"}}>
      <div style={{maxWidth:1280,margin:"0 auto",padding:"14px 24px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:18}}>
        <button onClick={()=>go("home")} style={{background:"none",border:"none",color:"#fff4df",fontFamily:"var(--mn)",fontSize:12,fontWeight:700,letterSpacing:".3em",textTransform:"uppercase",cursor:"pointer",whiteSpace:"nowrap"}}>Bangzuu<span style={{color:"var(--amber)"}}>*</span></button>
        <nav className="nav-wrap">
          <button className="nav-link" onClick={()=>go("home")}>Home</button>
          <span className="nav-divider">|</span>
          <div style={{position:"relative"}}>
            <button className="nbtn" onClick={()=>setDrop(d=>!d)}>Industries <span style={{color:"var(--amber)"}}>⌄</span></button>
            {drop&&(<div style={{position:"absolute",left:"50%",transform:"translateX(-50%)",top:"calc(100% + 8px)",width:248,background:"rgba(8,6,6,.97)",border:"1px solid rgba(255,255,255,.08)",borderRadius:14,padding:8,backdropFilter:"blur(18px)",zIndex:300,boxShadow:"0 28px 65px rgba(0,0,0,.5)"}}>
              <button onClick={()=>go("travel")} style={{display:"block",width:"100%",background:"none",border:"none",borderRadius:9,padding:"9px 14px",textAlign:"left",color:"rgba(255,244,223,.62)",fontFamily:"var(--mn)",fontSize:9.5,letterSpacing:".17em",textTransform:"uppercase",transition:"all .14s",cursor:"pointer"}}
                onMouseEnter={e=>{e.currentTarget.style.background="rgba(249,115,22,.1)";e.currentTarget.style.color="var(--amber-l)";}}
                onMouseLeave={e=>{e.currentTarget.style.background="none";e.currentTarget.style.color="rgba(255,244,223,.62)";}}>
                Travel
              </button>
              <div style={{position:"relative"}}
                onMouseEnter={()=>setSubDrop(true)}
                onMouseLeave={()=>setSubDrop(false)}>
                <button onClick={()=>go("entertainment")} style={{display:"flex",alignItems:"center",justifyContent:"space-between",width:"100%",background:"none",border:"none",borderRadius:9,padding:"9px 14px",textAlign:"left",color:"rgba(255,244,223,.62)",fontFamily:"var(--mn)",fontSize:9.5,letterSpacing:".17em",textTransform:"uppercase",transition:"all .14s",cursor:"pointer"}}
                  onMouseEnter={e=>{e.currentTarget.style.background="rgba(249,115,22,.1)";e.currentTarget.style.color="var(--amber-l)";}}
                  onMouseLeave={e=>{e.currentTarget.style.background="none";e.currentTarget.style.color="rgba(255,244,223,.62)";}}>
                  <span>Entertainment & Media</span><span style={{color:"var(--amber)"}}>›</span>
                </button>
                {subDrop&&(
                  <div style={{position:"absolute",left:"calc(100% + 8px)",top:0,width:228,background:"rgba(8,6,6,.97)",border:"1px solid rgba(255,255,255,.08)",borderRadius:14,padding:8,backdropFilter:"blur(18px)",zIndex:310,boxShadow:"0 28px 65px rgba(0,0,0,.5)"}}>
                    {[["Microdramas","entertainment"],["AI / Production Studios","entertainment"],["Sales Agents","entertainment"]].map(([lbl,p])=>(
                      <button key={lbl} onClick={()=>go(p)} style={{display:"block",width:"100%",background:"none",border:"none",borderRadius:9,padding:"9px 14px",textAlign:"left",color:"rgba(255,244,223,.62)",fontFamily:"var(--mn)",fontSize:9.5,letterSpacing:".17em",textTransform:"uppercase",transition:"all .14s",cursor:"pointer"}}
                        onMouseEnter={e=>{e.currentTarget.style.background="rgba(249,115,22,.1)";e.currentTarget.style.color="var(--amber-l)";}}
                        onMouseLeave={e=>{e.currentTarget.style.background="none";e.currentTarget.style.color="rgba(255,244,223,.62)";}}>
                        {lbl}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <button onClick={()=>go("fitness")} style={{display:"block",width:"100%",background:"none",border:"none",borderRadius:9,padding:"9px 14px",textAlign:"left",color:"rgba(255,244,223,.62)",fontFamily:"var(--mn)",fontSize:9.5,letterSpacing:".17em",textTransform:"uppercase",transition:"all .14s",cursor:"pointer"}}
                onMouseEnter={e=>{e.currentTarget.style.background="rgba(249,115,22,.1)";e.currentTarget.style.color="var(--amber-l)";}}
                onMouseLeave={e=>{e.currentTarget.style.background="none";e.currentTarget.style.color="rgba(255,244,223,.62)";}}>
                Fitness & Lifestyle
              </button>
            </div>)}
          </div>
          <span className="nav-divider">|</span>
          <button className="nav-link" onClick={()=>goHomeSection("about-us")}>About Us</button>
          <span className="nav-divider">|</span>
          <button className="nav-link nav-cta" onClick={()=>goHomeSection("register")}>Work With Us</button>
        </nav>
      </div>
    </header>
  );
}

/* ── HOME ── */
const WHY=[["AI-assisted production without sacrificing story.","We use AI-native workflows to compress timelines and production costs — without producing content that looks or feels generated. Cinematic quality. Faster delivery."],["Your brand becomes the plot.","Not the logo in the corner. Not the 30-second read. The reason the story exists, the thing the character needs, the moment the narrative turns."],["Real creators. Real audiences. Real distribution.","We work with an existing creator network with proven audiences. Distribution isn't a plan — it's built into the product from day one."],["You leave with an asset, not an impression.","Every project delivers reusable content across paid, owned, and social channels. The value compounds long after the initial upload."]];
const STATS=[
  {value:11,prefix:"$",suffix:"B",decimals:0,label:"Global micro-drama market value in 2025, projected to reach $14B in 2026."},
  {value:1.4,prefix:"",suffix:" Billion",decimals:1,label:"Views generated by KFC's branded Douyin micro-drama series."},
  {value:3.34,prefix:"",suffix:"B Yuan",decimals:2,label:"Sales driven by Kans beauty brand through five branded mini-dramas."}
];
const AUDIENCE=[{label:"Travel & Tourism Brands",headline:"Put your destination inside the story.",copy:"Your audience already trusts creators. We make sure they remember your brand — by putting it inside the story, not in front of it.",cta:"See how it works for travel brands",V:TravelSVG},{label:"Entertainment & Media",headline:"Produce, co-produce, and partner.",copy:"Micro-drama platforms, AI production studios, and sales agents looking for content, collaboration, or IP. We produce, co-produce, and partner.",cta:"See how it works for entertainment & media",V:EntSVG},{label:"Fitness, Lifestyle & DTC Brands",headline:"Build brand identity, not just metrics.",copy:"Creator content that builds brand identity, not just performance metrics. Story-first. Audience-native.",cta:"See how it works for fitness & lifestyle brands",V:FitSVG}];
const FORMATS=[["Vertical Content Series","Multi-episode short-form branded series.","Social-first. AI-assisted. Built around your brand as the story engine.","fmtVertical"],["Creator-Led Mini-Movies","3–10 minute branded entertainment films.","Real influencer. Real audience. Your brand owns the narrative.","fmtMini"],["Micro-Dramas","Serialised vertical storytelling for platforms, brands, and co-production partners.","Built for the formats growing fastest globally.","fmtMicro"]];
const PROCESS=[["01","Brand Strategy","Find the story reason your brand belongs.","brand"],["02","AI-Assisted Production","Compress scripting, previsuals, and creative iteration.","ai"],["03","Creator Distribution","Build around creators and audiences already moving.","creator"],["04","Reusable Asset","Deliver content that works across paid, owned, and social.","asset"]];

function HomePage() {
  useReveal();
  useParallax();
  return (
    <>
      {/* HERO */}
      <div style={{position:"relative",minHeight:"100vh",display:"flex",flexDirection:"column",justifyContent:"center",overflow:"hidden"}}>
        <Particles/>
        <div className="hero-grid"/>
        <div data-parallax=".03" className="parallax-layer ambient-glow" style={{position:"absolute",inset:0,background:"radial-gradient(ellipse 78% 58% at 50% 0%,rgba(249,115,22,.11) 0%,transparent 60%)",zIndex:2,pointerEvents:"none"}}/>
        <div data-parallax="-.02" className="parallax-layer ambient-glow" style={{position:"absolute",inset:0,background:"radial-gradient(ellipse 58% 48% at 20% 60%,rgba(124,58,237,.09) 0%,transparent 55%)",zIndex:2,pointerEvents:"none"}}/>
        <div style={{position:"absolute",bottom:0,left:0,right:0,height:180,background:"linear-gradient(to bottom,transparent,var(--bg))",zIndex:3,pointerEvents:"none"}}/>
        <div style={{position:"relative",zIndex:10,maxWidth:1280,margin:"0 auto",padding:"130px 24px 60px",width:"100%"}}>
          <div style={{display:"flex",justifyContent:"center",marginBottom:24}}>
            <div style={{display:"inline-flex",alignItems:"center",gap:10,border:"1px solid rgba(253,186,116,.2)",borderRadius:50,padding:"8px 18px",fontFamily:"var(--mn)",fontSize:10,letterSpacing:".26em",textTransform:"uppercase",color:"rgba(255,244,223,.7)",background:"rgba(0,0,0,.32)",backdropFilter:"blur(10px)",animation:"fadeUp .6s ease both"}}>
              <span style={{color:"var(--amber)",fontSize:7.5}}>▶</span> AI // STORY // <Clock/>
            </div>
          </div>
          <h1 className="ttl" style={{textAlign:"center",fontSize:"clamp(50px,10.5vw,128px)",lineHeight:.87,color:"#fff4df",animation:"fadeUp .7s .1s ease both",marginBottom:0}}>
            We Build Stories<br/><span style={{WebkitTextStroke:"1px rgba(249,115,22,.55)",color:"transparent"}}>Brands</span> Live Inside.
          </h1>
          <div style={{display:"flex",justifyContent:"center",margin:"22px 0"}}>
            <div style={{width:110,height:2,background:"linear-gradient(90deg,transparent,var(--amber),transparent)",animation:"lineGrow .8s .4s ease both",transformOrigin:"center"}}/>
          </div>
          <p style={{textAlign:"center",maxWidth:660,margin:"0 auto 36px",fontSize:17,lineHeight:1.85,color:"rgba(255,244,223,.62)",animation:"fadeUp .7s .3s ease both"}}>
            Bangzuu Studios is an AI-native branded content studio. We create vertical content series, creator-led mini-movies, and micro-dramas that turn brand integrations into the engine of the story — not an interruption inside it.
          </p>
          <div style={{display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap",animation:"fadeUp .7s .45s ease both",marginBottom:48}}>
            <a href="#register" className="btn">Work With Us →</a>
            <a href="#what-we-build" className="btn-o">Explore What We Do</a>
          </div>
          <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap",marginBottom:52}}>
            <StatPill num="$11B" label="Market 2025" delay={.5}/>
            <StatPill num="1.4B" label="Views (KFC)" delay={.65}/>
            <StatPill num="3×" label="Brand Recall" delay={.8}/>
            <StatPill num="4–8wk" label="Delivery" delay={.95}/>
          </div>
          <div style={{maxWidth:720,margin:"0 auto"}}><TiltCard style={{boxShadow:"none",background:"transparent"}}><HeroSVG/></TiltCard></div>
          <div className="scroll-hint">Scroll</div>
        </div>
      </div>

      {/* MARQUEE */}
      <Marquee/>

      {/* STUDIO */}
      <div style={{maxWidth:1280,margin:"0 auto",padding:"0 24px"}}>
        <HR/>
        <Rv>
          <div id="about-us" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:44,alignItems:"center"}}>
            <div>
              <Lbl c="The Studio"/>
              <BigT c="The Studio" sz={62}/>
              <p style={{fontSize:16,lineHeight:1.9,color:"rgba(255,244,223,.6)",marginTop:18,marginBottom:16}}>Bangzuu Studios sits at the intersection of AI-assisted production, creator distribution, and story-first brand strategy. We work with brands, media platforms, and production partners who believe the future of content isn't louder advertising — it's better storytelling.</p>
              <p style={{fontSize:16,lineHeight:1.9,color:"rgba(255,244,223,.6)"}}>We build content that is faster to produce, harder to skip, and more valuable to own.</p>
            </div>
            <StudioSVG/>
          </div>
        </Rv>

        {/* PROCESS */}
        <HR/>
        <Rv>
          <div style={{border:"1px solid rgba(255,255,255,.07)",borderRadius:26,background:"rgba(255,255,255,.02)",padding:36,boxShadow:"0 28px 110px rgba(0,0,0,.32)"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:28,flexWrap:"wrap",gap:14}}>
              <div><Lbl c="Production system"/><BigT c="From brand brief to story asset."/></div>
              <p style={{maxWidth:380,fontSize:14,lineHeight:1.82,color:"rgba(255,244,223,.48)"}}>A visual workflow for how Bangzuu turns a brand into a creator-led story format with distribution built in.</p>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:14}}>
              {PROCESS.map(([num,title,copy,type])=>(
                <div key={num} className="card" style={{padding:0,overflow:"hidden",height:"100%",display:"flex",flexDirection:"column"}}>
                  <div style={{position:"relative",aspectRatio:"1 / 1",overflow:"hidden",borderBottom:"1px solid rgba(255,255,255,.07)",flexShrink:0}}><ProcessSVG type={type}/><div style={{position:"absolute",top:12,left:12,background:"rgba(0,0,0,.62)",border:"1px solid rgba(0,0,0,.18)",borderRadius:50,padding:"3px 11px",fontFamily:"var(--mn)",fontSize:8.5,letterSpacing:".2em",color:"var(--amber)",backdropFilter:"blur(8px)"}}>{num}</div></div>
                  <div style={{padding:20,flex:1}}><h3 className="ttl" style={{fontSize:20,color:"#fff4df",marginBottom:7}}>{title}</h3><p style={{fontSize:12.5,lineHeight:1.68,color:"rgba(255,244,223,.44)"}}>{copy}</p></div>
                </div>
              ))}
            </div>
          </div>
        </Rv>

        {/* WHO WE WORK WITH */}
        <HR/>
        <Rv id="who-we-work-with"><Lbl c="Audience pathways"/><BigT c="Who We Work With"/></Rv>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(270px,1fr))",gap:18,marginTop:36}}>
          {AUDIENCE.map(({label,headline,copy,cta,V})=>(
            <Rv key={label}>
              <div className="card" style={{padding:0,overflow:"hidden",height:"100%",display:"flex",flexDirection:"column"}}>
                <V/>
                <div style={{padding:24,display:"flex",flexDirection:"column",flex:1}}>
                  <h3 className="ttl" style={{fontSize:24,color:"#fff4df",marginBottom:12}}>{headline}</h3>
                  <p style={{fontSize:13.5,lineHeight:1.8,color:"rgba(255,244,223,.52)",marginBottom:16}}>{copy}</p>
                  <a href="#register" className="clink" style={{marginTop:"auto"}}>{cta} →</a>
                </div>
              </div>
            </Rv>
          ))}
        </div>

        {/* WHY */}
        <HR/>
        <Rv>
          <div style={{border:"1px solid rgba(255,255,255,.07)",borderRadius:26,background:"rgba(255,255,255,.02)",padding:36}}>
            <div style={{marginBottom:32}}><Lbl c="Why Bangzuu"/><BigT c="Why Bangzuu"/></div>
            {/* Row 1: cards left, WhySVG right */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20,marginBottom:20,alignItems:"stretch"}}>
              <div style={{display:"grid",gap:14}}>
                {WHY.slice(0,2).map(([b,c])=>(<div key={b} className="card" style={{background:"rgba(0,0,0,.28)"}}><p style={{fontWeight:700,fontSize:15,lineHeight:1.58,color:"#fff4df",marginBottom:9}}>{b}</p><p style={{fontSize:13.5,lineHeight:1.82,color:"rgba(255,244,223,.52)"}}>{c}</p></div>))}
              </div>
              <WhySVG/>
            </div>
            {/* Row 2: network left, cards right */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20,alignItems:"stretch"}}>
              <CreatorNetworkSVG/>
              <div style={{display:"grid",gap:14}}>
                {WHY.slice(2).map(([b,c])=>(<div key={b} className="card" style={{background:"rgba(0,0,0,.28)"}}><p style={{fontWeight:700,fontSize:15,lineHeight:1.58,color:"#fff4df",marginBottom:9}}>{b}</p><p style={{fontSize:13.5,lineHeight:1.82,color:"rgba(255,244,223,.52)"}}>{c}</p></div>))}
              </div>
            </div>
          </div>
        </Rv>

        {/* FORMATS */}
        <HR/>
        <Rv><Lbl c="Formats"/><BigT c="What We Build"/></Rv>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:18,marginTop:36}}>
          {FORMATS.map(([title,copy,detail,type])=>(
            <Rv key={title}>
              <div className="card" style={{padding:0,overflow:"hidden",height:"100%",display:"flex",flexDirection:"column"}}>
                <div style={{aspectRatio:"4 / 3",borderBottom:"1px solid rgba(255,255,255,.07)",overflow:"hidden",flexShrink:0,background:"#060505"}}><ProcessSVG type={type}/></div>
                <div style={{padding:24,flex:1,display:"flex",flexDirection:"column",justifyContent:"flex-start",minHeight:210}}><h3 className="ttl" style={{fontSize:24,color:"#fff4df",marginBottom:10}}>{title}</h3><p style={{fontSize:13.5,lineHeight:1.78,color:"rgba(255,244,223,.52)",marginBottom:9}}>{copy}</p><p style={{fontFamily:"var(--mn)",fontSize:9.5,letterSpacing:".18em",textTransform:"uppercase",color:"var(--amber)"}}>{detail}</p></div>
              </div>
            </Rv>
          ))}
        </div>

        {/* MARKET */}
        <HR/>
        <Rv><Lbl c="Market proof"/><BigT c="The Market Is Moving"/></Rv>
        <div style={{display:"grid",gap:18,marginTop:36}}>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,minmax(0,1fr))",gap:14}}>
            {STATS.map(({value,prefix,suffix,decimals,label})=>(
              <Rv key={label}>
                <div className="card" style={{height:"100%",minHeight:168,display:"flex",flexDirection:"column",justifyContent:"center"}}>
                  <div className="ttl" style={{fontSize:44,color:"#fff4df",marginBottom:12}}><RollingNumber value={value} prefix={prefix} suffix={suffix} decimals={decimals}/></div>
                  <p style={{fontSize:13.5,lineHeight:1.78,color:"rgba(255,244,223,.5)"}}>{label}</p>
                </div>
              </Rv>
            ))}
          </div>
          <Rv>
            <div style={{borderRadius:20,overflow:"hidden"}}>
              <MarketSVG/>
            </div>
          </Rv>
        </div>

        {/* REGISTER */}
        <HR/>
        <Rv id="register">
          <div style={{border:"1px solid rgba(255,255,255,.2)",borderRadius:26,background:"rgba(255,255,255,.12)",padding:56,textAlign:"center",boxShadow:"0 0 72px rgba(255,244,223,.07),0 28px 110px rgba(0,0,0,.26)",position:"relative",overflow:"hidden"}}>
            <div style={{position:"absolute",inset:0,background:"radial-gradient(circle at 50% 30%,rgba(255,244,223,.09),transparent 50%)",pointerEvents:"none"}}/>
            <div style={{position:"relative",zIndex:1}}>
              <Lbl c="Register interest"/>
              <BigT c="Ready to Build Something Worth Watching?" sz={60}/>
              <p style={{maxWidth:560,margin:"18px auto 0",fontSize:16,lineHeight:1.88,color:"rgba(255,255,255,.88)"}}>Tell us who you are and what you're building. We'll take it from there.</p>
              <RegForm/>
              <p style={{marginTop:18,fontFamily:"var(--mn)",fontSize:9.5,letterSpacing:".18em",textTransform:"uppercase",color:"rgba(255,255,255,.65)"}}>We review every submission. Limited availability per quarter.</p>
            </div>
          </div>
        </Rv>
      </div>
    </>
  );
}

/* ── TRAVEL PAGE ── */
const TRAVEL_OFFERS=[
  {title:"Vertical Content Series for Brands",copy:"Short-form, social-first branded series — built to live on the platforms where your audience already spends time. Each series is built around your brand as a core story device, developed with AI-assisted production, and designed with cinematic trailers that hook from the first second.",bullets:["Multi-episode format that builds repeat touchpoints — not one-and-done exposure","Brand integration written into the DNA of the story — not added after the fact","Scalable: start with a pilot series, expand what works"]},
  {title:"Creator-Led Mini-Movies",copy:"3–10 minute branded entertainment films, built around real influencers and their existing audiences. Your brand becomes the engine of the plot. The creator uploads to their channel. You walk away with a hero content asset you own and can reuse.",bullets:["Native to the creator's audience — feels like their content, not your ad","Full brand usage rights for paid, owned, and social channels","Story templates built for travel, VPN, insurance, fintech, and destination brands — ready to pitch fast"]}
];
const TRAVEL_AUDIENCE=["Travel brands that already invest in influencer marketing and want the content to work harder","VPNs, travel insurance providers, and eSIM brands looking for story-first sponsor integrations","OTAs, booking platforms, and travel apps that want hero content — not just ad inventory","Tourism boards and destination marketing organisations ready to think like a media brand","Travel fintech and loyalty programs with a content budget and something worth saying","Any brand that works with travel creators and is tired of paying for reads that get skipped"];
const TRAVEL_WHY=[
  ["We make your brand the plot.","Not the pause before the content. Not the logo at the end. The reason the story exists."],
  ["AI-assisted production means speed without sacrificing quality.","Cinematic output, faster timelines, built for social-first formats from the ground up."],
  ["We work with real influencers with real audiences.","Distribution isn't theoretical — it's baked into the product."],
  ["You leave with an asset, not an impression.","Every project delivers content you can reuse, repurpose, and run across your own channels long after the creator upload."]
];
const TRAVEL_FAQ=[
  ["How is this different from a standard influencer sponsorship?","A standard sponsorship puts your brand in front of an audience for 30–60 seconds. What we build puts your brand inside the story — as the thing that drives it forward. The difference in recall, engagement, and reusability is significant."],
  ["How long does production take?","Timelines vary by format. A vertical content series pilot can move from brief to delivery in 4–8 weeks. Creator mini-movies typically run 6–10 weeks depending on scope, location, and creator availability."],
  ["Do we need to bring our own influencer?","No. We work with our existing creator network and match you to the right partner based on your brand, audience, and objectives. If you already have a creator relationship, we can work with them too."],
  ["What does brand integration actually look like?","Your product or service is written into the story as a functional plot device — the thing the character needs, uses, or is saved by. It's not a verbal mention. It's not a card held up to camera. It's story architecture."],
  ["What markets do you operate in?","We are travel-first, with production capability across Southeast Asia and beyond. We work with brands targeting global, regional, and destination-specific audiences."],
  ["How is the content distributed?","Creator mini-movies are uploaded directly to the creator's channel — giving you immediate access to their existing audience. Vertical content series are distributed across social platforms and can be amplified through paid media. You also receive full usage rights to deploy across your own owned channels."],
  ["What happens after I register interest?","We review every submission. If there's a fit, we'll reach out to schedule a short discovery call — no pitch decks, no pressure. We want to understand your brand, your objectives, and what you're trying to achieve. From there we'll show you exactly what a project could look like for you."],
  ["How many brand partners do you take on?","We work with a limited number of partners each quarter to protect the quality of every project. Registering interest early puts you at the front of the queue."]
];

function TravelPage() {
  useReveal();
  return (
    <>
      <div style={{position:"relative",overflow:"hidden",background:"linear-gradient(135deg,#10211b 0%,#101719 48%,#050404 100%)",minHeight:520,display:"flex",alignItems:"center"}}>
        <div className="hero-grid" style={{opacity:.42}}/>
        <div style={{position:"absolute",left:"6%",top:"16%",width:300,height:300,borderRadius:"50%",background:"rgba(52,211,153,.12)",filter:"blur(78px)",animation:"drift1 14s ease-in-out infinite",pointerEvents:"none"}}/>
        <div style={{position:"absolute",right:"8%",bottom:"16%",width:260,height:260,borderRadius:"50%",background:"rgba(249,115,22,.16)",filter:"blur(72px)",animation:"drift2 15s ease-in-out infinite",pointerEvents:"none"}}/>
        <div style={{position:"absolute",bottom:0,left:0,right:0,height:110,background:"linear-gradient(to bottom,transparent,var(--bg))",pointerEvents:"none",zIndex:2}}/>
        <div style={{position:"relative",zIndex:5,maxWidth:1280,margin:"0 auto",padding:"110px 24px 72px",width:"100%",display:"grid",gridTemplateColumns:"1fr 1fr",gap:52,alignItems:"center"}}>
          <div>
            <div style={{display:"inline-flex",alignItems:"center",gap:8,border:"1px solid rgba(253,186,116,.2)",borderRadius:50,padding:"6px 14px",fontFamily:"var(--mn)",fontSize:8.5,letterSpacing:".26em",textTransform:"uppercase",color:"rgba(253,186,116,.72)",background:"rgba(0,0,0,.38)",backdropFilter:"blur(10px)",marginBottom:22}}><span style={{color:"var(--amber)",fontSize:7}}>▶</span> Bangzuu Studios × Travel Industry</div>
            <h1 className="ttl" style={{fontSize:"clamp(32px,5vw,66px)",color:"#fff4df",marginBottom:20}}>Stop Buying Sponsor Reads. Start Owning the Story.</h1>
            <p style={{fontSize:16,fontWeight:700,lineHeight:1.82,color:"rgba(253,186,116,.86)",marginBottom:20}}>We build vertical content series and creator-led mini-movies that embed your brand directly into the plot — using AI-assisted production and real influencer partnerships.</p>
            {["Your product becomes the engine of the story — not a 30-second interruption before it starts","Cinematic short-form content built natively for the platforms your audience lives on","Real creators. Existing audiences. Distribution that's built in — not bolted on","Faster production than traditional branded content. Higher recall than anything your media buyer has run this year"].map(b=><div key={b} style={{border:"1px solid rgba(255,255,255,.07)",borderRadius:13,padding:"11px 16px",fontSize:13.5,lineHeight:1.72,color:"rgba(255,244,223,.6)",marginBottom:9}}>{b}</div>)}
            <p style={{margin:"16px 0",fontFamily:"var(--mn)",fontSize:9.5,letterSpacing:".2em",textTransform:"uppercase",color:"var(--amber)"}}>We work with a limited number of brand partners per quarter.</p>
            <a href="#travel-register" className="btn">Register Interest</a>
          </div>
          <TiltCard style={{border:"none",boxShadow:"none"}}><TravelSVG/></TiltCard>
        </div>
      </div>

      <div style={{maxWidth:1280,margin:"0 auto",padding:"0 24px"}}>
        <HR/>
        <Rv>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:52,alignItems:"start"}}>
            <BigT c="Audiences have learned to skip your brand before you've finished saying it." sz={50}/>
            <div>
              <p style={{fontSize:15,lineHeight:1.88,color:"rgba(255,244,223,.6)",marginBottom:18}}>Mid-roll reads get muted. Sponsored segments get scrolled past. The creator delivers the line, the audience checks out, and you've paid for an impression that landed nowhere.</p>
              <p style={{fontSize:15,lineHeight:1.88,color:"rgba(255,244,223,.6)"}}>The format is broken. And running more of it won't fix it.</p>
            </div>
          </div>
        </Rv>

        <HR/>
        <Rv>
          <Lbl c="Imagine this"/>
          <BigT c="Your brand inside the story."/>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,minmax(0,1fr))",gap:14,marginTop:28}}>
            {[
              ["VPN Brand","Your VPN brand as the only thing standing between the protagonist and a government surveillance dragnet — cutting across three countries, two border crossings, and one very bad decision. Your product isn't mentioned in a mid-roll. It's the reason the main character survives."],
              ["Travel Insurance","Your travel insurance brand as the emotional turning point of a 7-minute mini-movie — a trip that goes catastrophically wrong, a traveller completely alone, and the moment your brand turns disaster into survival."],
              ["Tourism Board","A destination universe — a self-contained cinematic story set entirely in your city, built to expand, seeded through a creator with the exact audience you want, and designed to be content people send to friends before they book a flight."]
            ].map(([title,copy])=><div key={title} className="card" style={{background:"rgba(0,0,0,.28)",minHeight:250}}><h3 className="ttl" style={{fontSize:24,color:"#fff4df",marginBottom:12}}>{title}</h3><p style={{fontSize:13.5,lineHeight:1.82,color:"rgba(255,244,223,.52)"}}>{copy}</p></div>)}
          </div>
        </Rv>

        <HR/>
        <Rv>
          <Lbl c="What We Do"/><BigT c="What We Do"/>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:22,marginTop:28}}>
            {TRAVEL_OFFERS.map((o,i)=><div key={o.title} className="card" style={{padding:0,overflow:"hidden"}}>
              <div style={{position:"relative",aspectRatio:"16 / 9",overflow:"hidden",background:"#060505",borderBottom:"1px solid rgba(255,255,255,.07)",flexShrink:0}}>
                {i===0 ? (
                  <div style={{position:"relative",width:"100%",height:"100%",background:"linear-gradient(135deg,#10211b,#060505)",display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,padding:14,overflow:"hidden"}}>
                    <div style={{position:"absolute",inset:0,background:"radial-gradient(circle at 20% 22%,rgba(249,115,22,.18),transparent 34%),radial-gradient(circle at 82% 72%,rgba(52,211,153,.14),transparent 36%)",pointerEvents:"none"}}/>
                    {[["EP01","Hook"],["EP02","Conflict"],["EP03","Brand Turn"],["EP04","Replay"]].map(([ep,label],idx)=><div key={ep} style={{position:"relative",zIndex:2,border:"1px solid rgba(255,255,255,.08)",borderRadius:14,background:idx%2===0?"linear-gradient(135deg,#17302a,#0a0a08)":"linear-gradient(135deg,#2a1509,#080605)",display:"flex",flexDirection:"column",justifyContent:"flex-end",padding:14,overflow:"hidden"}}>
                      <div style={{position:"absolute",inset:0,background:"linear-gradient(160deg,transparent,rgba(0,0,0,.7)),radial-gradient(circle at 50% 30%,rgba(253,186,116,.18),transparent 36%)"}}/>
                      <div style={{position:"absolute",top:12,right:12,width:28,height:28,borderRadius:"50%",border:"1px solid rgba(253,186,116,.28)",background:"rgba(0,0,0,.32)",display:"flex",alignItems:"center",justifyContent:"center",color:"var(--amber)",fontSize:10}}>▶</div>
                      <div style={{position:"relative",zIndex:2}}><p style={{fontFamily:"var(--mn)",fontSize:8,letterSpacing:".18em",color:"var(--amber)",marginBottom:5}}>{ep}</p><p style={{fontWeight:700,fontSize:13,color:"rgba(255,244,223,.84)"}}>{label}</p></div>
                    </div>)}
                  </div>
                ) : (
                  <div style={{position:"relative",width:"100%",height:"100%",overflow:"hidden",background:"linear-gradient(135deg,#1d1008,#050505)",padding:18,display:"grid",gridTemplateColumns:"1.1fr .9fr",gap:14}}>
                    <div style={{position:"absolute",inset:0,background:"radial-gradient(circle at 22% 24%,rgba(249,115,22,.2),transparent 34%),radial-gradient(circle at 78% 72%,rgba(124,58,237,.14),transparent 36%)",pointerEvents:"none"}}/>
                    <div style={{position:"relative",zIndex:2,border:"1px solid rgba(255,255,255,.08)",borderRadius:16,background:"rgba(0,0,0,.34)",display:"flex",flexDirection:"column",justifyContent:"flex-end",padding:16,overflow:"hidden"}}>
                      <div style={{position:"absolute",inset:0,background:"linear-gradient(160deg,transparent,rgba(0,0,0,.72)),radial-gradient(circle at 50% 32%,rgba(253,186,116,.2),transparent 34%)"}}/>
                      <div style={{position:"relative",zIndex:2}}><p style={{fontFamily:"var(--mn)",fontSize:8,letterSpacing:".18em",color:"var(--amber)",marginBottom:5}}>HERO FILM</p><p style={{fontWeight:700,fontSize:14,color:"rgba(255,244,223,.84)"}}>Creator Upload</p></div>
                    </div>
                    <div style={{position:"relative",zIndex:2,display:"grid",gap:10}}>
                      {["3–10 MIN FILM","REAL CREATOR","BRAND USAGE"].map(label=><div key={label} style={{border:"1px solid rgba(253,186,116,.18)",borderRadius:14,padding:"13px 12px",background:"rgba(0,0,0,.38)",fontFamily:"var(--mn)",fontSize:8.5,letterSpacing:".18em",textTransform:"uppercase",color:"rgba(253,186,116,.74)",display:"flex",alignItems:"center",justifyContent:"center",textAlign:"center"}}>{label}</div>)}
                    </div>
                  </div>
                )}
              </div>
              <div style={{padding:24}}><div style={{width:38,height:38,borderRadius:"50%",border:"1px solid rgba(253,186,116,.2)",background:"rgba(249,115,22,.1)",display:"flex",alignItems:"center",justifyContent:"center",color:"rgba(253,186,116,.78)",fontSize:17,marginBottom:18}}>◆</div><h3 className="ttl" style={{fontSize:22,color:"#fff4df",marginBottom:11}}>{o.title}</h3><p style={{fontSize:13.5,lineHeight:1.78,color:"rgba(255,244,223,.52)",marginBottom:13}}>{o.copy}</p>{o.bullets.map(b=><p key={b} style={{border:"1px solid rgba(255,255,255,.07)",borderRadius:9,padding:"9px 13px",fontSize:12.5,lineHeight:1.58,color:"rgba(255,244,223,.48)",marginBottom:7}}>{b}</p>)}</div>
            </div>)}
          </div>
        </Rv>

        <HR/>
        <Rv>
          <div style={{border:"1px solid rgba(255,255,255,.07)",borderRadius:26,background:"rgba(255,255,255,.02)",padding:36}}>
            <div style={{display:"grid",gridTemplateColumns:"auto 1fr",gap:36}}>
              <div><Lbl c="Audience"/><BigT c="Who Is This For"/></div>
              <div><div style={{display:"grid",gap:9,marginBottom:22}}>{TRAVEL_AUDIENCE.map(item=><div key={item} style={{border:"1px solid rgba(255,255,255,.07)",borderRadius:11,padding:"11px 16px",fontSize:13.5,lineHeight:1.68,color:"rgba(255,244,223,.6)"}}>{item}</div>)}</div><p style={{fontSize:14,fontStyle:"italic",lineHeight:1.82,color:"rgba(253,186,116,.72)"}}>If you're spending on creator content and not getting the results the brief promised — this is for you.</p></div>
            </div>
          </div>
        </Rv>

        <HR/>
        <Rv>
          <Lbl c="Why Bangzuu"/><BigT c="Why Bangzuu"/>
          <div style={{display:"grid",gridTemplateColumns:"repeat(2,minmax(0,1fr))",gap:14,marginTop:28}}>{TRAVEL_WHY.map(([b,c])=><div key={b} className="card" style={{background:"rgba(0,0,0,.28)",minHeight:180,display:"flex",flexDirection:"column",justifyContent:"center"}}><p style={{fontWeight:700,fontSize:15,lineHeight:1.58,color:"#fff4df",marginBottom:9}}>{b}</p><p style={{fontSize:13.5,lineHeight:1.78,color:"rgba(255,244,223,.5)"}}>{c}</p></div>)}</div>
        </Rv>

        <HR/>
        <Rv><Lbl c="FAQ"/><BigT c="FAQ"/><div style={{marginTop:28}}>{TRAVEL_FAQ.map(([q,a])=><details key={q} className="faq"><summary style={{fontWeight:700,color:"#fff4df",fontSize:14}}>{q}</summary><p style={{marginTop:12,fontSize:13.5,lineHeight:1.82,color:"rgba(255,244,223,.52)"}}>{a}</p></details>)}</div></Rv>

        <HR/>
        <Rv>
          <div id="travel-register" style={{border:"1px solid rgba(255,255,255,.16)",borderRadius:26,background:"rgba(255,255,255,.07)",padding:52,textAlign:"center",position:"relative",overflow:"hidden"}}>
            <div style={{position:"absolute",inset:0,background:"radial-gradient(circle at 50% 30%,rgba(255,244,223,.06),transparent 50%)",pointerEvents:"none"}}/>
            <div style={{position:"relative",zIndex:1}}><Lbl c="Register interest"/><BigT c="Ready to Make Content People Actually Watch?" sz={48}/><p style={{maxWidth:560,margin:"18px auto 0",fontSize:15,lineHeight:1.88,color:"rgba(255,244,223,.58)"}}>Stop renting attention. Start owning the story. Register your interest and we'll be in touch within 48 hours.</p><RegForm/><p style={{marginTop:14,fontFamily:"var(--mn)",fontSize:9.5,letterSpacing:".18em",textTransform:"uppercase",color:"rgba(255,255,255,.42)"}}>We review every submission. Limited spots available per quarter.</p></div>
          </div>
        </Rv>
      </div>
    </>
  );
}

/* ── ENT PAGE ── */
const ENT_OFFERS=[{title:"Content Supply for Micro-Drama Platforms",copy:"Vertical micro-drama series produced at AI-native speed — built for the episode formats, genre conventions, and algorithmic demands of the world's fastest-growing content platforms.",bullets:["Genre-led storytelling: sci-fi, thriller, revenge, action, fantasy","Vertical-first format, episodic structure, built for mobile-first audiences","Licensing and commissioning models available — we work to your pipeline"]},{title:"Co-Production & Studio Partnerships",copy:"AI-native production collaboration for studios and production companies looking to compress timelines, reduce costs, and bring more ambitious projects to market faster.",bullets:["AI-assisted pre-production, post-production, and visual development","Hybrid live-action and AI-generated content pipelines","Flexible co-production structures — we adapt to your existing workflow"]},{title:"IP Development for Sales & Distribution",copy:"Slate development and IP creation for sales agents and distributors looking for vertical micro-drama content with international sales potential.",bullets:["Genre-led IP built with territory sales in mind from day one","Formats designed to travel — not locked to single-market conventions","Festival and platform-ready delivery standards"]}];
const ENT_MARKET=[["$11B → $14B","Global micro-drama market 2025 to 2026, per Omdia."],["58 platforms mapped","Active micro-drama platforms globally."],["100–400%","Year-on-year growth rates across the fastest-scaling platforms in 2025."],["$240M","DramaBox annual revenue 2025, up from $120M the prior year."]];
const ENT_AUDIENCE=["Micro-drama platforms actively commissioning or licensing external content","OTT platforms adding vertical micro-drama strands to existing catalogues","AI-native and tech-forward production studios looking for co-production partners","Traditional production companies exploring AI-assisted workflows for the first time","Sales agents and international distributors looking for vertical IP with global sales potential","Content acquisition teams at fast-growing platforms needing pipeline at speed","Investors and accelerator-backed studios building content infrastructure in emerging markets"];
const ENT_WHY=[["We are AI-native — not AI-assisted as an afterthought.","Our production pipeline is built around generative and AI-assisted workflows from the ground up. That means faster delivery, lower cost per episode, and the ability to produce at the volume platforms actually need."],["We understand micro-drama as a format, not a trend.","Genre conventions, episode architecture, hook mechanics, algorithmic performance — we build content engineered to perform inside the formats growing fastest globally."],["We produce content that travels.","Genre-led storytelling with international DNA — not locked to a single market, language, or platform's preferences."],["We are a studio, not a service provider.","We bring creative vision, production capability, and market understanding to every project. We are a partner in what you're building — not a vendor fulfilling a brief."]];
const ENT_FAQ=[["What formats and genres do you produce?","Vertical micro-drama series in sci-fi, thriller, revenge, action, and fantasy. We also develop genre hybrids and format experiments for partners with appetite for differentiation."],["How fast can you deliver?","A pilot or proof-of-concept series can move from brief to delivery in 4–8 weeks. Full series timelines are project-dependent — but consistently faster than traditional equivalents."],["What licensing models do you work with?","Flat-fee licensing, revenue share, co-production equity, and commissioned originals. The right model depends on the platform, the project, and the partnership."],["Do you develop original IP or only produce to brief?","Both. We have an active slate of original vertical IP in development — available for licensing, co-production, or acquisition."],["What markets do you produce for?","Southeast Asia-based with global production capability. Genre-led, internationally portable, not locked to single-market conventions."]];

function EntertainmentPage() {
  useReveal();
  return (
    <>
      {/* HERO BAND */}
      <div style={{position:"relative",overflow:"hidden",background:"linear-gradient(135deg,#2d1015 0%,#1b1230 50%,#040208 100%)",minHeight:520,display:"flex",alignItems:"center"}}>
        <div className="hero-grid" style={{opacity:.48}}/>
        <div style={{position:"absolute",left:"5%",top:"18%",width:280,height:280,borderRadius:"50%",background:"rgba(249,115,22,.2)",filter:"blur(75px)",animation:"drift1 13s ease-in-out infinite",pointerEvents:"none"}}/>
        <div style={{position:"absolute",right:"8%",bottom:"14%",width:240,height:240,borderRadius:"50%",background:"rgba(124,58,237,.18)",filter:"blur(65px)",animation:"drift2 15s ease-in-out infinite",pointerEvents:"none"}}/>
        <div style={{position:"absolute",bottom:0,left:0,right:0,height:110,background:"linear-gradient(to bottom,transparent,var(--bg))",pointerEvents:"none",zIndex:2}}/>
        <div style={{position:"relative",zIndex:5,maxWidth:1280,margin:"0 auto",padding:"110px 24px 72px",width:"100%",display:"grid",gridTemplateColumns:"1fr 1fr",gap:52,alignItems:"center"}}>
          <div>
            <div style={{display:"inline-flex",alignItems:"center",gap:8,border:"1px solid rgba(253,186,116,.2)",borderRadius:50,padding:"6px 14px",fontFamily:"var(--mn)",fontSize:8.5,letterSpacing:".26em",textTransform:"uppercase",color:"rgba(253,186,116,.72)",background:"rgba(0,0,0,.38)",backdropFilter:"blur(10px)",marginBottom:22}}>
              <span style={{color:"var(--amber)",fontSize:7}}>▶</span> Bangzuu Studios × Entertainment & Media
            </div>
            <h1 className="ttl" style={{fontSize:"clamp(32px,5vw,66px)",color:"#fff4df",marginBottom:20}}>The Micro-Drama Market Is Exploding. The Content Supply Isn't Keeping Up.</h1>
            <p style={{fontSize:16,fontWeight:700,lineHeight:1.82,color:"rgba(253,186,116,.86)",marginBottom:20}}>Bangzuu Studios is an AI-native production studio creating vertical content series and micro-dramas for platforms, co-production partners, and international sales pipelines — faster, leaner, and more cinematic than traditional production.</p>
            <div style={{display:"flex",gap:10,flexWrap:"wrap",marginBottom:20}}>
              <StatPill num="$14B" label="Market 2026" delay={.2}/>
              <StatPill num="58" label="Active platforms" delay={.35}/>
              <StatPill num="400%" label="YoY growth" delay={.5}/>
            </div>
            {["AI-assisted production compresses timelines without compromising quality","Vertical-first format natively built for platforms driving fastest audience growth","Flexible partnership — licensing, co-production, or IP development"].map(b=>(<div key={b} style={{border:"1px solid rgba(255,255,255,.07)",borderRadius:13,padding:"11px 16px",fontSize:13.5,lineHeight:1.72,color:"rgba(255,244,223,.6)",marginBottom:9}}>{b}</div>))}
            <p style={{margin:"16px 0",fontFamily:"var(--mn)",fontSize:9.5,letterSpacing:".2em",textTransform:"uppercase",color:"var(--amber)"}}>Selectively building platform and production partnerships.</p>
            <a href="#ent-register" className="btn">Register Interest</a>
          </div>
          <TiltCard style={{border:"none",boxShadow:"none"}}><EntHeroSVG/></TiltCard>
        </div>
      </div>

      <div style={{maxWidth:1280,margin:"0 auto",padding:"0 24px"}}>
        <HR/>
        <Rv>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:52,alignItems:"start"}}>
            <BigT c="The formats growing fastest are the hardest to staff and supply." sz={50}/>
            <div>
              <p style={{fontSize:15,lineHeight:1.88,color:"rgba(255,244,223,.6)",marginBottom:18}}>Micro-drama platforms are scaling at 100–400% annually. The appetite for content is outpacing the pipeline that feeds it. Traditional production is too slow, too expensive, and too format-agnostic to keep up.</p>
              <p style={{fontSize:15,lineHeight:1.88,color:"rgba(255,244,223,.6)"}}>AI-native studios that understand story — not just generation — are what the market needs. There aren't many of them yet.</p>
            </div>
          </div>
        </Rv>

        <HR/>
        <Rv>
          <Lbl c="Offerings"/><BigT c="What We Do"/>
          <div style={{display:"grid",gridTemplateColumns:"1.15fr 1fr",gap:24,marginTop:28,alignItems:"start"}}>
            <div style={{display:"grid",gap:18}}>
              {ENT_OFFERS.map(o=>(
                <div key={o.title} className="card">
                  <div style={{width:38,height:38,borderRadius:"50%",border:"1px solid rgba(253,186,116,.2)",background:"rgba(249,115,22,.1)",display:"flex",alignItems:"center",justifyContent:"center",color:"rgba(253,186,116,.78)",fontSize:17,marginBottom:18}}>▣</div>
                  <h3 className="ttl" style={{fontSize:20,color:"#fff4df",marginBottom:11}}>{o.title}</h3>
                  <p style={{fontSize:13.5,lineHeight:1.78,color:"rgba(255,244,223,.52)",marginBottom:13}}>{o.copy}</p>
                  {o.bullets.map(b=>(<p key={b} style={{border:"1px solid rgba(255,255,255,.07)",borderRadius:9,padding:"9px 13px",fontSize:12.5,lineHeight:1.58,color:"rgba(255,244,223,.48)",marginBottom:7}}>{b}</p>))}
                </div>
              ))}
            </div>
            <div style={{position:"sticky",top:90}}><GenreGridSVG/></div>
          </div>
        </Rv>

        <HR/>
        <Rv>
          <div style={{border:"1px solid rgba(255,255,255,.07)",borderRadius:26,background:"rgba(255,255,255,.02)",padding:36}}>
            <div style={{display:"grid",gridTemplateColumns:"auto 1fr",gap:36}}>
              <div><Lbl c="Audience"/><BigT c="Who Is This For"/></div>
              <div>
                <div style={{display:"grid",gap:9,marginBottom:22}}>{ENT_AUDIENCE.map(item=>(<div key={item} style={{border:"1px solid rgba(255,255,255,.07)",borderRadius:11,padding:"11px 16px",fontSize:13.5,lineHeight:1.68,color:"rgba(255,244,223,.6)"}}>{item}</div>))}</div>
                <p style={{fontSize:14,fontStyle:"italic",lineHeight:1.82,color:"rgba(253,186,116,.72)"}}>If you're building in the micro-drama space and need a production partner who understands both the technology and the story — this is for you.</p>
              </div>
            </div>
          </div>
        </Rv>

        <HR/>
        <Rv>
          <Lbl c="Why Bangzuu"/>
          <BigT c="Why Bangzuu"/>
          <div style={{display:"grid",gridTemplateColumns:"repeat(2,minmax(0,1fr))",gap:14,marginTop:28}}>
            {ENT_WHY.map(([b,c])=>(
              <div key={b} className="card" style={{background:"rgba(0,0,0,.28)",minHeight:210,display:"flex",flexDirection:"column",justifyContent:"center"}}>
                <p style={{fontWeight:700,fontSize:15,lineHeight:1.58,color:"#fff4df",marginBottom:9}}>{b}</p>
                <p style={{fontSize:13.5,lineHeight:1.78,color:"rgba(255,244,223,.5)"}}>{c}</p>
              </div>
            ))}
          </div>
        </Rv>

        <HR/>
        <Rv>
          <Lbl c="Market data"/>
          <BigT c="The Market You're Already In"/>
          <div style={{display:"grid",gap:18,marginTop:28}}>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,minmax(0,1fr))",gap:14}}>
              {ENT_MARKET.map(([num,lbl])=>(
                <div key={num} className="card" style={{height:"100%",minHeight:148,display:"flex",flexDirection:"column",justifyContent:"center"}}>
                  <div className="ttl" style={{fontSize:34,color:"#fff4df",marginBottom:10}}>{num}</div>
                  <p style={{fontSize:12.5,lineHeight:1.72,color:"rgba(255,244,223,.48)"}}>{lbl}</p>
                </div>
              ))}
            </div>
            <div style={{borderRadius:20,overflow:"hidden"}}>
              <MarketSVG/>
            </div>
          </div>
        </Rv>

        <HR/>
        <Rv><Lbl c="FAQ"/><BigT c="FAQ"/><div style={{marginTop:28}}>{ENT_FAQ.map(([q,a])=>(<details key={q} className="faq"><summary style={{fontWeight:700,color:"#fff4df",fontSize:14}}>{q}</summary><p style={{marginTop:12,fontSize:13.5,lineHeight:1.82,color:"rgba(255,244,223,.52)"}}>{a}</p></details>))}</div></Rv>

        <HR/>
        <Rv>
          <div id="ent-register" style={{border:"1px solid rgba(255,255,255,.16)",borderRadius:26,background:"rgba(255,255,255,.07)",padding:52,textAlign:"center",position:"relative",overflow:"hidden"}}>
            <div style={{position:"absolute",inset:0,background:"radial-gradient(circle at 50% 30%,rgba(255,244,223,.06),transparent 50%)",pointerEvents:"none"}}/>
            <div style={{position:"relative",zIndex:1}}>
              <Lbl c="Selective partnerships only"/><BigT c="Let's Talk About What You're Building." sz={48}/>
              <p style={{maxWidth:520,margin:"18px auto 0",fontSize:15,lineHeight:1.88,color:"rgba(255,244,223,.58)"}}>Whether you need content supply, a co-production partner, or IP for your sales slate — we want to hear from you.</p>
              <RegForm/>
              <p style={{marginTop:14,fontFamily:"var(--mn)",fontSize:9.5,letterSpacing:".18em",textTransform:"uppercase",color:"rgba(255,255,255,.42)"}}>We review every submission. Selective partnerships only.</p>
            </div>
          </div>
        </Rv>
      </div>
    </>
  );
}

/* ── FITNESS PAGE ── */
const FIT_OFFERS=[{title:"Vertical Content Series for Fitness & Lifestyle Brands",copy:"Short-form, social-first branded series built around your product as the story engine — not a product placement. Developed with AI-assisted production and designed to live natively on the platforms your audience already spends time on.",bullets:["Multi-episode format that compounds over time — each episode deepens brand association","Story frameworks built for supplements, apparel, equipment, apps, and wellness brands","Scalable: start with a pilot series, expand what proves itself"]},{title:"Creator-Led Mini-Movies",copy:"3–10 minute branded entertainment films built around real creators and their existing audiences. Your product becomes the reason the story turns.",bullets:["Native to the creator's world — feels like their content, not your brief","Full brand usage rights across paid, owned, and social channels","Story templates built for fitness, lifestyle, and DTC brands — ready to pitch fast"]}];
const FIT_AUDIENCE=["Supplement and sports nutrition brands with an audience that cares about performance and identity","Gym apparel and activewear brands ready to move beyond product shots and UGC loops","Fitness and workout apps looking for hero content that builds long-term brand trust","Outdoor, adventure, and sports brands whose product deserves a story as good as the experience","Wellness, recovery, and lifestyle brands with something worth saying and an audience worth saying it to","DTC brands in fitness and lifestyle spending on creator content and not seeing the return the brief promised","Fitness, lifestyle, and direct-to-consumer brands with an engaged online audience and a product worth building a story around"];
const FIT_WHY=[["We make your brand part of the culture, not a sponsor of it.","The fitness and lifestyle audience can spot a paid integration from the first frame. We build content where your brand is so embedded in the story that the question never comes up."],["AI-assisted production means we move at the speed the market demands.","Vertical content trends fast. We produce fast — without sacrificing the cinematic quality that makes the audience stop scrolling."],["We work with creators who already have the audience you want.","No building from scratch. No hoping the algorithm picks it up. Real creators, real subscribers, real watch-through."],["You walk away with content that compounds.","A hero asset you own. A story your audience remembers. A brand association that outlasts the campaign that created it."]];
const FIT_FAQ=[["How is this different from a standard influencer partnership?","A standard partnership gives you a creator's audience for 30–90 seconds. What we build gives you a story their audience finishes, shares, and remembers — with your brand as the reason it worked."],["We already run UGC and performance creative. Why would we add this?","UGC and performance creative optimise for the short-term. Story-first content builds the brand equity that makes performance creative work better over time."],["How long does production take?","A vertical content series pilot moves from brief to delivery in 4–8 weeks. Creator mini-movies typically run 6–10 weeks."],["What does brand integration actually look like?","Your product is written into the story as the thing the character uses — not demonstrated to camera. A supplement isn't reviewed. It's the protocol that gets the athlete to the finish line."],["What usage rights do we get?","Full brand usage rights across your paid, owned, and social channels. The asset is yours."],["How many brand partners do you take on?","A limited number per quarter. Registering early puts you at the front of the queue."]];

function FitnessPage() {
  useReveal();
  return (
    <>
      {/* HERO BAND */}
      <div style={{position:"relative",overflow:"hidden",background:"linear-gradient(135deg,#35170d 0%,#151515 50%,#040506 100%)",minHeight:520,display:"flex",alignItems:"center"}}>
        <div className="hero-grid" style={{opacity:.42}}/>
        <div style={{position:"absolute",left:"7%",top:"14%",width:300,height:300,borderRadius:"50%",background:"rgba(249,115,22,.24)",filter:"blur(85px)",animation:"drift1 14s ease-in-out infinite",pointerEvents:"none"}}/>
        <div style={{position:"absolute",right:"9%",bottom:"18%",width:220,height:220,borderRadius:"50%",background:"rgba(52,211,153,.09)",filter:"blur(65px)",animation:"drift3 17s ease-in-out infinite",pointerEvents:"none"}}/>
        <div style={{position:"absolute",bottom:0,left:0,right:0,height:110,background:"linear-gradient(to bottom,transparent,var(--bg))",pointerEvents:"none",zIndex:2}}/>
        <div style={{position:"relative",zIndex:5,maxWidth:1280,margin:"0 auto",padding:"110px 24px 72px",width:"100%",display:"grid",gridTemplateColumns:"1fr 1fr",gap:52,alignItems:"center"}}>
          <div>
            <div style={{display:"inline-flex",alignItems:"center",gap:8,border:"1px solid rgba(253,186,116,.2)",borderRadius:50,padding:"6px 14px",fontFamily:"var(--mn)",fontSize:8.5,letterSpacing:".26em",textTransform:"uppercase",color:"rgba(253,186,116,.72)",background:"rgba(0,0,0,.38)",backdropFilter:"blur(10px)",marginBottom:22}}>
              <span style={{color:"var(--amber)",fontSize:7}}>▶</span> Bangzuu Studios × Fitness, Lifestyle & DTC
            </div>
            <h1 className="ttl" style={{fontSize:"clamp(32px,5vw,66px)",color:"#fff4df",marginBottom:20}}>Stop Sponsoring Fitness Content. Start Being the Reason People Watch It.</h1>
            <p style={{fontSize:16,fontWeight:700,lineHeight:1.82,color:"rgba(253,186,116,.86)",marginBottom:20}}>Bangzuu Studios builds vertical content series and creator-led mini-movies for fitness, lifestyle, and DTC brands — where your supplement fuels the comeback, your apparel defines the character, and your product isn't a mid-roll. It's the whole point.</p>
            <div style={{display:"flex",gap:10,flexWrap:"wrap",marginBottom:20}}>
              <StatPill num="4–8wk" label="Delivery time" delay={.2}/>
              <StatPill num="2.1M" label="Avg creator reach" delay={.35}/>
              <StatPill num="4.2×" label="Brand recall" delay={.5}/>
            </div>
            {["Your product written into the story as the thing that gets the athlete there","Vertical content series built natively for the platforms your audience trains on","Real fitness creators with real audiences — distribution exists before the first frame","Content that builds brand equity over time — not just ROAS for one campaign cycle"].map(b=>(<div key={b} style={{border:"1px solid rgba(255,255,255,.07)",borderRadius:13,padding:"11px 16px",fontSize:13.5,lineHeight:1.72,color:"rgba(255,244,223,.6)",marginBottom:9}}>{b}</div>))}
            <p style={{margin:"16px 0",fontFamily:"var(--mn)",fontSize:9.5,letterSpacing:".2em",textTransform:"uppercase",color:"var(--amber)"}}>Limited brand partners per quarter.</p>
            <a href="#fit-register" className="btn">Register Interest</a>
          </div>
          <TiltCard style={{border:"none",boxShadow:"none"}}><FitHeroSVG/></TiltCard>
        </div>
      </div>

      <div style={{maxWidth:1280,margin:"0 auto",padding:"0 24px"}}>
        <HR/>
        <Rv>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:52,alignItems:"start"}}>
            <BigT c="Performance creative has a ceiling. Most fitness brands hit it faster than they expect." sz={50}/>
            <div>
              <p style={{fontSize:15,lineHeight:1.88,color:"rgba(255,244,223,.6)",marginBottom:18}}>UGC ads start strong and burn out. Influencer reads blend into the feed. The audience has seen the before-and-after. They've heard the discount code. They know what's coming before the creator opens their mouth.</p>
              <p style={{fontSize:15,lineHeight:1.88,color:"rgba(255,244,223,.6)"}}>The brands building lasting equity in fitness and lifestyle aren't running more ads. They're building content people actually want to watch.</p>
            </div>
          </div>
        </Rv>

        <HR/>
        <Rv>
          <Lbl c="Offerings"/><BigT c="What We Do"/>
          <div style={{marginTop:24,marginBottom:24}}><AthleteJourneySVG/></div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:22,alignItems:"start"}}>
            <div style={{display:"grid",gap:18}}>
              {FIT_OFFERS.map(o=>(
                <div key={o.title} className="card">
                  <div style={{width:38,height:38,borderRadius:"50%",border:"1px solid rgba(253,186,116,.2)",background:"rgba(249,115,22,.1)",display:"flex",alignItems:"center",justifyContent:"center",color:"rgba(253,186,116,.78)",fontSize:17,marginBottom:18}}>◈</div>
                  <h3 className="ttl" style={{fontSize:20,color:"#fff4df",marginBottom:11}}>{o.title}</h3>
                  <p style={{fontSize:13.5,lineHeight:1.78,color:"rgba(255,244,223,.52)",marginBottom:13}}>{o.copy}</p>
                  {o.bullets.map(b=>(<p key={b} style={{border:"1px solid rgba(255,255,255,.07)",borderRadius:9,padding:"9px 13px",fontSize:12.5,lineHeight:1.58,color:"rgba(255,244,223,.48)",marginBottom:7}}>{b}</p>))}
                </div>
              ))}
            </div>
            <div style={{position:"sticky",top:90}}><FitnessOfferSVG/></div>
          </div>
        </Rv>

        <HR/>
        <Rv>
          <div style={{border:"1px solid rgba(255,255,255,.07)",borderRadius:26,background:"rgba(255,255,255,.02)",padding:36}}>
            <div style={{display:"grid",gridTemplateColumns:"auto 1fr",gap:36}}>
              <div><Lbl c="Audience"/><BigT c="Who Is This For"/></div>
              <div>
                <div style={{display:"grid",gap:9,marginBottom:22}}>{FIT_AUDIENCE.map(item=>(<div key={item} style={{border:"1px solid rgba(255,255,255,.07)",borderRadius:11,padding:"11px 16px",fontSize:13.5,lineHeight:1.68,color:"rgba(255,244,223,.6)"}}>{item}</div>))}</div>
                <p style={{fontSize:14,fontStyle:"italic",lineHeight:1.82,color:"rgba(253,186,116,.72)"}}>If your brand lives in the fitness or lifestyle space and you're ready for content that builds something lasting — this is for you.</p>
              </div>
            </div>
          </div>
        </Rv>

        <HR/>
        <Rv>
          <Lbl c="Why Bangzuu"/><BigT c="Why Bangzuu"/>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:18,marginTop:28,alignItems:"stretch"}}>
            <div style={{display:"grid",gap:14}}>{FIT_WHY.slice(0,2).map(([b,c])=>(<div key={b} className="card" style={{background:"rgba(0,0,0,.28)"}}><p style={{fontWeight:700,fontSize:15,lineHeight:1.58,color:"#fff4df",marginBottom:9}}>{b}</p><p style={{fontSize:13.5,lineHeight:1.78,color:"rgba(255,244,223,.5)"}}>{c}</p></div>))}</div>
            <div style={{display:"grid",gap:14}}>{FIT_WHY.slice(2).map(([b,c])=>(<div key={b} className="card" style={{background:"rgba(0,0,0,.28)"}}><p style={{fontWeight:700,fontSize:15,lineHeight:1.58,color:"#fff4df",marginBottom:9}}>{b}</p><p style={{fontSize:13.5,lineHeight:1.78,color:"rgba(255,244,223,.5)"}}>{c}</p></div>))}</div>
          </div>
          
        </Rv>

        <HR/>
        <Rv><Lbl c="FAQ"/><BigT c="FAQ"/><div style={{marginTop:28}}>{FIT_FAQ.map(([q,a])=>(<details key={q} className="faq"><summary style={{fontWeight:700,color:"#fff4df",fontSize:14}}>{q}</summary><p style={{marginTop:12,fontSize:13.5,lineHeight:1.82,color:"rgba(255,244,223,.52)"}}>{a}</p></details>))}</div></Rv>

        <HR/>
        <Rv>
          <div id="fit-register" style={{border:"1px solid rgba(255,255,255,.16)",borderRadius:26,background:"rgba(255,255,255,.07)",padding:52,textAlign:"center",position:"relative",overflow:"hidden"}}>
            <div style={{position:"absolute",inset:0,background:"radial-gradient(circle at 50% 30%,rgba(255,244,223,.06),transparent 50%)",pointerEvents:"none"}}/>
            <div style={{position:"relative",zIndex:1}}>
              <Lbl c="Limited spots available per quarter"/><BigT c="Ready to Build Content Your Audience Actually Wants to Watch?" sz={46}/>
              <p style={{maxWidth:520,margin:"18px auto 0",fontSize:15,lineHeight:1.88,color:"rgba(255,244,223,.58)"}}>Stop blending in. Start owning the story. Register your interest and we'll be in touch within 48 hours.</p>
              <RegForm/>
              <p style={{marginTop:14,fontFamily:"var(--mn)",fontSize:9.5,letterSpacing:".18em",textTransform:"uppercase",color:"rgba(255,255,255,.42)"}}>We review every submission. Limited spots available per quarter.</p>
            </div>
          </div>
        </Rv>
      </div>
    </>
  );
}

/* ── APP ── */
export default function App() {
  const [page,setPage]=useState("home");
  const [scrollPct,setScrollPct]=useState(0);
  useEffect(()=>{
    const fn=()=>{const m=document.documentElement.scrollHeight-window.innerHeight;setScrollPct(m>0?(window.scrollY/m)*100:0);};
    window.addEventListener("scroll",fn,{passive:true});return()=>window.removeEventListener("scroll",fn);
  },[]);

  return (
    <>
      <style>{CSS}</style>
      <CursorGlow/>
      {/* scroll bar */}
      <div style={{position:"fixed",top:0,left:0,height:3,width:`${scrollPct}%`,background:"linear-gradient(90deg,var(--amber),#fde68a)",boxShadow:"0 0 20px var(--amber)",zIndex:300,transition:"width .1s linear"}}/>
      {/* ambient blobs */}
      <div style={{position:"fixed",inset:0,zIndex:0,pointerEvents:"none",overflow:"hidden"}}>
        <div style={{position:"absolute",left:"5%",top:"20%",width:280,height:280,borderRadius:"50%",background:"rgba(124,58,237,.11)",filter:"blur(72px)",animation:"floatA 11s ease-in-out infinite"}}/>
        <div style={{position:"absolute",right:"7%",top:"40%",width:320,height:320,borderRadius:"50%",background:"rgba(249,115,22,.08)",filter:"blur(88px)",animation:"floatB 14s ease-in-out infinite"}}/>
        <div style={{position:"absolute",left:"50%",top:30,width:600,height:600,borderRadius:"50%",background:"rgba(249,115,22,.05)",filter:"blur(120px)",transform:"translateX(-50%)"}}/>
      </div>
      {/* noise */}
      <div style={{position:"fixed",inset:0,zIndex:50,pointerEvents:"none",opacity:.05,mixBlendMode:"screen"}}><div style={{position:"absolute",inset:0,background:"repeating-linear-gradient(0deg,rgba(255,255,255,.14) 0,transparent 1px,transparent 4px)"}}/></div>
      <Header page={page} setPage={setPage}/>
      <main style={{position:"relative",zIndex:10}}>
        {page==="home"&&<HomePage/>}
        {page==="travel"&&<TravelPage/>}
        {page==="entertainment"&&<EntertainmentPage/>}
        {page==="fitness"&&<FitnessPage/>}
      </main>
      <footer style={{position:"relative",zIndex:10,borderTop:"1px solid rgba(255,255,255,.07)",padding:"32px 24px"}}>
        <div style={{maxWidth:1280,margin:"0 auto",display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:10,fontFamily:"var(--mn)",fontSize:9.5,letterSpacing:".22em",textTransform:"uppercase",color:"rgba(255,244,223,.32)"}}>
          <span>© 2026 Bangzuu Studios</span>
          <span>{page==="home"?"AI // Story // Distribution":page==="travel"?"Travel // Tourism // Creator Story":page==="entertainment"?"Entertainment // Media // Micro-drama":"Fitness // Lifestyle // DTC"}</span>
        </div>
      </footer>
    </>
  );
}
