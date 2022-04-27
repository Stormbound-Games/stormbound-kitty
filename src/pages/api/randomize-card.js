import applyRateLimit from '~/helpers/applyRateLimit'
import randomizeCard from '~/helpers/randomizeCard'

export default async function handler(request, response) {
  try {
    await applyRateLimit(request, response)
  } catch {
    return response.status(429).send('Too many requests')
  }

  return response.status(200).json(randomizeCard())
}
