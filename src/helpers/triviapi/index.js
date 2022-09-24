import fetch from 'node-fetch'

const JSONBIN_TOKEN = process.env.JSONBIN_TOKEN
const API_BASE_URL = 'https://jsonbin.org/kittysparkles'
const API_TIMEOUT = 5000

const handleUnauthorized = response => {
  if (response.status === 412) throw new Error(response.message)
  return response
}

const getScores = guildId => {
  if (typeof window !== 'undefined' && window.Cypress) {
    return Promise.resolve({})
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), API_TIMEOUT)

  return fetch(API_BASE_URL + '/' + guildId + '/scores', {
    signal: controller.signal,
    method: 'GET',
    headers: { Authorization: 'token ' + JSONBIN_TOKEN },
  })
    .then(response => response.json())
    .then(handleUnauthorized)
    .finally(() => clearTimeout(timeout))
}

const setScore = (id, guildId, update = +1) =>
  getScores(guildId)
    .then(scores => +(scores[id] || 0))
    .then(score => {
      if (typeof window !== 'undefined' && window.Cypress) return

      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), API_TIMEOUT)

      return fetch(API_BASE_URL + '/' + guildId + '/scores', {
        signal: controller.signal,
        method: 'PATCH',
        headers: { Authorization: 'token ' + JSONBIN_TOKEN },
        body: JSON.stringify({ [id]: score + update }),
      }).finally(() => clearTimeout(timeout))
    })

const setGameId = (guildId, userId, gameId) => {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), API_TIMEOUT)

  return fetch(API_BASE_URL + '/' + guildId + '/gameids', {
    signal: controller.signal,
    method: 'PATCH',
    headers: { Authorization: 'token ' + JSONBIN_TOKEN },
    body: JSON.stringify({ [userId]: gameId }),
  }).finally(() => clearTimeout(timeout))
}

const getGameId = async (guildId, userId) => {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), API_TIMEOUT)

  return fetch(API_BASE_URL + '/' + guildId + '/gameids', {
    signal: controller.signal,
    method: 'GET',
    headers: { Authorization: 'token ' + JSONBIN_TOKEN },
  })
    .then(response => response.json())
    .then(handleUnauthorized)
    .then(data => data[userId])
    .finally(() => clearTimeout(timeout))
}

const api = {
  getScores,
  setScore,
  setGameId,
  getGameId,
}

export default api
