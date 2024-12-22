<template>
    <nav class="navbar bg-blue-600 shadow-lg rounded-lg fixed top-0 left-0 right-0 mx-auto mt-4">
        <div class="container container-navbar mx-auto px-4 flex justify-between items-center py-4">

            <div class="text-white font-bold text-2xl">
                <a href="/" class="hover:text-blue-200">BisaKita Syariah</a>
            </div>

            <button @click="toggleMenu" class="block md:hidden text-white focus:outline-none mr-8">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                    stroke="currentColor" class="w-10 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
            </button>

            <ul
                :class="[isMenuOpen ? 'block' : 'hidden', 'mr-8 flex flex-col md:flex-row md:space-x-6 md:static absolute top-full right-0 w-50 md:w-auto bg-blue-600 md:bg-transparent transition-all duration-300']">
                <li class="text-white text-xl py-2 md:py-0 border-b md:border-none border-blue-700 text-right mx-6">
                    <a href="/" class="block md:inline hover:text-blue-200">Home</a>
                </li>
                <li class="text-white text-xl py-2 md:py-0 border-b md:border-none border-blue-700 text-right mx-6">
                    <a href="/news" class="block md:inline hover:text-blue-200">News</a>
                </li>
                <li class="text-white text-xl py-2 md:py-0 border-b md:border-none border-blue-700 text-right mx-6">
                    <a href="/#feedback" class="block md:inline hover:text-blue-200">Feedback</a>
                </li>
                <li class="py-2 md:py-0 text-xl">
                    <a href="/login"
                        class="block md:inline bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-blue-700 hover:text-white text-right mx-6">
                        Login
                    </a>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
export default {
    data() {
        return {
            isMenuOpen: false
        };
    },
    methods: {
        toggleMenu() {
            this.isMenuOpen = !this.isMenuOpen;
        }
    }
};
</script>
