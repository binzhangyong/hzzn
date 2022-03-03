import { TableRowOperate } from '~/index.t'

export function computedIsAdd (rowOperate: TableRowOperate | undefined): boolean {
  return rowOperate === TableRowOperate.Add
}

export function computedIsEdit (rowOperate: TableRowOperate | undefined): boolean {
  return rowOperate === TableRowOperate.Edit
}

export function computedIsView (rowOperate: TableRowOperate | undefined): boolean {
  return rowOperate === TableRowOperate.View
}

export function computedDialogTitle (rowOperate: TableRowOperate | undefined): string {
  return computedIsAdd(rowOperate) ? '新 增'
    : computedIsEdit(rowOperate) ? '编 辑' : '查 看'
}

export function computedDialogSubBtnText (rowOperate: TableRowOperate | undefined): string {
  return computedIsAdd(rowOperate) ? '保存'
    : computedIsEdit(rowOperate) ? '修改' : ''
}
