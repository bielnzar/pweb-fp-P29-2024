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

export default {
  components: { Navbar, Footer },
  data() {
    return {
      form: {
        name: "",
        target: 0,
        status: "OPEN", // Status defaultnya adalah OPEN
        currentDonation: 0, // Donasi yang terkumpul defaultnya adalah 0
        comments: [], // Default array kosong untuk komentar
        createdBy: "", // Akan diisi dengan data user
      },
      user: JSON.parse(localStorage.getItem('user')) || {},  // Ambil data user dari localStorage
    };
  },
  methods: {
    async submitCreate() {
      try {
        const createdBy = this.user.name; // Ambil nama pengguna dari data user
        if (!createdBy) {
          console.error("User data is not available.");
          return;
        }

        // Mengisi field createdBy dengan nama pengguna
        this.form.createdBy = createdBy;

        // Data yang dikirimkan ke server
        const crowdfundData = { 
          ...this.form, 
          createdAt: new Date().toISOString(),  // Menambahkan tanggal pembuatan (current timestamp)
          updatedAt: new Date().toISOString()   // Menambahkan tanggal update (current timestamp)
        };

        // Kirim data ke server
        await axios.post("/api/admin/create", crowdfundData);
        this.$router.push("/admin");
      } catch (error) {
        console.error("Error creating crowdfund:", error);
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
