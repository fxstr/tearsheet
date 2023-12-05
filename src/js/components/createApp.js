import { createApp } from 'vue/dist/vue.esm-bundler';
import App from './App.vue';

// WTF: https://github.com/parcel-bundler/parcel/issues/6628
globalThis.__VUE_OPTIONS_API__ = process.env.NODE_ENV === 'development'
globalThis.__VUE_PROD_DEVTOOLS__ = process.env.NODE_ENV === 'development'

createApp(App).mount('#app');
