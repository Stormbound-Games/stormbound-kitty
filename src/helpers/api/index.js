import fetch from 'node-fetch'

const API_TOKEN = process.env.API_TOKEN
const API_BASE_URL = 'https://jsonbin.org/kittysparkles'

const getScores = guildId =>
  typeof window !== 'undefined' && window.Cypress
    ? Promise.resolve({})
    : fetch(API_BASE_URL + '/' + guildId + '/scores', {
        method: 'GET',
        headers: { Authorization: 'token ' + API_TOKEN },
      }).then(response => response.json())

const setScore = (id, guildId, update = +1) =>
  getScores(guildId)
    .then(scores => +(scores[id] || 0))
    .then(score => {
      if (typeof window !== 'undefined' && window.Cypress) return
      return fetch(API_BASE_URL + '/' + guildId + '/scores', {
        method: 'PATCH',
        headers: { Authorization: 'token ' + API_TOKEN },
        body: JSON.stringify({ [id]: score + update }),
      })
    })

const setGameId = (guildId, userId, gameId) => {
  return fetch(API_BASE_URL + '/' + guildId + '/gameids', {
    method: 'PATCH',
    headers: { Authorization: 'token ' + API_TOKEN },
    body: JSON.stringify({ [userId]: gameId }),
  })
}

const getGameId = (guildId, userId) => {
  return fetch(API_BASE_URL + '/' + guildId + '/gameids', {
    method: 'GET',
    headers: { Authorization: 'token ' + API_TOKEN },
  })
    .then(response => response.json())
    .then(data => data[userId])
}

export default {
  getScores,
  setScore,
  setGameId,
  getGameId,
}
