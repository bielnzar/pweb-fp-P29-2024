<template>
    <div class="create-crowdfund">
      <h1>Create Crowdfund</h1>
      <form @submit.prevent="submitCreate">
        <div>
          <label>Name</label>
          <input v-model="form.name" />
        </div>
        <div>
          <label>Target</label>
          <input v-model="form.target" />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        form: {
          name: "",
          target: ""
        }
      };
    },
    methods: {
      async submitCreate() {
        // Replace with API call
        console.log("Creating crowdfund", this.form);
      }
    }
  };
  </script>
  
  <style>
  .create-crowdfund {
    padding: 20px;
  }
  </style>