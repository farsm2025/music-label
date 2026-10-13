import Archive from '../../components/archive';
import legacy from '../../lib/legacy-content.json';
export const metadata={title:'Website Credits'};
export default function Credits(){return <main id="main" className="article"><p className="eyebrow">À L’ORIGINE DU PROJET</p><h1>Website Credits</h1><p className="archive-note">Le site est désormais construit avec Next.js et React. Les crédits du modèle original de Matthew Waldron sont conservés ci-dessous. Le projet reste sous licence MIT.</p><Archive blocks={legacy.credits}/></main>;}
