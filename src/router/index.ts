import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Layout from '@/components/Layout.vue'
import { getLocalStorage } from '../utils/local-storage'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/',
      name: 'layout',
      component: Layout,
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('../views/HomeView.vue')
        },
        {
          path: '/profile',
          name: 'profile',
          component: () => import('../views/ProfileView.vue')
        },
        {
          path: '/spend',
          name: 'spend',
          component: () => import('../views/SpendView.vue')
        }
      ]
    }
  ]
})

router.beforeEach((to, from) => {
  const isAuthenticated = getLocalStorage('user')

  if (to.name !== 'login' && to.name !== 'register' && !isAuthenticated) {
    return { name: 'login' } // Не авторизован
  }
  if ((to.name === 'login' || to.name === 'register') && isAuthenticated) {
    return { name: 'home' }
  }
  return true // Авторизован
})

export default router
