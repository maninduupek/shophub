import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import HomePage from './pages/HomePage.vue'
import ProductDetailPage from './pages/ProductDetailPage.vue'
import CartPage from './pages/CartPage.vue'
import './assets/styles.css'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomePage },
    { path: '/product/:id', name: 'product-detail', component: ProductDetailPage, props: true },
    { path: '/cart', name: 'cart', component: CartPage }
  ]
})

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
