<template>
  <div class="login-container bg-gradient-to-r from-blue-500 via-teal-500 to-green-400 min-h-screen flex flex-col">
    <Navbar />
    <main class="flex-grow flex items-center justify-center">
      <div class="login-form bg-white p-6 shadow-md rounded-lg max-w-sm w-full">
        <h1 class="text-xl font-bold text-center text-gray-700 mb-4">Login Disini</h1>
        <form @submit.prevent="submitLogin" class="space-y-3">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input
              v-model="email"
              id="email"
              type="email"
              placeholder="Masukkan email"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 text-sm"
              :class="{ 'border-red-500': emailError }"
            />
            <p v-if="emailError" class="text-red-500 text-xs mt-1">{{ emailError }}</p>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <div class="relative">
              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                id="password"
                placeholder="Masukkan password"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 text-sm"
                :class="{ 'border-red-500': passwordError }"
              />
              <button
                type="button"
                @click="togglePassword"
                class="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none text-sm"
              >
                <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
              </button>
            </div>
            <p v-if="passwordError" class="text-red-500 text-xs mt-1">{{ passwordError }}</p>
          </div>

          <button
            type="submit"
            class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300 text-sm"
            :disabled="isLoading"
          >
            <span v-if="isLoading" class="loader mr-2"></span>
            <span v-else>Login</span>
          </button>
          <p v-if="errorMessage" class="text-red-500 text-center text-xs mt-3">{{ errorMessage }}</p>
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
      isLoading: false,
      errorMessage: "",
      emailError: "",
      passwordError: "",
    };
  },
  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
    validateForm() {
      this.emailError = "";
      this.passwordError = "";

      if (!this.email) this.emailError = "Email is required.";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) this.emailError = "Invalid email format.";

      if (!this.password) this.passwordError = "Password is required.";

      return !this.emailError && !this.passwordError;
    },
    async submitLogin() {
      if (!this.validateForm()) return;

      this.isLoading = true;
      this.errorMessage = "";
      try {
        const response = await axios.post("http://localhost:5000/login", {
          email: this.email,
          password: this.password,
        });

        localStorage.setItem("authToken", response.data.token);


        // Simpan data ke localStorage
        localStorage.setItem("user", JSON.stringify({
          email: this.email,
          role: response.data.role,
        }));

        // Arahkan ke rute yang sesuai
        this.$router.push(response.data.redirectTo);
      } catch (error) {
        this.errorMessage = error.response?.data?.message || "Invalid email or password!";
      } finally {
        this.isLoading = false;
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
  min-height: calc(100vh - 128px); /* Adjust for Navbar and Footer */
  padding: 20px;
}
.loader {
  border: 2px solid #fff;
  border-top: 2px solid transparent;
  border-radius: 50%;
  width: 12px;
  height: 12px;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
