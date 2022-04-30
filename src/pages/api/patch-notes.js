import applyRateLimit from '~/helpers/applyRateLimit'
import trackAsync from '~/helpers/trackAsync'
import getReleases from '~/api/releases/getReleases'

export default async function handler(request, response) {
  const isPreview = request.preview
  const path = '/api/patch-notes'

  try {
    await applyRateLimit(request, response)
  } catch {
    return response.status(429).json({ message: 'Too many requests' })
  }

  try {
    const [{ slug }] = await getReleases({ isPreview })

    trackAsync(request, 'pageview', path)

    // Set up a 4 hours cache on the response.
    response.setHeader('Cache-Control', 's-maxage=' + 60 * 60 * 4)

    return response.redirect('/releases/' + slug)
  } catch {
    const path = '/api/patch-notes'

    trackAsync(request, '500', path, { path })

    return response.redirect('/')
  }
}
