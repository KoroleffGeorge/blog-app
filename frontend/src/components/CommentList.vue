<template>
  <div>
    <v-list dense>
      <v-list-item v-for="comment in comments" :key="comment.id">
        <v-list-item-content>
          <v-list-item-title>{{ comment.text }}</v-list-item-title>
          <v-list-item-subtitle>{{ comment.author }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn icon small @click="editComment(comment)">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon small @click="handleDeleteComment(comment)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
    <v-btn @click="addComment">Add Comment</v-btn>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { useRouter } from 'vue-router';
import CommentForm from './CommentForm.vue';

export default {
  name: 'CommentList',
  components: {
      CommentForm,
  },
  data() {
    return {
      editingComment: null,
    };
  },
  computed: {
    ...mapState({
      comments: (state) => state.comments,
    }),
  },
  created() {
    const articleId = parseInt(this.$route.params.id, 10);
    this.fetchComments(articleId);
  },
  beforeRouteUpdate(to, from) {
    const articleId = parseInt(to.params.id, 10);
    this.fetchComments(articleId);
  },
  methods: {
    ...mapActions(['fetchComments', 'deleteComment']),
    editComment(comment) {
      this.$router.push({
        name: 'CommentForm',
        params: {
          articleId: comment.articleId,
          commentId: comment.id,
        },
        query: {
          text: comment.text,
        },
      });
    },
    handleDeleteComment(comment) {
      this.deleteComment({ articleId: this.$route.params.id, commentId: comment.id });
    },
    addComment() {
      this.$router.push({
        name: 'CommentForm',
        params: {
          articleId: this.$route.params.id,
          commentId: null,
        },
      });
    },
  },
};
</script>