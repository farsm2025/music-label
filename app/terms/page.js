import Archive from '../../components/archive';
import legacy from '../../lib/legacy-content.json';
export const metadata={title:'Conditions d’utilisation'};
export default function Terms(){return <main id="main" className="article"><p className="eyebrow">INFORMATIONS</p><h1>Conditions d’utilisation</h1><p className="archive-note">Cette page conserve les conditions du modèle original. L’identité de l’éditeur, les droits sur les médias et les informations de confidentialité doivent être adaptés avant une publication publique.</p><Archive blocks={legacy.terms}/></main>;}
