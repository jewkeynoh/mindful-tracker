import { ref } from 'vue';
import axios from 'axios';
import { useToast } from 'vue-toastification';
import { useRouter } from 'vue-router';

const toast = useToast();
const user = ref(JSON.parse(localStorage.getItem('user')) || null);
const isAuthenticated = ref(!!user.value);

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
                localStorage.setItem('user', JSON.stringify(foundUser));
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
        localStorage.removeItem('user');
        toast.info('You have logged out.');
        router.push('/login');
    };

    return { user, isAuthenticated, login, logout };
};

export default useAuth;
