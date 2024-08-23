const express = require('express');
const router = express.Router();
const Article  = require('../models/Article');

router.get('/', async (req, res) => {
  try {
    const articles = await Article.findAll();
    res.json(articles);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;