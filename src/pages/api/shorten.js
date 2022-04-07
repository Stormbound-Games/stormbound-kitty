import fetch from 'node-fetch'
import applyRateLimit from '~/helpers/applyRateLimit'

const API_KEY = process.env.CUTTLY_API_KEY
const API_URL = 'https://cutt.ly/api/api.php'
const cache = new Map()

export default async function handler(request, response) {
  try {
    await applyRateLimit(request, response)
  } catch {
    return response.status(429).json({ message: 'Too many requests' })
  }

  if (!request.query.url) {
    return response.status(400).send('Bad request')
  }

  const url = encodeURIComponent(
    decodeURIComponent(
      request.query.url.replace(
        'http://localhost:3000',
        'https://stormbound-kitty.com'
      )
    )
  )

  if (cache.has(url)) {
    return response.status(200).json(cache.get(url))
  }

  const res = await fetch(
    API_URL + `?key=${API_KEY}&short=${url}&noTitle=1&userDomain=1`
  )
  const { url: data } = await res.json()

  if (data.status !== 7) {
    console.error(
      'Failed to shorten link',
      url,
      'with status code',
      data.status
    )
    return response.status(400).send('Bad request')
  }

  cache.set(url, data)

  return response.status(200).json(data)
}
