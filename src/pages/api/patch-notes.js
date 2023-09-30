import applyRateLimit from '#helpers/applyRateLimit'
import getReleases from '#api/releases/getReleases'

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
    return response.redirect('/')
  }
}
