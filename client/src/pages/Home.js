import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SongCard from '../components/SongCard';
import AudioModal from '../components/AudioModal';

function Home() {
  const [featured, setFeatured] = useState([]);
  const [current,  setCurrent]  = useState(null);

  useEffect(() => {
    axios.get(process.env.REACT_APP_API_URL + '/api/songs')
         .then(res => setFeatured(res.data.filter(s => s.featured).slice(0,3)));
  }, []);

  return (
    <section className="hero">
  <div className="hero__overlay">
    <div className="hero__inner">
      <h4>Hello&nbsp;I’m&nbsp;a&nbsp;Singer</h4>
      <h1>Lloyd&nbsp;Rego</h1>
      <p>
        Bengaluru-based vocalist, songwriter and live-stage performer. <br/>
        Explore my latest tracks, videos and tour dates.
      </p>
      <a href="/music" className="btn-primary">Listen&nbsp;Now</a>
    </div>
    <div className="hero__frame"></div>
  </div>
</section>

  );
}

export default Home;
