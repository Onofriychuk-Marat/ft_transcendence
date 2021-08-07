import { createApp } from 'vue'
import App from './App.vue'
import VueSocketIO from 'vue-3-socket.io'

createApp(App)
    .use(new VueSocketIO({
        debug: true,
        connection: 'http://localhost:3000',
        // connection: 'http://localhost:666/api'
        }))
    .mount('#app')
