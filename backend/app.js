const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes');
const path = require('path');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);

// Serve Static Assets - Fallback to Frontend Index
// Static folder for frontend assets
app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.get('*splat', (req, res) => {
  const indexPath = path.resolve(__dirname, '../frontend', 'dist', 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      // If index.html is missing (e.g. didn't build), show a helpful message
      res.status(404).send('Frontend build not found. Please run "npm run build" first.');
    }
  });
});

// Error handling middleware
app.use(errorHandler);

module.exports = app;
