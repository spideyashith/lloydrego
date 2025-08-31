import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Profile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + '/api/profile')
      .then(res => setProfile(res.data))
      .catch(() =>
        setProfile({
          name: 'Lloyd Rego',
          location: 'Bengaluru, India',
          bio:
            'Bengaluru-based singer–songwriter blending warm pop textures with intimate storytelling. Songs for late drives and open windows.',
          achievements: [
            'Independent singles in 2025 with 50k+ streams',
            'Festival showcases across Karnataka',
            'Debut EP in progress with collaborators from Mumbai and Goa'
          ],
          photoUrl: '/placeholder-cover.jpg',
          links: {
            spotify: '',
            appleMusic: '',
            youtube: '',
            instagram: '',
            twitter: '',
            website: ''
          },
          booking: {
            email: 'bookings@lloydrego.com',
            phone: '+91 9XXXXXXXXX',
            manager: 'Self-managed'
          }
        })
      );
  }, []);

  if (!profile) return null;

  const L = profile.links || {};
  const B = profile.booking || {};

  return (
    <section className="pf-wrap">
      <div className="pf-card">
        <div className="pf-top">
          <img className="pf-photo" src={profile.photoUrl || '/placeholder-cover.jpg'} alt={profile.name || 'Artist'} />
          <div className="pf-head">
            <h1 className="pf-name">{profile.name || 'Artist Name'}</h1>
            <p className="pf-location">{profile.location || 'City, Country'}</p>
            <div className="pf-chips">
              {L.spotify && <a href={L.spotify} target="_blank" rel="noreferrer" className="pf-chip">Spotify</a>}
              {L.appleMusic && <a href={L.appleMusic} target="_blank" rel="noreferrer" className="pf-chip">Apple Music</a>}
              {L.youtube && <a href={L.youtube} target="_blank" rel="noreferrer" className="pf-chip">YouTube</a>}
              {L.instagram && <a href={L.instagram} target="_blank" rel="noreferrer" className="pf-chip">Instagram</a>}
              {L.twitter && <a href={L.twitter} target="_blank" rel="noreferrer" className="pf-chip">Twitter</a>}
              {L.website && <a href={L.website} target="_blank" rel="noreferrer" className="pf-chip">Website</a>}
            </div>
          </div>
        </div>

        <div className="pf-body">
          <h2 className="pf-title"><span className="pf-grad">Bio</span></h2>
          <p className="pf-bio">{profile.bio}</p>

          {Array.isArray(profile.achievements) && profile.achievements.length > 0 && (
            <>
              <h3 className="pf-subtitle">Highlights</h3>
              <ul className="pf-bullets">
                {profile.achievements.map((a, i) => <li key={i}>{a}</li>)}
              </ul>
            </>
          )}

          <div className="pf-contact">
            <h3 className="pf-subtitle">Booking & Contact</h3>
            <div className="pf-contact-grid">
              <div>
                <div className="pf-label">Booking Email</div>
                <a href={`mailto:${B.email || 'bookings@lloydrego.com'}`} className="pf-contact-link">
                  {B.email || 'bookings@lloydrego.com'}
                </a>
              </div>
              <div>
                <div className="pf-label">Phone / WhatsApp</div>
                <a href={`tel:${(B.phone || '').replace(/\\s/g,'')}`} className="pf-contact-link">
                  {B.phone || '+91 9XXXXXXXXX'}
                </a>
              </div>
              <div>
                <div className="pf-label">Management</div>
                <div>{B.manager || 'Self-managed'}</div>
              </div>
            </div>
          </div>

          <div className="pf-cta">
            {L.spotify && <a href={L.spotify} target="_blank" rel="noreferrer" className="pf-btn pf-btn--primary">Listen on Spotify</a>}
            {/* <a href="mailto:bookings@lloydrego.com" className="pf-btn pf-btn--ghost">Book a Show</a> */}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Profile;
