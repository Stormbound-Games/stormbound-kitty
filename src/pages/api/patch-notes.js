import applyRateLimit from '~/helpers/applyRateLimit'
import getIP from '~/helpers/getIP'
import getReleases from '~/api/releases/getReleases'

export default async function handler(request, response) {
  const isPreview = request.preview

  try {
    await applyRateLimit(request, response)
  } catch {
    return response.status(429).json({ message: 'Too many requests' })
  }

  try {
    const [{ slug }] = await getReleases({ isPreview })

    // Set up a 4 hours cache on the response.
    response.setHeader('Cache-Control', 's-maxage=' + 60 * 60 * 4)

    return response.redirect('/releases/' + slug)
  } catch {
    await trackError(request)

    return response.redirect('/')
  }
}

function trackError(request) {
  return fetch('https://plausible.io/api/event', {
    method: 'POST',
    headers: {
      'User-Agent': request.headers['user-agent'],
      'X-Forwarded-For': getIP(request),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: '500',
      domain: 'stormbound-kitty.com',
      url: 'https://stormbound-kitty.com/api/patch-notes',
      props: { path: '/api/patch-notes' },
    }),
  })
}
