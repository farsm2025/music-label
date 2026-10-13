import './globals.css';
import Link from 'next/link';
import Header from '../components/header';
export const metadata = {
  title: { default: 'Music Label — La musique, sans limites', template: '%s · Music Label' },
  description: 'Découvrez la musique, les sessions et les coulisses de Music Label. Un espace pour écouter, explorer et se rencontrer.',
  icons: { icon: '/favicon.png' },
};
export default function RootLayout({ children }) {
  return <html lang="fr"><body><a href="#main" className="skip-link">Aller au contenu</a><Header/>{children}<footer className="footer"><Link href="/" className="footer-brand">Music Label<span>La musique nous rassemble.</span></Link><div className="footer-links"><Link href="/terms">Conditions d’utilisation</Link><Link href="/credits">Website Credits</Link><a href="/#contact">Contact ↗</a></div><small>© {new Date().getFullYear()} Music Label</small></footer></body></html>;
}
