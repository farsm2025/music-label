'use client';
import { useRef, useState } from 'react';
import { tracks } from '../lib/content';
const format = value => Number.isFinite(value) ? `${Math.floor(value / 60)}:${String(Math.floor(value % 60)).padStart(2,'0')}` : '0:00';
export default function Player() {
  const audio = useRef(null);
  const [selected, setSelected] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState('');
  async function play(index) {
    setError('');
    if(index === selected && !audio.current.paused) { audio.current.pause(); return; }
    if(index !== selected) {
      audio.current.pause();
      audio.current.src = `/music/${encodeURIComponent(tracks[index].file)}`;
      setSelected(index); setTime(0); setDuration(0);
    }
    try { await audio.current.play(); } catch { setError('La lecture est indisponible. Réessayez ou téléchargez le morceau.'); }
  }
  return <div className="player">
    <audio ref={audio} src={`/music/${encodeURIComponent(tracks[0].file)}`} preload="metadata" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onEnded={() => setPlaying(false)} onTimeUpdate={e => setTime(e.currentTarget.currentTime)} onLoadedMetadata={e => setDuration(e.currentTarget.duration)} onError={() => {setPlaying(false);setError('Ce morceau ne peut pas être chargé.');}} />
    <div className="track-list">{tracks.map((track,index) => <div key={track.file} className={`track ${selected === index ? 'active' : ''}`}>
      <span className="track-number">0{index+1}</span>
      <button onClick={() => play(index)} className="track-title" aria-label={`${playing && selected===index ? 'Mettre en pause' : 'Écouter'} ${track.title}`}><strong>{track.title}</strong><span>{track.mood}</span></button>
      <button className="play-button" onClick={() => play(index)} aria-label={`${playing && selected===index ? 'Pause' : 'Lecture'} — ${track.title}`}><span aria-hidden="true">{playing && selected===index ? 'Ⅱ' : '▶'}</span></button>
    </div>)}</div>
    <div className="playback"><span>{format(time)}</span><input aria-label="Position dans le morceau" type="range" min="0" max={Number.isFinite(duration) ? duration : 0} value={time} step="0.1" disabled={!duration} onChange={e => {audio.current.currentTime=Number(e.target.value);setTime(Number(e.target.value));}}/><span>{format(duration)}</span></div>
    <p className="player-caption">À l’écoute : {tracks[selected].title} <a href={`/music/${encodeURIComponent(tracks[selected].file)}`} download>Télécharger ↓</a></p>
    {error && <p role="alert">{error}</p>}
  </div>;
}
