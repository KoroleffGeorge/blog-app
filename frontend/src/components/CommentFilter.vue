<template>
  <div>
    <v-form @submit.prevent="filterComments">
      <v-text-field v-model="startDate" label="Start Date" type="date" required></v-text-field>
      <v-text-field v-model="endDate" label="End Date" type="date" required></v-text-field>
      <v-btn type="submit">Filter Comments</v-btn>
    </v-form>
    <div v-if="filteredComments.length > 0">
      <div v-for="(articleComments, articleId) in groupedComments" :key="articleId">
        <h3>Article ID: {{ articleId }}</h3>
        <v-list dense>
          <v-list-item v-for="comment in articleComments" :key="comment.id">
            <v-list-item-content>
              <v-list-item-title>{{ comment.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </div>
    </div>
    <div v-else>No comments found for the selected period.</div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { ref, computed } from 'vue';

export default {

  name: 'CommentFilter',
  setup() {
    const startDate = ref('');
    const endDate = ref('');
    const filteredComments = ref([]);

    const groupedComments = computed(() => {
      const grouped = {};
      filteredComments.value.forEach(comment => {
        if (!grouped[comment.articleId]) {
          grouped[comment.articleId] = [];
        }
        grouped[comment.articleId].push(comment);
      });
      return grouped;
    });

    return {
      startDate,
      endDate,
      filteredComments,
      groupedComments,
    };
  },
  methods: {
    ...mapActions(['fetchAllComments']),
    async filterComments() {

      const dateFrom = new Date(this.startDate).toISOString();
      const dateTo = new Date(this.endDate).toISOString();
      const commentsData = await this.fetchAllComments({ dateFrom, dateTo });

      const transformedComments = commentsData.flatMap(item =>
        item.comments.map(comment => ({
          ...comment,
          articleId: item.articleId,
          articleTitle: item.articleTitle,
        }))
      );

      this.filteredComments = transformedComments;
    },
  },
};
</script>
