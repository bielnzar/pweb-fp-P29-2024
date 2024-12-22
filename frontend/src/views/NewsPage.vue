<template>
    <div class="news-container bg-gray-200 min-h-screen flex flex-col">
        <Navbar />
        <main class="flex-grow">
            <div class="news-header bg-gradient-to-b from-blue-500 to-teal-500 text-text-light text-center py-10 mt-14">
                <h1 class="text-4xl font-bold">Latest News</h1>
            </div>

            <div class="news-cards container mx-auto py-12 px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div class="news-card bg-white shadow-md rounded-md overflow-hidden transform hover:scale-105 transition duration-300"
                    v-for="news in newsList" :key="news.id">
                    <img :src="news.image" :alt="news.title" class="w-full h-48 object-cover" />
                    <div class="p-4">
                        <h2 class="text-xl font-semibold text-gray-800 mb-2">{{ news.title }}</h2>
                        <p class="text-gray-600">{{ news.content }}</p>
                    </div>
                </div>
            </div>
        </main>
        <Footer />
    </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue';

import news1 from '../assets/images/news-1.png';
import news2 from '../assets/images/news-2.png';
import news3 from '../assets/images/news-3.png';
import news4 from '../assets/images/news-4.png';

export default {
    components: { Navbar, Footer },

    data() {
        return {
            newsList: [
                { id: 1, title: 'Bank Syariah?', content: 'Berita seputar Bank syariah yang ternyata di luar nalar dan mengandung banyak riba.', image: news1 },
                { id: 2, title: 'Hacker sebaiknya jangan menyerang!', content: 'Aksi heroik Lord KOMINFO yang bisa mengusir para hacker dengan ilmu keramatnya.', image: news2 },
                { id: 3, title: 'BSI Sombong?!', content: 'Bank Syariah yang menguasai bumi ini mendadak dibobol, setelah mengeluarkan statement keamanan bank paling aman.', image: news3 },
                { id: 4, title: 'Sukses Dunia Akhirat', content: 'Bersama sugeng tumbler, influencer dakwah muda yang sudah berkarir di kancah internasional.', image: news4 },
            ],
        };
    },
};
</script>
