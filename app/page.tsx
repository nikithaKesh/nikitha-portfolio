"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion, MotionConfig, LayoutGroup, useReducedMotion, useScroll } from "motion/react";
import { Briefcase, BookOpen, Compass, Users, Code2, Plus, Minus, Menu, X, Copy, Download, Mail, Search, ArrowUpRight, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import content from "./content.json";
import projects from "./projects.json";
import {StorySequence} from "./story-components";
import {CraftSkills,JourneyStack,AboutPortrait} from "./craft-sections";
import {ProjectCaseDialog} from "./project-case-dialog";
import {WorkNewspaper} from "./work-newspaper";
import {NKMark} from "./nk-mark";
import {ProcessCards} from "./process-cards";
import {ServiceIndex} from "./service-index";
import {ThinkingStudio} from "./experience-components";

const nowIcons = [Code2, BookOpen, Briefcase, Compass, Users];
const nav = [["work", "Work"], ["about", "About"], ["skills", "Skills"], ["experience", "Journey"], ["contact", "Contact"]];

const professional = [["GitHub", "https://github.com/nikithaKesh"], ["LinkedIn", "https://www.linkedin.com/in/nikitha-keshan-640927325/"]];
const categoryNames: Record<string,string> = {web:"Digital experiences",automation:"Systems & automation",repos:"Development archives"};

import {Glass} from "./glass";
import {GlassHero,DisciplineMarquee} from "./glass-hero";
import {CinemaContext,useQuietMotion} from "./cinema-context";
import {CinemaRuntime} from "./cinema-runtime";
type Project = typeof projects[number];
function Label({n,children}:{n:string;children:React.ReactNode}) {return <div className="eyebrow"><span className="chapter">{n}</span>{children}</div>}
function Reveal({children,className=""}:{children:React.ReactNode;className?:string}) {
 const reduce=useQuietMotion();
 return <motion.div className={className} initial={{y:reduce?0:35,opacity:1}} whileInView={{y:0,opacity:1}} viewport={{once:true,amount:0.12}} transition={{duration:reduce?0:.7}}>{children}</motion.div>
}
export default function Portfolio(){
 const reduce=useReducedMotion();
 const [menu,setMenu]=useState(false);
 const [project,setProject]=useState<Project|null>(null),[resume,setResume]=useState(false),[toast,setToast]=useState(""),[sending,setSending]=useState(false),[formStatus,setFormStatus]=useState("");
 const [activeSection,setActiveSection]=useState("");
 const [views,setViews]=useState<number|null>(null);
 const [draftLink,setDraftLink]=useState("");
 const quiet=!!reduce;
 const returnFocus=useRef<HTMLElement|null>(null);
 function captureFocus(){returnFocus.current=document.activeElement as HTMLElement}
 function restoreFocus(e:Event){e.preventDefault();returnFocus.current?.focus()}
 const {scrollYProgress}=useScroll();

 useEffect(()=>{const observer=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting)setActiveSection(entry.target.id)},{rootMargin:"-15% 0px -65% 0px",threshold:0});nav.forEach(([id])=>{const section=document.getElementById(id);if(section)observer.observe(section)});return()=>observer.disconnect()},[]);
 useEffect(()=>{if(!toast)return;const t=setTimeout(()=>setToast(""),3500);return()=>clearTimeout(t)},[toast]);
 useEffect(()=>{const c=new AbortController();fetch("https://api.counterapi.dev/v1/nikithakeshan/portfolio_visits/",{signal:c.signal}).then(r=>r.ok?r.json():null).then(d=>{if(d && typeof d === "object" && "count" in d && typeof d.count === "number")setViews(d.count)}).catch(()=>{});return()=>c.abort()},[]);
 async function copy(text:string,message:string){try{await navigator.clipboard.writeText(text);setToast(message)}catch{setToast("Copy unavailable. Please select and copy the text manually.")}}
 async function submit(e:FormEvent<HTMLFormElement>){e.preventDefault();const form=e.currentTarget;if(!form.reportValidity())return;const data=new FormData(form);if(data.get("_gotcha"))return;setDraftLink("mailto:nikithakeshan@gmail.com?subject="+encodeURIComponent("Portfolio inquiry: "+String(data.get("inquiry_type")))+"&body="+encodeURIComponent("From: "+String(data.get("name"))+"\nEmail: "+String(data.get("email"))+"\n\n"+String(data.get("message"))));setSending(true);setFormStatus("");const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),15000);try{const r=await fetch("/api/contact",{method:"POST",body:data,headers:{Accept:"application/json"},signal:controller.signal});const result=await r.json() as {message?:string};if(!r.ok)throw new Error(result.message||"Please retry or email me.");setFormStatus(result.message||"Thank you. Your inquiry was accepted for delivery.");form.reset()}catch(error){setFormStatus("Your message could not be sent. "+(error instanceof Error&&error.name!=="AbortError"?error.message:"Your details are still here. Please retry or email nikithakeshan@gmail.com."))}finally{clearTimeout(timer);setSending(false)}}
 return <CinemaContext.Provider value={quiet}><MotionConfig reducedMotion={quiet?"always":"user"}><LayoutGroup><div className="portfolio">
  <CinemaRuntime modalOpen={!!project||resume||menu}/>
  <a className="skip" href="#main">Skip to content</a>
  <motion.div className="reading-progress" style={{scaleX:scrollYProgress}} />
  <header className="site-header"><Glass variant="pill" className="nav-shell">
   <a className="wordmark" href="#home" aria-label="Nikitha Keshan home"><span>Nikitha Keshan</span></a>
   <nav className="desktop-nav" aria-label="Primary">{nav.map(([id,label])=><a href={`#${id}`} key={id} aria-current={activeSection===id?"location":undefined}>{label}</a>)}</nav>
   <div className="header-actions"><Button variant="ghost" className="resume-nav" onClick={()=>{captureFocus();setResume(true)}}>Résumé</Button><a href="#contact" className="primary-link nav-talk">Let’s talk <ArrowUpRight size={15}/></a><Button variant="ghost" className="menu-trigger" aria-label="Open navigation" aria-haspopup="dialog" aria-expanded={menu} onClick={()=>{captureFocus();setMenu(true)}}><Menu size={20}/></Button></div>
  </Glass></header>
  <Dialog open={menu} onOpenChange={setMenu}><DialogContent className="mobile-menu" onCloseAutoFocus={restoreFocus} showCloseButton={false}><div className="dialog-topbar"><DialogClose asChild><Button variant="ghost" className="dialog-close-label">Close <X size={18}/></Button></DialogClose></div><DialogTitle>Explore</DialogTitle><DialogDescription className="sr-only">Portfolio navigation</DialogDescription><nav aria-label="Mobile">{nav.map(([id,label],i)=><a key={id} href={`#${id}`} onClick={()=>{returnFocus.current=document.getElementById(id);returnFocus.current?.setAttribute("tabindex","-1");setMenu(false)}}><span>0{i+1}</span>{label}</a>)}</nav><Button onClick={()=>{setMenu(false);setTimeout(()=>{returnFocus.current=document.querySelector(".resume-nav");setResume(true)},100)}}>View résumé</Button></DialogContent></Dialog>
  <main id="main">
   <GlassHero/><DisciplineMarquee/>
   <StorySequence/>
   <WorkNewspaper onOpen={p=>{captureFocus();setProject(p)}}/>
   <section className="about-section section-pad" id="about"><Label n="03">About</Label><h2>A little <em>about me.</em></h2><div className="about-grid"><div className="about-title"><AboutPortrait/><span className="about-signature">Nikitha Keshan</span><p>Based in Colombo, Sri Lanka.</p></div><div className="about-copy"><h3>Clarity, from idea to everyday.</h3><p className="identity-statement">From a product page to a payroll PDF, I care about the next step: what to simplify, what to automate, and what needs to stay clear.</p><p>{content.about[0]}</p><details className="about-background glass glass-panel"><summary>More about my background<Plus size={18}/></summary><p>{content.about[1]}</p><p>{content.about[content.about.length-1]}</p></details><div className="principle"><span>What matters to me</span><p>Make the information clear.<br/>Make the handoff reliable.<br/>Make the next step obvious.</p><small>Code maintainability over shortcuts. Automate mundane tasks. Design for the end-user.</small></div><div className="about-details">{["What I do","What I focus on","Solutions I build"].map((t,i)=><details name="about-focus" key={t}><summary>{t}<Plus size={18}/></summary><p>{content.about[i+2]}</p></details>)}<details name="about-focus"><summary>Focus & business contexts<Plus size={18}/></summary><p>Web Application Architecture · Business Process Automation · UI/UX Systems</p><p>E-commerce and retail operations · Internal reporting and admin workflows · Brand sites with growth-focused UX</p></details></div></div></div></section>
   <ServiceIndex/>
   <ProcessCards/>
   <div className="perspective-section section-pad"><ThinkingStudio paused={quiet}/></div>
   <CraftSkills/>
   <JourneyStack onResume={()=>{captureFocus();setResume(true)}}/>
   <section className="now-section now-cards-section section-pad" id="now"><div className="process-heading"><div><Label n="09">Now</Label><h2>In <em>focus.</em></h2></div></div><div className="now-cards">{content.now.map((n,i)=>{const Icon=nowIcons[i];return <article className="process-card now-card" key={n.title}><div className="process-card-top"><Icon size={21} strokeWidth={1.6}/><span>0{i+1}</span></div><h3>{n.title}</h3><p>{n.description}</p><span className="process-card-track" aria-hidden="true"><i/></span></article>})}</div></section>
   <section id="contact" className="contact-section section-pad"><Label n="10">Contact</Label><h2>Have something <em>in mind?</em></h2><div className="contact-grid"><div className="contact-info"><p>{content.contactIntro}</p><a className="email-link" href="mailto:nikithakeshan@gmail.com">nikithakeshan@gmail.com</a><Button variant="ghost" className="copy-email" onClick={()=>copy("nikithakeshan@gmail.com","Email copied.")}><Copy size={16}/> Copy email</Button><div className="contact-links"><a href="https://maps.app.goo.gl/92YSmSagvwY27RFp7" target="_blank" rel="noreferrer">Based in <span>Kalutara & Colombo, Sri Lanka</span></a></div><div className="professional-links">{professional.map(([n,url])=><a href={url} target="_blank" rel="noreferrer" key={n}>{n}</a>)}</div></div><form onSubmit={submit} className="contact-form"><input className="honeypot" type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true"/><div className="form-row"><label>Your name<Input name="name" maxLength={160} required autoComplete="name" placeholder="Name"/></label><label>Email address<Input name="email" type="email" required autoComplete="email" placeholder="you@company.com"/></label></div><label>Area of focus<select name="inquiry_type" required defaultValue=""><option value="" disabled>Select an area of focus</option>{["Web Architecture & Frontend","Business System Automation","Internal Tools & Dashboards","Contract or Full-Time Role","Other Inquiry"].map(t=><option key={t}>{t}</option>)}</select></label><label>Tell me about it<textarea name="message" maxLength={10000} required rows={4} placeholder="What are you imagining? A little context is a good start."/></label><Button className="send-button" type="submit" disabled={sending}>{sending?"Sending your inquiry…":"Send inquiry"}<Mail size={18}/></Button><p role="status" className="form-status">{formStatus}</p>{formStatus.startsWith("Your message could not")&&<a className="email-fallback" href={draftLink}>Open your email app with this message</a>}</form></div></section>
  </main>
  <footer className="site-footer"><p className="footer-display">Let’s make<br/><em>it matter.</em></p><nav className="footer-sections" aria-label="More portfolio sections"><a href="#services">Services</a><a href="#process">Process</a><a href="#perspective">Thinking Studio</a><a href="#now">Now</a></nav><div className="footer-endnote"><a className="footer-identity" href="#home" aria-label="Nikitha Keshan, back to top"><NKMark className="footer-monogram"/><span>Nikitha Keshan<small>Engineering / Design / Storytelling</small></span></a><p>Thoughtfully built. <em>Personally made.</em></p><a className="footer-return" href="#home" aria-label="Back to top"><ArrowUp size={21}/></a></div><div className="footer-utility"><span>© 2026 Nikitha Keshan</span><span>Software & visual thinking.{views!==null&&` · ${views.toLocaleString()} recorded views`}</span><button onClick={()=>copy(window.location.origin,"Portfolio link copied.")}><Copy size={14}/> Copy portfolio link</button></div></footer>
  <ProjectCaseDialog project={project} onClose={()=>setProject(null)} restoreFocus={restoreFocus}/>
  <Dialog open={resume} onOpenChange={setResume}><DialogContent className="resume-dialog" onCloseAutoFocus={restoreFocus} showCloseButton={false}><div className="dialog-topbar"><DialogClose asChild><Button variant="ghost" className="dialog-close-label">Close <X size={18}/></Button></DialogClose></div><div className="resume-toolbar"><div><DialogTitle>Résumé</DialogTitle><DialogDescription>Experience, education & references.</DialogDescription></div><a className="outline-link" href="/nikitha-keshan-resume.pdf" download><Download size={16}/> Download my PDF CV</a></div><div className="resume-document" dangerouslySetInnerHTML={{__html:content.resumeHTML}}/></DialogContent></Dialog>
  <AnimatePresence>{toast&&<motion.div role="status" className="toast glass glass-pill" initial={{y:20,opacity:0}} animate={{y:0,opacity:1}} exit={{opacity:0}}>{toast}</motion.div>}</AnimatePresence>

 </div></LayoutGroup></MotionConfig></CinemaContext.Provider>
}
