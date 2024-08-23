<template>
  <v-form @submit.prevent="saveArticle">
    <v-text-field v-model="title" label="Title" required></v-text-field>
    <v-textarea v-model="content" label="Content" required></v-textarea>
    <v-btn type="submit">{{ isEditing ? 'Update' : 'Save' }}</v-btn>
  </v-form>
</template>

<script>
  import axios from 'axios';
  import { defineComponent, ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';

  export default defineComponent({
    name: 'ArticleForm',
    setup(props) {
      const route = useRoute();
      const title = ref('');
      const content = ref('');
      const isEditing = ref(false);

      onMounted(async () => {
        const articleId = route.params.id;
        if (articleId) {
          isEditing.value = true;
          try {
            const response = await axios.get(`/api/article/${articleId}`);
            title.value = response.data.title;
            content.value = response.data.content;
          } catch (error) {
            console.error('Error fetching article:', error);
          }
        }
      });

      const saveArticle = async () => {
        try {
          const articleId = route.params.id;
          if (articleId) {
            const response = await axios.put(`/api/article/${articleId}`, {
              title: title.value,
              content: content.value,
            });
            console.log('Article updated:', response.data);
          } else {
            const response = await axios.post('/api/article', {
              title: title.value,
              content: content.value,
            });
            console.log('Article saved:', response.data);
          }
          title.value = '';
          content.value = '';
        } catch (error) {
          console.error('Error saving article:', error);
        }
      };

      return {
        title,
        content,
        saveArticle,
        isEditing,
      };
    },
  });
</script>