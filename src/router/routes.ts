import { RouteRecordRaw } from 'vue-router'
import Login from '@views/User/login.vue'

// 约定：
//  name 为必传项，用于标识路由的唯一性，在路由守卫使用

// meta
// full: 全屏显示，像login/500...
// title: 页面标题

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    meta: {
      full: true,
      title: '系统登录'
    },
    component: Login
  },
  {
    path: '/',
    name: 'index',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: () => import(/* webpackChunkName: 'index' */ '@views/home.vue')
  },
  {
    path: '/auth/user',
    name: 'authUser',
    meta: {
      title: '用户管理'
    },
    component: () => import(/* webpackChunkName: "auth" */ '@views/Auth/user.vue')
  },
  {
    path: '/auth/menu',
    name: 'authMenu',
    meta: {
      title: '菜单管理'
    },
    component: () => import(/* webpackChunkName: "auth" */ '@views/Auth/menu.vue')
  },
  {
    path: '/auth/role',
    name: 'authRole',
    meta: {
      title: '角色管理'
    },
    component: () => import(/* webpackChunkName: "auth" */ '@views/Auth/role.vue')
  },
  {
    path: '/auth/dept',
    name: 'authDept',
    meta: {
      title: '部门管理'
    },
    component: () => import(/* webpackChunkName: "auth" */ '@views/Auth/dept.vue')
  },
  {
    path: '/auth/tenant',
    name: 'authTenant',
    meta: {
      title: '租户管理'
    },
    component: () => import(/* webpackChunkName: "auth" */ '@views/Auth/tenant.vue')
  },
  {
    path: '/manage/log',
    name: 'manageLog',
    meta: {
      title: '日志管理'
    },
    component: () => import(/* webpackChunkName: "manage" */ '@/views/Manage/log.vue')
  },
  {
    path: '/manage/dict',
    name: 'manageDict',
    meta: {
      title: '字典管理'
    },
    component: () => import(/* webpackChunkName: "manage" */ '@/views/Manage/dict.vue')
  },
  {
    path: '/manage/client',
    name: 'manageClient',
    meta: {
      title: '终端管理'
    },
    component: () => import(/* webpackChunkName: "manage" */ '@/views/Manage/client.vue')
  },
  {
    path: '/manage/param',
    name: 'manageParam',
    meta: {
      title: '参数管理'
    },
    component: () => import(/* webpackChunkName: "manage" */ '@/views/Manage/param.vue')
  },
  {
    path: '/manage/file',
    name: 'manageFile',
    meta: {
      title: '文件管理'
    },
    component: () => import(/* webpackChunkName: "manage" */ '@/views/Manage/file.vue')
  },
  {
    path: '/manage/social',
    name: 'manageSocial',
    meta: {
      title: '密钥管理'
    },
    component: () => import(/* webpackChunkName: "manage" */ '@/views/Manage/social.vue')
  },
  {
    path: '/manage/token',
    name: 'manageToken',
    meta: {
      title: '令牌管理'
    },
    component: () => import(/* webpackChunkName: "manage" */ '@/views/Manage/token.vue')
  }
]

export default routes
