<template>
    <div>
      <h1>Crowdfund Detail</h1>
      <div>
        <h3>{{ crowdfund.name }}</h3>
        <p>Target: {{ crowdfund.target }}</p>
        <p>Current Donation: {{ crowdfund.current_donation }}</p>
        <p>Status: {{ crowdfund.status }}</p>
      </div>
      <div>
        <h3>Comments</h3>
        <ul>
          <li v-for="comment in comments" :key="comment._id">
            <p>{{ comment.message }}</p>
            <button @click="deleteComment(comment._id)">Delete</button>
          </li>
        </ul>
      </div>
      <router-link :to="`/admin/${crowdfund._id}/edit`">Edit Crowdfund</router-link>
      <button @click="deleteCrowdfund">Delete Crowdfund</button>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        crowdfund: {},
        comments: [],
      };
    },
    methods: {
      async fetchCrowdfund() {
        const response = await axios.get(`/api/admin/${this.$route.params.crowdfund_id}`);
        this.crowdfund = response.data.crowdfund;
        this.comments = response.data.comments;
      },
      async deleteComment(id) {
        await axios.delete(`/api/comments/${id}`);
        this.fetchCrowdfund();
      },
      async deleteCrowdfund() {
        await axios.delete(`/api/admin/${this.$route.params.crowdfund_id}`);
        this.$router.push('/admin');
      },
    },
    created() {
      this.fetchCrowdfund();
    },
  };
  </script>
  
  <style scoped>
h1 {
  text-align: center;
  margin-bottom: 20px;
}

div {
  margin-bottom: 20px;
}

h3 {
  color: #333;
  margin-bottom: 10px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  background-color: #f9f9f9;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

button {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
}

button:hover {
  background-color: #d32f2f;
}

.router-link {
  text-decoration: none;
  color: #2196f3;
  margin-top: 10px;
  display: inline-block;
}

.router-link:hover {
  text-decoration: underline;
}
</style>
