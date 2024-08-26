<template>
  <div>
    <v-table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Content</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="article in articles" :key="article.id">
          <td>{{ article.id }}</td>
          <td>{{ article.title }}</td>
          <td>{{ article.content }}</td>
          <td>
            <v-btn icon small @click="editArticle(article)">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon small @click="handleDeleteArticle(article)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
    <v-btn @click="createNewArticle">Create New Article</v-btn>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  name: 'ArticleList',
  computed: {
    ...mapState({
      articles: (state) => state.articles,
    }),
  },
  created() {
    this.fetchArticles();
  },
  methods: {
    ...mapActions(['fetchArticles', 'deleteArticle']),
    editArticle(article) {
      this.$router.push({
        name: 'ArticleForm',
        params: {
          id: article.id,
        },
      });
    },
    handleDeleteArticle(article) {
      this.deleteArticle(article.id);
    },
    createNewArticle() {
      this.$router.push({
        name: 'ArticleForm',
      });
    },
  },
};
</script>