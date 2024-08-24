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
    addComment(state, comment) {
      state.comments.push(comment);
    },
    updateComment(state, updatedComment) {
      const index = state.comments.findIndex((c) => c.id === updatedComment.id);
      if (index !== -1) {
        state.comments.splice(index, 1, updatedComment);
      }
    },
  },
  actions: {

    async fetchComments({ commit }, articleId) {
      return await axios
        .get(`${API_URL}/article/${articleId}/comments`)
        .then((response) => {
           commit('setComments', response.data);
        })
        .catch((error) => {
          console.error('Error fetching comments:', error);
        });
    },

    async deleteComment({ commit }, { articleId, commentId }) {
      return await axios
        .delete(`${API_URL}/article/${articleId}/comment/${commentId}`)
        .then(async () => {
          return await axios
            .get(`${API_URL}/article/${articleId}/comments`)
            .then((response) => {
              commit('setComments', response.data);
            })
            .catch((error) => {
              console.error('Error fetching comments:', error);
            });
        })
        .catch((error) => {
          console.error('Error deleting comment:', error);
        });
    },

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
      return await axios
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

    async createComment({ commit }, comment) {
      return await axios
        .post(`${API_URL}/article/${comment.articleId}/comment`, comment)
        .then((response) => {
          commit('addComment', response.data);
          return response.data;
        })
        .catch((error) => {
          console.error('Error creating comment:', error);
        });
    },

    async updateComment({ commit }, comment) {
      return await axios
        .put(`${API_URL}/article/${comment.articleId}/comment/${comment.id}`, comment)
        .then((response) => {
          commit('updateComment', response.data);
          return response.data;
        })
        .catch((error) => {
          console.error('Error updating comment:', error);
        });
    },
  },
});

export default store;