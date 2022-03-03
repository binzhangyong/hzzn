import { TableListBody } from './common.t'

export interface AuthRoleList {
  roleName: string
  roleId: number
}
export interface AuthRoleTableCol {
  roleId: number
  roleName: string
  createTime: string
  roleDesc: string
  roleCode: string
}
export interface AuthRoleAddBody {
  roleName: string
  roleCode: string
  roleDesc: string
  dsType: string | number
  dsScope: string | number
  roleId?: string | number
  createTime: string
}

export interface AuthRolePermissionBody {
  menuId: string
  roleId: number | string
}
