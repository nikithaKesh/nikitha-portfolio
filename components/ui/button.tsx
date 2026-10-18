import * as React from "react";
import {Slot} from "radix-ui";
export function Button({className="",variant="default",size="default",asChild=false,...props}:React.ComponentProps<"button"> & {variant?:"default"|"destructive"|"outline"|"secondary"|"ghost"|"link";size?:"default"|"sm"|"lg"|"xs"|"icon"|"icon-xs"|"icon-sm"|"icon-lg";asChild?:boolean}){const Comp=asChild?Slot.Root:"button";return <Comp data-slot="button" data-variant={variant} data-size={size} className={`button button-${variant} ${className}`} {...props}/>}
