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
    const success = await login(form.username.trim(), form.password.trim());
    if (success) {
        router.push('/'); // Redirect to the home page or any other authenticated route
    }
};

// Use computed to track the authentication state reactively
const isButtonDisabled = computed(() => {
    return !(form.username.trim() && form.password.trim());
});

</script>

<template>
    <section class="w-screen flex items-center justify-center px-4 lg:px-8">
        <div class="w-full flex flex-col items-center">
            <RouterLink to="/">
                <Logo height="h-20" width="w-20" />
            </RouterLink>
            <div class="w-full lg:max-w-md mt-8 sm:mt-0">
                <div class="lg:p-6 space-y-6">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 text-center">
                        Sign in to your account
                    </h1>
                    <form @submit.prevent="handleLogin" class="space-y-6">
                        <div>
                            <label for="username" class="block mb-2 text-sm font-medium text-gray-900">Username</label>
                            <input type="text" v-model="form.username" name="username" id="username"
                                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-xl focus:outline-none focus:border-gray-300 focus:ring-0 block w-full p-4"
                                placeholder="Email or phone number" required>
                        </div>
                        <div>
                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Password</label>
                            <input type="password" v-model="form.password" name="password" id="password"
                                placeholder="Password"
                                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-xl focus:outline-none focus:border-gray-300 focus:ring-0 block w-full p-4">
                        </div>
                        <div class="flex items-center justify-between">
                            <div class="flex items-center">
                                <input id="remember" aria-describedby="remember" type="checkbox"
                                    class="w-4 h-4 border border-gray-300 text-blue-800 rounded bg-gray-50 focus:ring-0 cursor-pointer">
                                <label for="remember" class="ml-2 text-sm text-gray-400 cursor-pointer">Remember
                                    me</label>
                            </div>
                            <a href="#" class="text-sm font-medium text-blue-800 hover:underline">Forgot password?</a>
                        </div>
                        <button type="submit" :disabled="isButtonDisabled" :class="[
                            isButtonDisabled ? 'text-gray-300 bg-blue-200 cursor-not-allowed' : 'bg-blue-800 hover:bg-blue-900 transition ease-in-out duration-150 active:scale-95'
                        ]" class="w-full text-white rounded-xl text-sm px-5 py-4 text-center">
                            Sign in
                        </button>
                        <p class="text-sm font-light text-gray-400 text-center">
                            Don't have an account yet? <a href="#"
                                class="font-medium text-blue-800 hover:underline">Sign up</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </section>

</template>
