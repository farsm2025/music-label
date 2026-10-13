export function validateContact(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {error:'Requête invalide.'};
  const field = key => typeof value[key] === 'string' ? value[key].trim() : '';
  if (field('website')) return {error:'Requête refusée.'};
  if (!['contact','newsletter'].includes(value.kind)) return {error:'Type de demande invalide.'};
  const email=field('email');
  if(email.length>254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))return {error:'Veuillez saisir une adresse e-mail valide.'};
  if(value.kind==='newsletter') return {data:{email,name:'Demande d’inscription',subject:'Demande d’inscription aux nouvelles du label',message:'Cette personne souhaite recevoir les nouvelles du label. Confirmer son inscription avant de l’ajouter à une liste.'}};
  const name=field('name'),subject=field('subject'),message=field('message');
  if(name.length<2 || name.length>120)return {error:'Le nom doit contenir entre 2 et 120 caractères.'};
  if(subject.length<2 || subject.length>200 || /[\r\n]/.test(subject))return {error:'Le sujet doit contenir entre 2 et 200 caractères, sur une seule ligne.'};
  if(message.length<5 || message.length>5000)return {error:'Le message doit contenir entre 5 et 5 000 caractères.'};
  return {data:{email,name,subject,message}};
}
