<template>
  <div>
    <div v-if="loading">Loading...</div>
    <div v-else-if="article">
      <h1>{{ article.title }}</h1>
      <p>{{ article.content }}</p>
      <v-btn @click="editArticle">Edit Article</v-btn>
      <v-btn @click="handleDeleteArticle">Delete Article</v-btn>

      <h2>Comments</h2>
      <CommentList :articleId="article.id" />
    </div>
    <div v-else>Article not found.</div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { useRouter } from 'vue-router';
import CommentList from './CommentList.vue';

export default {
  name: 'ArticleView',
  components: {
    CommentList,
  },
  data() {
    return {
      loading: true,
    };
  },
  computed: {
    ...mapState({
      article: (state) => state.article,
    }),
  },
  created() {
    const articleId = parseInt(this.$route.params.id, 10);
    this.fetchArticle(articleId).finally(() => {
      this.loading = false;
    });
  },
  methods: {
    ...mapActions(['fetchArticle', 'deleteArticle']),
    editArticle() {
      this.$router.push({
        name: 'ArticleForm',
        params: {
          id: this.article.id,
        },
      });
    },
    handleDeleteArticle() {
      this.deleteArticle(this.article.id).then(() => {
        this.$router.push({ name: 'ArticleList' });
      });
    },
  },
};
</script>