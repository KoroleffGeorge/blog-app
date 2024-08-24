import { createRouter, createWebHistory } from 'vue-router';
import ArticleForm from './components/ArticleForm.vue';
import CommentList from './components/CommentList.vue';
import CommentForm from './components/CommentForm.vue';
import HomePage from './App.vue';

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
  },

  {
    path: '/article/:id?',
    name: 'ArticleForm',
    component: ArticleForm,
    props: true,
  },

  {
    path: '/article/:id/comments',
    name: 'CommentList',
    component: CommentList,
    props: true
  },

  {
    path: '/article/:articleId/comment/:commentId?',
    name: 'CommentForm',
    component: CommentForm,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;