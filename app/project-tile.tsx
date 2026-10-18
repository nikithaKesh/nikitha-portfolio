"use client";
import {useRef,useState} from 'react';
import {useInView} from 'motion/react';
import {ArrowUpRight,X} from 'lucide-react';
import projects from './projects.json';
import {caseNotes} from './case-notes';
import {projectImages} from './project-images';
import {projectTitles,projectDescriptions} from './project-presentation';
import {WorkArtwork} from './work-artwork';
import {useQuietMotion} from './cinema-context';
type Project=typeof projects[number];
export function ProjectTile({project:p,onOpen}:{project:Project;onOpen:(p:Project)=>void}){
 const quiet=useQuietMotion(),ref=useRef<HTMLElement>(null),inView=useInView(ref,{amount:.1}),[expanded,setExpanded]=useState(false),note=caseNotes[p.id];
 return <article ref={ref} className={`bento-project visual-project bento-${p.id} ${inView&&!quiet?'art-alive':''} ${expanded?'preview-open':''}`} onPointerEnter={e=>{if(e.pointerType==="mouse")setExpanded(true)}} onPointerLeave={e=>{if(e.pointerType==="mouse")setExpanded(false)}}><button className="project-preview-trigger" aria-label={`Preview ${p.title}`} aria-expanded={expanded} aria-controls={`project-info-${p.id}`} onClick={()=>setExpanded(v=>!v)}><div className="bento-visual" aria-hidden="true"><WorkArtwork id={p.id}/><span className="bento-open"><ArrowUpRight size={21}/></span></div></button><div className="project-hover-info" id={`project-info-${p.id}`}><span className="hover-role">{p.role}</span><h3>{projectTitles[p.id]||p.title}</h3><p>{projectDescriptions[p.id]||note.question}</p><span className="hover-evidence">{projectImages[p.id]?'Brand imagery':'Concept illustration'} · not a UI screenshot</span><button className="project-read" onClick={()=>onOpen(p)}>Explore project<ArrowUpRight size={18}/></button><button className="preview-dismiss" aria-label="Close project preview" onClick={()=>setExpanded(false)}><X size={18}/></button></div></article>;
}
