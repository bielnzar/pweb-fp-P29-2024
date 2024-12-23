<template>
  <div class="admin-dashboard bg-gray-100 min-h-screen flex flex-col">
    <Navbar />
    <main class="flex-grow container mx-auto py-8">
      <h1 class="text-3xl font-bold text-center text-gray-800 mb-6">Admin Dashboard</h1>
      <div class="bg-white shadow-lg rounded-lg p-6">
        <table class="w-full border-collapse table-auto">
          <thead>
            <tr class="bg-blue-600 text-white">
              <th class="py-3 px-4 text-left">Name</th>
              <th class="py-3 px-4 text-left">Target</th>
              <th class="py-3 px-4 text-left">Current Donation</th>
              <th class="py-3 px-4 text-left">Status</th>
              <th class="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="crowdfund in paginatedCrowdfunds" 
              :key="crowdfund._id" 
              class="odd:bg-gray-50 even:bg-white hover:bg-gray-100 transition duration-200"
            >
              <td class="py-2 px-4">{{ crowdfund.name }}</td>
              <td class="py-2 px-4">{{ crowdfund.target }}</td>
              <td class="py-2 px-4">{{ crowdfund.current_donation }}</td>
              <td class="py-2 px-4">
                <span 
                  :class="{
                    'bg-green-200 text-green-800 px-2 py-1 rounded-full text-xs font-semibold': crowdfund.status === 'active',
                    'bg-red-200 text-red-800 px-2 py-1 rounded-full text-xs font-semibold': crowdfund.status === 'inactive'
                  }"
                >
                  {{ crowdfund.status }}
                </span>
              </td>
              <td class="py-2 px-4 flex justify-center items-center space-x-2">
                <router-link 
                  :to="`/admin/${crowdfund._id}`" 
                  class="text-blue-600 hover:underline text-sm font-medium"
                >
                  Detail
                </router-link>
                <router-link 
                  :to="`/admin/${crowdfund._id}/edit`" 
                  class="text-yellow-500 hover:underline text-sm font-medium"
                >
                  Edit
                </router-link>
                <button 
                  @click="deleteCrowdfund(crowdfund._id)" 
                  class="bg-red-500 text-white text-sm px-3 py-1 rounded-md hover:bg-red-600 transition duration-300"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="flex justify-between items-center mt-4">
          <div class="space-x-2">
            <button 
              @click="prevPage" 
              class="bg-gray-200 text-gray-700 py-1 px-4 rounded-md hover:bg-gray-300 transition duration-300 disabled:bg-gray-100 disabled:text-gray-400"
              :disabled="currentPage === 1"
            >
              Previous
            </button>
            <button 
              @click="nextPage" 
              class="bg-blue-200 text-blue-700 py-1 px-4 rounded-md hover:bg-blue-300 transition duration-300 disabled:bg-blue-100 disabled:text-blue-400"
              :disabled="currentPage === totalPages"
            >
              Next
            </button>
          </div>
          <div class="flex items-center space-x-2">
            <span class="text-gray-600 text-sm">
              Page {{ currentPage }} of {{ totalPages }}
            </span>
            <input 
              v-model.number="pageInput"
              @keyup.enter="goToPage"
              type="number" 
              min="1" 
              :max="totalPages" 
              class="w-16 border border-gray-300 rounded-md px-2 py-1 text-center text-sm"
              placeholder="Page"
            />
            <button 
              @click="goToPage"
              class="bg-blue-600 text-white py-1 px-4 rounded-md text-sm hover:bg-blue-700 transition duration-300"
            >
              Go
            </button>
          </div>
          <button 
            @click="showAll" 
            class="bg-blue-600 text-white py-1 px-4 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Show All
          </button>
        </div>
        <div class="text-right mt-4">
          <router-link 
            to="/admin/create" 
            class="bg-blue-600 text-white py-2 px-4 rounded-md text-sm hover:bg-blue-700 transition duration-300"
          >
            Create New Crowdfund
          </router-link>
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
      crowdfunds: [],
      currentPage: 1,
      rowsPerPage: 10,
      isShowingAll: false,
      pageInput: 1,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.crowdfunds.length / this.rowsPerPage);
    },
    paginatedCrowdfunds() {
      if (this.isShowingAll) {
        return this.crowdfunds;
      }
      const start = (this.currentPage - 1) * this.rowsPerPage;
      const end = start + this.rowsPerPage;
      return this.crowdfunds.slice(start, end);
    },
  },
  methods: {
    async fetchCrowdfunds() {
      try {
        const response = await axios.get("/api/admin");
        this.crowdfunds = response.data;
      } catch (error) {
        console.error("Failed to fetch crowdfunds:", error);
      }
    },
    deleteCrowdfund(id) {
      axios.delete(`/api/admin/${id}`).then(() => {
        this.fetchCrowdfunds();
      });
    },
    prevPage() {
      if (!this.isShowingAll && this.currentPage > 1) {
        this.currentPage -= 1;
        this.pageInput = this.currentPage;
      }
    },
    nextPage() {
      if (!this.isShowingAll && this.currentPage < this.totalPages) {
        this.currentPage += 1;
        this.pageInput = this.currentPage;
      }
    },
    showAll() {
      this.isShowingAll = !this.isShowingAll;
      if (!this.isShowingAll) {
        this.currentPage = 1;
        this.pageInput = 1;
      }
    },
    goToPage() {
      if (this.pageInput >= 1 && this.pageInput <= this.totalPages) {
        this.currentPage = this.pageInput;
      } else {
        alert("Please enter a valid page number.");
      }
    },
  },
  created() {
    this.fetchCrowdfunds();
  },
};
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
}
table {
  border-spacing: 0;
}
button:focus, .router-link:focus {
  outline: none;
  ring: 2px solid #2563eb;
}
</style>
