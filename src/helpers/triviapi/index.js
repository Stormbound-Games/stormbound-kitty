import fetch from 'node-fetch'

const API_TOKEN = process.env.API_TOKEN
const API_BASE_URL = 'https://jsonbin.org/kittysparkles'
const API_TIMEOUT = 5000

const getScores = guildId => {
  if (typeof window !== 'undefined' && window.Cypress) {
    return Promise.resolve({})
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), API_TIMEOUT)

  return fetch(API_BASE_URL + '/' + guildId + '/scores', {
    signal: controller.signal,
    method: 'GET',
    headers: { Authorization: 'token ' + API_TOKEN },
  })
    .then(response => response.json())
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
        headers: { Authorization: 'token ' + API_TOKEN },
        body: JSON.stringify({ [id]: score + update }),
      }).finally(() => clearTimeout(timeout))
    })

const setGameId = (guildId, userId, gameId) => {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), API_TIMEOUT)

  return fetch(API_BASE_URL + '/' + guildId + '/gameids', {
    signal: controller.signal,
    method: 'PATCH',
    headers: { Authorization: 'token ' + API_TOKEN },
    body: JSON.stringify({ [userId]: gameId }),
  }).finally(() => clearTimeout(timeout))
}

const getGameId = async (guildId, userId) => {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), API_TIMEOUT)

  return fetch(API_BASE_URL + '/' + guildId + '/gameids', {
    signal: controller.signal,
    method: 'GET',
    headers: { Authorization: 'token ' + API_TOKEN },
  })
    .then(response => response.json())
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
