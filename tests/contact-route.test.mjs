import test from 'node:test';
import assert from 'node:assert/strict';
import { POST } from '../app/api/contact/route.js';
const payload={kind:'contact',email:'music@example.com',name:'Élodie',subject:'Collaboration',message:'Une idée de collaboration musicale.'};
const request=(value=payload,headers={})=>new Request('http://localhost:3000/api/contact',{method:'POST',headers:{'Content-Type':'application/json',...headers},body:JSON.stringify(value)});
test('rejects cross-origin submissions, malformed JSON and invalid input',async()=>{
 assert.equal((await POST(request(payload,{origin:'https://other.example'}))).status,403);
 assert.equal((await POST(new Request('http://localhost:3000/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:'broken'}))).status,400);
 assert.equal((await POST(request({...payload,email:'invalid'}))).status,400);
 assert.equal((await POST(request(payload,{'Content-Type':'text/plain'}))).status,415);
 assert.equal((await POST(request({...payload,message:'a'.repeat(17000)}))).status,413);
});
test('returns unavailable when mail configuration is missing; never claims success',async()=>{
 const old=process.env.RESEND_API_KEY;delete process.env.RESEND_API_KEY;
 try{assert.equal((await POST(request())).status,503);assert.equal((await POST(request(payload,{host:'127.0.0.1:3000',origin:'http://127.0.0.1:3000'}))).status,503);assert.equal((await POST(request(payload,{host:'label.example.com',origin:'https://label.example.com','x-forwarded-proto':'https'}))).status,503);}finally{if(old!==undefined)process.env.RESEND_API_KEY=old;}
});
test('sends expected email with reply-to and handles provider failures without leaking them',async()=>{
 const originalFetch=globalThis.fetch;
 const old=Object.fromEntries(['RESEND_API_KEY','CONTACT_FROM','CONTACT_TO'].map(key=>[key,process.env[key]]));
 Object.assign(process.env,{RESEND_API_KEY:'test-placeholder',CONTACT_FROM:'Label <label@example.com>',CONTACT_TO:'inbox@example.com'});
 try{
  globalThis.fetch=async(url,options)=>{assert.equal(url,'https://api.resend.com/emails');const body=JSON.parse(options.body);assert.equal(body.reply_to,payload.email);assert.deepEqual(body.to,['inbox@example.com']);assert.ok(body.text.includes(payload.message) || body.text.includes('Confirmer son inscription'));return new Response('{}',{status:200});};
  assert.equal((await POST(request())).status,200);
  assert.ok((await (await POST(request({kind:'newsletter',email:payload.email}))).json()).message.includes('confirmera'));
  globalThis.fetch=async()=>new Response('private provider details',{status:401});
  const failed=await POST(request());assert.equal(failed.status,502);assert.ok(!(await failed.text()).includes('private'));
  globalThis.fetch=async()=>{throw new Error('timeout');};assert.equal((await POST(request())).status,502);
 }finally{globalThis.fetch=originalFetch;for(const[key,value]of Object.entries(old)){if(value===undefined)delete process.env[key];else process.env[key]=value;}}
});
