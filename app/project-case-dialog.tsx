"use client";
import {motion} from "motion/react";
import {Plus,X} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Dialog,DialogClose,DialogContent,DialogDescription,DialogTitle} from "@/components/ui/dialog";
import projects from "./projects.json";
import {WorkVisual,CaseDepth} from "./story-components";
import {caseNotes} from "./case-notes";
import {useQuietMotion} from "./cinema-context";
type Project=typeof projects[number];
const categoryNames:Record<string,string>={web:"Digital experiences",automation:"Systems & automation",repos:"Development archives"};
export function ProjectCaseDialog({project,onClose,restoreFocus}:{project:Project|null;onClose:()=>void;restoreFocus:(e:Event)=>void}){
const quiet=useQuietMotion();
return <Dialog open={!!project} onOpenChange={v=>{if(!v)onClose()}}><DialogContent className="case-dialog" onCloseAutoFocus={restoreFocus} showCloseButton={false}><div className="dialog-topbar"><DialogClose asChild><Button variant="ghost" className="dialog-close-label">Close <X size={18}/></Button></DialogClose></div>{project&&<><div className="case-header"><span className="mono">Case study / {categoryNames[project.category]}</span><DialogTitle>{project.title}</DialogTitle><DialogDescription>{caseNotes[project.id].question}</DialogDescription></div><motion.div className="case-hero-frame" layoutId={quiet?undefined:`project-frame-${project.id}`}><WorkVisual id={project.id}/></motion.div><CaseDepth key={project.id} id={project.id}/><details className="original-account"><summary>Read the full project account <Plus size={18}/></summary><p className="account-note">Existing portfolio accounts are preserved; added stories are based on inspected source or labelled development history. The evidence notes above distinguish implementation details from unverified outcomes.</p><div className="case-meta"><div><span>My role</span><strong>{project.role}</strong></div><div><span>Tools & disciplines</span><div className="tags">{project.tags.map(t=><span key={t}>{t}</span>)}</div></div></div>{[["01","The challenge",project.problem],["02","The approach",project.solution],["03","The outcome",project.impact]].map(([i,title,txt])=><section className="case-story" key={i}><span>{i}</span><div><h3>{title}</h3><p>{txt}</p></div></section>)}</details><div className="case-links">{project.links.filter(l=>l.type!=="case").map(l=><a className="outline-link" href={l.url} target="_blank" rel="noreferrer" key={l.url}>{l.label==="Live Demo"?"Visit live website":l.label}</a>)}{project.links.every(l=>l.type==="case")&&<span className="mono">Project record · See evidence notes</span>}</div></>}</DialogContent></Dialog>;
}
