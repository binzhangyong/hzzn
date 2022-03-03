export enum TableRowOperate {Add, Edit, View, Delete}

export interface RequestResponse {
  code?: number
  message?: string
  data?: { [key: string]: any } | boolean

  [key: string]: any
}

export interface TableListBody {
  size: number
  current: number
}

export interface TableListRes extends RequestResponse {
  records: Array<any>
  size: number
  total: number
  pages: number
  current: number

  [key: string]: any
}
