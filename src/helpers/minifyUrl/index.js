const DOMAIN = 'https://api.shrtco.de'
const PATH = '/v2/shorten'
const QUERY = '?url='
const cache = new Map()

const minifyUrl = url => {
  // Development hack
  // url = url.replace('localhost:3000', 'stormbound-kitty.com')

  if (cache.has(url)) {
    return cache.get(url)
  }

  return window
    .fetch(DOMAIN + PATH + QUERY + url, { method: 'GET' })
    .then(response => response.json())
    .then(response => {
      const result = response.result
      const link =
        result.full_short_link3 ||
        result.full_short_link2 ||
        result.full_short_link

      if (link) {
        cache.set(url, link)

        return link
      }

      return url
    })
    .catch(() => url)
}

export default minifyUrl
