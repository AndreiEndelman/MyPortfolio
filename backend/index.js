const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));


// Contact model
const Contact = require('./models/Contact');
const Project = require('./models/Project');

// Test route
app.get('/', (req, res) => {
  res.send('Portfolio backend is running!');
});

// Contact form route
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
    const contact = new Contact({ name, email, message });
    await contact.save();
    res.status(201).json({ message: 'Message received!' });
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


// Contact form route
app.post('/api/projects', async (req, res) => {
  try {
    const { title, description, image, link, github, tags } = req.body;
    if (!title) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
    const project = new Project({ title, description, image, link, github, tags });
    await project.save();
    res.status(201).json({ message: 'project created' });
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});