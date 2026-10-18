import * as React from "react";
export function Input({className="",...props}:React.ComponentProps<"input">){return <input data-slot="input" className={`input ${className}`} {...props}/>}
