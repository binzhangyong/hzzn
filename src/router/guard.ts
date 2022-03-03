import { NavigationGuardWithThis, NavigationHookAfter } from 'vue-router'
import store from '@/store/index'
import website from '@/const/website'
import { MenuItem } from '@/store/modules/menu'

export const beforeEach: NavigationGuardWithThis<undefined> = (to) => {
  // 按照约定，name为必传项，如果name等于undefined，认为是错误路由
  // 默认跳转到第一个菜单
  // 路由输入正确，需要验证是否有权限，防止手动输入地址
  const menu = store.getters.menu
  const menuFlatten = store.getters.menuFlatten
  if (to.name) {
    if (website.whiteList.includes(to.name as string)) {
      return
    }
    if (store.getters.access_token) {
      if (to.name === 'login') {
        return '/'
      } else if (to.name === 'home') {
        return
      }

      const menuActiveItem = menuFlatten.find((item: MenuItem) => to.path === item.path)
      // 因为menu和menuFlatten单独存储
      if (menuActiveItem && menu.length) {
        store.dispatch('updateActiveMenu', menuActiveItem)
        // breadcrumb
        store.dispatch('updateBreadcrumb', {
          parentId: menuActiveItem.parentId,
          id: menuActiveItem.id,
          parentLabel: menu.find((item: MenuItem) => item.id === menuActiveItem.parentId).label,
          label: menuActiveItem.label
        })
      } else {
        return '/'
      }
    } else {
      return '/login'
    }
  } else {
    return menuFlatten[0] ? menuFlatten[0].path : '/'
  }
}

export const afterEach: NavigationHookAfter = (to) => {
  const meta = to.meta
  const TITLE = meta.title || website.title
  document.title = typeof TITLE === 'string' ? TITLE : ''
}
