<template>
  <div class="admin-create-crowdfund bg-gray-100 min-h-screen flex flex-col">
    <Navbar />
    <main class="flex-grow container mx-auto py-8">
      <h1 class="text-3xl font-bold text-center text-gray-800 mb-6">Create New Crowdfund</h1>
      <div class="bg-white shadow-lg rounded-lg p-6">
        <form @submit.prevent="submitCreate">
          <label class="block mb-2 font-bold" for="name">Name:</label>
          <input
            v-model="form.name"
            type="text"
            id="name"
            class="w-full mb-4 p-2 border rounded-md"
            required
          />

          <label class="block mb-2 font-bold" for="target">Target Donation:</label>
          <input
            v-model="form.target"
            type="number"
            id="target"
            class="w-full mb-4 p-2 border rounded-md"
            required
          />

          <p v-if="errorMessage" class="text-red-500 mb-4">{{ errorMessage }}</p>
          <p v-if="successMessage" class="text-green-500 mb-4">{{ successMessage }}</p>

          <button
            type="submit"
            class="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script>
import Navbar from "/src/components/AdminNavbar.vue";
import Footer from "/src/components/Footer.vue";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000";

export default {
  components: { Navbar, Footer },
  data() {
    return {
      form: {
        name: "",
        target: 0,
      },
      user: JSON.parse(localStorage.getItem("user")) || {}, 
      errorMessage: "", 
      successMessage: "",
    };
  },
  methods: {
    async submitCreate() {
  try {
    const token = localStorage.getItem("authToken"); // Mengambil token dengan nama 'authToken'
    if (!token) {
      this.errorMessage = "Token JWT tidak ditemukan. Silakan login ulang.";
      return;
    }

    const crowdfundData = {
      name: this.form.name,
      target: this.form.target,
      createdBy: this.user.email,
    };

    const response = await axios.post("http://localhost:5000/api/admin/create", crowdfundData, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });

    this.successMessage = "Crowdfund berhasil dibuat!";
    this.form.name = "";
    this.form.target = 0;
  } catch (error) {
    this.errorMessage = error.response?.data?.message || "Gagal membuat crowdfund.";
    console.error("Error:", error);
  }
  },
  },
};
</script>

<style scoped>
.container {
  max-width: 600px;
}
</style>
