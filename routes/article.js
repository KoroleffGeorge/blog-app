const express = require('express');
const router = express.Router();
const Article  = require('../models/Article');

// CREATE
router.post('/', async (req, res) => {
  try {
    const article = await Article.create(req.body);
    res.status(201).json(article);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// READ
router.get('/:id', async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id);
    if (article) {
      res.json(article);
    } else {
      res.status(404).json({ error: 'Article not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// UPDATE
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Article.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedArticle = await Article.findByPk(req.params.id);
      res.json(updatedArticle);
    } else {
      res.status(404).json({ error: 'Article not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Article.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Article not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;