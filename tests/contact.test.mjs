import test from 'node:test';
import assert from 'node:assert/strict';
import {handleContact} from '../app/api/contact/handler.ts';
function request(values={},origin='https://portfolio.example'){const form=new FormData();for(const [key,value]of Object.entries({name:'Test sender',email:'sender@example.com',inquiry_type:'Web Architecture & Frontend',message:'A test inquiry',...values}))form.set(key,value);return new Request('https://portfolio.example/api/contact',{method:'POST',headers:{origin},body:form})}
test('invalid address rejected before provider call',async()=>{const result=await handleContact(request({email:'invalid'}),{});assert.equal(result.status,400)});
test('honeypot does not deliver',async()=>{let called=false;const result=await handleContact(request({_gotcha:'bot'}),{apiKey:'test',from:'verified@example.com'},async()=>{called=true;return Response.json({id:'test'})});assert.equal(result.status,200);assert.equal(called,false)});
test('missing configuration never reports delivery',async()=>{assert.equal((await handleContact(request(),{})).status,503)});
test('rejects cross-origin submission',async()=>{assert.equal((await handleContact(request({},'https://other.example'),{})).status,403)});
test('valid message uses fixed owner recipient and reply address',async()=>{let payload;const result=await handleContact(request(),{apiKey:'test',from:'verified@example.com'},async(url,init)=>{assert.equal(url,'https://api.resend.com/emails');payload=JSON.parse(init.body);return Response.json({id:'accepted'})});assert.equal(result.status,200);assert.deepEqual(payload.to,['nikithakeshan@gmail.com']);assert.equal(payload.reply_to,'sender@example.com');assert.equal(payload.from,'verified@example.com')});
test('provider rejection keeps an error state',async()=>{assert.equal((await handleContact(request(),{apiKey:'test',from:'verified@example.com'},async()=>new Response('',{status:403}))).status,502)});

test('Next internal hostname uses the public Host for same-origin forms',async()=>{const form=new FormData();form.set('email','invalid');const req=new Request('http://localhost:3000/api/contact',{method:'POST',headers:{host:'127.0.0.1:3000',origin:'http://127.0.0.1:3000'},body:form});assert.equal((await handleContact(req,{})).status,400)});
