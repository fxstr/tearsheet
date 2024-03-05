import { createApp } from 'vue';
import App from './App.vue';
import NotificationCollection from '../models/NotificationCollection';


// WTF: https://github.com/parcel-bundler/parcel/issues/6628
globalThis.__VUE_OPTIONS_API__ = process.env.NODE_ENV === 'development'
globalThis.__VUE_PROD_DEVTOOLS__ = process.env.NODE_ENV === 'development'

const app = createApp(App);

app.config.errorHandler = (err, instance, info) => {
    console.error("Global error:", err);
    console.error("Vue instance:", instance);
    console.error("Error info:", info);
};    

app.use(NotificationCollection);
app.mount('#app');