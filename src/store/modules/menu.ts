import { Commit } from 'vuex'
import { getStorage, setStorage, removeStorage } from '@ts/storage'

export interface MenuItem {
  hasChildren: boolean | null
  icon: string
  id: number
  keepAlive: string
  label: string
  name: string
  parentId: number
  path: string
  permission: Array<string> | number
  sort: number
  spread: boolean
  type: string
  children: Array<MenuItem>
}

export interface Breadcrumb {
  parentId: number
  parentLabel: string
  id: number
  label: string
}

export default <{ [key: string]: any }>{
  state: {
    menu: getStorage('menu') || [],
    // 拍平的 menu，用于菜单逻辑
    menuFlatten: getStorage('menu-flatten') || [],
    menuActiveItem: {},
    breadcrumb: {} // { parentId, parentLabel, id, label }
  },
  mutations: {
    // 设置menu并存储
    SET_MENU: (state: { [key: string]: any }, menu: Array<MenuItem>) => {
      state.menu = menu
      setStorage({
        name: 'menu',
        content: state.menu,
        type: 'session'
      })
    },
    SET_MENU_FLATTEN: (state: { [key: string]: any }, menuFlatten: Array<MenuItem>) => {
      state.menuFlatten = menuFlatten
      setStorage({
        name: 'menu-flatten',
        content: state.menuFlatten,
        type: 'session'
      })
    },
    SET_MENU_ACTIVE_ITEM: (state: { [key: string]: any }, menuActiveItem: MenuItem) => {
      state.menuActiveItem = menuActiveItem
    },
    SET_BREADCRUMB: (state: { [key: string]: any }, breadcrumb: Breadcrumb) => {
      state.breadcrumb = breadcrumb
    }
  },
  actions: {
    updateBreadcrumb ({ commit }: { commit: Commit }, breadcrumb: Breadcrumb) {
      commit('SET_BREADCRUMB', breadcrumb)
    },
    resetBreadcrumb ({ commit }: { commit: Commit }, breadcrumb: Breadcrumb) {
      commit('SET_BREADCRUMB', {})
    },
    updateMenu ({ commit }: { commit: Commit }, menu: Array<MenuItem>) {
      let menuFlatten: MenuItem[] = []
      menu.forEach(item => {
        menuFlatten = menuFlatten.concat(item.children)
      })

      commit('SET_MENU', menu)
      commit('SET_MENU_FLATTEN', menuFlatten)
    },
    updateActiveMenu ({ commit }: { commit: Commit }, menuActiveItem: MenuItem) {
      commit('SET_MENU_ACTIVE_ITEM', menuActiveItem)
    },
    resetActiveMenu ({ commit }: { commit: Commit }) {
      commit('SET_MENU_ACTIVE_ITEM', {})
    },
    resetMenu ({ commit }: { commit: Commit }) {
      commit('SET_MENU', '')
      commit('SET_MENU_FLATTEN', '')
    },
    removeMenu ({ commit }: { commit: Commit }) {
      commit('SET_MENU', '')
      commit('SET_MENU_FLATTEN', '')
      removeStorage({ name: 'menu', type: 'session' })
      removeStorage({ name: 'menu-flatten', type: 'session' })
    }
  }
}
