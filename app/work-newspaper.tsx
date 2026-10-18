"use client";
import {useMemo,useState} from 'react';
import {ArrowUpRight,Search,Globe,Workflow,FlaskConical} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import projects from './projects.json';
import {selectedIds} from './project-presentation';
import {ProjectTile} from './project-tile';
import {filterProjects} from './work-filter';
type Project=typeof projects[number];
const categories=[{id:'web',label:'Web experiences',icon:Globe},{id:'automation',label:'Systems & data',icon:Workflow},{id:'repos',label:'Experiments',icon:FlaskConical}];
export function WorkNewspaper({onOpen,collection=false}:{onOpen:(p:Project)=>void;collection?:boolean}){
 const [category,setCategory]=useState('web'),[query,setQuery]=useState('');
 const filtered=useMemo(()=>collection?filterProjects(projects,category,query):selectedIds.map(id=>projects.find(p=>p.id===id)!).filter(Boolean),[category,query,collection]);
 return <section id="work" className="zip-work work-screening section-pad"><span id="featured"/><div className="work-opening"><div><span className="eyebrow"><span className="chapter">02</span>{collection?"The collection":"Selected work"}</span>{collection?<h1>Work, in <em>practice.</em></h1>:<h2>Ideas made <em>real.</em></h2>}</div><div className="work-total"><strong>{collection?projects.length:"05"}</strong><span>{collection?"projects / three collections":"selected / 24 projects"}</span></div></div>{collection&&<><div className="work-tools"><div className="theatre-categories" role="group" aria-label="Work categories">{categories.map(({id,label,icon:Icon})=><Button variant="ghost" key={id} aria-pressed={category===id} onClick={()=>setCategory(id)}><Icon size={16}/>{label}<small>{projects.filter(p=>p.category===id).length}</small></Button>)}</div><label className="work-search"><Search size={17}/><Input value={query} placeholder="Find a project" aria-label="Search projects in the selected category" onChange={e=>setQuery(e.target.value)}/></label></div><p className="work-results" role="status">{filtered.length} {filtered.length===1?'project':'projects'}{query&&` matching “${query}”`}</p></>}{filtered.length?<div className="work-bento">{filtered.map(p=><ProjectTile key={p.id} project={p} onOpen={onOpen}/>)}</div>:<div className="work-empty"><h3>No matching projects.</h3><Button onClick={()=>setQuery('')}>Clear search</Button></div>}{!collection&&<a className="more-work-link" href="/work"><span>More work<small>Explore all 24 projects</small></span><ArrowUpRight size={26}/></a>}</section>;
}
