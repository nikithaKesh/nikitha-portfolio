"use client";

import { useEffect, useState, type ReactNode, type PointerEvent } from "react";
import { AnimatePresence, motion, useIsPresent, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { ArrowUpRight, Code2, Layers3, Server, Database, Cloud, Sparkles, Plus, ArrowLeft, ArrowRight } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {Glass} from "./glass";
import {useQuietMotion} from "./cinema-context";
import content from "./content.json";

const disciplines = [
 {icon:Code2, title:"Start with the logic.", note:"The languages behind an idea, from a small script to a complete application."},
 {icon:Layers3, title:"Make the next step clear.", note:"Interfaces that connect people with the work they need to do, across screens."},
 {icon:Server, title:"Connect what happens underneath.", note:"Application logic, services, and APIs that bring the experience together."},
 {icon:Database, title:"Give information a structure.", note:"Storage, relationships, and access patterns shaped around the application."},
 {icon:Cloud, title:"Take the work into the world.", note:"Infrastructure, version control, and deployment tools for delivering software."},
 {icon:Sparkles, title:"Leave room to explore.", note:"Tools for investigating ideas, working with data, and shaping visual experiences."},
];

function DepthSurface({children,className=""}:{children:ReactNode;className?:string}) {return <Glass tilt className={`depth-surface ${className}`}>{children}</Glass>}

function SkillSheet({index,direction,onStep}:{index:number;direction:number;onStep:(step:number)=>void}){
 const reduce=useQuietMotion(),present=useIsPresent();
 const g=content.skills[index],Icon=disciplines[index].icon;
 return <motion.div className="skill-sheet" custom={direction} inert={!present} aria-hidden={!present||undefined}
  variants={{enter:(d:number)=>({x:reduce?0:d*100,y:reduce?0:18,rotateY:reduce?0:d*-12,rotate:reduce?0:d*4,scale:reduce?1:.95,opacity:reduce?1:0}),center:{x:0,y:0,rotateY:0,rotate:0,scale:1,opacity:1},leave:(d:number)=>({x:reduce?0:d*-150,y:reduce?0:24,rotateY:reduce?0:d*15,rotate:reduce?0:d*-7,scale:reduce?1:.94,opacity:0})}}
  initial="enter" animate="center" exit="leave" transition={{duration:reduce?0:.52,ease:[.22,1,.36,1]}}
  drag={reduce?false:"x"} dragConstraints={{left:0,right:0}} dragElastic={.14} dragSnapToOrigin onDragEnd={(_,info)=>{if(Math.abs(info.offset.x)>55)onStep(info.offset.x<0?1:-1)}}>
  <TabsContent forceMount value={String(index)} className="craft-panel"><DepthSurface><div className="craft-card-top"><span className="mono">Collection 0{index+1}</span><Icon size={30} strokeWidth={1}/></div><h3>{disciplines[index].title}</h3><p>{disciplines[index].note}</p><ul className="tool-grid" aria-label={g.title}>{g.items.map((tool,j)=><li key={tool}><span>{String(j+1).padStart(2,"0")}</span>{tool}</li>)}</ul><div className="craft-card-bottom"><span>{g.title}</span><span>0{index+1} / 06</span></div></DepthSurface></TabsContent>
 </motion.div>;
}

export function CraftSkills(){
 const [active,setActive]=useState(0),[direction,setDirection]=useState(1);
 function select(next:number){if(next===active)return;setDirection(next>active?1:-1);setActive(next)}
 function step(delta:number){setDirection(delta);setActive(n=>(n+delta+content.skills.length)%content.skills.length)}
 return <section className="craft-section section-pad" id="skills">
  <div className="section-heading"><div><div className="eyebrow"><span className="chapter">07</span>Skills</div><h2>A versatile <em>toolkit.</em></h2></div></div>
  <div className="practice-index"><div className="practice-caption"><span className="mono">A connected practice</span><p>Engineering gives an idea structure.<br/>Design makes it feel human.</p></div><div className="practice-rows">{[
   ["Software & systems","I connect interfaces, data, and business workflows into systems people can rely on. My toolkit spans frontend development, backend logic, databases, and automation."],
   ["Interfaces & experiences","I use hierarchy, spacing, and clear feedback to make complex information easier to navigate. The interface should help people understand what to do next."],
   ["Visual thinking & storytelling","Composition, photography, and rhythm shape how I see digital experiences. I look for a clear point of view, then give each detail a reason to be there."]
  ].map(([title,copy],i)=><details name="practice-notes" key={title}><summary><span>0{i+1}</span><h3>{title}</h3><Plus size={18} aria-hidden="true"/></summary><p>{copy}</p></details>)}</div></div>
  <Tabs value={String(active)} onValueChange={v=>select(Number(v))} orientation="vertical" className="craft-tabs">
   <TabsList className="craft-index" aria-label="Skill disciplines">{content.skills.map((g,i)=>{const Icon=disciplines[i].icon;return <TabsTrigger key={g.title} value={String(i)} className="craft-trigger"><span className="craft-number">0{i+1}</span><Icon size={19}/><span>{g.title}<small>{g.items.length} tools</small></span><ArrowUpRight size={17}/></TabsTrigger>})}</TabsList>
   <div className="skill-deck-wrap"><div className="craft-deck"><AnimatePresence initial={false} custom={direction}><SkillSheet key={active} index={active} direction={direction} onStep={step}/></AnimatePresence></div><div className="skill-pagination"><Button variant="ghost" aria-label="Previous skill card" onClick={()=>step(-1)}><ArrowLeft size={17}/></Button><span aria-live="polite">0{active+1} / 06 <span>Find your perspective</span></span><Button variant="ghost" aria-label="Next skill card" onClick={()=>step(1)}><ArrowRight size={17}/></Button></div></div>
  </Tabs>

 </section>;
}

const workDetails=[
 ["Website updates, backups, access control, and version management.","Google Ads, Merchant Center, and Meta Business Suite integrations.","IT support and troubleshooting across devices and operations."],
 ["Business websites, including Alpha Solutions’ own site.","Automation using Apps Script, Python, and Google Sheets.","Ongoing website maintenance and error resolution for clients."]
];
export function JourneyStack({onResume}:{onResume:()=>void}){
 const quiet=useQuietMotion();
 const chapters=[{year:"2024",note:"Systems in practice.",items:[{entry:content.timeline[0],kind:"Work",scope:workDetails[0]},{entry:content.timeline[2],kind:"Study",scope:[]}]},{year:"2025",note:"A wider perspective.",items:[{entry:content.timeline[1],kind:"Work",scope:workDetails[1]},{entry:content.timeline[3],kind:"Study",scope:[]}]}];
 return <section id="experience" className="journey-section section-pad"><div className="section-heading"><div><span className="eyebrow"><span className="chapter">08</span>Journey</span><h2>Always <em>becoming.</em></h2></div><div className="journey-heading-note"><p>Work and learning.<br/>Two threads, one evolving practice.</p><Button variant="outline" onClick={onResume}>View my CV<ArrowUpRight size={17}/></Button></div></div>
 <div className="journey-map"><div className="journey-column-labels" aria-hidden="true"><span>The chapters</span><span>In practice</span><span>In study</span></div>{chapters.map((chapter,ci)=><div className="journey-chapter" key={chapter.year}><div className="journey-year"><span className="year-dot"/><strong>{chapter.year}</strong><p>{chapter.note}</p></div>{chapter.items.map(({entry:t,kind,scope},i)=><motion.article key={t.title} className={`journey-milestone milestone-${kind.toLowerCase()}`} initial={{opacity:1,y:quiet?0:24}} whileInView={{y:0}} viewport={{once:true,amount:.15}} transition={{duration:quiet?0:.6,delay:quiet?0:i*.1}}><div className="milestone-top"><span>{kind}</span><span>{t.date}</span></div><span className="milestone-org">{t.organization}</span><h3>{t.title}</h3><p>{t.description}</p>{scope.length>0&&<details className="milestone-details"><summary>Inside the role<Plus size={16}/></summary><ul>{scope.map(text=><li key={text}>{text}</li>)}</ul></details>}<span className="milestone-coordinate" aria-hidden="true">0{ci+1} / {i===0?'Practice':'Perspective'}</span></motion.article>)}</div>)}</div>
 <div className="foundation-register"><div className="register-heading"><span className="mono">The foundations</span><h3>Where it <em>started.</em></h3></div><div className="register-grid">{content.education.map((e,i)=><details name="foundations" key={e.title} className="register-item"><summary><span className="register-number">0{i+1}</span><span>{e.title}<small>{e.organization}</small></span><Plus size={18}/></summary><p>{e.description}</p></details>)}</div></div>
 </section>;
}

export function AboutPortrait(){
 return <div className="about-portrait-composition"><figure className="portrait-main"><div className="portrait-image"><img src="/portraits/nikitha-studio-cutout.webp" alt="Nikitha Keshan wearing a navy blazer" width={1024} height={1536} loading="lazy"/></div><figcaption><span>Nikitha Keshan</span><span>Software / Systems / Design</span></figcaption></figure><figure className="portrait-inset"><img src="/portraits/nikitha-monochrome-original.webp" alt="Original monochrome portrait of Nikitha Keshan with its background" width={1535} height={2048} loading="lazy"/><figcaption>A different perspective.</figcaption></figure></div>;
}

