import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import service from '../views/Service.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../components/auth/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/service',
    name: 'Service',
    component: service
  },
  {
    path: '/qr',
    name: 'QR',
    component: () => import('../views/Qr.vue')
  },
  {
    path: '/payment',
    name: 'Payment',
    component: () => import('../views/payment/Payment.vue')
  },
  {
    path: '/payment/onemoth',
    name: 'PaymentOneMoth',
    component: () => import('../views/payment/PayMoth.vue')
  },
  {
    path: '/payment/oneyear',
    name: 'PaymentForOne Yer',
    
    component: () => import('../views/payment/PayYear.vue')
  },

  {
    path: '/payment/threemonth',
    name: 'PaymentForforever',
    component: () => import('../views/payment/PayThreeMoth.vue')
  },

  {
    path: '/payment/test',
    name: 'PaymentForforever',
    component: () => import('../views/payment/paymenttest.vue')
  },

  
]

const router = new VueRouter({
  routes
})

export default router
