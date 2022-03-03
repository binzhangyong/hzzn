const getters = {
  tag: (state: { [key: string]: any }): any => state.tags.tag,
  userInfo: (state: { [key: string]: any }): any => state.user.userInfo,
  access_token: (state: { [key: string]: any }): any => state.user.access_token,
  refresh_token: (state: { [key: string]: any }): any => state.user.refresh_token,
  expires_in: (state: { [key: string]: any }): any => state.user.expires_in,
  roles: (state: { [key: string]: any }): any => state.user.roles,
  permissions: (state: { [key: string]: any }): any => state.user.permissions,
  menu: (state: { [key: string]: any }): any => state.menu.menu,
  menuFlatten: (state: { [key: string]: any }): any => state.menu.menuFlatten,
  menuActiveItem: (state: { [key: string]: any }): any => state.menu.menuActiveItem,
  breadcrumb: (state: { [key: string]: any }): any => state.menu.breadcrumb
}
export default getters
