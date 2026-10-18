export type ContactConfig = {apiKey?:string;from?:string};
export async function handleContact(request:Request,config:ContactConfig,send:typeof fetch=fetch):Promise<Response>{
 const reply=(status:number,message:string)=>Response.json({ok:status===200,message},{status,headers:{'Cache-Control':'no-store'}});
 const origin=request.headers.get('origin');
 const requestUrl=new URL(request.url);
 const publicHost=request.headers.get('host')||requestUrl.host;
 if(origin&&origin!==`${requestUrl.protocol}//${publicHost}`)return reply(403,'Please submit from the portfolio.');
 if(Number(request.headers.get('content-length')||0)>20000)return reply(413,'Your message is too long.');
 let data:FormData;try{data=await request.formData()}catch{return reply(400,'Please check your message.');}
 const value=(name:string)=>typeof data.get(name)==='string'?String(data.get(name)).trim():'';
 if(value('_gotcha'))return reply(200,'Thank you.');
 const name=value('name'),email=value('email'),topic=value('inquiry_type'),message=value('message');
 if(!name||name.length>160||!/^\S+@\S+\.\S+$/.test(email)||email.length>254||!topic||topic.length>160||!message||message.length>10000)return reply(400,'Please complete all fields with a valid email and a message under 10,000 characters.');
 if(!config.apiKey||!config.from)return reply(503,'Email delivery is not configured yet. Please use the email link below; your message is preserved.');
 try{
  const response=await send('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${config.apiKey}`,'Content-Type':'application/json'},body:JSON.stringify({from:config.from,to:['nikithakeshan@gmail.com'],reply_to:email,subject:`Portfolio inquiry: ${topic.replace(/[\r\n]/g,' ')}`,text:`From: ${name}\nEmail: ${email}\nArea: ${topic}\n\n${message}`}),signal:AbortSignal.timeout(10000)});
  if(!response.ok)return reply(502,'Delivery could not be confirmed. Please use the email link below.');
  const result=await response.json() as {id?:string};
  if(!result.id)return reply(502,'Delivery could not be confirmed. Please use the email link below.');
  return reply(200,'Thank you. Your inquiry has been accepted for email delivery.');
 }catch{return reply(502,'Delivery could not be confirmed. Please use the email link below.');}
}
