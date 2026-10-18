"use client";
import {useState,type CSSProperties} from "react";
import {motion,useReducedMotion} from "motion/react";
import {ArrowDownRight,ArrowUpRight,RotateCcw} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Tabs,TabsList,TabsTrigger,TabsContent} from "@/components/ui/tabs";

const perspectives=[
 {id:"hierarchy",label:"Hierarchy",title:"Give attention a direction.",copy:"I want a person to understand where to look before they have to think about where to click. Scale, contrast, and space should do that work together."},
 {id:"structure",label:"Structure",title:"Make space for possibility.",copy:"I think of a layout as a set of relationships. A good structure can change shape without losing its meaning—or the person using it."},
 {id:"rhythm",label:"Rhythm",title:"Find the right rhythm.",copy:"I use motion to connect moments. A little anticipation, a clear response, then enough stillness to read. The pause matters as much as the movement."}
];
export function ThinkingStudio({paused}:{paused:boolean}){
 const reduce=useReducedMotion(),quiet=paused||reduce;
 const [mode,setMode]=useState("hierarchy"),[emphasis,setEmphasis]=useState(72),[layout,setLayout]=useState("editorial"),[tempo,setTempo]=useState("restrained"),[replay,setReplay]=useState(0);
 const selected=perspectives.find(p=>p.id===mode)!;
 function reset(){setMode("hierarchy");setEmphasis(72);setLayout("editorial");setTempo("restrained");setReplay(n=>n+1)}
 const expressive=tempo==="expressive";
 const animation=(i:number)=>({initial:{opacity:quiet||mode!=="rhythm"?1:0,y:quiet||mode!=="rhythm"?0:expressive?28:10},animate:{opacity:1,y:0},transition:{duration:quiet?0:expressive?.65:.35,delay:quiet||mode!=="rhythm"?0:i*(expressive?.14:.08)}});
 return <section id="perspective" className="thinking-studio" aria-labelledby="thinking-title"><div className="thinking-heading"><div><span className="eyebrow"><span className="chapter">06</span>Perspective</span><h2 id="thinking-title">A different <em>perspective.</em></h2></div><p>Move a detail. Change the feeling.</p></div>
  <Tabs value={mode} onValueChange={setMode} className="thinking-tabs"><TabsList aria-label="Explore my design thinking" className="thinking-tab-list">{perspectives.map((p,i)=><TabsTrigger key={p.id} value={p.id}><span>0{i+1}</span>{p.label}</TabsTrigger>)}</TabsList>
   <div className="thinking-workspace"><div className="thinking-controls"><span className="mono">{mode==="hierarchy"?"Guide the eye":mode==="structure"?"Change the arrangement":"Set the pace"}</span><h3>{selected.title}</h3><p>{selected.copy}</p>
   {perspectives.map(p=><TabsContent key={p.id} value={p.id} className="thinking-control-panel">{p.id==="hierarchy"?<><label htmlFor="hierarchy-range">Visual emphasis <output htmlFor="hierarchy-range">{emphasis}%</output></label><input id="hierarchy-range" type="range" min="0" max="100" value={emphasis} onChange={e=>setEmphasis(Number(e.target.value))} aria-valuetext={`${emphasis}% visual emphasis`}/><div className="range-caption"><span>Equal weight</span><span>Clear hierarchy</span></div></>:p.id==="structure"?<fieldset><legend>Composition</legend><div className="thinking-options">{["editorial","compact","spacious"].map(v=><button type="button" key={v} aria-pressed={layout===v} onClick={()=>setLayout(v)}>{v}</button>)}</div></fieldset>:<><fieldset><legend>Motion character</legend><div className="thinking-options">{["restrained","expressive"].map(v=><button type="button" key={v} aria-pressed={tempo===v} onClick={()=>setTempo(v)}>{v}</button>)}</div></fieldset><Button className="replay-button" variant="ghost" onClick={()=>setReplay(n=>n+1)} disabled={!!quiet}><RotateCcw size={14}/>See it again</Button>{quiet&&<p className="quiet-note">Reduced motion is enabled. The full composition stays visible.</p>}</>}</TabsContent>)}
   <Button variant="ghost" className="thinking-reset" onClick={reset}><RotateCcw size={13}/>Start again</Button></div>
   <div className={`design-specimen specimen-${mode==="structure"?layout:"editorial"}`} style={{"--emphasis":mode==="hierarchy"?emphasis/100:.72} as CSSProperties} aria-label="Live typography and layout composition"><div className="specimen-top"><span>Notes on intention</span><span>nk.</span></div><div className="specimen-body" key={`${mode}-${replay}`}><motion.div {...animation(0)} className="specimen-title"><span className="specimen-overline">Less noise. More meaning.</span><h3>Make room<br/>for <em>clarity.</em></h3></motion.div><motion.figure {...animation(1)} className="specimen-portrait"><img src="/portraits/nikitha-monochrome-cutout.webp" alt="Monochrome portrait of Nikitha" width={1535} height={2048} loading="lazy"/></motion.figure><motion.div {...animation(2)} className="specimen-note"><span>A point of view</span><p>Give every element a purpose.<br/>Give the important ones space.</p></motion.div><motion.div {...animation(3)} className="specimen-signature">Nikitha Keshan <ArrowUpRight size={18} aria-hidden="true"/></motion.div></div><div className="specimen-bottom"><span>Engineering × Design</span><span>Form follows intention.</span></div></div></div>
  </Tabs>
 </section>;
}
