import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { stories } from '../../../lib/content';
import legacy from '../../../lib/legacy-content.json';
import Archive from '../../../components/archive';
export function generateStaticParams() { return stories.map(({slug}) => ({slug})); }
export async function generateMetadata({ params }) {const {slug}=await params;return {title:stories.find(story=>story.slug===slug)?.title || 'Article introuvable'};}
export default async function Story({ params }) {
  const {slug}=await params; const story=stories.find(item=>item.slug===slug); if(!story)notFound();
  return <main id="main" className="article"><Link href="/#news" className="text-link">Retour au journal</Link><p className="eyebrow" style={{marginTop:40}}>{story.category} / Archive</p><h1>{story.title}</h1><p className="archive-note">Cet article provient du modèle original de 2018. Les textes d’exemple et les anciennes annonces sont conservés comme archives, sans annoncer d’événement actuel.</p><Image className="article-image" src={story.image} alt={story.title} width={1200} height={700} sizes="(max-width: 900px) 100vw, 850px"/><Archive blocks={legacy[slug].filter((block,index)=>index!==0)}/><Link className="button" href="/#music">Écouter les morceaux</Link></main>;
}
