import { createRouter, createWebHistory } from 'vue-router'
import { beforeEach, afterEach } from '@/router/guard'
import routes from '@/router/routes'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// 路由守卫 beforeEach
router.beforeEach(beforeEach)
router.afterEach(afterEach)

export default router
