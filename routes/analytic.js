const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const Comment = require('../models/Comment');
const Article = require('../models/Article');

router.get('/comments', async (req, res) => {
  const { dateFrom, dateTo } = req.query;

  try {
    if (!dateFrom || !dateTo) {
      return res.status(400).json({ error: 'Both dateFrom and dateTo are required' });
    }
    const comments = await Comment.findAll({
      where: {
        createdAt: {
          [Op.between]: [new Date(dateFrom), new Date(dateTo)],
        },
      },
      include: [
        {
          model: Article,
          attributes: ['id', 'title'],
        },
      ],
    });

    const groupedComments = comments.reduce((acc, comment) => {
      const articleId = comment.articleId;
      if (!acc[articleId]) {
        acc[articleId] = {
          articleId,
          articleTitle: comment.Article.title,
          comments: [],
        };
      }
      acc[articleId].comments.push(comment);
      return acc;
    }, {});

    res.json(Object.values(groupedComments));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;