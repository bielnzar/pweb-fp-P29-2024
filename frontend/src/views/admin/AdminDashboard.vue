<template>
    <div>
      <h1>Admin Dashboard</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Target</th>
            <th>Current Donation</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="crowdfund in crowdfunds" :key="crowdfund._id">
            <td>{{ crowdfund.name }}</td>
            <td>{{ crowdfund.target }}</td>
            <td>{{ crowdfund.current_donation }}</td>
            <td>{{ crowdfund.status }}</td>
            <td>
              <router-link :to="`/admin/${crowdfund._id}`">Detail</router-link>
              <router-link :to="`/admin/${crowdfund._id}/edit`">Edit</router-link>
              <button @click="deleteCrowdfund(crowdfund._id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      <router-link to="/admin/create">Create New Crowdfund</router-link>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        crowdfunds: [],
      };
    },
    methods: {
      async fetchCrowdfunds() {
        const response = await axios.get('/api/admin');
        this.crowdfunds = response.data;
      },
      async deleteCrowdfund(id) {
        await axios.delete(`/api/admin/${id}`);
        this.fetchCrowdfunds();
      },
    },
    created() {
      this.fetchCrowdfunds();
    },
  };
  </script>
  
  <style scoped>
h1 {
  text-align: center;
  margin-bottom: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

th, td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
}

th {
  background-color: #f4f4f4;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}

tr:hover {
  background-color: #f1f1f1;
}

button {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}

button:hover {
  background-color: #d32f2f;
}

.router-link {
  text-decoration: none;
  color: #2196f3;
  margin-right: 10px;
}

.router-link:hover {
  text-decoration: underline;
}
</style>
