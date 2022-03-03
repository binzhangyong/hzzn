import { Commit, Dispatch } from 'vuex'
import { getStorage, setStorage } from '@ts/storage'

const user = {
  state: {
    userInfo: getStorage('userInfo') || {},
    permissions: getStorage('permissions') || [],
    expires_in: getStorage('expires_in') || '',
    access_token: getStorage('access_token') || '',
    refresh_token: getStorage('refresh_token') || ''
  },
  actions: {
    updateUserStorage ({ commit }: { commit: Commit }, data: {
      'access_token': string,
      active: boolean,
      'expires_in': number | string,
      'refresh_token': string
      scope: string
      'token_type': string,
      'user_info': {
        [key: string]: any
      }
    }): void {
      commit('SET_ACCESS_TOKEN', data.access_token)
      commit('SET_REFRESH_TOKEN', data.refresh_token)
      commit('SET_EXPIRES_IN', data.expires_in)
      commit('SET_USER_INFO', data.user_info)
      commit('SET_PERMISSIONS', data.user_info.authorities || [])
    },
    // 重置用户存储信息
    resetUserStorage ({ commit }: { commit: Commit }): void {
      commit('SET_PERMISSIONS', '')
      commit('SET_USER_INFO', '')
      commit('SET_ACCESS_TOKEN', '')
      commit('SET_REFRESH_TOKEN', '')
      commit('SET_EXPIRES_IN', '')
    },
    userLoginOut ({ dispatch }: { dispatch: Dispatch }): void {
      dispatch('resetUserStorage')
      dispatch('resetMenu')
      dispatch('resetActiveMenu')
      dispatch('resetBreadcrumb')
    }
  },
  mutations: {
    SET_ACCESS_TOKEN: (state: { 'access_token': string }, accessToken: string): void => {
      state.access_token = accessToken
      setStorage({
        name: 'access_token',
        content: state.access_token,
        type: 'session'
      })
    },
    SET_EXPIRES_IN: (state: { 'expires_in': number | string }, expiresIn: number | string): void => {
      state.expires_in = expiresIn
      setStorage({
        name: 'expires_in',
        content: state.expires_in,
        type: 'session'
      })
    },
    SET_REFRESH_TOKEN: (state: { 'refresh_token': string }, rfToken: string): void => {
      state.refresh_token = rfToken
      setStorage({
        name: 'refresh_token',
        content: state.refresh_token,
        type: 'session'
      })
    },
    SET_USER_INFO: (state: { userInfo: { [key: string]: any } }, userInfo: { [key: string]: any }): void => {
      state.userInfo = userInfo
      setStorage({
        name: 'userInfo',
        content: userInfo,
        type: 'session'
      })
    },
    SET_PERMISSIONS: (state: any, permissions: Array<{ [key: string]: string }>): void => {
      const list: { [key: string]: boolean } = {}
      for (let i = 0; i < permissions.length; i++) {
        list[permissions[i].authority] = true
      }

      state.permissions = list
      setStorage({
        name: 'permissions',
        content: list,
        type: 'session'
      })
    }
  }

}
export default user
