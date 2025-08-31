import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminSongs() {
  const [songs, setSongs] = useState([]);
  const [editingSong, setEditingSong] = useState(null);
  const [form, setForm] = useState({
    title: '',
    artist: 'Lloyd Rego',
    genre: '',
    coverUrl: '',
    audioUrl: '',
    spotifyUrl: '',
    appleMusicUrl: '',
    featured: false,
    published: true
  });
  const [error, setError] = useState('');

  const fetchSongs = async () => {
    try {
      const res = await axios.get(process.env.REACT_APP_API_URL + '/api/songs');
      setSongs(res.data);
    } catch (err) {
      setError('Failed to fetch songs');
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleEdit = (song) => {
    setEditingSong(song);
    setForm(song);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(process.env.REACT_APP_API_URL + '/api/songs/' + id, {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('lloyd-token') }
      });
      fetchSongs();
    } catch {
      setError('Delete failed');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingSong) {
        await axios.put(process.env.REACT_APP_API_URL + '/api/songs/' + editingSong._id, form, {
          headers: { Authorization: 'Bearer ' + localStorage.getItem('lloyd-token') }
        });
      } else {
        await axios.post(process.env.REACT_APP_API_URL + '/api/songs', form, {
          headers: { Authorization: 'Bearer ' + localStorage.getItem('lloyd-token') }
        });
      }
      setEditingSong(null);
      setForm({
        title: '',
        artist: 'Lloyd Rego',
        genre: '',
        coverUrl: '',
        audioUrl: '',
        spotifyUrl: '',
        appleMusicUrl: '',
        featured: false,
        published: true
      });
      fetchSongs();
      setError(''); // Clear any previous errors
    } catch {
      setError('Save failed');
    }
  };

  return (
    <div className="admin-songs-container">
      <h2>Manage Songs</h2>
      {error && <p className="error">{error}</p>}
      
      <div className="songs-list">
        <h3>Current Songs</h3>
        {songs.map(song => (
          <div key={song._id} className="song-item">
            <div>
              <strong>{song.title}</strong> - {song.genre}
              {song.featured && <span className="featured-tag">FEATURED</span>}
            </div>
            <div>
              <button onClick={() => handleEdit(song)}>Edit</button>
              <button onClick={() => handleDelete(song._id)} className="delete-btn">Delete</button>
            </div>
          </div>
        ))}
      </div>

      <div className="song-form">
        <h3>{editingSong ? 'Edit Song' : 'Add New Song'}</h3>
        <form onSubmit={handleSubmit}>
          <input name="title" placeholder="Song Title" value={form.title} onChange={handleChange} required />
          <input name="genre" placeholder="Genre" value={form.genre} onChange={handleChange} />
          <input name="coverUrl" placeholder="Cover Image URL" value={form.coverUrl} onChange={handleChange} />
          <input name="audioUrl" placeholder="Audio File URL" value={form.audioUrl} onChange={handleChange} required />
          <input name="spotifyUrl" placeholder="Spotify URL" value={form.spotifyUrl} onChange={handleChange} />
          <input name="appleMusicUrl" placeholder="Apple Music URL" value={form.appleMusicUrl} onChange={handleChange} />
          
          <div className="checkboxes">
            <label>
              <input name="featured" type="checkbox" checked={form.featured} onChange={handleChange} />
              Featured Song
            </label>
            <label>
              <input name="published" type="checkbox" checked={form.published} onChange={handleChange} />
              Published
            </label>
          </div>
          
          <button type="submit">{editingSong ? 'Update Song' : 'Add Song'}</button>
          {editingSong && <button type="button" onClick={() => setEditingSong(null)}>Cancel</button>}
        </form>
      </div>
    </div>
  );
}

export default AdminSongs;
