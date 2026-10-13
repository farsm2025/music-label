import './globals.css';
import Link from 'next/link';
import Header from '../components/header';
export const metadata = {
  title: { default: 'Governance Records — La musique, sans limites', template: '%s · Governance Records' },
  description: 'Découvrez la musique, les sessions et les coulisses de Governance Records. Un espace pour écouter, explorer et se rencontrer.',
  icons: { icon: '/favicon.png' },
};
export default function RootLayout({ children }) {
  return <html lang="fr"><body><a href="#main" className="skip-link">Aller au contenu</a><Header/>{children}<footer className="footer"><Link href="/" className="footer-brand">Governance Records<span>La musique nous rassemble.</span></Link><div className="footer-links"><Link href="/terms">Conditions d’utilisation</Link><Link href="/credits">Website Credits</Link><a href="/#contact">Contact</a></div><small>© {new Date().getFullYear()} Governance Records</small></footer></body></html>;
}
