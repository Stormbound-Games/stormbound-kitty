const DOMAIN = 'https://is.gd'
const PATH = '/create.php'
const QUERY = '?format=json&url='

const cache = new Map()

const minifyUrl = url => {
  if (cache.has(url)) {
    return cache.get(url)
  }

  return window
    .fetch(DOMAIN + PATH + QUERY + url, { method: 'GET' })
    .then(response => response.json())
    .then(response => {
      if (response.shorturl) {
        cache.set(url, response.shorturl)

        return response.shorturl
      }
      return url
    })
    .catch(() => url)
}

export default minifyUrl
