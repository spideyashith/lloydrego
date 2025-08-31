import React from 'react';

function getExternalUrl(song) {
  if (song.spotifyUrl)     return song.spotifyUrl;
  if (song.appleMusicUrl)  return song.appleMusicUrl;
  if (song.youtubeUrl)     return song.youtubeUrl;
  // fallback: if you stored a generic link in audioUrl, you can use it
  if (song.audioUrl && /^https?:\/\//i.test(song.audioUrl)) return song.audioUrl;
  return null;
}

export default function SongCard({ song }){
  const openLink = () => {
    const url = getExternalUrl(song);
    if (!url) return;
    window.open(url, '_blank', 'noopener');
  };

  return (
    <div className="song-card">
      <img className="song-thumb" src={song.coverUrl || '/placeholder-cover.jpg'} alt={song.title}/>
      <div className="song-body">
        <div className="song-title">{song.title}</div>
        <div className="song-genre">{song.genre || 'Single'}</div>
        <button className="play-btn" onClick={openLink}>
          <span>▶</span> Play
        </button>
      </div>
    </div>
  );
}
