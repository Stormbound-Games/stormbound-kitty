import applyRateLimit from '~/helpers/applyRateLimit'

export default async function handler(request, response) {
  const { path } = request.body

  try {
    await applyRateLimit(request, response)
  } catch {
    return response.status(429).json({ message: 'Too many requests' })
  }

  if (request.method !== 'POST') {
    return response.status(405).json({ message: 'Method not allowed' })
  }

  const Authorization = request.headers.authorization || ''
  const token = Authorization.replace(/bearer/i, '').trim()

  if (token !== process.env.NEXT_REVALIDATION_TOKEN) {
    return response.status(401).json({ message: 'Invalid token' })
  }

  try {
    await response.unstable_revalidate(path)
    return response.json({ revalidated: true })
  } catch (error) {
    console.error(error)
    return response.status(500).send('Error revalidating')
  }
}
