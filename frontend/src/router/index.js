import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Login.vue'
import Products from '../views/Products.vue'
import { Auth } from '@/firebase'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Home
  },
  {
    path: '/productos',
    name: 'Products',
    component: Products
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const user = Auth.currentUser
  const authRequired = to.matched.some(route => route.meta.login)

  if (!user && authRequired) {
    next('/')
  } else {
    next()
  }
})

export default router
