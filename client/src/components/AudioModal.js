import React from 'react';

export default function AudioModal({ song, onClose }){
  if(!song) return null;
  return (
    <div className="audio-backdrop" onClick={onClose}>
      <div className="audio-box" onClick={e=>e.stopPropagation()}>
        <div className="audio-head">
          <img src={song.coverUrl || '/placeholder-cover.jpg'} alt={song.title}/>
          <div>
            <div style={{fontWeight:800}}>{song.title}</div>
            <div style={{fontSize:'.9rem', color:'#667'}}>{song.genre || 'Single'}</div>
          </div>
          <button className="audio-close" onClick={onClose}>✕</button>
        </div>
        <audio controls style={{width:'100%'}} src={song.audioUrl}/>
        <div className="audio-links" style={{marginTop:10}}>
          {song.spotifyUrl && <a href={song.spotifyUrl} target="_blank" rel="noreferrer">Spotify</a>}
          {song.appleMusicUrl && <a href={song.appleMusicUrl} target="_blank" rel="noreferrer">Apple Music</a>}
        </div>
      </div>
    </div>
  );
}
