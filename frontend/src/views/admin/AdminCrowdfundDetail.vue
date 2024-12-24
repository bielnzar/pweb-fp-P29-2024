<template>
  <div class="admin-crowdfund-detail bg-gray-100 min-h-screen flex flex-col">
    <Navbar />
    <main class="flex-grow container mx-auto py-8">
      <h1 class="text-3xl font-bold text-center text-gray-800 mb-6">Crowdfund Detail</h1>
      <div class="bg-white shadow-lg rounded-lg p-6">
        <h3 class="text-xl font-semibold">{{ crowdfund.name }}</h3>
        <p>Target: {{ crowdfund.target }}</p>
        <p>Current Donation: {{ crowdfund.currentDonation }}</p>
        <p>Status: {{ crowdfund.status }}</p>

        <h3 class="text-lg font-bold mt-6">Comments</h3>
        <ul>
          <li
            v-for="comment in comments"
            :key="comment._id"
            class="bg-gray-100 p-4 rounded-lg my-2 flex justify-between items-center"
          >
            <p>{{ comment.message }}</p>
            <button
              @click="deleteComment(comment._id)"
              class="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
            >
              Delete
            </button>
          </li>
        </ul>

        <div class="mt-6">
          <router-link
            :to="`/admin/${crowdfund._id}/edit`"
            class="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600"
          >
            Edit Crowdfund
          </router-link>
          <button
            @click="deleteCrowdfund"
            class="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 ml-2"
          >
            Delete Crowdfund
          </button>
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script>
import Navbar from "/src/components/AdminNavbar.vue";
import Footer from "/src/components/Footer.vue";
import axios from "axios";

export default {
  components: { Navbar, Footer },
  data() {
    return {
      crowdfund: {},
      comments: [],
    };
  },
  methods: {
    async fetchCrowdfund() {
      try {
        const response = await axios.get(`http://localhost:5000/api/admin/${this.$route.params.crowdfund_id}`);
        this.crowdfund = response.data;
        this.comments = response.data.comments;
      } catch (error) {
        console.error("Error fetching crowdfund details:", error);
      }
    },
    async deleteComment(id) {
      try {
        await axios.delete(`http://localhost:5000/api/admin/comment/${id}`);
        this.fetchCrowdfund();
      } catch (error) {
        console.error("Error deleting comment:", error);
      }
    },
    async deleteCrowdfund() {
      try {
        await axios.delete(`http://localhost:5000/api/admin/${this.$route.params.crowdfund_id}`);
        this.$router.push("/admin");
      } catch (error) {
        console.error("Error deleting crowdfund:", error);
      }
    },
  },
  created() {
    this.fetchCrowdfund();
  },
};
</script>


<style scoped>
.container {
  max-width: 800px;
}
</style>
