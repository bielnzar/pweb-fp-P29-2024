<template>
  <div class="landing-container">
    <Navbar />
    <main class="bg-gray-100 min-h-screen">

      <section class="landing-section bg-blue-600 text-white text-center py-20">
        <h1 class="text-4xl font-bold mb-4">Welcome to Dana BisaKita</h1>
        <p class="text-lg">Your trusted crowdfunding platform.</p>
      </section>

      <section id="feedback" class="feedback-section py-12 bg-white">
        <div class="container mx-auto px-4">
          <h2 class="text-3xl font-semibold text-center mb-8">Feedback</h2>
          <form @submit.prevent="submitFeedback" class="max-w-lg mx-auto bg-gray-50 p-6 shadow-md rounded-md">
            <div class="mb-4">
              <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input v-model="name" id="name" type="text" placeholder="Your name"
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300" />
            </div>
            <div class="mb-4 flex items-center">
              <input v-model="isAnonymous" id="anonymous" type="checkbox"
                class="mr-2 h-4 w-4 text-blue-600 focus:ring focus:ring-blue-300" />
              <label for="anonymous" class="text-sm font-medium text-gray-700">Send as Anonymous</label>
            </div>
            <div class="mb-4">
              <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input v-model="email" id="email" type="email" placeholder="Your email"
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300" />
            </div>
            <div class="mb-4">
              <label for="message" class="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea v-model="message" id="message" placeholder="Your message"
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"></textarea>
            </div>
            <button type="submit"
              class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300">
              Submit
            </button>
          </form>
        </div>
      </section>
    </main>
    <Footer />
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue';
import axios from 'axios';

export default {
  components: { Navbar, Footer },
  data() {
    return {
      name: '',
      isAnonymous: false,
      email: '',
      message: '',
    };
  },
  methods: {
    async submitFeedback() {
      try {
        const payload = {
          name: this.isAnonymous ? 'Anonymous' : this.name,
          email: this.email,
          message: this.message,
        };
        await axios.post('http://localhost:5000/feedback', payload);
        alert('Feedback submitted successfully!');
      } catch (error) {
        alert('Error submitting feedback!');
      }
    },
  },
};
</script>
