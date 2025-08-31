import React, { useEffect, useState } from 'react';
import axios from 'axios';

function About() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + '/api/profile')
      .then(res => setProfile(res.data))
      .catch(() => setProfile({ bio: 'Singer–songwriter from Bengaluru.', achievements: [] }));
  }, []);

  if (!profile) return null;

  return (
    <section className="about-wrap">
      <div className="about-card">
        <h2 className="about-title">
          <span className="about-gradient">About Lloyd Rego</span>
        </h2>

        <p className="about-bio">{profile.bio}</p>

        {profile.achievements.length > 0 && (
          <ul className="about-bullets">
            {profile.achievements.map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export default About;
