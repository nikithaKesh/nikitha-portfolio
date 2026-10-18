import type { Metadata } from "next";
import "./globals.css";
import {siteUrl as site} from './site-url';
const title='Nikitha Keshan — Built with logic, felt by people.';
const description='Software engineering, systems, and visual storytelling. Explore Nikitha Keshan’s work, creative process, and 24 project accounts.';
export const metadata:Metadata={metadataBase:new URL(site),title,description,authors:[{name:'Nikitha Keshan'}],alternates:{canonical:site},icons:{icon:'/favicon.svg'},openGraph:{type:'website',url:site,title,description,siteName:'Nikitha Keshan',images:[{url:'/og-image.png',width:1200,height:630,alt:title}]},twitter:{card:'summary_large_image',title,description,images:['/og-image.png']}};
const person={'@context':'https://schema.org','@type':'Person',name:'Nikitha Keshan',url:site,image:site+'/portraits/nikitha-monochrome-cutout.webp',description,email:'mailto:nikithakeshan@gmail.com',sameAs:['https://github.com/nikithaKesh','https://www.linkedin.com/in/nikitha-keshan-640927325/']};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><head><link rel="preload" href="/fonts/instrument-serif.woff2" as="font" type="font/woff2" crossOrigin="anonymous"/><link rel="preload" href="/fonts/instrument-serif-italic.woff2" as="font" type="font/woff2" crossOrigin="anonymous"/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(person)}}/></head><body>{children}</body></html>}
