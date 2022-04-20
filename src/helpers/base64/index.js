export const base64Encode = string =>
  (typeof window === 'undefined'
    ? Buffer.from(string).toString('base64')
    : window.btoa(string)
  )
    // Make sure the returned value is URL-safe by excluding forwarded slashes
    // and plus signs.
    .replace(/\//g, '_')
    .replace(/\+/g, '-')

export const base64Decode = blob => {
  // Restore forward slashes and plus signs as expected by the base64 character
  // set before decoding the blob.
  blob = blob.replace(/_/g, '/').replace(/-/g, '+')

  return typeof window === 'undefined'
    ? Buffer.from(blob, 'base64').toString('ascii')
    : window.atob(blob)
}

export function isBase64(string) {
  if (string === '' || string.trim() === '') {
    return false
  }

  try {
    return base64Encode(base64Decode(string)) === string
  } catch (error) {
    return false
  }
}
