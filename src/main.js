import './assets/main.css';
import './assets/styles.css'; // Make sure this is after the default styles

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css'; // Import default styles

const app = createApp(App);

app.use(router);
app.use(Toast, {
    timeout: 5000,
    closeOnClick: true,
    position: 'bottom-center',
    transition: 'Vue-Toastification__fade',
    maxToasts: 20,
    newestOnTop: true
});

app.mount('#app');
