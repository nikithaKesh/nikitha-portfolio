"use client";
import * as React from "react";
import {Dialog as Primitive} from "radix-ui";
import {X} from "lucide-react";
export const Dialog=Primitive.Root,DialogClose=Primitive.Close,DialogTitle=Primitive.Title,DialogDescription=Primitive.Description;
export function DialogContent({className="",children,showCloseButton=true,...props}:React.ComponentProps<typeof Primitive.Content>&{showCloseButton?:boolean}){return <Primitive.Portal><Primitive.Overlay className="dialog-overlay"/><Primitive.Content data-lenis-prevent className={`dialog-content glass glass-panel ${className}`} {...props}>{children}{showCloseButton&&<Primitive.Close className="dialog-x" aria-label="Close"><X size={20}/></Primitive.Close>}</Primitive.Content></Primitive.Portal>}
