<template>
  <div class="landing-page">
    <Navbar />

    <section class="relative bg-cover bg-center h-screen"
      style="background-image: url('./src/assets/images/background_hero.png');">
      <div class="absolute inset-0 bg-gradient-to-b from-transparent to-blue-900 opacity-75"></div>
      <div
        class="container mx-auto h-full flex flex-col justify-center items-center relative z-10 text-center text-white">
        <h1 class="text-5xl font-extrabold mb-6">Welcome to BisaKita Syariah!</h1>
        <p class="text-xl mb-8">
          Mengatasi masalah Ekonomi tanpa Solusi.
        </p>
        <a href="#about"
          class="bg-white font-bold text-blue-600 px-6 py-3 rounded-md shadow-md hover:bg-gray-200 transition duration-300">
          Stalking Us
        </a>
      </div>
    </section>

    <section id="about" class="py-16 bg-white text-white">
      <div class="container mx-auto px-6">
        <h2 class="text-4xl font-bold text-center text-gray-800">About Us</h2>

        <div class="flex flex-col md:flex-row items-center">
          <img src="../assets/images/ekonomi-syariah.png" alt="About Us Image" class="w-full md:w-1/4 mb-8 md:mb-0">
          <div class="md:ml-8">
            <h3 class="text-2xl font-bold text-gray-800 mb-4">Ekonomi Syariah</h3>
            <p class="text-gray-600">
              BisaKita Syariah berkomitmen untuk menyediakan solusi keuangan yang sejalan dengan prinsip-prinsip
              Syariah dan Islami. Misi kami adalah memberdayakan masyarakat melalui layanan yang inovatif dan
              bertanggung jawab, demi menuju indonesia Emas 2045.
            </p>
          </div>
        </div>

        <div class="flex flex-col md:flex-row items-center mt-0">
          <div class="md:mr-8">
            <h3 class="text-2xl font-bold text-gray-800 mb-4 mt-6">Support SDG's No. 1</h3>
            <p class="text-gray-600">
              BisaKita Syariah berkomitmen untuk mendukung Tujuan Pembangunan Berkelanjutan (SDGs) No. 1, yaitu
              mengentaskan kemiskinan dalam segala bentuknya di seluruh dunia. Kami percaya bahwa akses ke layanan
              keuangan yang adil dan inklusif adalah kunci untuk memberdayakan individu dan komunitas. Melalui produk
              dan layanan kami, kami berusaha untuk memberikan solusi keuangan yang dapat diakses oleh semua lapisan
              masyarakat, membantu mereka mencapai stabilitas ekonomi dan meningkatkan kualitas hidup.
            </p>
          </div>
          <img src="../assets/images/sdgs-1.png" alt="SDGs Image" class="w-full md:w-1/6 mb-8 md:mb-0">
        </div>

        <div class="flex flex-col md:flex-row items-center mt-14 mb-10">
          <img src="../assets/images/sdgs-8.png" alt="About Us Image" class="w-full md:w-1/6 mb-8 md:mb-0">
          <div class="md:ml-8">
            <h3 class="text-2xl font-bold text-gray-800 mb-4">Support SDG's No. 8</h3>
            <p class="text-gray-600">
              BisaKita Syariah berkomitmen untuk mendukung Tujuan Pembangunan Berkelanjutan (SDGs) No. 8, yaitu
              mempromosikan pertumbuhan ekonomi yang inklusif dan berkelanjutan, serta pekerjaan yang layak untuk semua.
              Kami berusaha untuk menciptakan peluang kerja yang adil dan mendukung pertumbuhan ekonomi melalui layanan
              keuangan yang inovatif dan bertanggung jawab. Dengan menyediakan akses ke investasi dan pembiayaan yang
              sesuai dengan prinsip Syariah, kami membantu individu dan bisnis untuk berkembang dan mencapai potensi
              penuh mereka.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section id="services" class="py-16 bg-gray-200 text-black"
      style="background-image: url('./src/assets/images/parallax-bi.png');">
      <div class="container mx-auto px-6">
        <h2 class="text-3xl font-bold text-center mb-8 text-white">Our Services</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-white text-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <h3 class="text-xl font-semibold mb-4">Crowdfunding</h3>
            <p>Membantu mendanai Anda dalam mencapai tujuan melalui donasi yang digerakkan oleh komunitas.</p>
          </div>
          <div class="bg-white text-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <h3 class="text-xl font-semibold mb-4">Sharia Investments</h3>
            <p>Menigkatkan value keuangan Anda dengan peluang investasi yang selaras dengan nilai-nilai Syariah.</p>
          </div>
          <div class="bg-white text-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <h3 class="text-xl font-semibold mb-4">Financial Advisory</h3>
            <p>Memberikan fasilitas konsultan ahli untuk membantu Anda mencapai target pencapaian keuangan.</p>
          </div>
        </div>
      </div>
    </section>

    <section id="feedback"
      class="bg-gradient-to-r from-blue-500 via-teal-500 to-green-400 feedback-section py-12 bg-white">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-semibold text-center mb-8">Feedback</h2>
        <p class="text-white mb-6 text-center -mt-4">
          Hujatan dan Saran yang membangun kami persilahkan. Ingat, banyak nyamuk mati karena tepuk tangan.
        </p>
        <form @submit.prevent="submitFeedback" class="max-w-lg mx-auto bg-gray-50 p-6 shadow-md rounded-md">

          <div class="mb-4 flex items-center">
            <label for="anonymous" class="switch">
              <input v-model="is_anonymous" id="anonymous" type="checkbox" />
              <span class="slider round"></span>
            </label>
            <label for="anonymous" class="ml-3 text-sm font-medium text-gray-700">
              Send as Anonymous
            </label>
          </div>

          <div v-if="!is_anonymous" class="mb-4">
            <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input v-model="name" id="name" type="text" placeholder="Your name"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300" />
          </div>

          <div v-if="!is_anonymous" class="mb-4">
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
      is_anonymous: false,
      email: '',
      message: '',
    };
  },
  methods: {
    async submitFeedback() {
      try {
        const payload = {
          name: this.is_anonymous ? 'Anonymous' : this.name,
          email: this.is_anonymous ? 'Anonymous' : this.email,
          message: this.message,
        };
        console.log('Payload:', payload);

        await axios.post('http://localhost:5000/feedback', payload);
        alert('Berhasil mengirimkan feedback!');

        // Reset form fields
        this.name = '';
        this.email = '';
        this.message = '';
        this.is_anonymous = false;
      } catch (error) {
        alert('Ada Error saat mengirim feedback!');
      }
    },
  },
};
</script>