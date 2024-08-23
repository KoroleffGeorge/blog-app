import { createRouter, createWebHistory } from 'vue-router';
import ArticleForm from './components/ArticleForm.vue';
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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;