export const base64Encode = string => {
  if (typeof window === 'undefined')
    return Buffer.from(string).toString('base64')
  else return window.btoa(string)
}

export const base64Decode = string => {
  if (typeof window === 'undefined')
    return Buffer.from(string, 'base64').toString('ascii')
  else return window.atob(string)
}
