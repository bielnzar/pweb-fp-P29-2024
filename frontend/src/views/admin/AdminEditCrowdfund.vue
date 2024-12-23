<template>
    <div>
      <h1>Edit Crowdfund</h1>
      <form @submit.prevent="submitEdit">
        <label for="name">Name:</label>
        <input v-model="form.name" type="text" id="name" required />
  
        <label for="target">Target Donation:</label>
        <input v-model="form.target" type="number" id="target" required />
  
        <label for="status">Status:</label>
        <select v-model="form.status">
          <option value="OPEN">Open</option>
          <option value="CLOSE">Close</option>
        </select>
  
        <button type="submit">Submit</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        form: {
          name: '',
          target: 0,
          status: 'OPEN',
        },
      };
    },
    methods: {
      async fetchCrowdfund() {
        const response = await axios.get(`/api/admin/${this.$route.params.crowdfund_id}`);
        this.form = { ...response.data.crowdfund };
      },
      async submitEdit() {
        await axios.put(`/api/admin/${this.$route.params.crowdfund_id}/edit`, this.form);
        this.$router.push(`/admin/${this.$route.params.crowdfund_id}`);
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

form {
  max-width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 5px;
  font-weight: bold;
}

input, select {
  margin-bottom: 15px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
}

button:hover {
  background-color: #45a049;
}
</style>

  