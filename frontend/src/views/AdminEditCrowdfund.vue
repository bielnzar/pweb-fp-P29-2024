<template>
  <div class="edit-crowdfund">
    <h1>Edit Crowdfund</h1>
    <form @submit.prevent="submitEdit">
      <div>
        <label>Name</label>
        <input v-model="form.name" />
      </div>
      <div>
        <label>Target</label>
        <input v-model="form.target" />
      </div>
      <div>
        <label>Status</label>
        <select v-model="form.status">
          <option value="open">Open</option>
          <option value="close">Close</option>
        </select>
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
        target: "",
        status: "open"
      }
    };
  },
  methods: {
    async fetchCrowdfund() {
      const { id } = this.$route.params;
      // Replace with API call
      const crowdfund = await fetchCrowdfundDetailsFromAPI(id);
      this.form = { ...crowdfund };
    },
    async submitEdit() {
      // Replace with API call
      console.log("Submitting edit", this.form);
    }
  },
  mounted() {
    this.fetchCrowdfund();
  }
};
</script>

<style>
.edit-crowdfund {
  padding: 20px;
}
</style>