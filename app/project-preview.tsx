"use client";
import type {CSSProperties} from "react";
import {ArrowUpRight} from "lucide-react";
import {caseNotes} from "./case-notes";
import projects from "./projects.json";
const tones=['#b79cc4','#bf9ca9','#a1b0c4','#b7a7c7','#b8aaa0','#b5a2af'];
export function ProjectPreview({id}:{id:string}){
 const p=projects.find(p=>p.id===id)!,n=caseNotes[id],index=projects.indexOf(p),number=String(index+1).padStart(2,'0');
 return <div className={`curated-preview preview-${p.category} ${n.image?'preview-with-image':''}`} style={{'--project-tone':tones[index%tones.length]} as CSSProperties}>
 <div className="preview-edition"><span>{p.category==='web'?'Digital experiences':p.category==='automation'?'Connected systems':'Independent explorations'}</span><span>№ {number}</span></div>
 {n.image?<div className="preview-photo"><img src={n.image.replace('biseka.png','biseka.webp').replace('ola.jpg','ola.webp')} width={id==='ola'?1200:1024} height={id==='ola'?1500:1024} alt={n.imageAlt||p.title} loading="lazy"/><div className="image-caption-mark" aria-hidden="true">{p.title.split(' ')[0]}<ArrowUpRight size={30}/></div></div>:<div className="project-poster"><span className="poster-number" aria-hidden="true">{number}</span><div className="poster-orbit" aria-hidden="true"/><div className="poster-paper"><span>{p.tags[0]}</span><strong>{n.flow[0]}</strong><div className="poster-divider"/><em>{n.flow[n.flow.length-1]}</em><ArrowUpRight size={30} strokeWidth={1}/></div><div className="poster-side-note">{p.tags.slice(1,3).join(' + ')}</div></div>}
 <div className="preview-bottom"><span>{n.image?'Brand reference · not a UI screenshot':'Conceptual typography · not a product screenshot'}</span><span>nk.</span></div>
 </div>;
}
