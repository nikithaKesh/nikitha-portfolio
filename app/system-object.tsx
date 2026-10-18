"use client";
import {NKMark} from "./nk-mark";
import {useState,type CSSProperties} from "react";
import {Braces,Database,Layers,ArrowUpRight,MoveUpRight} from "lucide-react";
const planes=[
 {name:"Experience",icon:Layers,title:"The part people feel.",copy:"Hierarchy, rhythm, and feedback turn a set of features into an experience.",href:"#perspective",link:"Explore my design thinking"},
 {name:"Logic",icon:Braces,title:"The connections underneath.",copy:"Interfaces become useful when the rules, workflows, and edge cases fit together.",href:"#work",link:"Explore the systems I build"},
 {name:"Foundation",icon:Database,title:"A structure that holds.",copy:"Organized data and maintainable systems give an idea room to grow.",href:"#skills",link:"Explore my toolkit"}
];
export function SystemObject(){
 const [active,setActive]=useState(0),[expanded,setExpanded]=useState(false);const chosen=planes[active];
 return <div className="system-object"><div className="object-top"><span>NK / ANATOMY OF AN IDEA</span><button aria-pressed={expanded} aria-controls="nk-sculpture" onClick={()=>setExpanded(v=>!v)}><MoveUpRight size={13}/>{expanded?'Assemble':'Separate layers'}</button></div><div id="nk-sculpture" className="nk-stage" aria-hidden="true"><div className="nk-ground"/><div className="nk-float"><div className="nk-assembly">{planes.map((p,i)=><div key={p.name} className={`nk-slab ${active===i?'nk-selected':''}`} style={{"--nk-depth":`${(1-i)*(expanded?100:12)}px`,"--nk-slide":`${expanded?(i-1)*20:0}px`} as CSSProperties}><div className="nk-face"><span className="nk-code">0{i+1} / {p.name}</span><div className="nk-relief"><NKMark className="nk-mark-shadow"/><NKMark className="nk-mark-edge"/><NKMark className="nk-mark-face"/></div><p.icon className="nk-icon" size={16}/></div><div className="nk-side"/><div className="nk-front"/></div>)}</div></div></div><div className="nk-state" aria-live="polite">{expanded?'Layers separated — explore each discipline below.':'Assembled — one connected practice.'}</div><div className="object-selector" aria-label="Explore the layers of my practice">{planes.map((p,i)=><button key={p.name} aria-pressed={active===i} onClick={()=>{setActive(i);setExpanded(true)}}><p.icon size={14}/>{p.name}</button>)}</div><div className="object-caption" aria-live="polite"><h2>{chosen.title}</h2><p>{chosen.copy}</p><a href={chosen.href}>{chosen.link}<ArrowUpRight size={14}/></a></div></div>;
}
