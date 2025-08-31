
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());



// Add auth routes
const authRoutes = require('./auth');
app.use('/api/auth', authRoutes);


// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Song Model
const songSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, default: 'Lloyd Rego' },
  genre: { type: String },
  coverUrl: { type: String },
  audioUrl: { type: String, required: true },
  spotifyUrl: { type: String },
  appleMusicUrl: { type: String },
  featured: { type: Boolean, default: false },
  published: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

const Song = mongoose.model('Song', songSchema);

// Profile Model
const profileSchema = new mongoose.Schema({
  bio: { type: String, required: true },
  achievements: { type: [String], default: [] },
  profileImageUrl: { type: String },
  socialLinks: {
    spotify: { type: String },
    instagram: { type: String },
    youtube: { type: String }
  }
});

const Profile = mongoose.model('Profile', profileSchema);

// JWT and Auth Middleware - simple for now
const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Routes
app.get('/', (req, res) => {
  res.send('Lloyd Rego Backend is running');
});

// Public GET all published songs
app.get('/api/songs', async (req, res) => {
  const songs = await Song.find({ published: true });
  res.json(songs);
});

// Admin CRUD routes - protected
app.post('/api/songs', authenticateToken, async (req, res) => {
  const song = new Song(req.body);
  await song.save();
  res.status(201).json(song);
});

app.put('/api/songs/:id', authenticateToken, async (req, res) => {
  const song = await Song.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(song);
});

app.delete('/api/songs/:id', authenticateToken, async (req, res) => {
  await Song.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

// Profile read and update
app.get('/api/profile', async (req, res) => {
  const profile = await Profile.findOne();
  if (!profile) return res.status(404).json({ message: 'Profile not found' });
  res.json(profile);
});

app.put('/api/profile', authenticateToken, async (req, res) => {
  const profile = await Profile.findOneAndUpdate({}, req.body, { new: true, upsert: true });
  res.json(profile);
});



// Add this AFTER your other routes in api/index.js:

// Simple admin login route
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;
  
  // Hardcoded admin credentials for demo
  if (username === 'admin' && password === 'lloyd2025') {
    const token = jwt.sign({ userId: 1, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.json({ token, message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});





// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
