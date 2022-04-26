import fetch from 'node-fetch'
import applyRateLimit from '~/helpers/applyRateLimit'

const API_KEY = process.env.CUTTLY_API_KEY
const API_URL = 'https://cutt.ly/api/api.php'
const cache = new Map()

const shorten = (url, withCustomDomain = false) =>
  fetch(
    API_URL +
      `?key=${API_KEY}&short=${url}&noTitle=1&userDomain=` +
      Number(withCustomDomain)
  ).then(response => response.json())

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

  try {
    let data = await shorten(
      url,
      // Avoid Checkly’s automated checks taking custom links from the 1,000
      // monthly quota.
      // User-Agent: Checkly/1.0 (https://www.checklyhq.com)
      !/checkly/i.test(request.headers['user-agent'])
    )

    // Not super elegant, but when we’ve reached the monthly quota of branded
    // links with the short domain, the API returns the following plain text
    // response, so we should query again bypassing the short domain.
    // "Subscription has expired or you've reached your shortening limit"
    if (typeof data === 'string' && data.includes('limit')) {
      data = await shorten(url, false)
    }

    if (data.url.status !== 7) {
      console.error(
        'Failed to shorten link',
        url,
        'with status code',
        data.url.status
      )

      return response.status(400).send('Bad request')
    }

    cache.set(url, data.url)

    return response.status(200).json(data.url)
  } catch (error) {
    console.error(error)

    return response.status(500).send('Internal server error')
  }
}
