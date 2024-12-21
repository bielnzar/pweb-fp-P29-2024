<template>
    <div class="news-container bg-gray-100 min-h-screen flex flex-col">
        <Navbar />
        <main class="flex-grow">
            <div class="news-header bg-blue-600 text-white text-center py-10">
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

export default {
    components: { Navbar, Footer },
    data() {
        return {
            newsList: [
                { id: 1, title: 'Crowdfunding Success!', content: 'Learn how we helped raise funds for communities in need.', image: 'https://via.placeholder.com/300' },
                { id: 2, title: 'New Projects Launched', content: 'Discover the latest campaigns to support.', image: 'https://via.placeholder.com/300' },
                { id: 3, title: 'Our Impact', content: 'See how we’re making a difference.', image: 'https://via.placeholder.com/300' },
            ],
        };
    },
};
</script>
