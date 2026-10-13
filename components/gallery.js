'use client';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { gallery } from '../lib/content';
export default function Gallery() {
  const dialog=useRef(null);
  const [selected,setSelected]=useState(gallery[0]);
  return <><div className="gallery">{gallery.map(photo => <button key={photo.file} onClick={() => {setSelected(photo);dialog.current.showModal();}} aria-label={`Agrandir : ${photo.caption}`}><Image src={`/pictures/gallery/${photo.file}`} alt={photo.caption} width={700} height={500} sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"/><span aria-hidden="true">↗</span></button>)}</div>
    <dialog ref={dialog} className="lightbox" onClick={e => {if(e.target===dialog.current)dialog.current.close();}}><button autoFocus className="close-dialog" onClick={() => dialog.current.close()} aria-label="Fermer la photo">Fermer ×</button><Image src={`/pictures/gallery/${selected.file}`} alt={selected.caption} width={1400} height={1000} sizes="90vw"/><p>{selected.caption}</p></dialog></>;
}
