"use client";
import {useEffect,type ReactNode,type PointerEvent,type CSSProperties} from "react";
import {motion,useMotionValue,useSpring} from "motion/react";
import {useQuietMotion} from "./cinema-context";
export function Glass({children,variant="card",className="",tilt=false,style}:{children:ReactNode;variant?:"card"|"pill"|"panel"|"button"|"dock";className?:string;tilt?:boolean;style?:CSSProperties}){
 const quiet=useQuietMotion(),x=useMotionValue(0),y=useMotionValue(0),rx=useSpring(x,{stiffness:150,damping:25}),ry=useSpring(y,{stiffness:150,damping:25});
 useEffect(()=>{if(quiet){x.set(0);y.set(0)}},[quiet,x,y]);
 function move(e:PointerEvent<HTMLDivElement>){if(!tilt||quiet||e.pointerType!=="mouse"||!matchMedia('(hover:hover) and (pointer:fine)').matches)return;const r=e.currentTarget.getBoundingClientRect();x.set((.5-(e.clientY-r.top)/r.height)*7);y.set(((e.clientX-r.left)/r.width-.5)*7)}
 return <motion.div className={`glass glass-${variant} ${className}`} onPointerMove={move} onPointerLeave={()=>{x.set(0);y.set(0)}} onPointerCancel={()=>{x.set(0);y.set(0)}} style={{...style,rotateX:quiet?0:rx,rotateY:quiet?0:ry,transformPerspective:1000}}>{children}</motion.div>;
}
