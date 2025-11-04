import { createRouter, createWebHistory } from 'vue-router'
import MonitoringView from '../01-monitoring/views/MonitoringView.vue'
import DetailView from '../02-details/views/DetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'monitoring',
      component: MonitoringView,
    },
    {
      path: '/detail',
      name: 'detail',
      component: DetailView,
    },
  ],
})

export default router
