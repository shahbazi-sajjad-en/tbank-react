import CryptoJS from "crypto-js"

const SECRET_KEY = "MY_SECRET_KEY" 

export const encryptId = (id: string) => {
  return CryptoJS.AES.encrypt(id, SECRET_KEY).toString()
}

export const decryptId = (cipher: string) => {
  const bytes = CryptoJS.AES.decrypt(cipher, SECRET_KEY)
  return bytes.toString(CryptoJS.enc.Utf8)
}
