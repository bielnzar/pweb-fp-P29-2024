<template>
    <div class="crowdfund-detail">
      <h1>Crowdfund Details</h1>
      <div>
        <p><strong>Name:</strong> {{ crowdfund.name }}</p>
        <p><strong>Target:</strong> {{ crowdfund.target }}</p>
        <p><strong>Status:</strong> {{ crowdfund.status }}</p>
      </div>
      <h2>Comments</h2>
      <ul>
        <li v-for="comment in comments" :key="comment.id">
          <p>{{ comment.text }} - {{ comment.user }}</p>
          <button @click="deleteComment(comment.id)">Delete</button>
        </li>
      </ul>
      <button @click="goToEditPage">Edit Crowdfund</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        crowdfund: {},
        comments: []
      };
    },
    methods: {
      async fetchCrowdfund() {
        const { id } = this.$route.params;
        // Replace with API call
        this.crowdfund = await fetchCrowdfundDetailsFromAPI(id);
        this.comments = this.crowdfund.comments;
      },
      deleteComment(id) {
        // Add delete logic here
        console.log("Deleting comment", id);
      },
      goToEditPage() {
        this.$router.push(`/admin/${this.$route.params.id}/edit`);
      }
    },
    mounted() {
      this.fetchCrowdfund();
    }
  };
  </script>
  
  <style>
  .crowdfund-detail {
    padding: 20px;
  }
  </style>