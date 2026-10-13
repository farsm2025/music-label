import { validateContact } from '../../../lib/contact.mjs';
export const runtime='nodejs';
export async function POST(request) {
  const origin=request.headers.get('origin');
  const url=new URL(request.url);
  const host=request.headers.get('host') || url.host;
  const protocol=request.headers.get('x-forwarded-proto')?.split(',')[0].trim() || url.protocol.slice(0,-1);
  if(origin && origin!==`${protocol}://${host}`)return Response.json({message:'Origine de la demande refusée.'},{status:403});
  if(!request.headers.get('content-type')?.startsWith('application/json'))return Response.json({message:'Format de demande invalide.'},{status:415});
  if(Number(request.headers.get('content-length'))>16000)return Response.json({message:'Message trop volumineux.'},{status:413});
  let value;
  try {const body=await request.text();if(new TextEncoder().encode(body).length>16000)return Response.json({message:'Message trop volumineux.'},{status:413});value=JSON.parse(body);}catch{return Response.json({message:'Requête invalide.'},{status:400});}
  const {data,error}=validateContact(value);
  if(error)return Response.json({message:error},{status:400});
  const {RESEND_API_KEY,CONTACT_FROM,CONTACT_TO}=process.env;
  if(!RESEND_API_KEY || !CONTACT_FROM || !CONTACT_TO)return Response.json({message:'L’envoi n’est pas encore activé. Veuillez réessayer lorsque le label aura configuré son service e-mail.'},{status:503});
  try {
    const response=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${RESEND_API_KEY}`,'Content-Type':'application/json'},body:JSON.stringify({from:CONTACT_FROM,to:[CONTACT_TO],reply_to:data.email,subject:data.subject,text:`Nom : ${data.name}\nE-mail : ${data.email}\n\n${data.message}`}),signal:AbortSignal.timeout(10000)});
    if(!response.ok)return Response.json({message:'L’envoi a échoué. Veuillez réessayer plus tard.'},{status:502});
    return Response.json({message:value.kind==='newsletter'?'Votre demande a été transmise. Le label vous confirmera votre inscription.':'Votre message a été envoyé. Merci, nous vous répondrons bientôt.'});
  }catch{return Response.json({message:'Le service e-mail est momentanément indisponible.'},{status:502});}
}
