<template>
    <div class="admin-dashboard">
      <h1 class="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <table class="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th class="border border-gray-300 px-4 py-2">Nama Crowdfund</th>
            <th class="border border-gray-300 px-4 py-2">Target Donasi</th>
            <th class="border border-gray-300 px-4 py-2">Status</th>
            <th class="border border-gray-300 px-4 py-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="crowdfund in crowdfunds" :key="crowdfund.id">
            <td class="border border-gray-300 px-4 py-2">{{ crowdfund.name }}</td>
            <td class="border border-gray-300 px-4 py-2">{{ crowdfund.target }}</td>
            <td class="border border-gray-300 px-4 py-2">{{ crowdfund.status }}</td>
            <td class="border border-gray-300 px-4 py-2">
              <router-link :to="`/admin/${crowdfund.id}`" class="text-blue-500">Detail</router-link> |
              <router-link :to="`/admin/${crowdfund.id}/edit`" class="text-yellow-500">Edit</router-link> |
              <button @click="deleteCrowdfund(crowdfund.id)" class="text-red-500">Hapus</button>
            </td>
          </tr>
        </tbody>
      </table>
      <router-link to="/admin/create" class="mt-4 inline-block bg-blue-600 text-white py-2 px-4 rounded">
        Buat Crowdfund Baru
      </router-link>
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
    created() {
      this.fetchCrowdfunds();
    },
    methods: {
      async fetchCrowdfunds() {
        try {
          const response = await axios.get('http://localhost:5000/api/crowdfunds');
          this.crowdfunds = response.data;
        } catch (error) {
          console.error(error);
        }
      },
      async deleteCrowdfund(id) {
        if (confirm('Apakah Anda yakin ingin menghapus crowdfund ini?')) {
          try {
            await axios.delete(`http://localhost:5000/api/crowdfunds/${id}`);
            this.fetchCrowdfunds();
          } catch (error) {
            console.error(error);
          }
        }
      },
    },
  };
  </script>
  
  <style scoped>
  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
  }
  </style>