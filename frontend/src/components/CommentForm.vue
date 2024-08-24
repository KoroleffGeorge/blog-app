<template>
  <v-form @submit.prevent="saveComment">
    <v-text-field v-model="text" label="Comment" required></v-text-field>
    <v-btn type="submit">{{ isEditing ? 'Update' : 'Save' }}</v-btn>
  </v-form>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { mapActions } from 'vuex';

export default defineComponent({
  name: 'CommentForm',
  props: {
    articleId: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const route = useRoute();
    const router = useRouter();
    const text = ref('');
    const isEditing = ref(false);

    onMounted(() => {
      if (route.params.commentId) {
        isEditing.value = true;
        text.value = route.query.text;
      }
    });

    return {
      text,
      isEditing,
      route,
      router,
    };
  },
  methods: {
    ...mapActions(['createComment', 'updateComment']),
    async saveComment() {
      try {
        const commentData = {
          articleId: this.route.params.articleId,
          text: this.text,
        };

        if (this.isEditing) {
          commentData.id = parseInt(this.route.params.commentId, 10);
          await this.updateComment(commentData);
          console.log('Comment updated:', commentData);
        } else {
          await this.createComment(commentData);
          console.log('Comment saved:', commentData);
        }

        this.text = '';
        this.isEditing = false;
        this.router.push({ name: 'CommentList', params: { id: this.route.params.articleId } });
      } catch (error) {
        console.error('Error saving comment:', error);
      }
    },
  },
});
</script>