import website from '@/const/website'

const keyName = website.storageKey + '-'

interface Storage {
  name?: string
  content?: any
  type?: string
  dataType?: string
  datetime?: number
}

/**
 * 存储localStorage
 */
export function setStorage (
  { name, content, type }: Storage
): void {
  name = keyName + name
  const obj: Storage = {
    dataType: typeof (content),
    content: content,
    type: type,
    datetime: new Date().getTime()
  }

  if (type) {
    window.sessionStorage.setItem(name, JSON.stringify(obj))
  } else {
    window.localStorage.setItem(name, JSON.stringify(obj))
  }
}

/**
 * 获取localStorage
 */
export function getStorage (name: string): Storage | null {
  name = keyName + name
  let obj: Storage | string | null = window.sessionStorage.getItem(name) || window.localStorage.getItem(name)
  if (obj !== null) {
    obj = JSON.parse(obj) as Storage
    return obj.content
  }
  return null
}

/**
 * 删除localStorage
 */
export function removeStorage ({ name, type }: Storage): void {
  name = keyName + name
  if (type) {
    window.sessionStorage.removeItem(name)
  } else {
    window.localStorage.removeItem(name)
  }
}

/**
 * 获取全部localStorage
 */
export function getAllStore ({ type }: Storage): Array<Storage> {
  const list = []
  const st = type ? window.sessionStorage : window.localStorage
  for (let i = 0; i <= st.length; i++) {
    list.push({
      name: st.key(i),
      content: getStorage(st.key(i) as string)
    } as Storage)
  }
  return list
}

/**
 * 清空全部localStorage
 */
export function clearStore ({ type }: Storage): void {
  if (type) {
    window.sessionStorage.clear()
  } else {
    window.localStorage.clear()
  }
}
