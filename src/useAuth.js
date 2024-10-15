// src/useAuth.js
import { ref } from 'vue';
import axios from 'axios';
import { useToast } from 'vue-toastification';
import { useRouter } from 'vue-router';

const toast = useToast();
const user = ref(null);
const isAuthenticated = ref(false);

const useAuth = () => {
    const router = useRouter();

    const login = async (username, password) => {
        try {
            const response = await axios.get('api/users'); // Update your JSON Server URL
            const users = response.data;
            const foundUser = users.find(u => u.username === username && u.password === password);

            if (foundUser) {
                user.value = foundUser;
                isAuthenticated.value = true;
                toast.success('You are successfully logged in.');

                // Redirect to the home page after successful login
                router.push('/');
            } else {
                toast.error('Invalid credentials.');
            }
        } catch (error) {
            console.error('Login failed:', error);
            toast.error('Login failed: ' + (error.response?.data?.message || 'Unknown error'));
        }
    };

    const logout = () => {
        user.value = null;
        isAuthenticated.value = false;
        toast.info('You have logged out.');
        router.push('/login'); // Redirect to login page after logout
    };

    return { user, isAuthenticated, login, logout };
};

export default useAuth;
