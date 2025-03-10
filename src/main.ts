/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'
import {createPinia} from 'pinia';
import piniaPersistedstate from 'pinia-plugin-persistedstate';

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

const app = createApp(App)
const pinia = createPinia()

registerPlugins(app)
pinia.use(piniaPersistedstate);

app.use(pinia)
app.mount('#app')
