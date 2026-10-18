"use client";
import * as React from "react";
import {Tabs as Primitive} from "radix-ui";
export function Tabs({className="",...props}:React.ComponentProps<typeof Primitive.Root>){return <Primitive.Root className={`tabs ${className}`} {...props}/>}
export function TabsList({className="",...props}:React.ComponentProps<typeof Primitive.List>){return <Primitive.List data-slot="tabs-list" className={`tabs-list ${className}`} {...props}/>}
export function TabsTrigger({className="",...props}:React.ComponentProps<typeof Primitive.Trigger>){return <Primitive.Trigger data-slot="tabs-trigger" className={`tabs-trigger ${className}`} {...props}/>}
export function TabsContent({className="",...props}:React.ComponentProps<typeof Primitive.Content>){return <Primitive.Content data-slot="tabs-content" className={`tabs-content ${className}`} {...props}/>}
