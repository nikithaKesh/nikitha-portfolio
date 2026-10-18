"use client";
import {useRef,useState} from "react";
import {MotionConfig,useReducedMotion} from "motion/react";
import {ArrowLeft,ArrowUpRight} from "lucide-react";
import projects from "../projects.json";
import {CinemaContext} from "../cinema-context";
import {CinemaRuntime} from "../cinema-runtime";
import {ProjectCaseDialog} from "../project-case-dialog";
import {WorkNewspaper} from "../work-newspaper";
import {Glass} from "../glass";
export default function WorkCollection(){
 const quiet=!!useReducedMotion(),[project,setProject]=useState<typeof projects[number]|null>(null),returnFocus=useRef<HTMLElement|null>(null);
 return <CinemaContext.Provider value={quiet}><MotionConfig reducedMotion="user"><div className="portfolio collection-page"><CinemaRuntime modalOpen={!!project}/><a className="skip" href="#main">Skip to content</a><header className="site-header"><Glass variant="pill" className="nav-shell"><a className="wordmark" href="/"><span>Nikitha Keshan</span></a><nav className="collection-nav" aria-label="Primary"><a href="/#work"><ArrowLeft size={16}/> Back home</a><a href="/#contact">Let’s talk <ArrowUpRight size={16}/></a></nav></Glass></header><main id="main"><WorkNewspaper collection onOpen={p=>{returnFocus.current=document.activeElement as HTMLElement;setProject(p)}}/></main><footer className="collection-footer"><a href="/">Nikitha Keshan</a><div><a href="https://github.com/nikithaKesh" target="_blank" rel="noreferrer">GitHub</a><a href="https://www.linkedin.com/in/nikitha-keshan-640927325/" target="_blank" rel="noreferrer">LinkedIn</a></div></footer><ProjectCaseDialog project={project} onClose={()=>setProject(null)} restoreFocus={e=>{e.preventDefault();returnFocus.current?.focus()}}/></div></MotionConfig></CinemaContext.Provider>
}
