import { createApp } from 'vue'
import { useToast } from 'vue-toast-notification'
import './style.css'
import App from './App.vue'

import "vue-toast-notification/dist/theme-sugar.css"

const toast = useToast({
    duration: 5000,
    position: 'top-right'
})

const app = createApp(App)

app.provide('toast', toast)
app.mount('#app')
