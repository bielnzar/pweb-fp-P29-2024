<template>
    <div class="login-container bg-gray-100 min-h-screen flex flex-col">
        <Navbar />
        <main class="flex-grow flex items-center justify-center">
            <div class="login-form bg-white p-8 shadow-lg rounded-lg max-w-md w-full">
                <h1 class="text-2xl font-bold text-center text-gray-700 mb-6">Login</h1>
                <form @submit.prevent="submitLogin" class="space-y-4">

                    <div>
                        <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input v-model="email" id="email" type="email" placeholder="Your email"
                            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300" />
                    </div>

                    <div>
                        <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input v-model="password" id="password" type="password" placeholder="Your password"
                            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300" />
                    </div>

                    <button type="submit"
                        class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300">
                        Login
                    </button>
                </form>
            </div>
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
            email: '',
            password: '',
        };
    },
    methods: {
        async submitLogin() {
            try {
                const response = await axios.post('http://localhost:5000/login', {
                    email: this.email,
                    password: this.password,
                });
                localStorage.setItem('token', response.data.token);
                alert('Login successful!');
            } catch (error) {
                alert('Invalid email or password!');
            }
        },
    },
};
</script>
