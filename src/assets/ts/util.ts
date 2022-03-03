// @ts-ignore
import * as CryptoJS from 'crypto-js'

export function encryptionPassword (key: string, password: string): string {
  key = CryptoJS.enc.Latin1.parse(key)
  // 加密
  const encrypted = CryptoJS.AES.encrypt(
    password,
    key,
    {
      iv: key,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.ZeroPadding
    }
  )

  return encrypted.toString()
}
