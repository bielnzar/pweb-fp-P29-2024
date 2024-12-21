<template>
    <nav class="bg-blue-600 text-white shadow-lg">
        <div class="container mx-auto px-4 flex justify-between items-center py-3">

            <div class="font-bold text-xl">
                <a href="/" class="hover:text-blue-200">Dana BisaKita</a>
            </div>

            <ul class="flex space-x-6">
                <li>
                    <a href="/" class="hover:text-blue-200 transition duration-300">Home</a>
                </li>
                <li>
                    <a href="/news" class="hover:text-blue-200 transition duration-300">News</a>
                </li>
                <li>
                    <a href="/login"
                        class="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-blue-700 hover:text-white transition duration-300">
                        Login
                    </a>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'Navbar',
};
</script>
