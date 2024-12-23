<template>
    <nav class="navbar shadow-lg fixed top-0 left-0 right-0" style="background: var(--primary-gradient);">
      <div class="container mx-auto px-4 flex justify-between items-center py-3">
        <!-- Logo Section -->
        <div class="text-white font-bold leading-tight">
          <router-link to="/admin" class="hover:text-blue-200 text-2xl block">BisaKita Syariah</router-link>
          <span class="text-sm text-blue-200 block">Admin Panel</span>
        </div>
  
        <!-- Hamburger Menu -->
        <button @click="toggleMenu" class="block md:hidden text-white focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
            stroke="currentColor" class="w-10 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
  
        <!-- Navigation Links -->
        <ul
          :class="[isMenuOpen ? 'block' : 'hidden', 'flex flex-col md:flex-row md:space-x-6 absolute md:static top-full right-0 w-full md:w-auto bg-blue-600 md:bg-transparent transition-all duration-300']">
          <li class="text-white flex items-center justify-end md:justify-start px-6 md:px-0 py-1">
            <router-link to="/admin" class="block md:inline hover:text-blue-200 font-semibold text-sm">
              Dashboard
            </router-link>
          </li>
          <li class="text-white flex items-center justify-end md:justify-start px-6 md:px-0 py-1">
            <router-link to="/admin/create" class="block md:inline hover:text-blue-200 font-semibold text-sm">
              Create
            </router-link>
          </li>
          <li class="text-white flex items-center justify-end md:justify-start px-6 md:px-0 py-1">
            <button
              @click="logout"
              class="block md:inline bg-white text-blue-600 text-sm px-4 py-1 rounded-md font-semibold hover:bg-blue-700 hover:text-white">
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isMenuOpen: false,
      };
    },
    methods: {
      toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
      },
      logout() {
        alert("Logged out successfully!");
        this.$router.push("/login");
      },
    },
  };
  </script>
  
  <style scoped>
  .navbar {
    z-index: 1000;
  }
  ul {
    max-width: 300px;
  }
  .text-blue-200 {
    font-size: 0.875rem;
  }
  .leading-tight {
    line-height: 1.1;
  }
  .text-sm {
    font-size: 0.875rem;
  }
  .flex.items-center {
    height: 100%;
  }
  .font-semibold {
    font-weight: 600; 
  }
  </style>
  