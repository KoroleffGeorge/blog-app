<template>
  <v-form @submit.prevent="saveArticle">
    <v-text-field v-model="title" label="Title" required></v-text-field>
    <v-textarea v-model="content" label="Content" required></v-textarea>
    <v-btn type="submit">Save</v-btn>
  </v-form>
</template>

<script>
  import axios from 'axios';
  import { defineComponent, ref } from 'vue';
  import { useRoute } from 'vue-router';

  export default defineComponent({
    name: 'ArticleForm',
    setup(props) {
      const route = useRoute();
      const title = ref('');
      const content = ref('');

      const saveArticle = async () => {
        try {
          const response = await axios.post('/api/article', {
            title: title.value,
            content: content.value,
          });

          console.log('Article saved:', response.data);
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
      };
    },
  });
</script>