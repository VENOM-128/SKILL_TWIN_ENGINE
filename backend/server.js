const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

app.post('/api/gemini', async (req, res) => {
  const { prompt } = req.body || {};
  if (!GEMINI_API_KEY) {
    return res.status(500).json({ error: 'Gemini API key not configured on server.' });
  }
  if (!prompt) return res.status(400).json({ error: 'Missing prompt in request body.' });

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
    const requestBody = {
      input: { text: prompt }
    };

    const r = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody)
    });

    const data = await r.json();
    return res.json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Simple GitHub proxy (rate-limited by GitHub)
app.get('/api/github/*', async (req, res) => {
  const path = req.params[0];
  try {
    const url = `https://api.github.com/${path}`;
    const r = await fetch(url, { headers: { 'User-Agent': 'skill-twin-proxy' } });
    const data = await r.json();
    return res.json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Skill-Twin backend proxy listening on port ${PORT}`);
});
