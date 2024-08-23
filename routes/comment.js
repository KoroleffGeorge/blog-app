const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');

// CREATE
router.post('/:articleId/comment', async (req, res) => {
  try {
    const comment = await Comment.create({ ...req.body, articleId: req.params.articleId });
    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// READ
router.get('/:articleId/comment/:commentId', async (req, res) => {
  try {
    const comment = await Comment.findOne({
      where: { id: req.params.commentId, articleId: req.params.articleId },
    });
    if (comment) {
      res.json(comment);
    } else {
      res.status(404).json({ error: 'Comment not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/:articleId/comments', async (req, res) => {
  try {
    const comments = await Comment.findAll({
      where: { articleId: req.params.articleId },
    });
    res.json(comments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// UPDATE
router.patch('/:articleId/comment/:commentId', async (req, res) => {
  try {
    const [updated] = await Comment.update(req.body, {
      where: { id: req.params.commentId, articleId: req.params.articleId },
    });
    if (updated) {
      const updatedComment = await Comment.findOne({
        where: { id: req.params.commentId, articleId: req.params.articleId },
      });
      res.json(updatedComment);
    } else {
      res.status(404).json({ error: 'Comment not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE
router.delete('/:articleId/comment/:commentId', async (req, res) => {
  try {
    const deleted = await Comment.destroy({
      where: { id: req.params.commentId, articleId: req.params.articleId },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Comment not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;