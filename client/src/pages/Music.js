import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SongCard from '../components/SongCard';
import AudioModal from '../components/AudioModal';

export default function Music(){
  const [songs, setSongs] = useState([]);
  const [query, setQuery] = useState('');
  const [current, setCurrent] = useState(null);

  useEffect(()=>{
    axios.get(process.env.REACT_APP_API_URL + '/api/songs')
      .then(res => setSongs(res.data))
      .catch(()=> setSongs([]));
  },[]);

  const filtered = songs.filter(s =>
    (s.title||'').toLowerCase().includes(query.toLowerCase()) ||
    (s.genre||'').toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="music-wrap">
      <div className="music-header">
        <h2 className="music-title">All Music</h2>
        <input
          className="music-search"
          placeholder="Search by title or genre"
          value={query}
          onChange={e=>setQuery(e.target.value)}
        />
      </div>

      <div className="music-grid">
        {filtered.map(s => (
          <SongCard key={s._id} song={s} onPlay={setCurrent}/>
        ))}
      </div>

      <AudioModal song={current} onClose={()=>setCurrent(null)}/>
    </div>
  );
}
