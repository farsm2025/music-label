'use client';
import { useState } from 'react';
export default function ContactForm({ newsletter = false }) {
  const [status, setStatus] = useState('');
  const [pending, setPending] = useState(false);
  async function submit(event) {
    event.preventDefault(); const form=event.currentTarget;
    setPending(true); setStatus('');
    try {
      const fields=Object.fromEntries(new FormData(form));
      const response=await fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...fields,kind:newsletter?'newsletter':'contact'})});
      const result=await response.json();
      setStatus(result.message);
      if(response.ok) form.reset();
    } catch { setStatus('Connexion interrompue. Veuillez réessayer.'); }
    finally { setPending(false); }
  }
  return <form onSubmit={submit} className={newsletter ? 'newsletter-form' : 'contact-form'}>
    {!newsletter && <div className="form-row"><label>Votre nom<input name="name" autoComplete="name" required minLength={2} maxLength={120} placeholder="Comment vous appelez-vous ?"/></label><label>Votre e-mail<input name="email" type="email" autoComplete="email" required maxLength={254} placeholder="vous@exemple.com"/></label></div>}
    {newsletter && <label className="newsletter-email"><span className="sr-only">Votre e-mail</span><input name="email" type="email" autoComplete="email" required maxLength={254} placeholder="Votre adresse e-mail"/></label>}
    {!newsletter && <><label>Le sujet<input name="subject" required minLength={2} maxLength={200} placeholder="Booking, collaboration, ou juste un bon morceau…"/></label><label>Votre message<textarea name="message" required minLength={5} maxLength={5000} rows={4} placeholder="On vous écoute."/></label></>}
    <div className="honeypot" aria-hidden="true"><label>Ne pas remplir<input name="website" tabIndex={-1} autoComplete="off"/></label></div>
    <button className="button" disabled={pending} type="submit">{pending ? 'Envoi en cours…' : newsletter ? 'Demander mon inscription' : 'Envoyer le message'}</button>
    <p className="form-status" role="status" aria-live="polite">{status}</p>
    <p className="form-note">{newsletter ? 'Votre demande sera transmise au label. Vous n’êtes inscrit qu’après confirmation.' : 'Votre adresse sert uniquement à répondre à votre message.'}</p>
  </form>;
}
