const express = require('express');
const router = express.Router();
const axios = require('axios');

// POST /api/autocomplete
router.post('/', async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    // Replace with your OpenAI API key or use environment variable
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY || 'sk-...';
    const response = await axios.post(
      'https://api.openai.com/v1/completions',
      {
        model: 'text-davinci-003',
        prompt,
        max_tokens: 20,
        n: 3,
        stop: null,
        temperature: 0.7,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );
    const suggestions = response.data.choices.map(choice => choice.text.trim());
    res.json({ suggestions });
  } catch (error) {
    console.error('Autocomplete error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch autocomplete suggestions' });
  }
});

module.exports = router; 