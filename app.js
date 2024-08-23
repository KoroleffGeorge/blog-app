const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./config/db');
const articleRoutes = require('./routes/article');
const articlesRoute = require('./routes/articles');
const commentRoutes = require('./routes/comment');
const analyticsRoutes = require('./routes/analytic');

const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type'],
};

const app = express();
app.use(bodyParser.json());
app.use(cors(corsOptions));

const Article = require('./models/Article');
const Comment = require('./models/Comment');

const PORT = process.env.PORT || 3000;

sequelize.sync()
  .then(() => {
    console.log('Синхронизация завершена');
    app.listen(PORT, () => {
      console.log(`Сервер запущен на порту ${PORT}`);
    });
  })
  .catch(err => console.error('Ошибка синхронизации:', err));

app.use('/article', articleRoutes);
app.use('/article', commentRoutes);
app.use('/articles', articlesRoute);
app.use('/analytic', analyticsRoutes);

app.get('/', (req, res) => {
  res.send('Blog API');
});