<script setup>
import { ref, computed, reactive } from 'vue';
import { useRouter } from 'vue-router';
import Logo from './Logo.vue';
import useAuth from '@/useAuth';

const router = useRouter(); // Get the router instance
const { login } = useAuth();

const form = reactive({
    username: '',
    password: ''
});

const handleLogin = async () => {
    const success = await login(form.username, form.password);
    if (success) {
        router.push('/'); // Redirect to the home page or any other authenticated route
    }
};

// Use computed to track the authentication state reactively
const isButtonDisabled = computed(() => {
    return !(form.username.trim() && form.password.trim());
});

console.log(form.username.trim())
</script>

<template>
    <section class="bg-white">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900">
                <Logo height="100" width="100"/>
            </a>
            <div
                class="w-full bg-white rounded-3xl border border-gray-300 shadow-sm md:mt-0 sm:max-w-md xl:p-0">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1
                        class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                        Sign in to your account
                    </h1>
                    <form @submit.prevent="handleLogin" class="space-y-4 md:space-y-6">
                        <div>
                            <label for="username" class="block mb-2 text-sm font-medium text-gray-900">Username</label>
                            <input type="text" v-model="form.username" name="username" id="username"
                                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-xl focus:outline-none focus:border-gray-300 focus:ring-0 block w-full p-2.5"
                                placeholder="Email or phone number" required>
                        </div>
                        <div>
                            <label for="password"
                                class="block mb-2 text-sm font-medium text-gray-900">Password</label>
                            <input type="password" v-model="form.password" name="password" id="password" placeholder="Password"
                                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-xl focus:outline-none focus:border-gray-300 focus:ring-0 block w-full p-2.5">
                        </div>
                        <div class="flex items-center justify-between">
                            <div class="flex items-start">
                                <div class="flex items-center h-5">
                                    <input id="remember" aria-describedby="remember" type="checkbox"
                                        class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300">
                                </div>
                                <div class="ml-3 text-sm">
                                    <label for="remember" class="text-gray-500">Remember me</label>
                                </div>
                            </div>
                            <a href="#"
                                class="text-sm font-medium text-primary-600 hover:underline">Forgot
                                password?</a>
                        </div>
                        <button type="submit"
                            :disabled="isButtonDisabled"
                            :class="[ 
                                isButtonDisabled ? 'text-gray-300 bg-blue-200 cursor-not-allowed' : 'bg-blue-800 hover:bg-blue-900 transition ease-in-out duration-150 active:scale-95'
                            ]"
                            class="w-full text-white focus:outline-none rounded-xl text-sm px-5 py-2.5 text-center">Sign
                            in</button>
                        <p class="text-sm font-light text-gray-500">
                            Don’t have an account yet? <a href="#"
                                class="font-medium text-primary-600 hover:underline">Sign up</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>
