// api/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const authRouter = require('./auth');

const app = express();

// Parse JSON bodies
app.use(express.json());

// CORS: allow your Vercel frontends (admin + client)
const allowedOrigins = [
  'https://lloydrego-wsxv.vercel.app', // client
  'https://lloydrego.vercel.app', // admin
  'http://localhost:3000', // local client
  'http://localhost:3001' // local admin
];


app.use(cors({
  origin: (origin, cb) => {
    if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
    return cb(new Error('Not allowed by CORS'));
  },
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization']
}));

// Handle preflight for all routes
app.options('*', cors()); // lets OPTIONS preflight succeed [2][11]

// Health check
app.get('/', (_, res) => res.send('Lloyd Rego Backend is running'));

// Mount auth routes → POST /api/auth/login
app.use('/api/auth', authRouter); // [3]

// // Temporary: Sample /api/songs route for frontend
// app.get('/api/songs', (req, res) => {
//   res.json([
//     {
//       _id: '1',
//       title: 'Sample Song',
//       artist: 'Lloyd Rego',
//       genre: 'Pop',
//       coverUrl: '',
//       audioUrl: '',
//       spotifyUrl: '',
//       appleMusicUrl: '',
//       featured: true,
//       published: true
//     }
//   ]);
// });
// Mount your other routers as before, e.g.
// const songsRouter = require('./routes/songs');
// app.use('/api/songs', songsRouter);

const PORT = process.env.PORT || 8080;
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('Mongo connect error', err);
    process.exit(1);
  });
