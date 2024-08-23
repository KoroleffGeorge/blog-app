import { createStore } from 'vuex';
import axios from 'axios';

const API_URL = 'http://localhost:3000';

const store = createStore({
  state: {
    articles: [],
    comments: [],
  },
  mutations: {
    setArticles(state, articles) {
      state.articles = articles;
    },
    setComments(state, comments) {
      state.comments = comments;
    },
  },
  actions: {
    async createArticle({ commit }, article) {
      return await axios
        .post(`${API_URL}/article`, article)
        .then((response) => {
          commit('setArticles', [...state.articles, response.data]);
           return response.data;
        })
        .catch((error) => {
          console.error('Error creating article:', error);
        });
    },
    async updateArticle({ commit }, article) {
      return axios
      .put(`${API_URL}/article/${article.id}`, article)
      .then((response) => {
        const index = state.articles.findIndex(
          (a) => a.id === article.id,
        );
        state.articles.splice(index, 1, response.data);
        return response.data;
      })
      .catch((error) => {
        console.error('Error updating article:', error);
      });
    },
  },
});

export default store;