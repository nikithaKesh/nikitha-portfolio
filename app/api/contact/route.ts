import {handleContact} from './handler';
export const runtime="nodejs";
export const maxDuration=15;
export async function POST(request:Request){return handleContact(request,{apiKey:process.env.RESEND_API_KEY,from:process.env.CONTACT_FROM});}
