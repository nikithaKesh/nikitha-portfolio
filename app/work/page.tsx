import type {Metadata} from "next";
import WorkCollection from "./work-collection";
export const metadata:Metadata={title:"Work — Nikitha Keshan",alternates:{canonical:"/work"},description:"Explore all 24 projects across web experiences, systems and experiments."};
export default function WorkPage(){return <WorkCollection/>}
