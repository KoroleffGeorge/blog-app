const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('blog_app', 'blog_user', '1234', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;