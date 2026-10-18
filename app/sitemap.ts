import type {MetadataRoute} from "next";
import {siteUrl} from "./site-url";
export default function sitemap():MetadataRoute.Sitemap{return [{url:siteUrl,priority:1},{url:`${siteUrl}/work`,priority:.8}]}
