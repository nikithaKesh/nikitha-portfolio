"use client";
import {useState,useRef} from "react";
import {AnimatePresence,motion,useScroll,useTransform} from "motion/react";
import {Plus,Globe,Workflow,Database,Camera,Palette,ArrowUpRight,Sparkles,ArrowDownRight} from "lucide-react";
import {useQuietMotion} from "./cinema-context";
import {LivingForm} from "./living-form";
const cards=[
 {name:"Experience",sub:"Web & interfaces",icon:Globe,title:"The part people feel.",copy:"Hierarchy, rhythm, and feedback turn a set of features into an experience.",href:"#perspective",link:"Explore my design thinking"},
 {name:"Logic",sub:"Systems & automation",icon:Workflow,title:"The connections underneath.",copy:"Interfaces become useful when the rules, workflows, and edge cases fit together.",href:"#work",link:"Explore the systems I build"},
 {name:"Foundation",sub:"Data & tooling",icon:Database,title:"A structure that holds.",copy:"Organized data and maintainable systems give an idea room to grow.",href:"#skills",link:"Explore my toolkit"},
 {name:"Design",sub:"Hierarchy & rhythm",icon:Palette,title:"A clear point of view.",copy:"Explore the live composition in my Thinking Studio.",href:"#perspective",link:"Open the studio"},
 {name:"Photography",sub:"Framing & attention",icon:Camera,title:"A different perspective.",copy:"Composition, photography, and rhythm shape how I see digital experiences.",href:"#about",link:"Meet the person"},
 {name:"Now",sub:"An ongoing practice",icon:Sparkles,title:"Still curious. Still building.",copy:"What I’m working on, learning, and exploring next.",href:"#now",link:"See what’s in progress"}
];
export function GlassHero(){
 const [selected,setSelected]=useState(0),quiet=useQuietMotion(),ref=useRef<HTMLElement>(null);
 const {scrollYProgress}=useScroll({target:ref,offset:['start start','end start']});
 const drift=useTransform(scrollYProgress,[0,1],[0,-30]);
 const chosen=cards[selected];
 return <section id="home" ref={ref} className="portrait-hero">
  <div className="portrait-hero-top"><span>Software engineer. Visual thinker.</span><span>Colombo, Sri Lanka</span></div>
  <div className="portrait-hero-stage">
   <div className="portrait-hero-copy"><span className="portrait-hero-kicker">Systems, interfaces, stories.</span><h1><span>Nikitha</span><em>Keshan<span>.</span></em></h1><p>Built with logic.<br/><em>Felt by people.</em></p><a className="portrait-hero-cta" href="#work">Explore the work<ArrowUpRight size={21}/><span>24</span></a></div>
   <div className="portrait-hero-art"><div className="portrait-hero-disc" aria-hidden="true"/><motion.figure className="portrait-hero-photo" style={{y:quiet?0:drift}}><img src="/portraits/nikitha-monochrome-cutout.webp" srcSet="/portraits/nikitha-monochrome-cutout-1024.webp 1024w, /portraits/nikitha-monochrome-cutout.webp 1535w" sizes="(max-width:760px) 80vw, 450px" width={1535} height={2048} fetchPriority="high" alt="Nikitha Keshan"/></motion.figure><div className="portrait-hero-object"><LivingForm mode={selected}/></div><span className="portrait-art-note">Less noise.<br/><em>More meaning.</em></span><span className="portrait-object-note"><ArrowDownRight size={16}/> Shaped by perspective</span></div>
  </div>
  <div className="portrait-hero-bottom"><div className="portrait-practice"><div className="portrait-practice-tabs" aria-label="Choose a perspective and change the sculpture">{cards.slice(0,3).map((c,i)=><button key={c.name} aria-pressed={selected===i} aria-controls="practice-note" onClick={()=>setSelected(i)}><span>0{i+1}</span>{c.name}{selected===i&&<motion.i layoutId="hero-perspective-indicator" transition={{duration:quiet?0:.3}}/>}</button>)}</div><div id="practice-note" className="portrait-practice-note" aria-live="polite"><AnimatePresence initial={false} mode="wait"><motion.div key={selected} initial={{opacity:quiet?1:0,y:quiet?0:5}} animate={{opacity:1,y:0}} exit={{opacity:quiet?1:0,y:quiet?0:-5}} transition={{duration:quiet?0:.15}}><strong>{chosen.title}</strong><p>{chosen.copy}</p><a href={chosen.href}>{chosen.link}<ArrowUpRight size={14}/></a></motion.div></AnimatePresence></div></div><div className="portrait-hero-asides"><span>Turn friction into flow.</span>{cards.slice(3).map(c=><details name="hero-perspectives" key={c.name}><summary>{c.name}<Plus size={16}/></summary><p><strong>{c.title}</strong> {c.copy}</p><a href={c.href}>{c.link}</a></details>)}</div></div>
 </section>
}
export function DisciplineMarquee(){const ref=useRef<HTMLDivElement>(null),quiet=useQuietMotion();const {scrollYProgress}=useScroll({target:ref,offset:['start end','end start']});const x=useTransform(scrollYProgress,[0,1],['4%','-24%']);return <div ref={ref} className="kinetic-interlude" aria-label="Engineering meets imagination"><motion.div style={{x:quiet?0:x}} aria-hidden="true"><span>Engineering</span><i>meets</i><span>imagination</span><Sparkles size={72} strokeWidth={1}/></motion.div><p>Software engineering / UI & UX / Graphic design / Photography / Systems / Storytelling</p></div>}
