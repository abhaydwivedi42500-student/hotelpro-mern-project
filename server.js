require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }));
app.use(express.json({ limit: '100kb' }));

const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });

app.use('/api/auth', authLimiter, require('./routes/auth'));
app.use('/api/rooms', require('./routes/rooms'));
app.use('/api/bookings', require('./routes/bookings'));

app.get('/api/health', (req, res) => res.json({ ok: true }));

app.use((req, res) => res.status(404).json({ message: 'Route not found' }));

// central error handler
app.use((err, req, res, next) => {
  console.error(err);
  if (err.name === 'ValidationError') {
    return res.status(400).json({ message: Object.values(err.errors).map((e) => e.message).join(', ') });
  }
  if (err.code === 11000) {
    return res.status(409).json({ message: 'Duplicate value: that record already exists' });
  }
  if (err.name === 'CastError') {
    return res.status(400).json({ message: 'Invalid id' });
  }
  res.status(500).json({ message: 'Something went wrong on the server' });
});

const PORT = process.env.PORT || 5000;
connectDB()
  .then(() => app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`)))
  .catch((err) => {
    console.error('DB connection failed:', err.message);
    process.exit(1);
  });
