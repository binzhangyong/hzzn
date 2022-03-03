const getters = {
  tag: (state: { [key: string]: any }): any => state.tags.tag,
  // website: (state: { [key: string]: any }) => state.common.website,
  userInfo: (state: { [key: string]: any }): any => state.user.userInfo,
  // theme: (state: { [key: string]: any }) => state.common.theme,
  // themeName: (state: { [key: string]: any }) => state.common.themeName,
  // isShade: (state: { [key: string]: any }) => state.common.isShade,
  // isCollapse: (state: { [key: string]: any }) => state.common.isCollapse,
  // screen: (state: { [key: string]: any }) => state.common.screen,
  // isLock: (state: { [key: string]: any }) => state.common.isLock,
  // isFullScreen: (state: { [key: string]: any }) => state.common.isFullScreen,
  // lockPasswd: (state: { [key: string]: any }) => state.common.lockPasswd,
  // tagList: (state: { [key: string]: any }) => state.tags.tagList,
  // tagWel: (state: { [key: string]: any }) => state.tags.tagWel,
  access_token: (state: { [key: string]: any }): any => state.user.access_token,
  refresh_token: (state: { [key: string]: any }): any => state.user.refresh_token,
  expires_in: (state: { [key: string]: any }): any => state.user.expires_in,
  roles: (state: { [key: string]: any }): any => state.user.roles,
  permissions: (state: { [key: string]: any }): any => state.user.permissions,
  menu: (state: { [key: string]: any }): any => state.menu.menu,
  menuFlatten: (state: { [key: string]: any }): any => state.menu.menuFlatten,
  menuActiveItem: (state: { [key: string]: any }): any => state.menu.menuActiveItem,
  breadcrumb: (state: { [key: string]: any }): any => state.menu.breadcrumb
  // menuAll: (state: { [key: string]: any }) => state.user.menuAll,
  // logsList: (state: { [key: string]: any }) => state.logs.logsList,
  // logsLen: (state: { [key: string]: any })[] } }) => state.logs.logsList.length || 0,
  // logsFlag: (state: { [key: string]: any }) => getters.logsLen === 0
}
export default getters
