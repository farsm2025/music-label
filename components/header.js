'use client';
import Link from 'next/link';
import { useState } from 'react';
export default function Header() {
  const [open, setOpen] = useState(false);
  return <header className="header">
    <Link href="/" className="brand" aria-label="Governance Records — accueil"><span className="brand-name">GOVERNANCE<br/><span>RECORDS</span></span></Link>
    <button className="menu-toggle" aria-expanded={open} aria-controls="navigation" onClick={() => setOpen(!open)}>{open ? 'Fermer −' : 'Menu +'}</button>
    <nav id="navigation" className={open ? 'navigation open' : 'navigation'} aria-label="Navigation principale">
      {[['music','La musique'],['about','Le label'],['news','Journal'],['photos','En images']].map(([id,label]) => <Link key={id} href={`/#${id}`} onClick={() => setOpen(false)}>{label}</Link>)}
      <Link className="nav-contact" href="/#contact" onClick={() => setOpen(false)}>Parlons musique </Link>
    </nav>
  </header>;
}
