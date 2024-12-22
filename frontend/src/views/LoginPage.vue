<template>
  <div class="login-container bg-gradient-to-r from-blue-500 via-teal-500 to-green-400 min-h-screen flex flex-col">
    <Navbar />
    <main class="flex-grow flex items-center justify-center">
      <div class="login-form bg-white p-8 shadow-lg rounded-lg max-w-md w-full">
        <h1 class="text-2xl font-bold text-center text-gray-700 mb-6">Login Disini!</h1>
        <form @submit.prevent="submitLogin" class="space-y-4">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              v-model="email"
              id="email"
              type="email"
              placeholder="Your email"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
            />
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div class="relative">
              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                id="password"
                placeholder="Your password"
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
              />
              <button
                type="button"
                @click="togglePassword"
                class="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
              </button>
            </div>
          </div>

          <button
            type="submit"
            class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
import axios from "axios";

export default {
  components: { Navbar, Footer },
  data() {
    return {
      email: "",
      password: "",
      showPassword: false,
    };
  },
  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
    async submitLogin() {
      try {
        const response = await axios.post("http://localhost:5000/login", {
          email: this.email,
          password: this.password,
        });
        localStorage.setItem("token", response.data.token);
        alert("Login successful!");
      } catch (error) {
        alert("Invalid email or password!");
      }
    },
  },
};
</script>

<style scoped>
main {
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: calc(100vh - 64px);
    /* Mengatur tinggi minimum untuk menghindari pemotongan */
    padding: 20px;
}
</style>