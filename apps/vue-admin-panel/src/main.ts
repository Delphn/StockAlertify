import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { io } from 'socket.io-client'

import App from './App.vue'
import router from './router'

const socket = io('http://localhost:3002')

socket.on('stock-update', (data) => {
  console.log('Received message:', data)
})

socket.on('connect', () => {
  console.log('Connected to WebSocket server')
})

socket.on('disconnect', () => {
  console.log('Disconnected from WebSocket server')
})

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
