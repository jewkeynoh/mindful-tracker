import './assets/main.css';
import './assets/styles.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import Toast, { POSITION } from 'vue-toastification';
import 'vue-toastification/dist/index.css';

const app = createApp(App);

app.use(router);
app.use(Toast, {
    timeout: 3000,
    closeOnClick: true,
    position: POSITION.BOTTOM_CENTER,
    transition: 'Vue-Toastification__fade',
    maxToasts: 5,
    newestOnTop: true
});

app.mount('#app');
